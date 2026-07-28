// Maps each course id to its Stripe Payment Link, read from env vars.
// Payment Links are created for free in the Stripe Dashboard (no backend needed) -
// see .env.example for setup instructions.
const stripeLinks: Record<string, string | undefined> = {
  "color-theory": import.meta.env.VITE_STRIPE_LINK_COLOR_THEORY,
  "shape-light": import.meta.env.VITE_STRIPE_LINK_SHAPE_LIGHT,
  bridal: import.meta.env.VITE_STRIPE_LINK_BRIDAL,
  editorial: import.meta.env.VITE_STRIPE_LINK_EDITORIAL,
  online: import.meta.env.VITE_STRIPE_LINK_ONLINE,
  mentoring: import.meta.env.VITE_STRIPE_LINK_MENTORING,
  "test-course": import.meta.env.VITE_STRIPE_LINK_TEST_COURSE,
  "test-product-palette": import.meta.env.VITE_STRIPE_LINK_PRODUCT_PALETTE,
  "test-product-brushes": import.meta.env.VITE_STRIPE_LINK_PRODUCT_BRUSHES,
  "test-product-workbook": import.meta.env.VITE_STRIPE_LINK_PRODUCT_WORKBOOK,
};

export function getStripeLink(id: string): string | undefined {
  return stripeLinks[id] || undefined;
}

// PayPal's public sandbox client id - lets the buttons render and work in test mode
// with no PayPal account setup at all. Replace via VITE_PAYPAL_CLIENT_ID for real payments.
export const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || "sb";

export const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as
  | string
  | undefined;
