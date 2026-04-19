// src/components/ChatUsers.jsx
// ════════════════════════════════════════════════════════════════
// YORIX CM — CHAT ENTRE UTILISATEURS (acheteur ↔ vendeur)
// ✅ Temps réel via Supabase Realtime
// ✅ Protection anti-contact (numéros, emails, WhatsApp bloqués)
// ✅ Logs des tentatives dans fraud_logs
// ✅ Mode modal ou intégré
// ════════════════════════════════════════════════════════════════

import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { filtrerMsg } from "../utils/helpers";

export function ChatUsers({ user, userData, initialProduct = null, onClose, isModal = false }) {
  const [conversations, setConversations] = useState([]);
  const [activeConvId, setActiveConvId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [blockReason, setBlockReason] = useState("");
  const messagesEndRef = useRef(null);

  // Démarrer auto une conversation si un produit est fourni
  useEffect(() => {
    if (initialProduct?.vendeur_id && user?.id && initialProduct.vendeur_id !== user.id) {
      startConversation(initialProduct.vendeur_id, initialProduct.id);
    }
  }, [initialProduct?.id, user?.id]);

  // Charger les conversations
  useEffect(() => {
    if (!user?.id) return;
    loadConversations();
  }, [user?.id]);

  const loadConversations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
        .order("last_message_at", { ascending: false });
      if (error) throw error;
      setConversations(data || []);
    } catch (err) {
      console.warn("Chargement conversations:", err.message);
    }
    setLoading(false);
  };

  const startConversation = async (targetUserId, productId = null) => {
    if (!user?.id || !targetUserId || user.id === targetUserId) return;

    const [u1, u2] =
      user.id < targetUserId ? [user.id, targetUserId] : [targetUserId, user.id];

    try {
      let query = supabase
        .from("conversations")
        .select("*")
        .eq("user1_id", u1)
        .eq("user2_id", u2);

      if (productId) query = query.eq("product_id", productId);
      else query = query.is("product_id", null);

      const { data: existing } = await query.maybeSingle();

      if (existing) {
        setActiveConvId(existing.id);
        await loadConversations();
        return;
      }

      const { data: created, error } = await supabase
        .from("conversations")
        .insert({ user1_id: u1, user2_id: u2, product_id: productId })
        .select()
        .single();

      if (error) throw error;
      setActiveConvId(created.id);
      await loadConversations();
    } catch (err) {
      console.error("startConversation:", err);
      alert("Erreur : " + err.message);
    }
  };

  useEffect(() => {
    if (!activeConvId) {
      setMessages([]);
      return;
    }
    loadMessages();
  }, [activeConvId]);

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", activeConvId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.warn("Chargement messages:", err.message);
    }
  };

  useEffect(() => {
    if (!activeConvId) return;
    const channel = supabase
      .channel(`chat-${activeConvId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${activeConvId}`,
        },
        (payload) => {
          setMessages((prev) => {
            if (prev.some((m) => m.id === payload.new.id)) return prev;
            return [...prev, payload.new];
          });
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeConvId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!messageInput.trim() || !activeConvId || sending) return;

    // 🛡️ FILTRE ANTI-CONTACT
    const filtre = filtrerMsg(messageInput);
    if (filtre?.bloque) {
      setBlocked(true);
      setBlockReason(filtre.raison || "Partage de contact interdit");
      setTimeout(() => setBlocked(false), 5000);
      if (user) {
        supabase
          .from("fraud_logs")
          .insert({
            type: "tentative_contournement_chat",
            user_id: user.id,
            message: messageInput,
          })
          .then(({ error }) => {
            if (error) console.warn("fraud_logs:", error.message);
          });
      }
      return;
    }

    setSending(true);
    try {
      const { data, error } = await supabase
        .from("messages")
        .insert({
          conversation_id: activeConvId,
          sender_id: user.id,
          content: messageInput.trim(),
        })
        .select()
        .single();
      if (error) throw error;
      setMessages((prev) => {
        if (prev.some((m) => m.id === data.id)) return prev;
        return [...prev, data];
      });
      setMessageInput("");
    } catch (err) {
      alert("Erreur envoi : " + err.message);
    }
    setSending(false);
  };

  const getOtherUserId = (conv) =>
    conv.user1_id === user.id ? conv.user2_id : conv.user1_id;

  if (!user) {
    return (
      <div style={{ padding: 30, textAlign: "center", color: "var(--gray)" }}>
        🔐 Connectez-vous pour accéder à la messagerie.
      </div>
    );
  }

  const containerStyle = isModal
    ? {
        background: "var(--surface)", borderRadius: 13, overflow: "hidden",
        height: "80vh", maxHeight: 600, display: "flex", width: "100%",
      }
    : {
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: 13, overflow: "hidden", height: 500, display: "flex",
      };

  return (
    <div style={containerStyle}>
      {/* SIDEBAR */}
      <div style={{
        width: 240, borderRight: "1px solid var(--border)",
        background: "var(--surface2)", display: "flex", flexDirection: "column",
      }}>
        <div style={{
          padding: "12px 14px", borderBottom: "1px solid var(--border)",
          fontFamily: "'Syne',sans-serif", fontWeight: 700,
          fontSize: ".85rem", color: "var(--ink)",
        }}>
          💬 Conversations
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {loading ? (
            <div style={{ padding: 20, textAlign: "center", color: "var(--gray)", fontSize: ".78rem" }}>
              Chargement...
            </div>
          ) : conversations.length === 0 ? (
            <div style={{ padding: 20, textAlign: "center", color: "var(--gray)", fontSize: ".75rem", lineHeight: 1.6 }}>
              Aucune conversation.<br /><br />
              Clique sur "Contacter le vendeur" depuis un produit.
            </div>
          ) : (
            conversations.map((c) => (
              <div
                key={c.id}
                onClick={() => setActiveConvId(c.id)}
                style={{
                  padding: "10px 12px", cursor: "pointer",
                  borderBottom: "1px solid var(--border)",
                  background: activeConvId === c.id ? "var(--green-pale)" : "transparent",
                }}
              >
                <div style={{ fontWeight: 600, fontSize: ".8rem", color: "var(--ink)" }}>
                  👤 {getOtherUserId(c).slice(0, 8)}...
                </div>
                <div style={{ fontSize: ".65rem", color: "var(--gray)", marginTop: 2 }}>
                  {c.last_message_at
                    ? new Date(c.last_message_at).toLocaleString("fr-FR", {
                        day: "2-digit", month: "2-digit",
                        hour: "2-digit", minute: "2-digit",
                      })
                    : "Nouveau"}
                </div>
                {c.product_id && (
                  <div style={{ fontSize: ".6rem", color: "var(--green)", marginTop: 3, fontWeight: 600 }}>
                    🛍️ Sur un produit
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* FENETRE CHAT */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{
          padding: "12px 16px", borderBottom: "1px solid var(--border)",
          background: "var(--green)", color: "#fff",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: ".88rem" }}>
              {activeConvId ? "💬 Conversation" : "Sélectionne une conversation"}
            </div>
            <div style={{ fontSize: ".68rem", opacity: 0.85 }}>
              🔒 Messagerie sécurisée · Partage de contact interdit
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} style={{
              background: "rgba(255,255,255,.15)", color: "#fff", border: "none",
              width: 32, height: 32, borderRadius: "50%",
              cursor: "pointer", fontSize: "1rem",
            }}>✕</button>
          )}
        </div>

        <div style={{
          flex: 1, overflowY: "auto", padding: 14,
          background: "var(--surface)",
          display: "flex", flexDirection: "column", gap: 8,
        }}>
          {!activeConvId ? (
            <div style={{ textAlign: "center", color: "var(--gray)", marginTop: 60, fontSize: ".85rem" }}>
              👈 Sélectionne une conversation à gauche
            </div>
          ) : messages.length === 0 ? (
            <div style={{ textAlign: "center", color: "var(--gray)", marginTop: 60, fontSize: ".85rem" }}>
              Aucun message.<br />Envoie le premier ! 👇
            </div>
          ) : (
            messages.map((m) => {
              const isMine = m.sender_id === user.id;
              return (
                <div key={m.id} style={{
                  alignSelf: isMine ? "flex-end" : "flex-start",
                  maxWidth: "75%",
                  background: isMine ? "var(--green)" : "var(--surface2)",
                  color: isMine ? "#fff" : "var(--ink)",
                  padding: "8px 12px",
                  borderRadius: isMine ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
                  fontSize: ".85rem", lineHeight: 1.4, wordBreak: "break-word",
                }}>
                  <div>{m.content}</div>
                  <div style={{
                    fontSize: ".6rem", opacity: 0.7, marginTop: 3,
                    textAlign: isMine ? "right" : "left",
                  }}>
                    {new Date(m.created_at).toLocaleTimeString("fr-FR", {
                      hour: "2-digit", minute: "2-digit",
                    })}
                    {isMine && (m.is_read ? " ✓✓" : " ✓")}
                  </div>
                </div>
              );
            })
          )}
          {blocked && (
            <div style={{
              background: "#fee2e2", border: "1px solid #fca5a5",
              borderRadius: 9, padding: "10px 14px",
              color: "#991b1b", fontSize: ".78rem",
              textAlign: "center", margin: "8px 0", lineHeight: 1.5,
            }}>
              🚫 <strong>Message bloqué</strong><br />
              {blockReason || "Partage de contacts externes interdit sur Yorix"}<br />
              <span style={{ fontSize: ".7rem", opacity: 0.8 }}>
                Utilise la messagerie Yorix pour tes échanges.
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {activeConvId && (
          <div style={{
            padding: 10, borderTop: "1px solid var(--border)",
            display: "flex", gap: 7, background: "var(--surface)",
          }}>
            <input
              type="text"
              placeholder="Écris ton message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !sending) sendMessage(); }}
              disabled={sending}
              style={{
                flex: 1, border: "1.5px solid var(--border)", borderRadius: 8,
                padding: "9px 12px", fontFamily: "'DM Sans',sans-serif",
                fontSize: ".83rem", outline: "none",
                background: "var(--surface2)", color: "var(--ink)",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={sending || !messageInput.trim()}
              style={{
                background: "var(--green)", color: "#fff", border: "none",
                width: 40, height: 40, borderRadius: 8,
                cursor: sending || !messageInput.trim() ? "not-allowed" : "pointer",
                fontSize: "1rem",
                opacity: sending || !messageInput.trim() ? 0.5 : 1,
              }}
            >
              {sending ? "..." : "➤"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
