import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from 'vite-tsconfig-paths'
import solidSvg from "vite-plugin-solid-svg"

export default defineConfig({
  vite: {
    plugins: [
        tsconfigPaths(),
        tailwindcss(),
        solidSvg()
    ],
  },

  server: {
    preset: "cloudflare_module",
    compatibilityDate: "2025-12-23"
  }
});
