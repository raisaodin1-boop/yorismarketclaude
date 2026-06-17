/**
 * YORIX CM — Design Tokens
 * Source of truth for colors, spacing, typography, radius and shadows.
 * Values extracted from the existing styles.js / CSS variables in use across the app.
 *
 * Usage:
 *   import { tokens } from "../utils/designTokens";
 *   style={{ color: tokens.colors.primary }}
 */

export const tokens = {
  colors: {
    // Brand
    primary:        "#1a6b3a",   // --green
    primaryMid:     "#27a85a",   // --green-mid
    primaryLight:   "#4fd17d",   // --green-light
    primaryPale:    "#c8f5d9",   // --green-pale (light mode)
    primaryDark:    "#0f4a28",   // deep green used on hover

    // Accent / Cameroun flag
    yellow:         "#fcd116",   // --yellow
    gold:           "#c9a84c",   // --gold
    red:            "#ce1126",   // --red  (flag red)

    // Semantic
    success:        "#1a6b3a",
    error:          "#dc2626",
    warning:        "#d97706",
    info:           "#2563eb",

    // WhatsApp
    whatsapp:       "#25D366",

    // Neutral (light mode defaults — overridden by CSS vars at runtime)
    textPrimary:    "#0d1f14",   // --ink
    textSecondary:  "#6b7a72",   // --gray
    background:     "#f5f2ed",   // --bg
    surface:        "#ffffff",   // --surface
    surface2:       "#f0ece6",   // --surface2
    border:         "#e2ddd6",   // --border
    shadow:         "rgba(0,0,0,0.08)", // --shadow light
  },

  spacing: {
    xs:   "4px",
    sm:   "8px",
    md:   "16px",
    lg:   "24px",
    xl:   "32px",
    xxl:  "48px",
    xxxl: "64px",
  },

  typography: {
    fontFamily:        "'DM Sans', sans-serif",
    fontFamilyDisplay: "'Syne', sans-serif",
    sizes: {
      xs:   "12px",
      sm:   "14px",
      md:   "16px",
      lg:   "20px",
      xl:   "24px",
      xxl:  "32px",
      hero: "clamp(2.2rem, 5.5vw, 3.4rem)",
    },
    weights: {
      regular:  400,
      medium:   500,
      semibold: 600,
      bold:     700,
      black:    800,
    },
    lineHeight: {
      tight:  1.15,
      normal: 1.5,
      loose:  1.7,
    },
  },

  radius: {
    xs:   "4px",
    sm:   "8px",
    md:   "10px",
    lg:   "14px",
    xl:   "18px",
    xxl:  "22px",
    full: "9999px",
  },

  shadows: {
    sm:    "0 4px 20px rgba(13,31,20,0.06)",   // --yorix-sh-sm
    md:    "0 12px 40px rgba(13,31,20,0.09)",  // --yorix-sh-md
    lg:    "0 24px 64px rgba(13,31,20,0.13)",  // --yorix-sh-lg
    card:  "0 2px 8px rgba(0,0,0,0.08)",
    modal: "0 28px 70px rgba(0,0,0,0.45)",
    glow:  "0 0 0 3px rgba(26,107,58,0.18)",   // --yorix-sh-glow
  },

  transitions: {
    fast:   "150ms cubic-bezier(0.16,1,0.3,1)",
    base:   "220ms cubic-bezier(0.16,1,0.3,1)",
    slow:   "380ms cubic-bezier(0.16,1,0.3,1)",
    spring: "300ms cubic-bezier(0.34,1.56,0.64,1)",
  },

  zIndex: {
    base:    0,
    card:    10,
    sticky:  100,
    drawer:  500,
    modal:   1000,
    toast:   12000,
    onboard: 99999,
  },

  breakpoints: {
    mobile: "500px",
    tablet: "768px",
    laptop: "1024px",
    desktop:"1200px",
  },
};

/** Shorthand helpers */
export const color = tokens.colors;
export const space = tokens.spacing;
export const font  = tokens.typography;
export const radius = tokens.radius;
export const shadow = tokens.shadows;
