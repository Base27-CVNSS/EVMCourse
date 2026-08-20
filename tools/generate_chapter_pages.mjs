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
  const sectionNav = chapter.sections.map((section) => `<a href="#${section.id}">${escape(section.title)}</a>`).join("");
  const sections = chapter.sections.map((section, index) => `<section class="card lesson" id="${section.id}"><header><span>${index + 1}</span><div><b>Bài giảng ${chapter.number}.${index + 1}</b><small>Khái niệm → mô hình → quyết định</small></div></header><h2>${escape(section.title)}</h2>${section.html}</section>`).join("");
  const readingItems = chapter.readings.map((item) => ({ ...item, reference: course.references.find((ref) => ref.id === item.ref) })).filter((item) => item.reference);
  const readings = readingItems.map((item, index) => `<article class="reading"><span>${index + 1}<small>${item.minutes}′</small></span><div><b>${escape(item.focus)}</b><cite>${escape(item.reference.citation)}</cite><p><strong>Sản phẩm đọc:</strong> ${escape(item.task)}</p><a href="${item.reference.url}" target="_blank" rel="noreferrer">Mở tài liệu gốc ↗</a></div></article>`).join("");
  const quizzes = chapter.quiz.map((item, index) => `<details class="quiz"><summary><b>${index + 1}</b>${escape(item.q)}</summary><ol type="A">${item.options.map((option) => `<li>${escape(option)}</li>`).join("")}</ol><p><strong>Gợi ý học:</strong> Làm bài và xem phản hồi trong phiên bản tương tác.</p></details>`).join("");
  const html = `<!doctype html>
<html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Chương ${chapter.number}: ${escape(chapter.title)} · EVMCourse</title>
<meta name="description" content="${escape(chapter.summary)}"><link rel="canonical" href="${canonical}">
<meta property="og:title" content="Chương ${chapter.number}: ${escape(chapter.title)}"><meta property="og:description" content="${escape(chapter.summary)}"><meta property="og:type" content="article">
<link rel="icon" href="../../assets/favicon.svg" type="image/svg+xml">
<style>:root{--brand:#0a66c2;--ink:#191919;--muted:#666;--line:#d9d9d9;--paper:#f4f2ee;--surface:#fff}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--paper);color:var(--ink);font:14px/1.65 -apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif}a{color:var(--brand)}.top{position:sticky;top:0;z-index:5;background:#fff;border-bottom:1px solid var(--line)}.top>div{max-width:1120px;height:54px;margin:auto;display:flex;align-items:center;gap:10px;padding:0 18px}.logo{display:grid;place-items:center;width:34px;height:34px;color:#fff;background:var(--brand);border-radius:4px;font-weight:800;text-decoration:none}.top strong{font-size:13px}.top .button{margin-left:auto}.layout{max-width:1120px;margin:22px auto;display:grid;grid-template-columns:minmax(0,720px) 270px;gap:22px;padding:0 18px}.feed{display:grid;gap:12px}.card{padding:20px;background:var(--surface);border:1px solid var(--line);border-radius:9px}.profile{padding:0;overflow:hidden}.cover{height:94px;display:flex;align-items:end;padding:16px 22px;color:#d8ebff;background:linear-gradient(120deg,#003b74,#0a66c2 58%,#5cb0fa);font-size:10px;font-weight:700;text-transform:uppercase}.profile-body{position:relative;padding:48px 22px 22px}.avatar{position:absolute;top:-41px;display:grid;place-items:center;width:80px;height:80px;color:#fff;background:var(--brand);border:3px solid #fff;border-radius:50%;font-size:23px;font-weight:800}.eyebrow{margin:0 0 7px;color:var(--brand);font-size:9px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}h1{font-size:clamp(28px,5vw,42px);line-height:1.13;letter-spacing:-.025em;margin:0 0 14px}h2{font-size:21px;line-height:1.25;margin:8px 0 14px}h3{font-size:14px}p,li{color:var(--muted)}.meta{display:flex;flex-wrap:wrap;gap:8px 14px;color:var(--muted);font-size:10px}.outcomes{margin-top:18px;padding:14px;background:#f3f6f8;border-radius:7px}.outcomes ol{margin-bottom:0}.memory h2{color:#004182;font-size:15px}.memory ol{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;padding:0;list-style:none}.memory li{display:flex;gap:8px;padding:9px;background:#f3f6f8;border-radius:6px}.memory li b{display:grid;place-items:center;flex:0 0 22px;height:22px;color:var(--brand);background:#e8f3ff;border-radius:50%}.lesson{scroll-margin-top:70px}.lesson header{display:flex;gap:9px;align-items:center;margin-bottom:14px}.lesson header>span{display:grid;place-items:center;width:36px;height:36px;color:#fff;background:var(--brand);border-radius:50%;font-weight:800}.lesson header b,.lesson header small{display:block}.lesson header small{color:var(--muted);font-size:8px}.formula{overflow:auto;padding:14px;background:#f3f6f8;border-radius:7px;text-align:center}.data-table-wrap{overflow:auto}.data-table{width:100%;border-collapse:collapse;font-size:11px}.data-table th,.data-table td{padding:9px;border:1px solid var(--line);text-align:left}.process-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}.process-step{padding:9px;background:#f3f6f8;border-radius:5px;font-size:10px}.callout{padding:14px;border-left:3px solid var(--brand);background:#e8f3ff}.reading{display:grid;grid-template-columns:44px 1fr;gap:11px;padding:14px;background:#f3f6f8;border-radius:7px;margin-top:9px}.reading>span{display:grid;place-items:center;width:36px;height:36px;color:#fff;background:var(--brand);border-radius:50%;font-weight:800}.reading>span small{display:block;color:#fff;font-size:8px}.reading cite{display:block;color:var(--muted);font-size:10px}.reading p,.reading a{font-size:10px}.quiz{margin-top:8px;border:1px solid var(--line);border-radius:7px}.quiz summary{display:grid;grid-template-columns:24px 1fr;gap:8px;padding:12px;cursor:pointer}.quiz summary b{display:grid;place-items:center;width:22px;height:22px;color:var(--brand);background:#e8f3ff;border-radius:50%}.quiz ol,.quiz p{font-size:11px}.button{display:inline-block;padding:8px 15px;color:#fff;background:var(--brand);border-radius:18px;text-decoration:none;font-size:11px;font-weight:700}.side{position:sticky;top:76px;display:grid;gap:12px;align-self:start}.side nav a{display:block;padding:6px 8px;color:var(--muted);border-radius:4px;text-decoration:none;font-size:10px}.side nav a:hover{color:var(--brand);background:#f3f6f8}.side small{color:var(--brand);font-weight:700}.case{border-left:4px solid #7a3e9d}@media(max-width:800px){.layout{grid-template-columns:1fr}.side{display:none}.memory ol,.process-strip{grid-template-columns:1fr}.profile-body{padding-left:17px;padding-right:17px}}</style>
</head><body id="top"><header class="top"><div><a class="logo" href="../../#/home">EL</a><strong>EnviroLONG · Learning Network</strong><a class="button" href="../../#/chapter/${chapter.id}">Bản tương tác</a></div></header><div class="layout"><main class="feed"><article class="card profile"><div class="cover">Phần ${chapter.part} · Chương ${chapter.number}</div><div class="profile-body"><div class="avatar">${String(chapter.number).padStart(2, "0")}</div><p class="eyebrow">Bài giảng chuyên đề · 5 câu tự kiểm tra</p><h1>${escape(chapter.title)}</h1><p>${escape(chapter.summary)}</p><div class="meta"><span>${escape(chapter.duration)}</span><span>${escape(chapter.level)}</span><span>${readingItems.length} tài liệu đọc</span></div><div class="outcomes"><strong>Sau chương này, bạn có thể</strong><ol>${outcomes}</ol></div></div></article>
<section class="card memory"><p class="eyebrow">Móc ghi nhớ</p><h2>${escape(chapter.memory.hook)}</h2><ol>${chapter.memory.points.map((point, index) => `<li><b>${index + 1}</b><span>${escape(point)}</span></li>`).join("")}</ol></section>
${sections}
<section class="card case" id="case-study"><p class="eyebrow">Nghiên cứu tình huống</p><h2>${escape(chapter.caseStudy.title)}</h2><p>${escape(chapter.caseStudy.body)}</p></section>
<section class="card" id="doc-sau"><p class="eyebrow">Đọc sâu có định hướng</p><h2>Học qua tài liệu khoa học</h2>${readings}</section>
<section class="card" id="quiz"><p class="eyebrow">Tự kiểm tra</p><h2>5 câu củng cố kiến thức</h2>${quizzes}<a class="button" href="../../#/chapter/${chapter.id}">Làm bài và nhận phản hồi</a></section></main>
<aside class="side"><nav class="card"><small>TRONG CHƯƠNG</small><a href="#top">Tổng quan</a>${sectionNav}<a href="#case-study">Ca nghiên cứu</a><a href="#doc-sau">Đọc sâu</a><a href="#quiz">5 câu quiz</a></nav><section class="card"><small>MÓC NHỚ</small><p>${escape(chapter.memory.hook)}</p></section></aside></div></body></html>`;
  fs.writeFileSync(path.join(destination, "index.html"), html);
}

const urls = [
  "https://base27-cvnss.github.io/EVMCourse/",
  ...course.chapters.map((chapter) => `https://base27-cvnss.github.io/EVMCourse/chapters/${String(chapter.number).padStart(2, "0")}-${slugify(chapter.shortTitle)}/`)
];
fs.writeFileSync(path.join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`);
fs.writeFileSync(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://base27-cvnss.github.io/EVMCourse/sitemap.xml\n");

console.log(`Generated ${course.chapters.length} chapter landing pages.`);
