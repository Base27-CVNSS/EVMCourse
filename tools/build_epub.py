#!/usr/bin/env python3
"""Build the EPUB 3 edition from the canonical course JSON."""
from __future__ import annotations

import html
import json
import re
import uuid
import zipfile
from datetime import datetime, timezone
from pathlib import Path

from lxml import etree, html as lxml_html

ROOT = Path(__file__).resolve().parents[1]
COURSE = json.loads((ROOT / "build/course.json").read_text(encoding="utf-8"))
OUT = ROOT / "downloads/Giao_trinh_AI_LONG.epub"
BOOK_ID = f"urn:uuid:{uuid.uuid5(uuid.NAMESPACE_URL, 'https://base27-cvnss.github.io/EVMCourse/')}"


def esc(value) -> str:
    return html.escape(str(value), quote=True)


def slug(value: str) -> str:
    value = re.sub(r"[^a-zA-Z0-9]+", "-", value).strip("-")
    return value.lower()


def xhtml_fragment(fragment: str) -> str:
    wrapper = lxml_html.fragment_fromstring(fragment, create_parent="div")
    return "".join(etree.tostring(child, encoding="unicode", method="xml") for child in wrapper)


def page(title: str, body: str, *, body_class: str = "") -> str:
    return f'''<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="vi" xml:lang="vi">
<head><meta charset="utf-8"/><title>{esc(title)}</title><link rel="stylesheet" type="text/css" href="styles/book.css"/></head>
<body class="{esc(body_class)}">{body}</body></html>'''


def chapter_page(chapter) -> str:
    outcomes = "".join(f"<li>{esc(x)}</li>" for x in chapter["outcomes"])
    memory = "".join(f"<li>{esc(x)}</li>" for x in chapter["memory"]["points"])
    sections = []
    if chapter["number"] == 1:
        sections.append('<figure><img src="images/ipof_loop.png" alt="Vòng Đầu vào, Tiến trình, Đầu ra và Phản hồi"/><figcaption>Hình 1.1. Vòng IPOF của hệ thống môi trường.</figcaption></figure>')
    if chapter["number"] == 14:
        sections.append('<figure><img src="images/digital_twin_architecture.png" alt="Kiến trúc Digital Twin lưu vực bốn lớp"/><figcaption>Hình 14.1. Kiến trúc tham chiếu Digital Twin lưu vực.</figcaption></figure>')
    for section in chapter["sections"]:
        sections.append(f'<section id="{esc(section["id"])}"><h2>{esc(section["title"])}</h2>{xhtml_fragment(section["html"])}</section>')
    lab = "".join(f"<li>{esc(x)}</li>" for x in chapter["lab"]["tasks"])
    exercises = "".join(f"<li>{esc(x["title"])}</li>" for x in chapter["exercises"])
    quiz_items = []
    for idx, quiz in enumerate(chapter["quiz"], 1):
        choices = "".join(f"<li>{esc(letter)}. {esc(option)}</li>" for letter, option in zip("ABCD", quiz["options"]))
        quiz_items.append(f"<div class=\"quiz\"><p><strong>Câu {idx}.</strong> {esc(quiz['q'])}</p><ol class=\"choices\">{choices}</ol></div>")
    ref_map = {ref["id"]: ref for ref in COURSE["references"]}
    reading_items = []
    for item in chapter.get("readings", []):
        ref = ref_map.get(item["ref"])
        if not ref:
            continue
        reading_items.append(f'<article class="reading"><h3>{esc(item["minutes"])} phút · {esc(item["focus"])}</h3><p>{esc(ref["citation"])}</p><p><strong>Sản phẩm đọc:</strong> {esc(item["task"])}</p><p><a href="{esc(ref["url"])}">Mở tài liệu gốc</a></p></article>')
    body = f'''
<header class="chapter-head"><p>Chương {chapter['number']} · {esc(chapter['duration'])} · {esc(chapter['level'])}</p>
<h1>{esc(chapter['title'])}</h1><p class="summary">{esc(chapter['summary'])}</p></header>
<section><h2>Chuẩn đầu ra chương</h2><ol>{outcomes}</ol></section>
<aside><strong>Móc ghi nhớ: {esc(chapter['memory']['hook'])}</strong><ol>{memory}</ol></aside>
{''.join(sections)}
<section><h2>Ca nghiên cứu</h2><aside><strong>{esc(chapter['caseStudy']['title'])}.</strong> {esc(chapter['caseStudy']['body'])}</aside></section>
<section><h2>Thực hành có hướng dẫn</h2><p><strong>{esc(chapter['lab']['code'])} · {esc(chapter['lab']['title'])}</strong></p><ol>{lab}</ol></section>
<section><h2>Bài tập mở rộng</h2><ol>{exercises}</ol></section>
<section><h2>Tự kiểm tra</h2>{''.join(quiz_items)}</section>
<section><h2>Đọc sâu có định hướng</h2>{''.join(reading_items)}</section>'''
    return page(f"Chương {chapter['number']}. {chapter['title']}", body)


