# CodeCraft migration and deployment

CodeCraft preserves both the localhost Node engine and browser-native public GitHub analysis. The canonical repository is https://github.com/sultanshahdev/codecraft. The CLI and npm package are `codecraft`; the frontend package is `codecraft-web`. Legacy CLI aliases were removed. Reinstall or relink the package to install the new executable.

## Runtime contract

`GET /api/health` returns JSON with `ok: true`, `service: "codecraft"`, and the package version. The frontend validates JSON content type and the service identifier; HTML SPA fallbacks select browser mode. Deploy frontend and backend together. API routes and resource budgets are unchanged.

## Deliberate compatibility and historical references

`CODECRAFT_EMBEDDING_CACHE_DIR` and `CODECRAFT_DISABLE_PERSISTENT_CACHE` take precedence over the legacy `LOCALCODE_EMBEDDING_CACHE_DIR` and `LOCALCODE_DISABLE_PERSISTENT_CACHE` settings. Existing `localcode-intelligence/embeddings` cache directories are reused when present; fresh installations use `codecraft/embeddings`. Cached vectors retain their model and format validation. No source data is moved or deleted.

The pinned benchmark dataset retains its historical `localcode` key, checkout directory, and revision so old measurements remain reproducible. These are evaluation fixtures, not product identity. Benchmark configuration variables now use `CODECRAFT_BENCHMARK_`; optional model integration uses `CODECRAFT_RUN_MODEL_TEST=1`.

## Cloudflare Pages verification

Keep the existing project online. In Cloudflare Dashboard → Workers & Pages → existing project → Settings → Builds, verify the GitHub connection points to `sultanshahdev/codecraft`, production branch `main`, root `web`, build command `npm run build`, and output `dist`. Reauthorize the GitHub integration if required.

Check Deployments for the merged main commit and successful production build. Open the existing production domain and `/app` directly, refresh, prepare a public GitHub repository, run Exact text search, and inspect source and explorer. Check the document title and loaded assets for CodeCraft. Update the GitHub homepage only to that verified production URL. A GitHub rename does not rename a Pages hostname. Do not delete the Pages project to change its hostname.

## Verified release — 2026-10-24

The product rebrand merged in [PR #35](https://github.com/sultanshahdev/codecraft/pull/35), merge commit `189592c17e4341178f7eb956e173b3dc1a55c78a`. The existing GitHub repository was renamed in place to `sultanshahdev/codecraft`; local origin now uses its canonical HTTPS URL. GitHub Actions and the Cloudflare Pages integration passed for the rebrand.

The verified production site is https://code-buster-f5d.pages.dev. This retained hostname and the Cloudflare project identifier are external legacy deployment identifiers, not current product branding. The existing Pages project was preserved. Production checks passed for CodeCraft title, description, wordmark, direct `/app` refresh, live preparation of the renamed GitHub repository, exact search, source navigation, Explorer, Map, and loaded frontend asset branding.

Local validation passed clean installs, backend/frontend build, both deterministic browser smoke scripts, real CLI check/status/semantic search, and 106 tests with real MiniLM inference enabled; one existing deferred acceptance test remains skipped. Browser-native live semantic search timed out in this environment, including a retry with verified cached model files; browser inference is not claimed as verified. No model or inference behavior was changed.
