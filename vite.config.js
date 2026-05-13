import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { SUPABASE_PROJECT_URL } from "./src/lib/supabaseDefaults.js";

const HTML_SUPABASE_PLACEHOLDER = "__YORIX_SUPABASE_ORIGIN__";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const supabaseUrl = (env.VITE_SUPABASE_URL || SUPABASE_PROJECT_URL || "").trim();

  return {
    plugins: [
      react(),
      {
        name: "html-env-supabase-preconnect",
        transformIndexHtml(html) {
          if (!supabaseUrl) return html;
          return html.replaceAll(HTML_SUPABASE_PLACEHOLDER, supabaseUrl);
        },
      },
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"],
            supabase: ["@supabase/supabase-js"],
          },
        },
      },
    },
  };
});
