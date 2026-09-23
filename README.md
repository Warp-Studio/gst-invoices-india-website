# gstinvoicesindia.com

Marketing site for [GST Invoices India](https://apps.shopify.com/gst-invoice-india-1), the Shopify app by Warp Studio.

Built with [Astro](https://astro.build) as a fully static site: plain HTML and CSS, with a little JavaScript only for the pricing toggle, mobile menu and the two free tools.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Landing page: hero, features, how it works, pricing, reviews, FAQ |
| `/gst-calculator/` | Free GST calculator (add/remove GST, CGST/SGST/IGST split) |
| `/gstin-checker/` | Free GSTIN validator (format, check digit, state, PAN) |
| `/privacy/` | Privacy policy |

## Develop

Requires Node 22.12 or newer (see `.nvmrc`).

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview   # serve the built site
```

## Editing content

Most facts live in one file, [`src/data/site.ts`](src/data/site.ts):

- `site`: email, App Store URL, rating and review count, optional WhatsApp number and booking link (the WhatsApp footer link only appears once `whatsapp` is set)
- `plans`: pricing, which must match the Shopify listing (billing is in USD)
- `reviews`: quotes shown on the home page, taken from the App Store

Feature copy, FAQ and "how it works" steps are at the top of [`src/pages/index.astro`](src/pages/index.astro). Feature screenshots are in `src/assets/features/` (cropped from the App Store listing images).

Every "Install" button links to the App Store with `utm_source=gstinvoicesindia.com` and a `utm_content` naming the button, so installs from this site show up in the Shopify Partner Dashboard traffic reports.

## Deploy on Vercel

1. Import this repo in Vercel. It detects Astro automatically; no settings needed.
2. In the project, go to **Settings → Domains** and add `gstinvoicesindia.com` and `www.gstinvoicesindia.com` (redirect `www` to the apex, or the other way round).
3. The domain's DNS is on Cloudflare. Add the records Vercel shows you, and set each one to **DNS only** (grey cloud). If you leave them proxied (orange cloud), you'll get an endless redirect loop, which is what's currently happening on `warpstudio.io`.
