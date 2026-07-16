# Kiah Aviyu — Living Library

Production author site for **Kiah Aviyu — קיה אביעו**, built with Next.js App Router, TypeScript, and vinext for Sites-compatible Cloudflare Worker output.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
```

Content maintenance is documented in [CONTENT_GUIDE.md](CONTENT_GUIDE.md). Brand and implementation constraints are in [AGENTS.md](AGENTS.md).

## Forms

The site validates form fields in the browser but intentionally disables delivery until an owner-selected provider is configured. It does not report false success or expose a recipient address. Connect a privacy-appropriate form/newsletter provider, add its secret values through the hosting environment, then enable the shared form component. Update the privacy page at the same time.

## Future private publisher portal

Do not create custom password storage. A future portal should use a mature identity provider or Sites access controls, server-side authorization, expiring asset links, audit logging, rate limiting, and a private storage bucket. Unpublished manuscripts must never be committed to this public repository or shipped in the public web bundle.

## Deployment

`.openai/hosting.json` binds this repository to the existing Sites project. Production metadata and canonical URLs use `https://kiahaviyu.com`. Optional integration values belong in the hosting environment; `.env.example` contains no secrets.

### Netlify

`netlify.toml` overrides dashboard build settings so the repository root is never used as the publish directory. Netlify publishes the static client bundle from `dist/client` and packages `netlify/functions/site.mjs` as the SSR entry point. The automatic Netlify Next.js runtime is skipped because this project uses vinext’s Worker output rather than a `.next` bundle.

If the Next.js runtime was manually added in the Netlify dashboard, remove or disable it under **Project configuration → Build & deploy → Runtime**. Repository configuration supplies `NETLIFY_NEXT_PLUGIN_SKIP=true`, but removing the unused UI plugin keeps the project settings unambiguous.
