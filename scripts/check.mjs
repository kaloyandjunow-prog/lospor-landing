import { access, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const requiredFiles = [
  "index.html",
  "styles.css",
  "logo.png",
  "hero-operating-room.jpg",
  "_headers",
  "robots.txt",
];

await Promise.all(requiredFiles.map((file) => access(join(root, file))));

const html = await readFile(join(root, "index.html"), "utf8");
const css = await readFile(join(root, "styles.css"), "utf8");
const source = html + "\n" + css;
const requiredDestinations = [
  "https://app.lospor.org",
  "https://database.lospor.org",
  "https://docs.lospor.org",
  "https://api.lospor.org/openapi.json",
  "https://pwa.lospor.org",
  "https://github.com/kaloyandjunow-prog",
];

const mojibakeMarkers = [
  "\u00c2",
  "\u00c3",
  "\u00e2\u0080",
  "\u00d0\u00b2\u00d0\u0402",
  "\ufffd",
];

for (const marker of mojibakeMarkers) {
  if (source.includes(marker)) {
    throw new Error("Possible mojibake detected: " + JSON.stringify(marker));
  }
}

if (source.includes("http://")) {
  throw new Error("Insecure HTTP URL found in public source.");
}

for (const destination of requiredDestinations) {
  if (!html.includes(destination)) {
    throw new Error("Required destination is missing: " + destination);
  }
}

console.log("Landing source checks passed.");
