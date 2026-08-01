import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { getUserProfile, sendEmail, emailBienvenue } from "../utils/helpers";
import { isProfileAccessible } from "../lib/userMutations";
import { applyReferralCode } from "../lib/referralApi";
import { recordContractAcceptance } from "../lib/contractAcceptanceApi";
import {
  PENDING_CONTRACT_KEY,
  PENDING_PROFILE_KEY,
  PENDING_ROLE_KEY,
  PRO_ROLES,
  clearPendingSignupArtifacts,
  readJsonStorage,
  requiresContractAcceptance,
  resolveSignupRole,
  validateIdentityFields,
  validateRegistrationFields,
  writeJsonStorage,
} from "../lib/authRegistration";

/**
 * Session Supabase, profil, modale auth / contrat, actions login-register-logout.
 *
 * @param {object} opts
 * @param {(page: string, opts?: object) => void} opts.goPage
 * @param {import("react").Dispatch<import("react").SetStateAction<string>>} opts.setDashTab
 * @param {import("react").Dispatch<import("react").SetStateAction<boolean>>} opts.setDemandeLivraisonOpen
 * @param {import("react").Dispatch<import("react").SetStateAction<any[]>>} opts.setNotifs
 * @param {(uid: string, limit?: number) => Promise<void>} opts.onProfileLoaded
 */
