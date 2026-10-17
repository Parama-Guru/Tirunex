// Next 16 static export writes route-segment prefetch files as `__next.<seg>/<file>.txt`,
// but the client requests the flattened `__next.<seg>.<file>.txt`. Copy each file to the
// flat name so prefetch requests don't 404 on static hosts like GitHub Pages.
import fs from "node:fs/promises";
import path from "node:path";

const out = path.resolve("out");
let copied = 0;

async function flatten(dir, prefix, target) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const name = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) await flatten(full, name, target);
    else {
      await fs.copyFile(full, path.join(target, name));
      copied++;
    }
  }
}

async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) await flatten(full, entry.name, dir);
    else await walk(full);
  }
}

await walk(out);
console.log(`fix-export: flattened ${copied} prefetch segment files`);
