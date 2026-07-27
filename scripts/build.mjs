import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import "./check.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const output = join(root, "dist");
const publicFiles = [
  "index.html",
  "styles.css",
  "logo.png",
  "hero-operating-room.jpg",
  "_headers",
  "robots.txt",
];

await rm(output, { force: true, recursive: true });
await mkdir(output, { recursive: true });

for (const file of publicFiles) {
  await cp(join(root, file), join(output, file));
}

console.log("Built " + publicFiles.length + " files in dist/");
