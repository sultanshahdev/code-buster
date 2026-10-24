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
