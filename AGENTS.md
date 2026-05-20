# Yorix CM

Cameroonian e-commerce marketplace (React SPA + Supabase BaaS).

## Cursor Cloud specific instructions

### Architecture

- **Frontend**: React 18 + Vite 5 SPA (single monolithic `src/YorixApp.jsx`)
- **Backend**: Supabase Cloud (PostgreSQL, Auth, Realtime, Edge Functions) — no local backend to run
- **Edge Functions**: 9 Deno functions in `supabase/functions/` deployed to Supabase Cloud

### Running the dev environment

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (Vite on port 5173) |
| Lint | `npm run lint` |
| Tests | `npm test` (vitest, 41 tests) |
| Build | `npm run build` |

### Key caveats

- The Supabase project URL and anon key are hardcoded in `src/lib/supabaseDefaults.js`. No `.env.local` is required for basic frontend development.
- Lint produces only warnings (exit code 0) — unused vars in the large `YorixApp.jsx` file are expected.
- There is no local database to run; everything hits Supabase Cloud. Tests that touch Supabase are mocked.
- The `npm run build` step runs `prebuild` (sitemap generation) and `postbuild` (SEO HTML snapshots) automatically.
- No Docker, no Makefile, no devcontainers in this repo.
