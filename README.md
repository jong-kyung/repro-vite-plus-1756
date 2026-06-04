# Vite+ Monorepo Reproduction

This repo follows the Vite+ monorepo shape while preserving the setup for [oxc-project/oxc#22949](https://github.com/oxc-project/oxc/issues/22949):

- root `vite.config.ts` for shared Vite+ tooling (`run`, `lint`),
- root workspaces for `apps/*`, `packages/*`, and `tools/*`,
- a nested TypeScript-based SvelteKit app with its own package-level `vite.config.ts`,
- no `.oxlintrc.json` / `oxlint.config.ts`.

## Shape

```txt
repro-vite-plus-1756/
├── package.json                  # Vite+ workspace scripts and workspaces
├── pnpm-workspace.yaml           # apps/*, packages/*, tools/*
├── vite.config.ts                # root Vite+ config
└── apps/web/
    ├── package.json
    ├── svelte.config.js
    ├── tsconfig.json             # SvelteKit TypeScript config
    ├── vite.config.ts            # SvelteKit runtime config
    └── src/
        ├── app.d.ts              # SvelteKit app types
        ├── app.html
        └── routes/+page.svelte
```

## Install

```bash
vp install
```

## Development

From the repository root:

```bash
vp run dev
```

This runs `web#dev` in `apps/web`.

## Type check

```bash
vp run check
```

This runs SvelteKit sync and `svelte-check` for the TypeScript Svelte app.

## Build

```bash
vp run build
```

This runs `build` recursively across workspace packages.

## Manual OXC issue reproduction

1. Install dependencies with `vp install`.
2. Ensure generated SvelteKit directories are absent:

   ```bash
   vp run clean
   ```

3. Open this repository root in VS Code with the OXC extension installed/enabled.
4. Reload the VS Code window so the extension starts `oxlint --lsp` from the workspace root.
5. If reproduced, `.svelte-kit` appears at the repository root instead of under `apps/web`.

The reported bug path is that Oxlint's Vite+ config loading resolves a nested package Vite config from a root-cwd LSP process. SvelteKit observes `process.cwd()` as the monorepo root and writes `.svelte-kit` there.
