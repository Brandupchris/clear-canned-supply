/** Shared Shopify connection settings (from .env / Vercel). */

export const SHOPIFY_API_VERSION = '2025-07';

export const SHOPIFY_STORE_DOMAIN =
  import.meta.env.VITE_SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, '').replace(/\/$/, '') ??
  'store-spark-7absc.myshopify.com';

export const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN ?? '';

export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

/** Public storefront URL (Vercel / custom domain) for Headless channel linking */
export const PUBLIC_STORE_URL =
  import.meta.env.VITE_STORE_URL?.replace(/\/$/, '') ?? 'https://clear-canned-supply.vercel.app';

export const SHOPIFY_ADMIN_URL = `https://${SHOPIFY_STORE_DOMAIN}/admin`;
export const SHOPIFY_ACCOUNT_ORDERS_URL = `https://${SHOPIFY_STORE_DOMAIN}/account/orders`;

export function isShopifyConfigured(): boolean {
  return Boolean(SHOPIFY_STORE_DOMAIN && SHOPIFY_STOREFRONT_TOKEN);
}
