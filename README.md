# Akerez Software website

Static public site for App Store Connect URLs:

| Purpose | Path | Final URL |
| --- | --- | --- |
| Marketing | `/proverbs/` | `https://akerez.com/proverbs` |
| Support | `/support/` | `https://akerez.com/support` |
| Privacy Policy | `/privacy/` | `https://akerez.com/privacy` |

No build step, no package manager, no cookies, no analytics, no tracking scripts.

## Preview locally

From the repository root:

```bash
cd website
python3 -m http.server 8080
```

Open:

- http://127.0.0.1:8080/
- http://127.0.0.1:8080/proverbs/
- http://127.0.0.1:8080/support/
- http://127.0.0.1:8080/privacy/

Trailing slashes matter for nested folders on most static servers.

## Deploy to a static host

Upload the contents of `website/` (not the parent `ProVerbs/` iOS project) as the site root.

Compatible hosts include:

- Cloudflare Pages
- GitHub Pages
- Netlify
- Any Namecheap shared hosting that serves static files over HTTPS

### Cloudflare Pages (recommended)

1. Create a Pages project connected to this repository, **or** upload the `website/` folder.
2. Set the publish directory to `website` (repo root) or `/` if you upload only that folder.
3. Leave build command empty.
4. Attach the custom domain `akerez.com` and `www.akerez.com` if desired.
5. Enable HTTPS (Cloudflare provides certificates automatically).

### GitHub Pages

1. Publish the `website/` folder as the Pages source (or deploy that folder to the `gh-pages` branch root).
2. Add a `CNAME` file containing `akerez.com` if using a custom domain.
3. `.nojekyll` is included so GitHub does not process the site with Jekyll.

## Connect the Namecheap domain `akerez.com`

Domain registration at Namecheap does **not** automatically include website hosting. After you choose a host:

1. In the host dashboard, add `akerez.com` as a custom domain and note the DNS targets they provide.
2. In Namecheap → Domain List → Manage → Advanced DNS, replace parking records with the host’s records.
3. Typical patterns (exact values come from your host):

| Type | Host | Value | Notes |
| --- | --- | --- | --- |
| CNAME | `www` | `<host-target>` | Common for Pages / Netlify |
| A / ALIAS / ANAME | `@` | host IP or ALIAS target | Apex domain |
| CAA (optional) | `@` | as required by host | Certificate authority |

4. Wait for DNS propagation, then confirm HTTPS is active.
5. Prefer redirecting `www` → apex or apex → `www` consistently.

Do not change Namecheap DNS until you are ready to publish and have host targets in hand.

## Enable HTTPS

Use the certificate provided by Cloudflare Pages, GitHub Pages, Netlify, or your host’s Let’s Encrypt option. Do not serve the App Store URLs over plain HTTP.

## Verify the three App Store Connect URLs

After DNS and HTTPS are live, open each URL in a private browser window:

1. `https://akerez.com/proverbs`
2. `https://akerez.com/support`
3. `https://akerez.com/privacy`

Confirm:

- pages load without certificate warnings
- navigation and footer links work
- `support@akerez.com` mailto link opens
- Privacy Policy effective date and content are current

Then paste those URLs into App Store Connect → App Information.

## Replace the future App Store link

In `proverbs/index.html`, find the element with `id="app-store-link"`.

When the public App Store URL exists:

1. Set `href` to the real `https://apps.apple.com/...` link.
2. Change the visible label from “Coming to the App Store” to “Download on the App Store” (or similar).
3. Remove `aria-disabled="true"` and switch CSS classes from `button--muted` to `button--primary`.
4. Add `rel="noopener noreferrer"` on the external link.

## Assets

- `assets/app-icon.png` and favicons are derived from the Xcode `AppIcon-1024.png` catalogue asset.
- The Xcode original is not modified.
- No promotional App Store screenshots were present in the repository, so the marketing page uses feature cards instead of fabricated device mockups.

## Privacy notes for maintainers

The Privacy Policy matches the audited Release configuration:

- local SwiftData / UserDefaults storage
- no linked Google Mobile Ads package
- monetisation / ads gated off in Release
- StoreKit present for a future optional subscription
- no analytics / crash SDKs
- no CloudKit
- no remote learning-pack base URL configured

Update `/privacy/` before enabling ads, remote pack hosting, analytics or accounts.
