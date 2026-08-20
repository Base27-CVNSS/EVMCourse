import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const source = fs.readFileSync(path.join(root, "assets/course.js"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox);
const course = sandbox.window.COURSE;
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };

assert(course.parts.length === 4, "Khóa học phải có 4 phần.");
assert(course.chapters.length === 15, "Khóa học phải có 15 chương.");
assert(course.chapters.every((chapter, index) => chapter.number === index + 1), "Số chương không liên tục.");

const referenceIds = new Set(course.references.map((reference) => reference.id));
const sectionIds = new Set();
for (const chapter of course.chapters) {
  assert(chapter.outcomes.length >= 3, `Chương ${chapter.number} thiếu chuẩn đầu ra.`);
  assert(chapter.sections.length >= 4, `Chương ${chapter.number} thiếu nội dung chính.`);
  assert(chapter.quiz.length >= 2, `Chương ${chapter.number} thiếu câu hỏi tự kiểm tra.`);
  assert(chapter.refs.every((id) => referenceIds.has(id)), `Chương ${chapter.number} tham chiếu ID không tồn tại.`);
  for (const section of chapter.sections) {
    assert(!sectionIds.has(section.id), `Trùng ID mục: ${section.id}`);
    sectionIds.add(section.id);
  }
  for (const quiz of chapter.quiz) {
    assert(quiz.options.length === 4, `Câu hỏi ở chương ${chapter.number} không có 4 lựa chọn.`);
    assert(Number.isInteger(quiz.answer) && quiz.answer >= 0 && quiz.answer < quiz.options.length, `Đáp án ở chương ${chapter.number} không hợp lệ.`);
  }
}

const required = [
  "index.html", "manifest.webmanifest", "sw.js", "sitemap.xml", "robots.txt",
  "downloads/Giao_trinh_AI_LONG.docx", "downloads/So_tay_giang_vien_AI_LONG.docx",
  "downloads/Giao_trinh_AI_LONG.pdf", "downloads/Giao_trinh_AI_LONG.epub"
];
for (const relative of required) assert(fs.existsSync(path.join(root, relative)), `Thiếu tệp: ${relative}`);

const htmlFiles = [];
const walk = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === "build" || entry.name === ".git") continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(target);
    else if (entry.name.endsWith(".html")) htmlFiles.push(target);
  }
};
walk(root);
const attrPattern = /(?:href|src)=["']([^"']+)["']/g;
for (const file of htmlFiles) {
  const markup = fs.readFileSync(file, "utf8");
  for (const match of markup.matchAll(attrPattern)) {
    const ref = match[1];
    if (/^(?:https?:|mailto:|data:|#)/.test(ref)) continue;
    const cleanRef = ref.split("#")[0].split("?")[0];
    if (!cleanRef) continue;
    let target = path.resolve(path.dirname(file), cleanRef);
    if (cleanRef.endsWith("/")) target = path.join(target, "index.html");
    assert(fs.existsSync(target), `Liên kết hỏng trong ${path.relative(root, file)}: ${ref}`);
  }
}

if (failures.length) {
  console.error(failures.map((message) => `- ${message}`).join("\n"));
  process.exit(1);
}

const sectionCount = course.chapters.reduce((sum, chapter) => sum + chapter.sections.length, 0);
const quizCount = course.chapters.reduce((sum, chapter) => sum + chapter.quiz.length, 0);
console.log(`OK: ${course.chapters.length} chương, ${sectionCount} mục, ${quizCount} câu hỏi, ${htmlFiles.length} trang HTML.`);
