/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRIPE_PUBLISHABLE_KEY?: string;
  readonly VITE_STRIPE_LINK_TEST_COURSE?: string;
  readonly VITE_STRIPE_LINK_COLOR_THEORY?: string;
  readonly VITE_STRIPE_LINK_SHAPE_LIGHT?: string;
  readonly VITE_STRIPE_LINK_BRIDAL?: string;
  readonly VITE_STRIPE_LINK_EDITORIAL?: string;
  readonly VITE_STRIPE_LINK_ONLINE?: string;
  readonly VITE_STRIPE_LINK_MENTORING?: string;
  readonly VITE_STRIPE_LINK_PRODUCT_PALETTE?: string;
  readonly VITE_STRIPE_LINK_PRODUCT_BRUSHES?: string;
  readonly VITE_STRIPE_LINK_PRODUCT_WORKBOOK?: string;
  readonly VITE_PAYPAL_CLIENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
