const defaults = {
  checkout_v2: true,
  payments_cinetpay: true,
  booking_v2: true,
  delivery_engine_v2: true,
};

export function isFeatureEnabled(flag) {
  const raw = import.meta.env[`VITE_FLAG_${flag.toUpperCase()}`];
  if (raw == null) return Boolean(defaults[flag]);
  return String(raw).toLowerCase() === "true";
}

