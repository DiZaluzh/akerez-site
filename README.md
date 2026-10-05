# AKEREZ

Static site for [akerez.com](https://akerez.com/). No build step, no package manager, no cookies, no analytics.

AKEREZ is the product brand. Own products (Verbs, Invoice Book) are separate from selected client work (BERRY). The App Store addresses stay where they are:

| Purpose | Path |
| --- | --- |
| Home | `/` |
| Products | `/products/` |
| Verbs | `/products/verbs/` |
| Invoice Book | `/products/invoice-book/` |
| Selected work | `/work/` |
| BERRY | `/work/berry/` |
| About | `/about/` |
| Contact | `/contact/` |
| ProVerbs marketing (App Store Connect) | `/proverbs/` |
| ProVerbs support | `/support/` |
| ProVerbs privacy policy | `/privacy/` |

The interface is English, French, and Ukrainian. The name AKEREZ is never translated. Copy lives in `assets/messages.js`. Products and selected work listed on the home page and the index pages come from `assets/catalog.js` — add a record there and a page under `/products/<slug>/` or `/work/<slug>/`.

## Preview locally

From this repository:

```bash
python3 -m http.server 8080
```

Open http://127.0.0.1:8080/

## Deploy

The repository root is the site. GitHub Pages (or any static host) can publish it with an empty build command. `CNAME` contains `akerez.com`. `.nojekyll` stops GitHub from running Jekyll.

## App Store link

In `proverbs/index.html`, the element `id="app-store-link"` is the placeholder. When the public App Store URL exists, set `href`, replace the label, remove `aria-disabled="true"`, and switch `button--muted` to `button--primary`.

## Fonts

Manrope and Cormorant Garamond are subset and self-hosted under `assets/fonts/`. Both are SIL Open Font License 1.1; see `assets/fonts/OFL.txt`. The AKEREZ wordmark is a custom SVG derived from Cormorant Garamond, with a negative-space cutout in the A. The symbol is the existing AKEREZ mark.
