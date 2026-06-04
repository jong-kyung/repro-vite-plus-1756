import { defineConfig } from "vite-plus";

// Root Vite+ config for shared monorepo tooling. Package-level Vite configs
// still own framework/runtime behavior such as SvelteKit plugins.
export default defineConfig({
  run: {
    cache: true,
  },
  lint: {},
});
