import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

function previewCleanUrls(): Plugin {
  return {
    name: "preview-clean-urls",
    configurePreviewServer(server) {
      return () => {
        server.middlewares.use((req, res) => {
          const outDir = server.config.build.outDir;
          const pathname = decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname);
          const file = pathname.endsWith(".html")
            ? pathname
            : pathname.endsWith("/")
              ? `${pathname}index.html`
              : `${pathname}.html`;
          const page = path.join(outDir, file);
          const found = path.resolve(page).startsWith(path.resolve(outDir)) && fs.existsSync(page);

          res.statusCode = found ? 200 : 404;
          res.setHeader("Content-Type", "text/html");
          res.end(fs.readFileSync(found ? page : path.join(outDir, "404.html")));
        });
      };
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), previewCleanUrls()],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  appType: "mpa",
});