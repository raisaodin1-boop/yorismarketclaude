import { useState } from "react";
import {
  optimizeCloudinaryUrl,
  optimizeImageUrl,
  cloudinarySrcset,
  cloudinaryPlaceholder,
  cloudinaryResponsive,
} from "../utils/helpers";

// ═══════════════════════════════════════════════════════════════
// 🖼️ COMPOSANT IMAGE OPTIMISÉE
// ═══════════════════════════════════════════════════════════════
// Features :
// ✅ Lazy loading natif (loading="lazy")
// ✅ WebP/AVIF automatique via Cloudinary (f_auto)
// ✅ Compression auto (q_auto:low)
// ✅ srcset responsive (400/800/1200 px)
// ✅ Placeholder blur pendant le chargement
// ✅ Fallback si l'image ne charge pas
// ✅ Fade-in quand chargée
// ═══════════════════════════════════════════════════════════════

export function OptimizedImage({
  src,
  alt = "",
  width = 400,
  height,
  size, // "thumb" | "card" | "hero" — presets Cloudinary (w/h/crop fixes + srcset Retina)
  className = "",
  style = {},
  fallbackEmoji = "📦",
  objectFit = "cover",
  priority = false, // true = charge tout de suite (hero, above fold) → pas de lazy, LCP
  onLoad,
  onError,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  // Pas d'URL ou URL cassée → fallback emoji
  if (!src || typeof src !== "string" || !src.startsWith("http") || errored) {
    return (
      <div
        className={className}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--surface2, #f5f5f5)",
          color: "var(--gray, #999)",
          fontSize: "2rem",
          width: width || "100%",
          height: height || "100%",
          minHeight: 80,
          ...style,
        }}
      >
        {fallbackEmoji}
      </div>
    );
  }

  const responsive = size ? cloudinaryResponsive(src, size) : null;
  const preset = size ? { thumb: 80, card: 300, hero: 800 }[size] || 400 : width;
  const optimizedSrc = responsive
    ? responsive.src
    : optimizeImageUrl(src, { width: preset, height: size === "card" || size === "thumb" ? preset : undefined });
  const srcset = responsive ? responsive.srcSet : (src.includes("cloudinary.com") ? cloudinarySrcset(src) : undefined);
  const sizesAttr = responsive ? undefined : `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${preset}px`;
  const placeholder = cloudinaryPlaceholder(src) || optimizeImageUrl(src, { width: 24, quality: 40 });

  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--surface2, #f5f5f5)",
        width: style.width || "100%",
        height: style.height || "auto",
        ...style,
      }}
    >
      {/* Placeholder blurré pendant le chargement */}
      {!loaded && placeholder && (
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit,
            filter: "blur(12px)",
            transform: "scale(1.1)",
            transition: "opacity .3s",
          }}
        />
      )}

      {/* Image optimisée */}
      <img
        src={optimizedSrc}
        {...(srcset ? { srcSet: srcset, sizes: sizesAttr } : {})}
        alt={alt}
        decoding="async"
        {...(priority
          ? { loading: "eager", fetchpriority: "high" }
          : { loading: "lazy", fetchpriority: "auto" })}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          setErrored(true);
          onError?.(e);
        }}
        style={{
          width: "100%",
          height: "100%",
          objectFit,
          opacity: loaded ? 1 : 0,
          transition: "opacity .4s ease",
          display: "block",
        }}
        {...rest}
      />
    </div>
  );
}