def answer_page() -> str:
    blocks = []
    for chapter in COURSE["chapters"]:
        items = []
        for idx, quiz in enumerate(chapter["quiz"], 1):
            answer = "ABCD"[quiz["answer"]]
            items.append(f"<p><strong>Câu {idx}: {answer}.</strong> {esc(quiz['explain'])}</p>")
        for idx, exercise in enumerate(chapter["exercises"], 1):
            items.append(f"<p><strong>Bài tập {idx}.</strong> {esc(exercise['solution'])}</p>")
        blocks.append(f"<section><h2>Chương {chapter['number']}</h2>{''.join(items)}</section>")
    return page("Đáp án và gợi ý", f"<h1>Phụ lục A. Đáp án và gợi ý</h1>{''.join(blocks)}")


def references_page() -> str:
    refs = "".join(f'<li>{esc(ref["citation"])} <a href="{esc(ref["url"])}">Truy cập nguồn</a></li>' for ref in COURSE["references"])
    return page("Tài liệu tham khảo", f"<h1>Phụ lục B. Tài liệu tham khảo</h1><ol>{refs}</ol>")


def build():
    modified = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    chapter_items = []
    spine = ['<itemref idref="cover-page"/>', '<itemref idref="overview"/>']
    nav_parts = []
    files: dict[str, bytes | str] = {}

    overview_body = f'''<h1>{esc(COURSE['meta']['title'])}</h1>
<p class="lead">{esc(COURSE['meta']['subtitle'])}</p>
<p><strong>Chủ biên:</strong> {esc(COURSE['meta']['author'])}<br/><strong>Phiên bản:</strong> {esc(COURSE['meta']['edition'])}<br/><strong>Khối lượng:</strong> {esc(COURSE['meta']['credits'])}</p>
<aside><strong>Định vị học thuật.</strong> LONG là khung sư phạm do tác giả đề xuất; không thay thế tiêu chuẩn hoặc phương pháp chuyên ngành. Các thư góp ý chưa được xác minh được dùng như đầu vào biên tập, không phải chứng thực.</aside>
<figure><img src="images/long_framework.png" alt="Bốn trụ LONG gồm Learning và vòng đời, Optimization, Network và Governance"/><figcaption>Bốn trụ của khung sư phạm LONG.</figcaption></figure>'''
    files["OEBPS/overview.xhtml"] = page("Giới thiệu", overview_body)

    for part in COURSE["parts"]:
        links = []
        for chapter in [c for c in COURSE["chapters"] if c["part"] == part["id"]]:
            href = f"chapter-{chapter['number']:02d}.xhtml"
            item_id = f"chapter-{chapter['number']:02d}"
            chapter_items.append(f'<item id="{item_id}" href="{href}" media-type="application/xhtml+xml"/>')
            spine.append(f'<itemref idref="{item_id}"/>')
            links.append(f'<li><a href="{href}">Chương {chapter["number"]}. {esc(chapter["title"])}</a></li>')
            files[f"OEBPS/{href}"] = chapter_page(chapter)
        nav_parts.append(f'<li><span>{esc(part["title"])}</span><ol>{"".join(links)}</ol></li>')

    spine.extend(['<itemref idref="answers"/>', '<itemref idref="references"/>'])
    files["OEBPS/answers.xhtml"] = answer_page()
    files["OEBPS/references.xhtml"] = references_page()

    cover_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1600" viewBox="0 0 1200 1600" role="img" aria-label="Bìa giáo trình Phân tích hệ thống môi trường dựa trên AI và Mô hình LONG">
