/**
 * YORIX CM — Design System Tokens v2
 * Source of truth for colors, spacing, typography, radius and shadows.
 *
 * Usage:
 *   import { tokens } from "../utils/designTokens";
 *   style={{ color: tokens.colors.primary }}
 */

export const tokens = {
  colors: {
    primary:        "#1a6b3a",
    primaryMid:     "#27a85a",
    primaryLight:   "#4fd17d",
    primaryPale:    "#c8f5d9",
    primaryDark:    "#0f4a28",

    yellow:         "#fcd116",
    gold:           "#c9a84c",
    goldLight:      "#f5e6b8",
    red:            "#ce1126",

    success:        "#1a6b3a",
    error:          "#dc2626",
    warning:        "#d97706",
    info:           "#2563eb",

    whatsapp:       "#25D366",

    textPrimary:    "#0d1f14",
    textSecondary:  "#5c6b63",
    textMuted:      "#6b7a72",
    background:     "#f5f2ed",
    surface:        "#ffffff",
    surface2:       "#f0ece6",
    border:         "#e2ddd6",
    shadow:         "rgba(0,0,0,0.08)",
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
    fontFamily:        "'Inter', system-ui, sans-serif",
    fontFamilyDisplay: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
    scale: {
      display: "clamp(2.5rem, 5vw, 4rem)",
      h1:      "clamp(2rem, 4vw, 3rem)",
      h2:      "clamp(1.75rem, 3.2vw, 2.5rem)",
      h3:      "clamp(1.5rem, 2.6vw, 2rem)",
      h4:      "clamp(1.25rem, 2vw, 1.625rem)",
      h5:      "clamp(1.125rem, 1.6vw, 1.375rem)",
      body:    "1rem",
      small:   "0.875rem",
      caption: "0.8125rem",
    },
    weights: {
      regular:  400,
      medium:   500,
      semibold: 600,
      bold:     700,
      black:    800,
    },
    lineHeight: {
      tight:   1.15,
      snug:    1.35,
      normal:  1.55,
      relaxed: 1.7,
    },
    letterSpacing: {
      tight:  "-0.025em",
      normal: "0",
      wide:   "0.04em",
    },
  },

  radius: {
    xs:   "4px",
    sm:   "8px",
    md:   "10px",
    lg:   "14px",
    xl:   "18px",
    xxl:  "22px",
    btn:  "12px",
    card: "16px",
    input:"12px",
    full: "9999px",
  },

  shadows: {
    sm:    "0 4px 20px rgba(13,31,20,0.06)",
    md:    "0 12px 40px rgba(13,31,20,0.09)",
    lg:    "0 24px 64px rgba(13,31,20,0.13)",
    card:  "0 2px 8px rgba(0,0,0,0.08)",
    modal: "0 28px 70px rgba(0,0,0,0.45)",
    glow:  "0 0 0 3px rgba(26,107,58,0.28)",
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
    mobile:  "500px",
    tablet:  "768px",
    laptop:  "1024px",
    desktop: "1200px",
  },

  dark: {
    ink:       "#e8f0eb",
    bg:        "#0d1a12",
    surface:   "#152118",
    surface2:  "#1c2e22",
    border:    "#2a4030",
    gray:      "#7a9a82",
    textMuted: "#9ab0a2",
  },
};

export const color = tokens.colors;
export const space = tokens.spacing;
export const font = tokens.typography;
export const radius = tokens.radius;
export const shadow = tokens.shadows;
