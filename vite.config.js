import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
import vueI18n from "@intlify/vite-plugin-vue-i18n";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      /* options */
      // locale messages resourece pre-compile option
      include: resolve(
        dirname(fileURLToPath(import.meta.url)),
        "./path/to/src/locales/**"
      ),
    }),
  ],
  test: {
    globals: true,
    environment: "happy-dom",
    coverage: {
      provider: "istanbul",
    },
  },
});
