# Shopify integration setup

Your app connects to Shopify via the **Storefront API** (products, cart, checkout, customer accounts).

## Current connection

| Setting | Value |
|---------|--------|
| Store | Clear Canned Supply |
| Domain | `store-spark-7absc.myshopify.com` |
| Live site | https://clear-canned-supply.vercel.app |
| API status | Connected (products + cart verified) |

## 1. Shopify Admin — Headless channel

1. Open [Shopify Admin](https://store-spark-7absc.myshopify.com/admin)
2. Go to **Sales channels** → **Headless** (pin it if needed)
3. Open your storefront (or **Add storefront** if none exists)
4. Under **Storefront API permissions**, click **Edit** and enable:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_write_checkouts` / cart
   - `unauthenticated_read_customers` + `unauthenticated_write_customers` (for Account page)
5. Copy the **Storefront API access token** into `VITE_SHOPIFY_STOREFRONT_TOKEN`

## 2. Environment variables

Set these in **local `.env`**, **Vercel**, and **Lovable** (Project → Settings → Environment):

```
VITE_SHOPIFY_STORE_DOMAIN=store-spark-7absc.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=<your-storefront-token>
VITE_STORE_URL=https://clear-canned-supply.vercel.app
```

Redeploy Vercel after changing env vars.

## 3. Lovable

In your Lovable project:

1. **Settings** → **Integrations** → **Shopify**
2. Connect store `store-spark-7absc` (or your production store)
3. Lovable will sync the same Storefront token — keep Vercel env vars in sync

## 4. What works in this app

- **Shop** — product catalog from Shopify
- **Cart** — Shopify cart + checkout URL
- **Account** — customer login, signup, order history (Storefront API)
- **Track order** — redirects to Shopify account orders

## 5. Troubleshooting

| Issue | Fix |
|-------|-----|
| No products on site | Check Headless permissions; confirm token in Vercel |
| Checkout fails | Store must be on a paid Shopify plan |
| Account login fails | Enable customer scopes on Headless storefront |
| Works locally, not on Vercel | Run `vercel env ls` and redeploy |
