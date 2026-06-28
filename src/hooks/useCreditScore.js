import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { DASHBOARD_ORDERS_LIMIT } from "../lib/queryLimits";
import { computeCreditScore } from "../lib/creditScore";
import { fetchCreditConsent, grantCreditConsent, revokeCreditConsent } from "../lib/creditScoreStorage";

export function useCreditScore(userId) {
  const [consent, setConsent] = useState({ consented: false, loading: true });
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const reload = useCallback(async () => {
    if (!userId) {
      setConsent({ consented: false, loading: false });
      return;
    }
    setConsent((c) => ({ ...c, loading: true }));
    const c = await fetchCreditConsent(userId);
    setConsent({ ...c, loading: false });

    if (c.consented) {
      setLoadingOrders(true);
      const { data } = await supabase
        .from("orders")
        .select("id, status, livraison_status, montant, created_at")
        .eq("client_id", userId)
        .order("created_at", { ascending: false })
        .limit(DASHBOARD_ORDERS_LIMIT);
      setOrders(data || []);
      setLoadingOrders(false);
    } else {
      setOrders([]);
    }
  }, [userId]);

  useEffect(() => {
    reload();
  }, [reload]);

  const grant = useCallback(async () => {
    if (!userId) return;
    await grantCreditConsent(userId);
    await reload();
  }, [userId, reload]);

  const revoke = useCallback(async () => {
    if (!userId) return;
    await revokeCreditConsent(userId);
    await reload();
  }, [userId, reload]);

  const profile = computeCreditScore(orders, { consented: consent.consented });

  return {
    consent,
    orders,
    profile,
    loading: consent.loading || loadingOrders,
    grantConsent: grant,
    revokeConsent: revoke,
    reload,
  };
}
