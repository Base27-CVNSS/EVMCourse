import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "assets/course.js"), "utf8"), sandbox);
fs.mkdirSync(path.join(root, "build"), { recursive: true });
fs.writeFileSync(path.join(root, "build/course.json"), JSON.stringify(sandbox.window.COURSE, null, 2));
console.log(`Exported ${sandbox.window.COURSE.chapters.length} chapters.`);
