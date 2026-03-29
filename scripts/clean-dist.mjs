import { rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(scriptsDir, "../dist");

rmSync(distDir, { force: true, recursive: true });
