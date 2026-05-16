const defaults = {
  checkout_v2: true,
  payments_cinetpay: true,
  booking_v2: true,
  delivery_engine_v2: true,
};

const envFlags = {
  checkout_v2: import.meta.env.VITE_FLAG_CHECKOUT_V2,
  payments_cinetpay: import.meta.env.VITE_FLAG_PAYMENTS_CINETPAY,
  booking_v2: import.meta.env.VITE_FLAG_BOOKING_V2,
  delivery_engine_v2: import.meta.env.VITE_FLAG_DELIVERY_ENGINE_V2,
};

export function isFeatureEnabled(flag) {
  const raw = envFlags[flag];
  if (raw == null) return Boolean(defaults[flag]);
  return String(raw).toLowerCase() === "true";
}

