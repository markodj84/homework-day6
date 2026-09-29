import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reportDir = path.join(__dirname, "playwright-report");
const inputFile = path.join(reportDir, "index.html");
const outputFile = path.join(__dirname, "report.html");

let html = fs.readFileSync(inputFile, "utf8");

// Inline CSS
html = html.replace(
  /<link[^>]+href=["']([^"']+\.css)["'][^>]*>/gi,
  (match, href) => {
    const cssPath = path.join(reportDir, href);

    if (!fs.existsSync(cssPath)) {
      return match;
    }

    const css = fs.readFileSync(cssPath, "utf8");

    return `<style>\n${css}\n</style>`;
  }
);

// Inline JavaScript
html = html.replace(
  /<script[^>]+src=["']([^"']+\.js)["'][^>]*><\/script>/gi,
  (match, src) => {
    const jsPath = path.join(reportDir, src);

    if (!fs.existsSync(jsPath)) {
      return match;
    }

    const js = fs.readFileSync(jsPath, "utf8");

    return `<script>\n${js}\n</script>`;
  }
);

fs.writeFileSync(outputFile, html, "utf8");

console.log(`Created: ${outputFile}`);