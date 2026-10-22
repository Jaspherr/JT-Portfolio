import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const DIST = "dist";
const SSR_ENTRY = path.resolve("dist-ssr", "entry-server.js");

const { render, routes, robotsTxt, sitemapXml } = await import(
  pathToFileURL(SSR_ENTRY).href
);

const template = fs.readFileSync(path.join(DIST, "index.html"), "utf8");

function writePage(url, file) {
  const { html, head } = render(url);
  const page = template
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", html);
  const output = path.join(DIST, file);

  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, page);
  console.log(`prerendered ${url} -> ${file}`);
}

for (const url of routes) {
  writePage(url, url === "/" ? "index.html" : `${url.slice(1)}.html`);
}

writePage("/404", "404.html");

fs.writeFileSync(path.join(DIST, "robots.txt"), robotsTxt());
fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemapXml());
fs.rmSync("dist-ssr", { recursive: true, force: true });