export function useYorixAuth({ goPage, setDashTab, setDemandeLivraisonOpen, setNotifs, onProfileLoaded }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const [selectedRole, _setSelectedRole] = useState(
    () => localStorage.getItem(PENDING_ROLE_KEY) || "buyer"
  );
  const setSelectedRole = (role) => {
    localStorage.setItem(PENDING_ROLE_KEY, role);
    _setSelectedRole(role);
  };
  const [authForm, setAuthForm] = useState({
    nom: "", email: "", tel: "", password: "",
    refCode: localStorage.getItem("yorix_ref_code") || "",
  });
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [contractOpen, setContractOpen] = useState(false);
  const [contractAccepted, setContractAccepted] = useState(false);
  const [pendingRegistration, setPendingRegistration] = useState(null);
  const [pendingContractAcceptance, setPendingContractAcceptance] = useState(null);
  const [pendingGoogleAfterContract, setPendingGoogleAfterContract] = useState(false);

  const [pendingAction, setPendingAction] = useState(null);

  const enforceProfileAccess = useCallback(async (profile) => {
    if (!profile || isProfileAccessible(profile)) return true;
    await supabase.auth.signOut();
    setUser(null);
    setUserData(null);
    setUserRole(null);
    setNotifs([]);
    setAuthError("Ce compte est suspendu ou supprimé. Contactez le support Yorix.");
    return false;
  }, [setNotifs]);

  const chargerProfil = useCallback(
    async (uid, oauthUserMeta = null) => {
      const profile = await getUserProfile(uid);

      if (!profile) {
        if (oauthUserMeta) {
          // Nouvel utilisateur OAuth — créer le profil une seule fois
          // INSERT ... ON CONFLICT DO NOTHING : ne jamais écraser un profil existant
          const pendingProfile = readJsonStorage(localStorage, PENDING_PROFILE_KEY) || {};
          const pendingContract = readJsonStorage(localStorage, PENDING_CONTRACT_KEY);
          const requestedRole =
            pendingProfile.role
            || localStorage.getItem(PENDING_ROLE_KEY)
            || "buyer";
          const role = resolveSignupRole(requestedRole, Boolean(pendingContract));
          const meta = oauthUserMeta.user_metadata || {};
          const nom = String(pendingProfile.nom || meta.full_name || meta.name || oauthUserMeta.email || "").trim();
          const telephone = String(pendingProfile.tel || "").trim();

          const { error: oauthProfileError } = await supabase.from("profiles").upsert({
            id: uid,
            nom,
            email: oauthUserMeta.email || "",
            telephone,
            role,
            langue: "fr",
            actif: true,
            verifie: false,
            note: 0,
            nombre_avis: 0,
            total_commandes: 0,
          }, { onConflict: "id", ignoreDuplicates: true });

          if (oauthProfileError) {
            console.error("OAuth profile create error:", oauthProfileError);
            setAuthError(
              oauthProfileError.message
              || "Impossible de créer votre profil Google. Vérifiez nom et téléphone.",
            );
            return;
          }

          if (PRO_ROLES.includes(role) && pendingContract) {
            const { error: contractError } = await recordContractAcceptance(
              supabase,
              uid,
              {
                ...pendingContract,
                fullName: pendingContract.fullName || nom,
                phone: pendingContract.phone || telephone,
                role,
              },
            );
            if (contractError) {
              console.error("OAuth contract attribution error:", contractError);
              await supabase.auth.signOut();
              setAuthError(
                "Impossible d'enregistrer l'acceptation du contrat. Réessayez l'inscription professionnelle.",
              );
              return;
            }
          }

          clearPendingSignupArtifacts(localStorage);

          // Recharger après création
          const created = await getUserProfile(uid);
          if (created) {
            if (!(await enforceProfileAccess(created))) return;
            setUserData(created);
            // Rôle exact de la base — aucune transformation
            setUserRole(created.role || "buyer");
            await onProfileLoaded(uid);
          }
        }
        // Profil null sans OAuth (erreur réseau / RLS lente) : ne pas écraser le rôle actuel
        return;
      }

      if (!(await enforceProfileAccess(profile))) return;

      setUserData(profile);
      // Rôle exact depuis profiles.role — correspond 1:1 à ce qui est en base
      setUserRole(profile.role || "buyer");
      await onProfileLoaded(uid);
    },
    [onProfileLoaded, enforceProfileAccess],
  );

  useEffect(() => {
    let cancelled = false;
    supabase.auth
      .getSession()
      .then(({ data: { session }, error }) => {
        if (cancelled) return;
        if (error) console.warn("Auth getSession:", error.message);
        if (session?.user) {
          setUser(session.user);
          // Passer l'objet user pour détecter un éventuel compte OAuth sans profil
          chargerProfil(session.user.id, session.user);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.warn("Auth getSession:", e?.message || e);
        if (!cancelled) setLoading(false);
      });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) => {
      // Callback synchrone — pas d'async ici pour éviter les race conditions Supabase
      if (session?.user) {
        setUser(session.user);
        chargerProfil(session.user.id, session.user);
      } else {
        setUser(null);
        setUserData(null);
        setUserRole(null);
        setNotifs([]);
      }
    });
    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [chargerProfil, setNotifs]);

  const executePendingAction = useCallback(
    (actionId) => {
      const id = actionId || pendingAction;
      if (!id) return;

      if (id === "buy") goPage("produits");
      else if (id === "sell") goPage("dashboard");
      else if (id === "service") goPage("prestataires");
      else if (id === "delivery") {
        goPage("livraison");
        setTimeout(() => setDemandeLivraisonOpen(true), 300);
      }

      setPendingAction(null);
    },
    [pendingAction, goPage, setDemandeLivraisonOpen],
  );

  const doLogin = async () => {
    setAuthError("");
    setAuthLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: authForm.email,
        password: authForm.password,
      });
      if (error) throw error;
      setUser(data.user);
      await chargerProfil(data.user.id);
      const fresh = await getUserProfile(data.user.id);
      if (!isProfileAccessible(fresh)) {
        setAuthLoading(false);
        return;
      }
      setAuthOpen(false);
      if (pendingAction) {
        setTimeout(() => executePendingAction(pendingAction), 300);
      }
      sendEmail({
        to: authForm.email,
        subject: `Bienvenue sur Yorix, ${authForm.nom} ! 🎉`,
        html: emailBienvenue(authForm.nom, selectedRole),
      }).catch((e) => console.warn("Email bienvenue:", e));
    } catch (_err) {
      setAuthError("Email ou mot de passe incorrect.");
    }
    setAuthLoading(false);
  };

  const doRegister = async ({
    contractGateBypassed = false,
    contractAcceptance = null,
  } = {}) => {
    setAuthError("");
    setAuthLoading(true);
    try {
      const fieldError = validateRegistrationFields(authForm);
      if (fieldError) throw new Error(fieldError);
      if (!selectedRole) throw new Error("Veuillez choisir un profil (Acheteur, Vendeur, Livreur ou Prestataire).");

      if (requiresContractAcceptance(selectedRole, contractAccepted, contractGateBypassed)) {
        setPendingRegistration({
          nom: authForm.nom.trim(),
          email: authForm.email.trim(),
          tel: authForm.tel.trim(),
          password: authForm.password,
          role: selectedRole,
        });
        setAuthLoading(false);
        setContractOpen(true);
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: authForm.email,
        password: authForm.password,
        options: {
          data: {
            display_name: authForm.nom,
            nom: authForm.nom,
            telephone: authForm.tel,
            role: selectedRole,
          },
        },
      });
      if (error) throw error;

      const uid = data.user?.id;
      if (!uid) throw new Error("Erreur création compte.");

      const { error: profileError } = await supabase.from("profiles").upsert({
        id: uid,
        nom: authForm.nom.trim(),
        email: authForm.email.trim(),
        telephone: authForm.tel.trim(),
        role: selectedRole,
        langue: "fr",
        actif: true,
        verifie: false,
        note: 0,
        nombre_avis: 0,
        total_commandes: 0,
      });
      if (profileError) {
        await supabase.auth.signOut();
        throw new Error("Impossible de créer votre profil. Réessayez ou contactez le support.");
      }

      if (PRO_ROLES.includes(selectedRole)) {
        const acceptance =
          contractAcceptance
          || pendingContractAcceptance
          || readJsonStorage(localStorage, PENDING_CONTRACT_KEY);
        const { error: contractError } = await recordContractAcceptance(supabase, uid, {
          ...(acceptance || {}),
          fullName: acceptance?.fullName || authForm.nom.trim(),
          phone: acceptance?.phone || authForm.tel.trim(),
          role: selectedRole,
        });
        if (contractError) {
          await supabase.auth.signOut();
          throw new Error(
            "Impossible d'enregistrer l'acceptation du contrat. Réessayez ou contactez le support.",
          );
        }
        setPendingContractAcceptance(null);
        localStorage.removeItem(PENDING_CONTRACT_KEY);
      }

      await supabase
        .from("wallets")
        .insert({ user_id: uid, solde: 0, total_gagne: 0, devise: "FCFA" })
        .then((r) => r.error && console.error(r.error));

      // Appliquer code de parrainage : champ du formulaire > URL > localStorage
      const refCode = authForm.refCode?.trim()
        || new URLSearchParams(window.location.search).get("ref")
        || localStorage.getItem("yorix_ref_code");
      if (refCode) {
        applyReferralCode(refCode, uid).catch(() => {});
        localStorage.removeItem("yorix_ref_code");
      }

      await chargerProfil(uid);
      setAuthOpen(false);
      setAuthForm({ nom: "", email: "", tel: "", password: "", refCode: "" });
      setContractAccepted(false);
      setPendingRegistration(null);
      clearPendingSignupArtifacts(localStorage);
      if (pendingAction) {
        setTimeout(() => executePendingAction(pendingAction), 500);
      }
    } catch (err) {
      console.error("Register error:", err);
      setAuthError(
        err.message.includes("already") ? "Cet email est déjà utilisé." : err.message,
      );
    }
    setAuthLoading(false);
  };

  const startGoogleOAuth = async () => {
    localStorage.setItem(PENDING_ROLE_KEY, selectedRole);
    writeJsonStorage(localStorage, PENDING_PROFILE_KEY, {
      nom: authForm.nom.trim(),
      tel: authForm.tel.trim(),
      role: selectedRole,
    });
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) setAuthError(error.message);
  };

  const doGoogle = async () => {
    setAuthError("");

    // Login path: never invent a professional role from a leftover register selection.
    if (authTab !== "register") {
      localStorage.setItem(PENDING_ROLE_KEY, "buyer");
      localStorage.removeItem(PENDING_PROFILE_KEY);
      localStorage.removeItem(PENDING_CONTRACT_KEY);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin },
      });
      if (error) setAuthError(error.message);
      return;
    }

    const fieldError = validateIdentityFields(authForm);
    if (fieldError) {
      setAuthError(fieldError);
      return;
    }

    if (requiresContractAcceptance(selectedRole, contractAccepted, false)) {
      setPendingGoogleAfterContract(true);
      setContractOpen(true);
      return;
    }

    await startGoogleOAuth();
  };

  const doLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserData(null);
    setUserRole(null);
    setDashTab("overview");
    goPage("home");
  };

  const handleContractAccepted = async (acceptanceData) => {
    setContractOpen(false);
    setContractAccepted(true);
    setPendingContractAcceptance(acceptanceData || null);
    writeJsonStorage(localStorage, PENDING_CONTRACT_KEY, acceptanceData || {});

    if (pendingGoogleAfterContract) {
      setPendingGoogleAfterContract(false);
      await startGoogleOAuth();
      return;
    }

    // Explicit bypass avoids the stale React closure where contractAccepted
    // is still false in the doRegister captured by this handler.
    await doRegister({
      contractGateBypassed: true,
      contractAcceptance: acceptanceData,
    });
  };

  return {
    user,
    setUser,
    userData,
    setUserData,
    userRole,
    setUserRole,
    loading,
    authOpen,
    setAuthOpen,
    authTab,
    setAuthTab,
    selectedRole,
    setSelectedRole,
    authForm,
    setAuthForm,
    authError,
    setAuthError,
    authLoading,
    setAuthLoading,
    contractOpen,
    setContractOpen,
    contractAccepted,
    setContractAccepted,
    pendingRegistration,
    setPendingRegistration,
    pendingAction,
    setPendingAction,
    chargerProfil,
    doLogin,
    doRegister,
    doGoogle,
    doLogout,
    handleContractAccepted,
    executePendingAction,
  };
}
