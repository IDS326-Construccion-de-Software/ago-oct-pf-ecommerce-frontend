export function buildStripePaymentLinkUrl({ baseUrl, email }) {
  if (!baseUrl) return null;
  try {
    const url = new URL(baseUrl);
    if (email) url.searchParams.set("prefilled_email", email);
    return url.toString();
  } catch {
    return baseUrl; // por si es relativo o sin esquema
  }
}

export function redirectToStripePaymentLink({ email } = {}) {
  const baseUrl = import.meta.env.VITE_STRIPE_PAYMENT_LINK_URL || "";
  const url = buildStripePaymentLinkUrl({ baseUrl, email });
  if (!url) return false;
  window.location.href = url;
  return true;
}
