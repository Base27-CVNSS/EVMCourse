# 🌏 Phân tích Hệ thống Môi trường dựa trên AI và Mô hình LONG

[![Deploy GitHub Pages](https://github.com/Base27-CVNSS/EVMCourse/actions/workflows/pages.yml/badge.svg)](https://github.com/Base27-CVNSS/EVMCourse/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-0b5d4b.svg)](LICENSE)
[![Edition](https://img.shields.io/badge/University%20Edition-2.0-0b5d4b.svg)](CITATION.cff)

Giáo trình đại học mở kết nối **khoa học hệ thống, dữ liệu không gian–thời gian, mô hình hóa, GeoAI, trung hòa carbon, công bằng môi trường và Digital Twin**. Nội dung được tổ chức theo khung sư phạm **LONG**:

- **L — Learning & Life-cycle evidence:** học từ dữ liệu và bằng chứng vòng đời.
- **O — Optimization:** tối ưu hóa mục tiêu, nguồn lực và đánh đổi.
- **N — Network:** mạng vật chất, sinh thái, hạ tầng và thể chế.
- **G — Governance:** quản trị thích ứng, trách nhiệm và giám sát con người.

> LONG là khung tổ chức sư phạm do tác giả đề xuất. Khung không thay thế ISO 14040/14044, LCA, EIA, DPSIR, MCA hay mô hình chuyên ngành.

## 🎓 Học trực tuyến

**GitHub Pages:** <https://base27-cvnss.github.io/EVMCourse/>

Website tĩnh, không cần backend, có:

- 15 chương thuộc 4 phần, mỗi chương có chuẩn đầu ra, lý thuyết, công thức, case study, thực hành, bài tập và tự kiểm tra;
- các chuyên đề nâng cao: PINNs, GNN, XAI, foundation models viễn thám, carbon, công bằng môi trường và Digital Twin lưu vực;
- tìm kiếm toàn văn, lưu tiến độ cục bộ, sáng/tối, responsive, PWA và bản in;
- mô phỏng BOD dọc sông;
- bộ tải xuống gồm giáo trình Word, sổ tay giảng viên Word, ebook PDF và EPUB.

## 🧭 Cấu trúc 15 chương

| Phần | Chương | Trọng tâm |
|---|---:|---|
| I. Nền tảng | 1–4 | Hệ thống, mô hình hóa, dữ liệu/GIS/IoT, AI nâng cao |
| II. Khung LONG | 5–8 | Vòng đời, tối ưu, mạng lưới, quản trị |
| III. Chuyển đổi xanh | 9–13 | Kỹ thuật, sinh thái, đô thị, carbon, công bằng toàn cầu |
| IV. Bản sao số & tổng hợp | 14–15 | Digital Twin lưu vực và đồ án tích hợp |

Đề cương: [docs/DE_CUONG_HOC_PHAN.md](docs/DE_CUONG_HOC_PHAN.md)  
Phương pháp biên soạn: [docs/PHUONG_PHAP_BIEN_SOAN.md](docs/PHUONG_PHAP_BIEN_SOAN.md)  
Ma trận chuẩn đầu ra: [docs/MA_TRAN_CLO.md](docs/MA_TRAN_CLO.md)

## 🧪 Chuẩn đánh giá đề xuất

| Thành phần | Tỷ trọng |
|---|---:|
| Thực hành cá nhân | 30% |
| Dự án nhóm | 30% |
| Thuyết trình và phản biện | 20% |
| Kiểm tra cuối kỳ dạng mở | 20% |

## 💻 Chạy cục bộ

```bash
python -m http.server 8080
```

Mở <http://localhost:8080>. Service worker chỉ hoạt động trên HTTP/HTTPS, không hoạt động đầy đủ với `file://`.

## 🗂️ Cấu trúc mã nguồn

```text
EVMCourse/
├── index.html                 # Ứng dụng học tập
├── chapters/                  # URL tĩnh theo từng chương
├── assets/course.js           # Nội dung 15 chương
├── assets/app.js              # Điều hướng, tìm kiếm, quiz, tiến độ
├── assets/styles.css          # UI/UX, responsive, print
├── downloads/                 # Word, PDF, EPUB
├── docs/                      # Đề cương, ma trận, phương pháp biên soạn
└── .github/workflows/pages.yml
```

## 🔎 Nguyên tắc học thuật

- Số liệu minh họa phải ghi rõ **quan trắc / ước lượng / giả định**.
- Công thức phải có đơn vị, ranh giới và điều kiện áp dụng.
- Không dùng giải thích mô hình để tuyên bố nhân quả khi thiếu thiết kế nhân quả.
- AI hỗ trợ quyết định; không chuyển trách nhiệm sang thuật toán.
- Các thư góp ý do người dùng cung cấp được dùng như đầu vào biên tập. Tên cá nhân và tổ chức chưa được xác minh không được xem là chứng thực.

## 👤 Tác giả và giấy phép

**Chủ biên:** Long Ngo  
**Phiên bản:** 2.0.0 · 2026  
**Giấy phép mã và nội dung gốc:** [MIT](LICENSE)

Tài nguyên, tiêu chuẩn và nội dung bên thứ ba giữ nguyên điều kiện bản quyền của nguồn tương ứng.
