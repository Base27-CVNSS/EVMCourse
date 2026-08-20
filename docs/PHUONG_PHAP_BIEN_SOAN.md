# Phương pháp biên soạn và kiểm soát chất lượng

## 1. Phạm vi biên tập

Bản giáo trình số được tái cấu trúc từ hai tài liệu nguồn do tác giả cung cấp:

1. Bản website 12 chương về phân tích hệ thống môi trường dựa trên AI.
2. Đặc tả triển khai mục “Đầu vào – Tiến trình – Đầu ra” với yêu cầu công thức, bảng, ví dụ sông–khu công nghiệp, bài tập và vòng kiểm tra chất lượng.
3. Ba nhóm góp ý do người dùng cung cấp: bối cảnh Trung Quốc; kinh nghiệm Hoa Kỳ–Châu Âu–Nga; và góc nhìn các khu vực đang phát triển.

Mục tiêu biên tập không phải kéo dài mục lục thành văn bản chung chung, mà tạo một lộ trình có thể dạy–học: chuẩn đầu ra → lý thuyết cốt lõi → biểu diễn định lượng → ca nghiên cứu → thực hành → tự kiểm tra → nguồn đọc.

## 2. Các hiệu chỉnh học thuật quan trọng

### 2.1. Không tuyên bố LONG “thay thế” các mô hình chuẩn

LONG được định nghĩa là **khung sư phạm tích hợp do tác giả đề xuất**. Không có tuyên bố rằng LONG là tiêu chuẩn quốc tế hoặc thay thế DPSIR, PSR, LCA, EIA, MCA. Trong công bố khoa học, tên phương pháp chuẩn và yêu cầu kiểm định phải được trình bày độc lập.

### 2.2. Làm rõ chữ L

Nguồn ban đầu dùng “Learning” nhưng nội dung chương tập trung vào LCA. Bản biên tập dùng **Learning & Life-cycle evidence** để nối hai ý mà không đánh tráo LCA thành một kỹ thuật học máy.

### 2.3. Tách dữ liệu quan trắc, ước lượng và giả định

Mọi ca số trên website là học cụ. Khi chưa có nguồn hiện trường, số liệu phải được hiểu là giả định minh họa. Mô hình BOD tương tác dùng pha trộn hoàn toàn và phân hủy bậc nhất; không đại diện cho một con sông cụ thể và không dùng cho tuân thủ/quản lý.

### 2.4. Hiệu chỉnh ngôn ngữ AI

- Giải thích mô hình không đồng nghĩa suy luận nhân quả.
- Độ chính xác tổng thể không đủ cho sự kiện hiếm hoặc nhóm dễ tổn thương.
- ML không thay thế cân bằng vật chất, kiểm định ngoài mẫu hoặc chuyên gia miền.
- Hệ hỗ trợ quyết định phải có hành động, trách nhiệm và cơ chế từ chối/fallback.

## 3. Mẫu cấu trúc chương

Mỗi chương bắt buộc có:

- mô tả phạm vi và 4 chuẩn đầu ra;
- 4–5 mục lý thuyết;
- ít nhất một công thức/bảng/quy trình khi phù hợp;
- một ca nghiên cứu;
- một bài thực hành có sản phẩm;
- ít nhất hai câu tự kiểm tra có giải thích;
- bài tập mở rộng có gợi ý;
- nguồn đọc ưu tiên tài liệu chính thức.

## 4. Vòng kiểm soát chất lượng

### Vòng 1 — Cấu trúc và tính sư phạm

- Kiểm tra đủ 15 chương, đúng tiến trình nền tảng → LONG → chuyển đổi xanh → Digital Twin/đồ án.
- Loại trùng lặp giữa Chương 1 (khái niệm) và Chương 2 (quy trình mô hình hóa).
- Chuyển tiêu đề cấp bốn thành chuẩn đầu ra và nhiệm vụ học tập có thể đánh giá.

### Vòng 2 — Khoa học và đơn vị

- Kiểm tra công thức cân bằng, pha trộn, phân hủy, RMSE, logistic, hiệu suất.
- Bổ sung điều kiện áp dụng và đơn vị cho công thức.
- Sửa các diễn giải dễ gây ngộ nhận: phản hồi dương/âm, hazard/risk, nồng độ/tải lượng, SHAP/nhân quả.

### Vòng 3 — Nguồn, đạo đức và giới hạn

- Ưu tiên ISO, OGC, UNESCO, IPCC, U.S. EPA và bài báo nền tảng.
- Nêu rõ quyền của tài nguyên bên thứ ba.
- Thêm provenance, dữ liệu nhạy cảm, fairness, giám sát con người và điều kiện ngừng mô hình.
- Không chuyển tên cá nhân/tổ chức trong thư góp ý chưa xác minh thành chứng thực hoặc khuyến nghị chính thức.

### Vòng 4 — Sản phẩm số và khả dụng

- Kiểm tra điều hướng bàn phím, tương phản, responsive và print.
- Kiểm tra lưu tiến độ cục bộ, tìm kiếm, quiz, mô phỏng và PWA.
- Kiểm tra JavaScript, liên kết nội bộ, workflow GitHub Pages và giấy phép.

## 5. Checklist cho lần cập nhật sau

- [ ] Khái niệm mới có định nghĩa và miền áp dụng.
- [ ] Công thức có giải thích ký hiệu, đơn vị và giả định.
- [ ] Số liệu có nguồn/năm hoặc nhãn giả định.
- [ ] Ví dụ không được trình bày như kết quả quan trắc thật.
- [ ] Nguồn chính thức còn truy cập và phiên bản còn phù hợp.
- [ ] Không tuyên bố quá mức về AI hoặc LONG.
- [ ] Quiz có đúng một đáp án rõ ràng và giải thích.
- [ ] Nội dung hiển thị tốt trên desktop/mobile và khi in.
- [ ] Mã chạy không lỗi cú pháp; service worker đổi version khi tài sản thay đổi lớn.
- [ ] LICENSE, CITATION.cff và ghi công Long Ngo còn nhất quán.

---

**Chủ biên:** Long Ngo · **Giấy phép:** MIT.
