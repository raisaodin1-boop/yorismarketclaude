import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "../lib/supabase";
import { readLocalWishlist, writeLocalWishlist } from "../lib/wishlistStorage";

/**
 * Wishlist en mémoire avec persistance Supabase (connecté) ou localStorage (invité).
 *
 * @param {string | null | undefined} userId
 */
export function useWishlist(userId) {
  const [wishlist, setWishlist] = useState(() => new Set(readLocalWishlist()));
  const mergeDoneRef = useRef(null);

  useEffect(() => {
    if (!userId) {
      setWishlist(new Set(readLocalWishlist()));
      mergeDoneRef.current = null;
      return undefined;
    }

    let cancelled = false;

    (async () => {
      const localIds = readLocalWishlist();
      if (localIds.length && mergeDoneRef.current !== userId) {
        mergeDoneRef.current = userId;
        const rows = localIds.map((product_id) => ({ user_id: userId, product_id }));
        await supabase
          .from("wishlists")
          .upsert(rows, { onConflict: "user_id,product_id", ignoreDuplicates: true });
        writeLocalWishlist([]);
      }

      const { data, error } = await supabase
        .from("wishlists")
        .select("product_id")
        .eq("user_id", userId);

      if (cancelled) return;
      if (!error && data) {
        setWishlist(new Set(data.map((r) => r.product_id)));
      } else if (error) {
        console.warn("useWishlist load:", error.message);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const toggleWish = useCallback(
    async (productId) => {
      if (!productId) return;

      let adding = false;
      setWishlist((prev) => {
        adding = !prev.has(productId);
        const next = new Set(prev);
        if (adding) next.add(productId);
        else next.delete(productId);
        if (!userId) writeLocalWishlist(next);
        return next;
      });

      if (!userId) return;

      if (adding) {
        const { error } = await supabase
          .from("wishlists")
          .insert({ user_id: userId, product_id: productId });
        if (error && error.code !== "23505") {
          console.warn("wishlist insert:", error.message);
          setWishlist((prev) => {
            const next = new Set(prev);
            next.delete(productId);
            return next;
          });
        }
      } else {
        const { error } = await supabase
          .from("wishlists")
          .delete()
          .eq("user_id", userId)
          .eq("product_id", productId);
        if (error) {
          console.warn("wishlist delete:", error.message);
          setWishlist((prev) => {
            const next = new Set(prev);
            next.add(productId);
            return next;
          });
        }
      }
    },
    [userId],
  );

  return { wishlist, toggleWish };
}
