import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const source = fs.readFileSync(path.join(root, "assets/course.js"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox);
const course = sandbox.window.COURSE;

const slugify = (value) => value
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .replace(/đ/g, "d").replace(/Đ/g, "D")
  .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
}[char]));

const chaptersDir = path.join(root, "chapters");
fs.mkdirSync(chaptersDir, { recursive: true });

for (const chapter of course.chapters) {
  const slug = `${String(chapter.number).padStart(2, "0")}-${slugify(chapter.shortTitle)}`;
  const destination = path.join(chaptersDir, slug);
  fs.mkdirSync(destination, { recursive: true });
  const canonical = `https://base27-cvnss.github.io/EVMCourse/chapters/${slug}/`;
  const outcomes = chapter.outcomes.map((item) => `<li>${escape(item)}</li>`).join("");
  const sections = chapter.sections.map((section) => `<li>${escape(section.title)}</li>`).join("");
  const html = `<!doctype html>
<html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Chương ${chapter.number}: ${escape(chapter.title)} · EVMCourse</title>
<meta name="description" content="${escape(chapter.summary)}"><link rel="canonical" href="${canonical}">
<meta property="og:title" content="Chương ${chapter.number}: ${escape(chapter.title)}"><meta property="og:description" content="${escape(chapter.summary)}"><meta property="og:type" content="article">
<link rel="icon" href="../../assets/favicon.svg" type="image/svg+xml">
<style>body{margin:0;background:#f6f8f5;color:#14251f;font:15px/1.7 Inter,Segoe UI,Arial,sans-serif}main{max-width:850px;margin:0 auto;padding:64px 24px}small{color:#0b5d4b;font-weight:700;letter-spacing:.08em;text-transform:uppercase}h1{font:700 clamp(32px,6vw,58px)/1.1 Georgia,serif;margin:14px 0 22px}p{color:#5f7069}.card{margin:28px 0;padding:24px;background:white;border:1px solid #dce5df;border-radius:16px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}a.button{display:inline-block;margin-top:18px;padding:11px 17px;color:white;background:#0b5d4b;border-radius:11px;text-decoration:none;font-weight:700}@media(max-width:680px){.grid{grid-template-columns:1fr}}</style>
</head><body><main><small>Phần ${chapter.part} · Chương ${chapter.number}</small><h1>${escape(chapter.title)}</h1><p>${escape(chapter.summary)}</p>
<div class="grid"><section class="card"><h2>Chuẩn đầu ra</h2><ol>${outcomes}</ol></section><section class="card"><h2>Nội dung chương</h2><ol>${sections}</ol></section></div>
<a class="button" href="../../#/chapter/${chapter.id}">Mở bài giảng tương tác →</a></main></body></html>`;
  fs.writeFileSync(path.join(destination, "index.html"), html);
}

const urls = [
  "https://base27-cvnss.github.io/EVMCourse/",
  ...course.chapters.map((chapter) => `https://base27-cvnss.github.io/EVMCourse/chapters/${String(chapter.number).padStart(2, "0")}-${slugify(chapter.shortTitle)}/`)
];
fs.writeFileSync(path.join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`);
fs.writeFileSync(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://base27-cvnss.github.io/EVMCourse/sitemap.xml\n");

console.log(`Generated ${course.chapters.length} chapter landing pages.`);