<rect width="1200" height="1600" fill="#f7f9f8"/><rect x="70" y="70" width="1060" height="1460" rx="36" fill="#ffffff" stroke="#0b5d4b" stroke-width="8"/>
<text x="600" y="280" text-anchor="middle" font-family="sans-serif" font-size="38" fill="#2e74b5">GIÁO TRÌNH ĐẠI HỌC MỞ</text>
<text x="600" y="500" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="64" fill="#1f4d78">PHÂN TÍCH HỆ THỐNG</text>
<text x="600" y="590" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="64" fill="#1f4d78">MÔI TRƯỜNG</text>
<text x="600" y="760" text-anchor="middle" font-family="sans-serif" font-size="46" fill="#0b5d4b">DỰA TRÊN AI VÀ MÔ HÌNH LONG</text>
<text x="600" y="1010" text-anchor="middle" font-family="sans-serif" font-size="32" fill="#5f7069">GeoAI · Carbon · Công bằng · Digital Twin</text>
<text x="600" y="1280" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="38" fill="#14251f">Long Ngo</text>
<text x="600" y="1370" text-anchor="middle" font-family="sans-serif" font-size="30" fill="#5f7069">Ấn bản 2.0 · 2026</text></svg>'''
    cover_body = '<main class="cover"><img src="images/cover.svg" alt="Bìa giáo trình Phân tích hệ thống môi trường dựa trên AI và Mô hình LONG"/></main>'
    files["OEBPS/cover.xhtml"] = page(COURSE["meta"]["title"], cover_body, body_class="cover-page")
    files["OEBPS/images/cover.svg"] = cover_svg

    nav = page("Mục lục", f'''<nav epub:type="toc" id="toc" xmlns:epub="http://www.idpf.org/2007/ops"><h1>Mục lục</h1><ol><li><a href="overview.xhtml">Giới thiệu</a></li>{''.join(nav_parts)}<li><a href="answers.xhtml">Đáp án và gợi ý</a></li><li><a href="references.xhtml">Tài liệu tham khảo</a></li></ol></nav>''')
    files["OEBPS/nav.xhtml"] = nav

    css = '''body{font-family:Georgia,serif;line-height:1.55;color:#14251f;margin:5%;}h1,h2,h3{font-family:Arial,sans-serif;color:#1f4d78;line-height:1.22;}h1{font-size:1.8em;}h2{margin-top:1.5em;font-size:1.35em;}p,li{orphans:3;widows:3;}a{color:#0b5d4b;}aside,.callout{background:#f2f6f4;border-left:.35em solid #2e74b5;padding:.8em 1em;margin:1em 0;}table{border-collapse:collapse;width:100%;font-size:.88em;}th,td{border:1px solid #b8c7c0;padding:.45em;text-align:left;}th{background:#e8eef5;}figure{text-align:center;margin:1.2em 0;}img{max-width:100%;height:auto;}figcaption{font-size:.85em;color:#5f7069;font-style:italic;}.formula{text-align:center;background:#f4f6f9;padding:.75em;overflow-wrap:anywhere;}.process-strip{display:block}.process-step{border:1px solid #ccd7d1;padding:.55em;margin:.35em 0}.summary,.lead{font-style:italic;color:#5f7069}.chapter-head{border-bottom:2px solid #0b5d4b;margin-bottom:1.5em}.chapter-head>p:first-child{font-family:Arial,sans-serif;color:#2e74b5}.choices{list-style:none;padding-left:1em}.quiz{break-inside:avoid}.cover-page{margin:0;padding:0}.cover img{width:100%;display:block}'''
    files["OEBPS/styles/book.css"] = css

    opf = f'''<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="book-id" xml:lang="vi">
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:identifier id="book-id">{BOOK_ID}</dc:identifier><dc:title>{esc(COURSE['meta']['title'])}</dc:title><dc:creator>{esc(COURSE['meta']['author'])}</dc:creator><dc:language>vi</dc:language><dc:rights>MIT cho nội dung gốc; nguồn bên thứ ba theo điều kiện tương ứng.</dc:rights><meta property="dcterms:modified">{modified}</meta></metadata>
<manifest><item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/><item id="cover-page" href="cover.xhtml" media-type="application/xhtml+xml"/><item id="cover-image" href="images/cover.svg" media-type="image/svg+xml" properties="cover-image"/><item id="overview" href="overview.xhtml" media-type="application/xhtml+xml"/>{''.join(chapter_items)}<item id="answers" href="answers.xhtml" media-type="application/xhtml+xml"/><item id="references" href="references.xhtml" media-type="application/xhtml+xml"/><item id="css" href="styles/book.css" media-type="text/css"/><item id="img-long" href="images/long_framework.png" media-type="image/png"/><item id="img-ipof" href="images/ipof_loop.png" media-type="image/png"/><item id="img-twin" href="images/digital_twin_architecture.png" media-type="image/png"/></manifest>
<spine>{''.join(spine)}</spine></package>'''
    files["OEBPS/content.opf"] = opf
    files["META-INF/container.xml"] = '''<?xml version="1.0" encoding="UTF-8"?><container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>'''

    for name in ["long_framework.png", "ipof_loop.png", "digital_twin_architecture.png"]:
        files[f"OEBPS/images/{name}"] = (ROOT / "build/book_assets" / name).read_bytes()

    OUT.parent.mkdir(exist_ok=True)
    with zipfile.ZipFile(OUT, "w") as archive:
        archive.writestr("mimetype", "application/epub+zip", compress_type=zipfile.ZIP_STORED)
        for path, content in files.items():
            archive.writestr(path, content, compress_type=zipfile.ZIP_DEFLATED)
    print(OUT)


if __name__ == "__main__":
    build()
