/*
 * Dữ liệu giáo trình mở Tin học môi trường & Mô hình hóa hệ thống.
 * Tác giả: Long Ngo · Giấy phép MIT.
 * Nội dung LONG là khung sư phạm do tác giả đề xuất, không phải tiêu chuẩn quốc tế.
 */
window.COURSE = {
  meta: {
    title: "Phân tích hệ thống môi trường dựa trên AI và Mô hình LONG",
    subtitle: "Giáo trình đại học về khoa học hệ thống, GeoAI, Digital Twin và quản trị bền vững",
    author: "Long Ngo",
    edition: "Ấn bản đại học 2.0 · 2026",
    license: "MIT",
    audience: "Sinh viên năm 3–4, học viên cao học và cán bộ kỹ thuật môi trường",
    credits: "4 tín chỉ · 45 tiết lý thuyết · 30 tiết thực hành · 120 giờ tự học"
  },
  parts: [
    { id: 1, title: "Phần I · Nền tảng khoa học hệ thống và AI" },
    { id: 2, title: "Phần II · Phương pháp và công cụ theo khung LONG" },
    { id: 3, title: "Phần III · Chuyển đổi xanh và ứng dụng liên ngành" },
    { id: 4, title: "Phần IV · Bản sao số và đồ án tích hợp" }
  ],
  chapters: [
    {
      id: "chuong-1",
      number: 1,
      part: 1,
      shortTitle: "Khoa học hệ thống",
      title: "Khoa học hệ thống và hệ thống môi trường",
      duration: "4 giờ",
      level: "Nền tảng",
      summary: "Thiết lập ngôn ngữ chung về phần tử, ranh giới, trạng thái, dòng vật chất–năng lượng–thông tin, động thái và phản hồi; từ đó định vị đúng vai trò của AI trong nghiên cứu môi trường.",
      keywords: ["hệ thống", "ranh giới", "phản hồi", "LONG"],
      outcomes: [
        "Mô tả một vấn đề môi trường bằng phần tử, quan hệ, ranh giới và trạng thái.",
        "Phân biệt hệ mở, hệ đóng; hệ tĩnh, hệ động; quan hệ tuyến tính và phi tuyến.",
        "Lập sơ đồ đầu vào – tiến trình – đầu ra và nhận diện vòng phản hồi.",
        "Giải thích đúng phạm vi của khung LONG so với các phương pháp chuẩn hóa hiện có."
      ],
      sections: [
        {
          id: "c1-he-thong",
          title: "1.1. Từ đối tượng riêng lẻ đến hệ thống môi trường",
          html: `<p><b>Hệ thống môi trường</b> là tập hợp các thành phần tự nhiên, kỹ thuật và xã hội có tương tác, được quan sát trong một ranh giới không gian–thời gian để trả lời một câu hỏi cụ thể. Một con sông không chỉ là dòng nước: khi nghiên cứu chất lượng nước, hệ còn gồm lưu vực, nguồn thải, trầm tích, sinh vật, hạ tầng xử lý, người sử dụng và cơ chế quản lý.</p>
          <p>Một mô tả tối thiểu gồm trạng thái <i>x(t)</i>, tác động bên ngoài <i>u(t)</i>, tham số <i>θ</i> và đại lượng quan sát <i>y(t)</i>. Cách nhìn này ngăn việc đồng nhất “dữ liệu đo được” với “toàn bộ hệ thống”: cảm biến chỉ cho ta các quan sát có sai số về một phần trạng thái.</p>
          <div class="formula"><code>dx/dt = f(x, u, θ, t) &nbsp;&nbsp; ; &nbsp;&nbsp; y = h(x) + ε</code><small><i>x</i>: véc-tơ trạng thái; <i>u</i>: tác động; <i>θ</i>: tham số; <i>y</i>: quan sát; <i>ε</i>: sai số đo. Hàm <i>f</i> mô tả động thái, còn <i>h</i> nối trạng thái với phép đo.</small></div>`
        },
        {
          id: "c1-ranh-gioi",
          title: "1.2. Ranh giới, quy mô và mục đích mô hình",
          html: `<p>Ranh giới không phải “đường viền tự nhiên duy nhất” mà là một lựa chọn phương pháp luận. Cùng một sự cố phú dưỡng, ranh giới có thể là hồ trong một mùa khô, toàn lưu vực trong mười năm, hoặc chuỗi cung ứng phân bón trong một vòng đời sản phẩm. Lựa chọn phải nhất quán với câu hỏi, độ phân giải dữ liệu và quyết định cần hỗ trợ.</p>
          <table class="data-table"><caption>Bảng 1.1. Kiểm tra ranh giới hệ thống</caption><thead><tr><th>Chiều</th><th>Câu hỏi kiểm tra</th><th>Ví dụ</th></tr></thead><tbody><tr><td>Không gian</td><td>Dòng nào vượt qua biên?</td><td>Nước, phù sa, người, hàng hóa</td></tr><tr><td>Thời gian</td><td>Chu kỳ nào cần được giữ lại?</td><td>Giờ cho sự cố; thập kỷ cho khí hậu</td></tr><tr><td>Chức năng</td><td>Dịch vụ nào được đánh giá?</td><td>Cấp nước, điều hòa lũ, sinh cảnh</td></tr><tr><td>Thể chế</td><td>Ai có quyền tác động?</td><td>Doanh nghiệp, địa phương, cộng đồng</td></tr></tbody></table>`
        },
        {
          id: "c1-ipo",
          title: "1.3. Đầu vào – tiến trình – đầu ra và phản hồi",
          html: `<p>Khung <b>Input–Process–Output–Feedback (IPOF)</b> giúp chuyển một vấn đề môi trường phức tạp thành các dòng có thể đo, các cơ chế có thể kiểm tra và các đầu ra gắn với quyết định. Sau mục này, người học có thể lập kiểm kê dòng vật chất–năng lượng–thông tin, mô tả phép biến đổi, thiết lập cân bằng sơ bộ và nhận diện vòng phản hồi.</p>
          <h3>a) Xác định đầu vào</h3><p><b>Đầu vào</b> là mọi dòng vượt qua ranh giới hệ thống trong khoảng thời gian nghiên cứu. Cần phân loại đồng thời theo bản chất (vật chất, năng lượng, thông tin), nguồn gốc (tự nhiên, nhân tạo) và khả năng kiểm soát (kiểm soát trực tiếp, tác động gián tiếp, ngoại sinh).</p>
          <table class="data-table"><caption>Bảng 1.2. Kiểm kê đầu vào cho một đoạn sông</caption><thead><tr><th>Nhóm</th><th>Ví dụ</th><th>Đơn vị tối thiểu</th><th>Khả năng kiểm soát</th></tr></thead><tbody><tr><td>Vật chất</td><td>Nước thượng lưu, nước thải, phù sa, N, P</td><td>m³/s; kg/ngày</td><td>Một phần</td></tr><tr><td>Năng lượng</td><td>Bức xạ, nhiệt, thế năng dòng chảy</td><td>W/m²; MJ/ngày</td><td>Thấp</td></tr><tr><td>Thông tin</td><td>Dự báo mưa, lệnh vận hành, cảnh báo</td><td>Mốc thời gian, độ tin cậy</td><td>Cao</td></tr><tr><td>Ngoại sinh</td><td>Khí hậu, mưa axit, thay đổi sử dụng đất</td><td>Theo biến cụ thể</td><td>Gián tiếp</td></tr></tbody></table>
          <div class="formula"><code>I<sub>total</sub> = Σ I<sub>j</sub> &nbsp;&nbsp; và &nbsp;&nbsp; L<sub>j</sub> = Q<sub>j</sub>C<sub>j</sub></code><small>Chỉ cộng các đại lượng cùng bản chất và cùng đơn vị. Với chất ô nhiễm, tải lượng <i>L</i> mới là đại lượng cộng được; không cộng trực tiếp nồng độ <i>C</i>.</small></div>
          <h3>b) Mô tả tiến trình chuyển hóa</h3><p><b>Tiến trình</b> gồm cơ chế vật lý (trộn, lắng, khuếch tán), hóa học (oxy hóa–khử, hấp phụ), sinh học (phân hủy, sinh trưởng) và xã hội–kỹ thuật (xử lý, giám sát, thực thi). Mỗi tiến trình cần nêu biến trạng thái, tham số, quy mô không gian–thời gian và giả định.</p>
          <div class="process-strip"><div class="process-step"><b>Đầu vào</b>Dòng, tải lượng, năng lượng, dữ liệu</div><div class="process-step"><b>Chuyển hóa</b>Bảo toàn + phản ứng + điều khiển</div><div class="process-step"><b>Đầu ra</b>Tải lượng, trạng thái, dịch vụ, rủi ro</div><div class="process-step"><b>Phản hồi</b>Điều chỉnh nguồn thải và vận hành</div></div>
          <div class="formula"><code>Tích lũy = Dòng vào − Dòng ra + Phát sinh − Tiêu hủy</code><small>Đây là mẫu cân bằng tổng quát. Mọi hạng tử phải cùng thứ nguyên, cùng ranh giới và cùng bước thời gian.</small></div>
          <h3>c) Xác định đầu ra và cơ chế phản hồi</h3><p>Đầu ra gồm dòng vật chất rời hệ, chỉ báo trạng thái, dịch vụ hệ sinh thái và thông tin quyết định. Chất lượng đầu ra được đánh giá bằng mức đạt mục tiêu, sai số, độ trễ, phân bố tác động và bất định. <b>Phản hồi âm</b> có xu hướng giảm sai lệch; <b>phản hồi dương</b> khuếch đại biến đổi. Các dấu này mô tả chiều tác động, không đồng nghĩa tốt hoặc xấu.</p>
          <h3>d) Ví dụ đoạn sông nhận nước thải</h3><p>Với giả định trộn hoàn toàn tại điểm xả, nồng độ tức thời sau trộn được tính từ tải lượng. Sau đó, nếu BOD phân hủy bậc nhất, nồng độ giảm theo thời gian di chuyển. Cần tách rõ hai bước để không gán nhầm sự pha loãng thành khả năng tự làm sạch.</p>
          <div class="formula"><code>C<sub>mix</sub> = (Q<sub>r</sub>C<sub>r</sub> + Q<sub>w</sub>C<sub>w</sub>) / (Q<sub>r</sub> + Q<sub>w</sub>); &nbsp; C(t)=C<sub>mix</sub>e<sup>−kt</sup></code><small><i>Q</i>: m³/s; <i>C</i>: mg/L; <i>k</i>: ngày⁻¹. Mô hình học tập không xét thủy động lực 2D/3D, nguồn phân tán hoặc tái huyền phù.</small></div>
          <div class="callout"><strong>Checklist IPOF</strong><p>Ranh giới có lý do? Dòng có đơn vị? Cân bằng có khép kín? Cơ chế có thể kiểm chứng? Đầu ra gắn quyết định? Phản hồi có độ trễ? Bất định và nhóm chịu tác động đã được nêu?</p></div>`
        },
        {
          id: "c1-digital-earth",
          title: "1.4. Hệ thống môi trường trong kỷ nguyên Digital Earth",
          html: `<p><b>Digital Earth</b> là hướng tích hợp quan trắc Trái Đất, mô hình, hạ tầng tính toán và giao diện quyết định để nghiên cứu tương tác tự nhiên–con người. Một <b>digital twin</b> đòi hỏi liên kết có mục đích giữa hệ vật lý và đại diện số, cập nhật trạng thái, mô phỏng kịch bản và vòng phản hồi vận hành; mô hình 3D tĩnh chưa đủ để gọi là bản sao số.</p><p>Trong khung LONG: L học từ chuỗi quan trắc và bằng chứng vòng đời; O tối ưu can thiệp dưới ràng buộc; N biểu diễn mạng sông–hạ tầng–thể chế; G quy định quyền dữ liệu, trách nhiệm và điều kiện dừng. Kiến trúc này được triển khai đầy đủ ở Chương 14.</p>`
        },
        {
          id: "c1-long",
          title: "1.5. Khung LONG như một bản đồ học tập",
          html: `<p>Trong giáo trình này, <b>LONG</b> là một <b>khung tổ chức sư phạm do tác giả đề xuất</b>: <b>L</b>earning &amp; Life-cycle evidence (học từ dữ liệu và bằng chứng vòng đời), <b>O</b>ptimization (tối ưu), <b>N</b>etwork (mạng lưới tương tác) và <b>G</b>overnance (quản trị). Khung này giúp nối các kỹ thuật thành một quy trình ra quyết định có thể kiểm tra.</p>
          <div class="callout"><strong>Giới hạn học thuật</strong><p>LONG không phải tiêu chuẩn được ISO hoặc cơ quan quản lý công nhận và không thay thế DPSIR, PSR, LCA, EIA, MCA hay mô hình động lực học. Khi công bố nghiên cứu, người học phải nêu rõ phương pháp chuẩn nào được dùng, giả định nào do nhóm nghiên cứu đặt ra và bằng chứng kiểm định nào hỗ trợ kết luận.</p></div>`
        }
      ],
      caseStudy: {
        title: "Sông nhận nước thải từ khu công nghiệp",
        body: "Xác định biên là đoạn sông 5 km trong 24 giờ. Đầu vào gồm nước thượng lưu, nước thải, mưa và bức xạ; tiến trình gồm trộn, lắng, phân hủy BOD và trao đổi oxy; đầu ra là tải lượng hạ lưu, DO tối thiểu và cảnh báo quản lý. Mô hình đầu tiên chỉ nên giữ những cơ chế ảnh hưởng trực tiếp đến câu hỏi dự báo BOD/DO."
      },
      lab: {
        code: "L01",
        title: "Lập bản đồ hệ thống một vấn đề địa phương",
        tasks: ["Chọn một vấn đề nước, không khí hoặc chất thải.", "Đặt ranh giới không gian–thời gian và lý giải lựa chọn.", "Vẽ ít nhất 8 biến và 2 vòng phản hồi; ghi dấu quan hệ +/−.", "Nêu một biến chưa quan sát được và cách đo gián tiếp."]
      },
      quiz: [
        { q: "Phát biểu nào mô tả đúng nhất ranh giới hệ thống?", options: ["Luôn trùng địa giới hành chính", "Là lựa chọn gắn với câu hỏi nghiên cứu", "Chỉ gồm thành phần tự nhiên", "Không ảnh hưởng kết quả"], answer: 1, explain: "Ranh giới là lựa chọn phương pháp luận; thay đổi biên có thể đổi dòng vào–ra và kết luận." },
        { q: "Trong sơ đồ nhân quả, dấu “+” có nghĩa gì?", options: ["Tác động luôn có lợi", "Biến nguyên nhân tăng thì biến kết quả đổi cùng chiều, các điều kiện khác không đổi", "Giá trị dương", "Quan hệ đã được chứng minh"], answer: 1, explain: "Dấu chỉ chiều quan hệ cục bộ, không phán xét lợi/hại và không tự chứng minh nhân quả." }
      ],
      exercises: [
        { title: "Nhận biết: phân loại mưa, bức xạ và cảnh báo vận hành theo vật chất–năng lượng–thông tin.", solution: "Mưa: vật chất; bức xạ: năng lượng; cảnh báo: thông tin. Mỗi dòng vẫn cần đơn vị và mốc thời gian." },
        { title: "Vận dụng: tính nồng độ sau trộn khi Q₁=10 m³/s, C₁=4 mg/L; Q₂=0,5 m³/s, C₂=250 mg/L.", solution: "Cmix=(10×4+0,5×250)/10,5≈15,71 mg/L. Đây là giá trị tức thời sau trộn hoàn toàn, chưa xét phân hủy." }
      ],
      refs: ["meadows", "epa-modeling"]
    },
    {
      id: "chuong-2",
      number: 2,
      part: 1,
      shortTitle: "Phương pháp mô hình hóa",
      title: "Phương pháp luận và quy trình mô hình hóa môi trường",
      duration: "5 giờ",
      level: "Cốt lõi",
      summary: "Chuyển câu hỏi môi trường thành mô hình khái niệm và mô hình tính toán; bảo toàn khối lượng, hiệu chỉnh, kiểm định, phân tích độ nhạy và truyền đạt bất định.",
      keywords: ["cân bằng khối lượng", "hiệu chỉnh", "kiểm định", "bất định"],
      outcomes: [
        "Viết câu hỏi mô hình hóa có biến đích, miền áp dụng và tiêu chí đánh giá rõ ràng.",
        "Thiết lập phương trình cân bằng khối lượng cho hệ hộp trộn hoàn toàn.",
        "Tách dữ liệu hiệu chỉnh và kiểm định theo không gian–thời gian.",
        "Báo cáo độ nhạy, bất định và giới hạn sử dụng của mô hình."
      ],
      sections: [
        {
          id: "c2-cau-hoi",
          title: "2.1. Bắt đầu từ quyết định, không bắt đầu từ thuật toán",
          html: `<p>Mô hình chỉ có nghĩa khi gắn với một quyết định. Câu hỏi “Dùng LSTM dự báo nước” chưa đủ; câu hỏi tốt hơn là: “Dự báo BOD trung bình ngày tại trạm hạ lưu trước 24 giờ, trong mùa khô, để kích hoạt kiểm tra nguồn thải, với sai số MAE không quá 15% miền biến thiên lịch sử.”</p>
          <p>Quy trình gồm: xác định quyết định → mô hình khái niệm → kiểm kê dữ liệu → chọn mức phức tạp tối thiểu → hiệu chỉnh → kiểm định ngoài mẫu → phân tích bất định → công bố giới hạn. Không dùng cùng một tập quan sát để vừa chọn mô hình vừa tuyên bố năng lực tổng quát hóa.</p>`
        },
        {
          id: "c2-can-bang",
          title: "2.2. Cân bằng khối lượng và mô hình hộp",
          html: `<p>Nguyên lý bảo toàn là xương sống của mô hình môi trường: <b>tích lũy = dòng vào − dòng ra + phát sinh − tiêu hủy</b>. Với đoạn sông trộn hoàn toàn, thể tích không đổi và phản ứng phân hủy bậc nhất:</p>
          <div class="formula"><code>V dC/dt = Q<sub>in</sub>C<sub>in</sub> − Q<sub>out</sub>C − kVC</code><small><i>V</i>: m³; <i>C</i>: mg/L; <i>Q</i>: m³/ngày; <i>k</i>: ngày⁻¹. Tất cả hạng tử ở vế phải phải có cùng thứ nguyên khối lượng/thời gian.</small></div>
          <p>Nếu <i>Q<sub>in</sub>=Q<sub>out</sub>=Q</i>, nghiệm tiến về trạng thái ổn định <i>C* = QC<sub>in</sub>/(Q+kV)</i>. Mô hình hộp hữu ích để kiểm tra đơn vị, dấu và trật tự độ lớn trước khi dùng mô hình không gian phức tạp.</p>`
        },
        {
          id: "c2-loai-mo-hinh",
          title: "2.3. Mô hình cơ chế, dữ liệu và mô hình lai",
          html: `<table class="data-table"><caption>Bảng 2.1. Chọn họ mô hình theo mục đích</caption><thead><tr><th>Họ mô hình</th><th>Ưu điểm</th><th>Rủi ro</th><th>Khi nên dùng</th></tr></thead><tbody><tr><td>Cơ chế (hộp trắng)</td><td>Giải thích được, giữ định luật bảo toàn</td><td>Thiếu tham số; giản lược mạnh</td><td>Kịch bản vượt ngoài dữ liệu lịch sử</td></tr><tr><td>Thống kê/ML (hộp đen)</td><td>Học quan hệ phi tuyến nhanh</td><td>Dịch chuyển phân bố, tương quan giả</td><td>Dự báo trong miền dữ liệu đủ dày</td></tr><tr><td>Lai/physics-informed</td><td>Kết hợp ràng buộc và khả năng học</td><td>Thiết kế, tối ưu khó hơn</td><td>Vừa cần dự báo vừa cần tính nhất quán vật lý</td></tr></tbody></table>
          <p>Không có họ mô hình tốt nhất cho mọi bài toán. Độ phức tạp chỉ hợp lý khi tăng giá trị quyết định nhiều hơn chi phí dữ liệu, tính toán và rủi ro diễn giải.</p>`
        },
        {
          id: "c2-kiem-dinh",
          title: "2.4. Hiệu chỉnh, kiểm định và bất định",
          html: `<p><b>Hiệu chỉnh</b> ước lượng tham số từ một phần dữ liệu; <b>kiểm định</b> đánh giá mô hình trên dữ liệu không tham gia hiệu chỉnh; <b>phân tích độ nhạy</b> đo mức đầu ra đổi theo tham số; <b>phân tích bất định</b> mô tả khoảng kết quả do dữ liệu, tham số, cấu trúc và kịch bản.</p>
          <p>Chuỗi môi trường có tự tương quan nên chia ngẫu nhiên từng dòng thường làm rò rỉ thông tin. Nên dùng cửa sổ thời gian tiến, giữ nguyên một mùa/năm để kiểm định, hoặc kiểm định chéo theo trạm khi mục tiêu là chuyển sang vị trí mới. Báo cả thước đo sai số, thiên lệch, khoảng dự báo và biểu đồ phần dư.</p>`
        }
      ],
      simulator: true,
      caseStudy: {
        title: "Mô hình BOD dọc đoạn sông",
        body: "Sau điểm trộn, giả sử BOD phân hủy bậc nhất C(t)=C₀e⁻ᵏᵗ. Thời gian di chuyển t=x/u phụ thuộc khoảng cách x và vận tốc u. Mô phỏng dưới đây cho phép đổi lưu lượng, nồng độ, hệ số k và vận tốc để quan sát tác động lên nồng độ hạ lưu. Đây là học cụ, không thay thế mô hình thủy động lực đã hiệu chỉnh."
      },
      lab: {
        code: "L02",
        title: "Từ mô hình khái niệm đến bảng tính",
        tasks: ["Lập cân bằng khối lượng BOD cho một đoạn sông.", "Kiểm tra thứ nguyên của từng hạng tử.", "Chạy ba kịch bản lưu lượng mùa khô–trung bình–mùa mưa.", "Vẽ đồ thị độ nhạy theo k và ghi rõ miền giả định."]
      },
      quiz: [
        { q: "Dữ liệu kiểm định dùng để làm gì?", options: ["Tối ưu tham số lần cuối", "Đánh giá ngoài mẫu sau khi chốt quy trình", "Bù giá trị thiếu", "Loại ngoại lai"], answer: 1, explain: "Nếu tiếp tục điều chỉnh dựa trên tập kiểm định, nó trở thành tập phát triển và cần một tập kiểm định mới." },
        { q: "Hạng tử kVC trong cân bằng có đơn vị nào?", options: ["mg/L", "m³/ngày", "Khối lượng/thời gian", "Không thứ nguyên"], answer: 2, explain: "k (1/thời gian) × V (thể tích) × C (khối lượng/thể tích) = khối lượng/thời gian." }
      ],
      exercises: [
        { title: "Phân tích: vì sao chia ngẫu nhiên chuỗi quan trắc theo từng dòng có thể cho kết quả quá lạc quan?", solution: "Các điểm gần nhau theo thời gian chia sẻ mùa, điều kiện thủy văn và tự tương quan; thông tin tương lai có thể rò sang tập huấn luyện. Dùng chia khối theo thời gian." },
        { title: "Sáng tạo: đề xuất tiêu chí dừng khi tăng độ phức tạp mô hình.", solution: "Ví dụ: chỉ tăng độ phức tạp nếu sai số kiểm định giảm có ý nghĩa, phần dư cải thiện, bất định không tăng và mô hình vẫn đáp ứng thời gian vận hành/khả năng giải thích." }
      ],
      refs: ["epa-modeling", "swmm"]
    },
    {
      id: "chuong-3",
      number: 3,
      part: 1,
      shortTitle: "Dữ liệu và hạ tầng số",
      title: "Dữ liệu môi trường, GIS, IoT và hạ tầng số",
      duration: "4 giờ",
      level: "Cốt lõi",
      summary: "Thiết kế vòng đời dữ liệu quan trắc có nguồn gốc, đơn vị, QA/QC, liên kết không gian–thời gian và khả năng tái sử dụng thay vì chỉ gom các tệp rời rạc.",
      keywords: ["QA/QC", "GIS", "IoT", "FAIR"],
      outcomes: [
        "Phân loại dữ liệu quan trắc, cảm biến, viễn thám, điều tra và dữ liệu mở.",
        "Thiết kế schema tối thiểu cho quan sát không gian–thời gian.",
        "Phát hiện lỗi đơn vị, mốc thời gian, ngoại lai và thiếu dữ liệu.",
        "Mô tả nguồn gốc dữ liệu và quyền truy cập theo nguyên tắc FAIR."
      ],
      sections: [
        {
          id: "c3-vong-doi",
          title: "3.1. Vòng đời dữ liệu quan trắc",
          html: `<p>Một giá trị “DO = 5,2” không đủ dùng nếu thiếu đơn vị, phương pháp, độ sâu, vị trí, thời gian, thiết bị, trạng thái hiệu chuẩn và cờ chất lượng. Mỗi quan sát nên gắn với đối tượng được quan sát, đại lượng, đơn vị, thủ tục đo, cảm biến, vị trí, thời điểm hiện tượng và thời điểm công bố.</p>
          <div class="process-strip"><div class="process-step"><b>Thiết kế</b>Câu hỏi, độ phân giải, QA plan</div><div class="process-step"><b>Thu nhận</b>Hiệu chuẩn, metadata, đồng hồ</div><div class="process-step"><b>Xử lý</b>Đơn vị, cờ lỗi, nội suy có kiểm soát</div><div class="process-step"><b>Công bố</b>Phiên bản, giấy phép, provenance</div></div>`
        },
        {
          id: "c3-nguon",
          title: "3.2. Quan trắc, IoT, viễn thám và dữ liệu cộng đồng",
          html: `<p>Trạm chuẩn có độ tin cậy cao nhưng thưa; cảm biến IoT có tần suất cao nhưng dễ trôi; viễn thám phủ rộng nhưng quan sát gián tiếp; dữ liệu cộng đồng giàu ngữ cảnh nhưng thiên lệch lấy mẫu. Tích hợp không phải cộng cơ học: cần mô hình sai số và quy tắc ưu tiên.</p>
          <p>OGC SensorThings API cung cấp mô hình mở để liên kết Thing, Sensor, ObservedProperty, Datastream, Observation và FeatureOfInterest. Với dữ liệu GIS, luôn lưu hệ tọa độ, độ chính xác vị trí và phép biến đổi đã dùng.</p>`
        },
        {
          id: "c3-qaqc",
          title: "3.3. Làm sạch và đồng bộ không gian–thời gian",
          html: `<p>QA/QC nên phân biệt <b>giá trị không hợp lệ</b> (lỗi cảm biến, sai đơn vị) với <b>sự kiện hiếm nhưng có thật</b> (sự cố xả thải). Xóa ngoại lai chỉ vì xa trung bình có thể xóa chính hiện tượng cần phát hiện. Cờ chất lượng nên được giữ tách khỏi giá trị gốc.</p>
          <div class="formula"><code>z = (x − μ) / σ</code><small>Chuẩn hóa z-score dùng trung bình <i>μ</i> và độ lệch chuẩn <i>σ</i> ước lượng trên tập huấn luyện. Với phân bố lệch/nhiều ngoại lai, cân nhắc median và IQR. Không dùng toàn bộ dữ liệu trước khi chia tập.</small></div>`
        },
        {
          id: "c3-fair",
          title: "3.4. Kho dữ liệu, FAIR và quản trị truy cập",
          html: `<p>FAIR yêu cầu dữ liệu có thể tìm thấy, truy cập, liên thông và tái sử dụng; FAIR không đồng nghĩa bắt buộc công khai mọi dữ liệu. Dữ liệu nhạy cảm về vị trí loài quý hiếm, hạ tầng trọng yếu hoặc thông tin cá nhân cần kiểm soát truy cập, làm mờ không gian và ghi điều kiện sử dụng.</p>
          <p>Một kho tối thiểu cần: định danh bền vững, từ điển dữ liệu, schema có phiên bản, nhật ký biến đổi, kiểm tra tự động, bản sao lưu và chính sách lưu giữ. Tệp “final_v2_moi_nhat.csv” không phải là quản trị phiên bản.</p>`
        }
      ],
      caseStudy: { title: "Mạng cảm biến chất lượng nước cấp huyện", body: "Thiết kế 8 trạm đo mỗi 15 phút, một trạm chuẩn đối chứng hàng tuần và quy trình cờ dữ liệu. Đồng bộ về UTC trong lưu trữ, hiển thị giờ địa phương; lưu cả dữ liệu thô và dữ liệu đã hiệu chỉnh; không nội suy qua khoảng mất điện dài." },
      lab: { code: "L03", title: "Hồ sơ dữ liệu có thể kiểm toán", tasks: ["Tạo data dictionary 12 trường cho quan sát nước.", "Viết 5 quy tắc kiểm tra đơn vị, miền giá trị và thời gian.", "Thiết kế cờ chất lượng không làm mất dữ liệu thô.", "Vẽ luồng từ cảm biến đến dashboard và kho lưu trữ."] },
      quiz: [
        { q: "FAIR có đồng nghĩa dữ liệu luôn công khai không?", options: ["Có", "Không; quyền truy cập có thể được kiểm soát", "Chỉ với GIS", "Chỉ với dữ liệu nhà nước"], answer: 1, explain: "Accessible yêu cầu cơ chế truy cập rõ ràng, có thể bao gồm xác thực và hạn chế hợp pháp." },
        { q: "Khi phát hiện giá trị cực đoan, hành động đầu tiên phù hợp là gì?", options: ["Xóa ngay", "Đổi bằng trung bình", "Kiểm tra metadata, cảm biến và bối cảnh sự kiện", "Làm tròn"], answer: 2, explain: "Giá trị cực đoan có thể là lỗi hoặc sự kiện thật; cần điều tra nguồn gốc trước khi quyết định." }
      ],
      exercises: [{ title: "Vận dụng: thiết kế khóa duy nhất cho bảng quan sát cảm biến.", solution: "Có thể dùng observation_id bất biến; đồng thời ràng buộc tổ hợp datastream_id + phenomenon_time + result_version để tránh trùng logic." }],
      refs: ["ogc-sensorthings", "fair"]
    },
    {
      id: "chuong-4",
      number: 4,
      part: 1,
      shortTitle: "Học máy và AI",
      title: "Học máy và AI trong phân tích môi trường",
      duration: "5 giờ",
      level: "Trung cấp",
      summary: "Thiết kế bài toán ML đáng tin cậy cho chuỗi thời gian, ảnh, văn bản và dữ liệu không gian; ưu tiên đường cơ sở, kiểm định ngoài miền và giải thích phù hợp quyết định.",
      keywords: ["ML", "GeoAI", "NLP", "XAI"],
      outcomes: [
        "Chuyển mục tiêu môi trường thành biến đích và đơn vị dự báo.",
        "Chọn đường cơ sở và sơ đồ kiểm định tránh rò rỉ dữ liệu.",
        "Đánh giá mô hình bằng nhiều thước đo và phân tích phần dư.",
        "Nhận diện rủi ro thiên lệch, dịch chuyển phân bố và tự động hóa quá mức."
      ],
      sections: [
        { id: "c4-bai-toan", title: "4.1. Đặc tả bài toán và đường cơ sở", html: `<p>Trước khi chọn thuật toán, xác định đơn vị phân tích (trạm–giờ, ô lưới–ngày, văn bản–hồ sơ), chân trời dự báo, biến sẵn có tại thời điểm vận hành và chi phí của từng loại sai. Đường cơ sở có thể là giá trị gần nhất, trung bình mùa hoặc hồi quy tuyến tính. Mô hình sâu chỉ có giá trị khi vượt đường cơ sở trên kiểm định phù hợp.</p>` },
        { id: "c4-hoc", title: "4.2. Học có giám sát, không giám sát và học sâu", html: `<p>Hồi quy dự báo đại lượng liên tục; phân loại gán nhãn; gom cụm và giảm chiều khám phá cấu trúc; mạng CNN xử lý ảnh; RNN/Transformer mô hình hóa chuỗi và văn bản. Tên thuật toán không bảo đảm chất lượng: dữ liệu đại diện, nhãn, thiết kế kiểm định và mục tiêu quyết định quan trọng hơn.</p><div class="formula"><code>RMSE = √[(1/n) Σ(y<sub>i</sub> − ŷ<sub>i</sub>)²]</code><small>RMSE nhạy với sai số lớn. Nên báo thêm MAE, thiên lệch, R² (khi phù hợp), hiệu năng theo mùa/trạm và khoảng dự báo.</small></div>` },
        { id: "c4-geoai", title: "4.3. GeoAI, thị giác máy tính và NLP", html: `<p>Ảnh vệ tinh/UAV cần chia tập theo vùng, không chia ngẫu nhiên các mảnh ảnh kề nhau. Văn bản chính sách cần lưu phiên bản, ngữ cảnh pháp lý và kiểm tra trích dẫn. Phân loại rác bằng camera phải kiểm tra ánh sáng, nền, góc chụp và lớp hiếm. Với mô hình nền tảng, mọi số liệu và trích dẫn do mô hình tạo phải được đối chiếu nguồn gốc.</p>` },
        { id: "c4-tin-cay", title: "4.4. Giải thích, bất định và vận hành", html: `<p>Độ quan trọng đặc trưng mô tả hành vi mô hình, không tự chứng minh quan hệ nhân quả. Khi triển khai, theo dõi chất lượng đầu vào, drift, độ bao phủ khoảng dự báo, sai số theo nhóm và tần suất can thiệp của con người. Mỗi mô hình cần model card ghi dữ liệu, miền sử dụng, thước đo, giới hạn và người chịu trách nhiệm.</p>` },
        { id: "c4-sciml", title: "4.5. PINNs, mô hình lai và ràng buộc vật lý", html: `<p><b>Physics-Informed Neural Networks (PINNs)</b> đưa phần dư phương trình vi phân, điều kiện biên và điều kiện đầu vào hàm mất mát. Chúng hữu ích cho bài toán thuận/nghịch khi dữ liệu thưa nhưng luật vật lý đã biết. Tuy nhiên, PINNs không mặc nhiên bảo toàn chính xác, có thể khó tối ưu và phải được so sánh với nghiệm số/cơ chế phù hợp.</p><div class="formula"><code>ℒ = λ<sub>d</sub>ℒ<sub>data</sub> + λ<sub>p</sub>ℒ<sub>PDE</sub> + λ<sub>b</sub>ℒ<sub>boundary</sub></code><small>Các trọng số λ quyết định đánh đổi giữa khớp dữ liệu, phương trình chi phối và điều kiện biên; cần phân tích độ nhạy và sai số ngoài mẫu.</small></div>` },
        { id: "c4-gnn-fm", title: "4.6. GNN và foundation models cho dữ liệu Trái Đất", html: `<p><b>Graph Neural Networks</b> phù hợp khi topology có ý nghĩa: mạng sông có hướng, lưới điện, chuỗi cung ứng hoặc mạng trạm. Thiết kế cạnh phải dựa trên cơ chế hoặc giả thuyết có thể kiểm chứng, không chỉ tương quan. <b>Foundation models viễn thám</b> có thể giảm nhu cầu nhãn cho tác vụ hạ nguồn, nhưng vẫn phải kiểm định theo cảm biến, mùa, vùng và độ phân giải; hiệu năng benchmark không bảo đảm phù hợp địa phương.</p><div class="callout"><strong>Nguyên tắc XAI</strong><p>Chọn lời giải thích theo người dùng và quyết định: chuyên gia mô hình cần phần dư/độ nhạy; cơ quan quản lý cần yếu tố dẫn đến cảnh báo; cộng đồng cần ngôn ngữ dễ hiểu, kênh phản hồi và quyền khiếu nại.</p></div>` }
      ],
      caseStudy: { title: "Dự báo PM₂.₅ trước 24 giờ", body: "So sánh persistence, hồi quy gradient boosting và LSTM trên kiểm định cuốn chiếu theo tháng. Đặc trưng khí tượng dự báo phải là giá trị thực sự có sẵn tại thời điểm phát hành, không dùng quan sát tương lai. Báo MAE riêng cho mùa khô và các ngày ô nhiễm cao." },
      lab: { code: "L04", title: "Thiết kế một thí nghiệm ML không rò rỉ", tasks: ["Chọn biến đích và chân trời dự báo.", "Vẽ đường thời gian cho train/validation/test.", "Đặt đường cơ sở và ba thước đo.", "Viết model card một trang, gồm trường hợp không nên dùng."] },
      quiz: [
        { q: "Giá trị SHAP cao chứng minh điều gì?", options: ["Quan hệ nhân quả", "Đặc trưng đóng góp mạnh vào dự báo của mô hình trong cấu hình đã xét", "Dữ liệu không thiên lệch", "Mô hình đúng"], answer: 1, explain: "Công cụ giải thích mô hình không tự biến tương quan thành nhân quả." },
        { q: "Cách chia ảnh không gian nào dễ rò rỉ?", options: ["Giữ nguyên tỉnh làm test", "Chia ngẫu nhiên các patch kề nhau", "Leave-one-region-out", "Kiểm định theo lưu vực"], answer: 1, explain: "Các patch kề nhau rất giống nhau; chia ngẫu nhiên làm train và test gần như trùng bối cảnh." }
      ],
      exercises: [{ title: "Phân tích: chọn thước đo cho cảnh báo sự cố hiếm.", solution: "Không dùng accuracy đơn lẻ. Báo precision, recall, PR-AUC, thời gian báo trước và chi phí báo động giả/bỏ sót." }],
      refs: ["unesco-ai", "sklearn", "pinns", "prithvi", "xai-eo"]
    },
    {
      id: "chuong-5",
      number: 5,
      part: 2,
      shortTitle: "L · Learning & vòng đời",
      title: "L — Học từ dữ liệu và bằng chứng vòng đời",
      duration: "4 giờ",
      level: "Trung cấp",
      summary: "Kết hợp học từ dữ liệu với tư duy vòng đời; thực hành LCA, dấu chân, MFA/SFA mà không đánh tráo ranh giới, đơn vị chức năng hay chất lượng kiểm kê.",
      keywords: ["LCA", "carbon", "MFA", "đơn vị chức năng"],
      outcomes: [
        "Mô tả bốn giai đoạn LCA theo ISO 14040/14044.",
        "Thiết lập đơn vị chức năng và ranh giới hệ thống nhất quán.",
        "Tính kiểm kê đơn giản từ dữ liệu hoạt động và hệ số phát thải.",
        "Phân biệt kết quả mô hình với tuyên bố so sánh đã được phản biện."
      ],
      sections: [
        { id: "c5-lca", title: "5.1. Mục tiêu, phạm vi và đơn vị chức năng", html: `<p>LCA đánh giá đầu vào, đầu ra và tác động tiềm tàng trong vòng đời sản phẩm/hệ thống. Theo ISO 14040, bốn pha là: mục tiêu–phạm vi, kiểm kê vòng đời (LCI), đánh giá tác động (LCIA) và diễn giải. <b>Đơn vị chức năng</b> là cơ sở so sánh; “1 kg vật liệu” không tương đương “dịch vụ che phủ mái trong 30 năm”.</p>` },
        { id: "c5-lci", title: "5.2. Kiểm kê và chất lượng dữ liệu", html: `<p>Mỗi dòng kiểm kê cần lượng, đơn vị, công nghệ, địa lý, thời gian, nguồn và độ đại diện. AI có thể ước lượng thiếu hụt hoặc ánh xạ tên vật liệu, nhưng giá trị ước lượng phải được gắn cờ và đưa vào phân tích bất định; không được biến dự đoán thành số đo.</p><div class="formula"><code>CF = Σ A<sub>i</sub> × EF<sub>i</sub></code><small><i>A<sub>i</sub></i>: dữ liệu hoạt động; <i>EF<sub>i</sub></i>: hệ số phát thải tương ứng. Phải kiểm tra đơn vị, phạm vi khí nhà kính, GWP và năm/nguồn hệ số.</small></div>` },
        { id: "c5-footprint", title: "5.3. Dấu chân và phân tích dòng vật liệu", html: `<p>Dấu chân carbon, nước và sinh thái trả lời các câu hỏi khác nhau, không nên cộng thành một chỉ số tùy tiện. MFA/SFA theo dõi khối lượng vật liệu/chất qua kho và dòng; sai lệch cân bằng là tín hiệu kiểm tra dữ liệu, không phải “nguồn thất thoát” tự động.</p>` },
        { id: "c5-dien-giai", title: "5.4. Diễn giải và giới hạn tuyên bố", html: `<p>Kết quả phụ thuộc mạnh vào ranh giới, phân bổ đồng sản phẩm, dữ liệu nền và phương pháp LCIA. So sánh công khai cần mức tương đương phương pháp và phản biện phù hợp. LONG dùng LCA như một nguồn bằng chứng, không thay thế quy trình chuẩn hóa.</p>` }
      ],
      caseStudy: { title: "Bao bì dùng một lần và tái sử dụng", body: "So sánh theo đơn vị chức năng “phân phối 1.000 L đồ uống an toàn”, gồm sản xuất, vận chuyển, rửa, tỷ lệ hoàn trả và cuối vòng đời. Điểm hòa vốn phụ thuộc số vòng quay, khoảng cách và nguồn điện; không kết luận chỉ từ khối lượng bao bì." },
      lab: { code: "L05", title: "Mini-LCA có kiểm tra ranh giới", tasks: ["Chọn sản phẩm và định nghĩa dịch vụ.", "Lập sơ đồ vòng đời cradle-to-grave.", "Tạo kiểm kê tối thiểu 10 dòng có nguồn.", "Chạy hai kịch bản và phân tích biến nhạy nhất."] },
      quiz: [
        { q: "Đơn vị chức năng dùng để làm gì?", options: ["Ghi khối lượng sản phẩm", "Định lượng dịch vụ làm cơ sở chuẩn hóa và so sánh", "Thay cho ranh giới", "Chọn thuật toán"], answer: 1, explain: "Đơn vị chức năng neo toàn bộ dòng kiểm kê vào cùng dịch vụ." },
        { q: "Số liệu do ML điền thiếu nên được xử lý thế nào?", options: ["Coi như đo trực tiếp", "Gắn cờ, nêu phương pháp và truyền bất định", "Xóa nguồn", "Làm tròn"], answer: 1, explain: "Ước lượng cần provenance và bất định rõ ràng." }
      ],
      exercises: [{ title: "Vận dụng: viết hai đơn vị chức năng khác nhau cho dịch vụ chiếu sáng.", solution: "Ví dụ: 1.000 lumen-giờ tại mặt làm việc; hoặc duy trì độ rọi 500 lux cho 20 m² trong 10.000 giờ. Đơn vị thứ hai mô tả dịch vụ đầy đủ hơn." }],
      refs: ["iso14040", "unep-lca"]
    },
    {
      id: "chuong-6",
      number: 6,
      part: 2,
      shortTitle: "O · Optimization",
      title: "O — Tối ưu hóa hệ thống môi trường",
      duration: "4 giờ",
      level: "Trung cấp",
      summary: "Xây dựng hàm mục tiêu, ràng buộc và nghiệm đánh đổi cho bài toán tài nguyên–môi trường; tránh tối ưu một chỉ số trong khi đẩy chi phí sang nơi khác.",
      keywords: ["tối ưu", "Pareto", "CBA", "MCA"],
      outcomes: ["Phát biểu biến quyết định, hàm mục tiêu và ràng buộc.", "Phân biệt nghiệm tối ưu đơn mục tiêu và tập Pareto.", "Thực hiện MCA minh bạch về trọng số.", "Đánh giá tính khả thi và độ nhạy của phương án."],
      sections: [
        { id: "c6-mo-hinh", title: "6.1. Phát biểu bài toán tối ưu", html: `<p>Một bài toán gồm biến quyết định <i>x</i>, hàm mục tiêu và miền khả thi. Mục tiêu “giảm ô nhiễm” phải được định lượng theo tải lượng, rủi ro hoặc mức vượt chuẩn; ràng buộc phải phản ánh công suất, ngân sách, pháp lý, công bằng và độ tin cậy.</p><div class="formula"><code>min<sub>x</sub> f(x) &nbsp; subject to &nbsp; g<sub>j</sub>(x) ≤ 0, h<sub>k</sub>(x)=0</code><small><i>f</i>: mục tiêu; <i>g</i>: bất đẳng thức; <i>h</i>: đẳng thức. Nghiệm toán học chỉ hữu ích khi biến và ràng buộc có thể thực thi.</small></div>` },
        { id: "c6-pareto", title: "6.2. Đa mục tiêu và biên Pareto", html: `<p>Trong môi trường, chi phí, phát thải, độ tin cậy và công bằng thường xung đột. Một phương án là Pareto-tối ưu nếu không thể cải thiện một mục tiêu mà không làm xấu ít nhất một mục tiêu khác. Biên Pareto cung cấp tập lựa chọn; quyết định cuối vẫn cần giá trị xã hội và quản trị.</p>` },
        { id: "c6-cba", title: "6.3. CBA, CEA và MCA", html: `<p>CBA quy đổi lợi ích–chi phí về tiền và thời điểm; CEA tìm chi phí thấp nhất để đạt mục tiêu; MCA chấm phương án theo nhiều tiêu chí. Trọng số MCA không phải “sự thật khách quan”: phải công bố người tham gia, cách chuẩn hóa, nhất quán và phân tích đảo hạng.</p>` },
        { id: "c6-ai", title: "6.4. Thuật toán và kiểm tra tính khả thi", html: `<p>Quy hoạch tuyến tính phù hợp quan hệ tuyến tính; nonlinear programming dùng cho động học/phản ứng; heuristic hữu ích khi không gian rời rạc lớn nhưng không bảo đảm tối ưu toàn cục. AI có thể tạo surrogate để giảm chi phí mô phỏng, song nghiệm phải được kiểm tra lại bằng mô hình gốc và chuyên gia vận hành.</p>` }
      ],
      caseStudy: { title: "Lịch vận hành trạm xử lý nước thải", body: "Tối thiểu hóa điện năng và mức vượt amoni theo giờ, với ràng buộc công suất thổi khí, DO tối thiểu, chất lượng đầu ra và số lần bật/tắt. So sánh nghiệm với vận hành hiện tại và kiểm tra kịch bản tải sốc." },
      lab: { code: "L06", title: "Biên Pareto chi phí–phát thải", tasks: ["Định nghĩa 3 biến quyết định.", "Viết 2 mục tiêu và ít nhất 4 ràng buộc.", "Tạo 20 phương án giả định.", "Loại phương án bị trội và giải thích lựa chọn cuối."] },
      quiz: [
        { q: "Nghiệm Pareto-tối ưu có phải luôn là quyết định tốt nhất?", options: ["Có", "Không; cần giá trị, ràng buộc và tham vấn", "Chỉ trong LP", "Chỉ khi có AI"], answer: 1, explain: "Pareto loại các phương án bị trội nhưng không tự chọn một điểm duy nhất." },
        { q: "Rủi ro lớn khi dùng surrogate trong tối ưu là gì?", options: ["Luôn chậm", "Bộ tối ưu khai thác vùng surrogate sai", "Không có tham số", "Không vẽ được đồ thị"], answer: 1, explain: "Nghiệm ở vùng ngoài dữ liệu có thể tốt giả tạo; cần kiểm tra bằng mô hình trung thực cao." }
      ],
      exercises: [{ title: "Phân tích: nêu một ràng buộc công bằng cho vị trí trạm trung chuyển rác.", solution: "Ví dụ giới hạn chênh lệch phơi nhiễm mùi/xe tải giữa nhóm dân cư, hoặc không để cộng đồng dễ tổn thương chịu tải vượt một ngưỡng đã tham vấn." }],
      refs: ["epa-modeling"]
    },
    {
      id: "chuong-7",
      number: 7,
      part: 2,
      shortTitle: "N · Network",
      title: "N — Mạng lưới và tương tác hệ thống",
      duration: "4 giờ",
      level: "Trung cấp",
      summary: "Biểu diễn hệ môi trường bằng đồ thị vật chất, sinh thái, hạ tầng và thể chế; phân tích nút trọng yếu, lan truyền, vòng phản hồi và mạng đa lớp.",
      keywords: ["đồ thị", "centrality", "stakeholder", "GNN"],
      outcomes: ["Xây dựng ma trận kề có ý nghĩa vật lý.", "Tính và diễn giải chỉ số mạng cơ bản.", "Lập bản đồ các bên liên quan và vòng phản hồi.", "Phân biệt dự báo liên kết với giải thích nhân quả."],
      sections: [
        { id: "c7-do-thi", title: "7.1. Nút, cạnh, hướng và trọng số", html: `<p>Nút có thể là trạm, loài, cơ sở sản xuất hoặc tổ chức; cạnh có thể là dòng nước, năng lượng, hàng hóa, thông tin hoặc quyền lực. Trước khi tính centrality, phải định nghĩa rõ cạnh là gì, hướng nào và trọng số có đơn vị nào.</p><div class="formula"><code>D = m / [n(n−1)]</code><small>Mật độ <i>D</i> của đồ thị có hướng không có self-loop, với <i>m</i> cạnh và <i>n</i> nút. So sánh mật độ chỉ hợp lý giữa mạng có quy tắc tạo cạnh tương thích.</small></div>` },
        { id: "c7-mang", title: "7.2. Mạng sinh thái, chuỗi cung ứng và hạ tầng", html: `<p>Mạng thức ăn truyền năng lượng; chuỗi cung ứng truyền vật liệu và rủi ro; mạng thoát nước truyền dòng và ô nhiễm. Cùng một lãnh thổ nên được mô tả bằng mạng đa lớp thay vì ép mọi quan hệ vào một loại cạnh.</p>` },
        { id: "c7-stakeholder", title: "7.3. Bên liên quan và vòng nhân quả", html: `<p>Bản đồ quyền lực–quan tâm giúp thiết kế tham gia nhưng không thay cho phân tích thể chế. Sơ đồ vòng nhân quả cần cực tính cạnh, độ trễ và bằng chứng. Một vòng tăng cường hay cân bằng là giả thuyết cấu trúc cần kiểm tra bằng dữ liệu và tri thức địa phương.</p>` },
        { id: "c7-gnn", title: "7.4. Học biểu diễn đồ thị", html: `<p>GNN tổng hợp thông tin lân cận để dự báo tại nút/cạnh/đồ thị. Với mạng sông, hướng dòng và thời gian truyền phải được mã hóa; đồ thị vô hướng đơn giản có thể làm thông tin “chảy ngược”. GNN không thay định luật bảo toàn và cần kiểm định theo lưu vực chưa thấy.</p>` }
      ],
      caseStudy: { title: "Mạng lưới lan truyền sự cố nước", body: "Nút là đoạn sông và điểm lấy nước; cạnh hướng theo dòng, trọng số là thời gian truyền. Kết hợp mạng thông tin giữa doanh nghiệp–cơ quan–cộng đồng để thấy nút thủy văn quan trọng chưa chắc là nút truyền thông hiệu quả." },
      lab: { code: "L07", title: "Phân tích một mạng đa lớp", tasks: ["Tạo 10 nút và 2 loại cạnh.", "Tính degree và betweenness bằng bảng tính hoặc Python.", "Giải thích một nút trung tâm theo từng lớp.", "Đề xuất kiểm chứng thực địa cho một cạnh còn nghi ngờ."] },
      quiz: [
        { q: "Nút có degree cao luôn quan trọng nhất?", options: ["Có", "Không; phụ thuộc loại cạnh, mục tiêu và chỉ số", "Chỉ trong mạng nước", "Chỉ khi vô hướng"], answer: 1, explain: "Degree đo số kết nối cục bộ; vai trò cầu nối hoặc dòng vật chất có thể khác." },
        { q: "Vì sao mạng sông thường cần cạnh có hướng?", options: ["Để đẹp hơn", "Vì dòng và lan truyền có chiều ưu thế", "Để giảm số nút", "Vì GNN yêu cầu"], answer: 1, explain: "Hướng phản ánh cơ chế truyền vật chất và thông tin thủy văn." }
      ],
      exercises: [{ title: "Vận dụng: phân biệt cạnh tương quan và cạnh dòng vật chất.", solution: "Tương quan chỉ đồng biến thống kê, không có đơn vị dòng; cạnh vật chất có hướng, tải lượng/khối lượng theo thời gian và gắn cơ chế vận chuyển." }],
      refs: ["network-science"]
    },
    {
      id: "chuong-8",
      number: 8,
      part: 2,
      shortTitle: "G · Governance",
      title: "G — Quản trị và quyết định môi trường thông minh",
      duration: "4 giờ",
      level: "Trung cấp",
      summary: "Đặt mô hình và AI vào quy trình pháp lý–thể chế có trách nhiệm: EIA/SEA, rủi ro, cảnh báo sớm, giám sát con người, truy vết và cơ chế khiếu nại.",
      keywords: ["quản trị", "EIA", "rủi ro", "AI có trách nhiệm"],
      outcomes: ["Phân biệt đánh giá tác động, rủi ro và hỗ trợ quyết định.", "Thiết kế cảnh báo có ngưỡng, hành động và người chịu trách nhiệm.", "Đánh giá rủi ro AI theo bối cảnh môi trường.", "Lập nhật ký quyết định có thể kiểm toán."],
      sections: [
        { id: "c8-thich-ung", title: "8.1. Quản trị thích ứng", html: `<p>Quản trị thích ứng xem chính sách là giả thuyết cần theo dõi và điều chỉnh. Chu trình gồm mục tiêu, chỉ báo, can thiệp, giám sát, đánh giá và cập nhật. “Thông minh” không đồng nghĩa tự động hoàn toàn; quyết định có hậu quả lớn cần trách nhiệm con người và kênh phản biện.</p>` },
        { id: "c8-rui-ro", title: "8.2. EIA, SEA và đặc trưng rủi ro", html: `<p>EIA đánh giá tác động của dự án; SEA ở mức chiến lược/quy hoạch; đánh giá rủi ro nối mối nguy, phơi nhiễm, liều–đáp ứng và đặc trưng rủi ro. Các bước có thể dùng mô hình nhưng kết luận phải thể hiện kịch bản, nhóm dễ tổn thương và bất định.</p><div class="formula"><code>Risk ∝ Hazard × Exposure × Vulnerability</code><small>Đây là khung khái niệm, không phải công thức phổ quát để nhân các thang điểm bất kỳ. Cách định lượng phải được xác định theo miền ứng dụng.</small></div>` },
        { id: "c8-dss", title: "8.3. Hệ hỗ trợ quyết định và cảnh báo sớm", html: `<p>Một cảnh báo hoàn chỉnh cần nguồn dữ liệu, kiểm tra chất lượng, mô hình, ngưỡng, mức tin cậy, người nhận, hành động tiêu chuẩn và phản hồi sau sự kiện. Dashboard chỉ hiển thị số mà không gắn hành động không phải hệ hỗ trợ quyết định.</p>` },
        { id: "c8-ethics", title: "8.4. AI có trách nhiệm trong môi trường", html: `<p>Theo khuyến nghị UNESCO, cần tôn trọng quyền con người, minh bạch, công bằng, giám sát con người và bền vững. Với AI môi trường, đánh giá cả dấu chân tính toán, sai lệch không gian, quyền dữ liệu cộng đồng, nguy cơ che khuất nhóm ít quan trắc và khả năng khiếu nại kết quả.</p>` }
      ],
      caseStudy: { title: "Cảnh báo ngập đô thị", body: "Mô hình đưa xác suất ngập theo ô lưới. Hệ thống chỉ phát cảnh báo khi dữ liệu mưa đạt QA, khoảng dự báo đủ hẹp và có phương án hành động. Cần kiểm tra tỷ lệ bỏ sót ở khu dân cư phi chính thức, không chỉ độ chính xác toàn thành phố." },
      lab: { code: "L08", title: "Thiết kế protocol cảnh báo", tasks: ["Xác định 3 cấp cảnh báo.", "Gắn mỗi cấp với hành động và chủ thể.", "Đặt điều kiện từ chối dự báo khi dữ liệu hỏng.", "Thiết kế biểu mẫu hậu kiểm sau sự kiện."] },
      quiz: [
        { q: "Dashboard có dữ liệu thời gian thực đã là DSS chưa?", options: ["Luôn luôn", "Chưa; cần logic quyết định, hành động và trách nhiệm", "Chỉ cần biểu đồ", "Chỉ cần AI"], answer: 1, explain: "DSS nối bằng chứng với lựa chọn và quy trình hành động." },
        { q: "Giám sát con người có nghĩa gì?", options: ["Con người chỉ xem báo cáo", "Có thẩm quyền hiểu, can thiệp và chịu trách nhiệm phù hợp", "AI không được dùng", "Luôn duyệt từng điểm dữ liệu"], answer: 1, explain: "Mức giám sát tùy rủi ro nhưng phải thực chất, không chỉ hình thức." }
      ],
      exercises: [{ title: "Phân tích: nêu hai chỉ báo công bằng cho cảnh báo ngập.", solution: "Ví dụ recall theo nhóm/khu vực dễ tổn thương; chênh lệch thời gian nhận cảnh báo; tỷ lệ tiếp cận kênh cảnh báo; thời gian hỗ trợ sau cảnh báo." }],
      refs: ["unesco-ai", "ipcc-ar6"]
    },
    {
      id: "chuong-9",
      number: 9,
      part: 3,
      shortTitle: "Hệ kỹ thuật sạch hơn",
      title: "Hệ kỹ thuật, sản xuất sạch hơn và điều khiển",
      duration: "4 giờ",
      level: "Ứng dụng",
      summary: "Ứng dụng kỹ thuật hệ thống vào pilot, xử lý nước/chất thải, sản xuất sạch hơn, kinh tế tuần hoàn và điều khiển tối ưu có ràng buộc an toàn.",
      keywords: ["pilot", "cleaner production", "MPC", "digital twin"],
      outcomes: ["Thiết kế thí nghiệm pilot có tiêu chí thành công.", "Lập cân bằng vật chất cho tiến trình sản xuất.", "Xác định điểm nóng và thứ bậc giải pháp sạch hơn.", "Phân biệt tối ưu mô phỏng với điều khiển vận hành an toàn."],
      sections: [
        { id: "c9-engineering", title: "9.1. Từ yêu cầu đến hệ thống kiểm chứng", html: `<p>Kỹ thuật hệ thống chuyển nhu cầu bên liên quan thành yêu cầu đo được, kiến trúc, thiết kế, tích hợp và xác minh. Pilot không chỉ là “mô hình nhỏ” mà là thí nghiệm để giảm bất định về công nghệ, tải, vận hành và mở rộng quy mô.</p>` },
        { id: "c9-cp", title: "9.2. Điểm nóng và sản xuất sạch hơn", html: `<p>Ưu tiên theo thứ bậc: tránh phát sinh → giảm tại nguồn → tái sử dụng nội bộ → thu hồi → xử lý → thải bỏ. Một giải pháp giảm chất thải nhưng tăng độc tính hoặc năng lượng ở công đoạn khác cần được đánh giá vòng đời.</p><div class="formula"><code>η = (C<sub>in</sub> − C<sub>out</sub>) / C<sub>in</sub> × 100%</code><small>Hiệu suất nồng độ chỉ phù hợp khi lưu lượng tương đương. Khi lưu lượng đổi, so sánh tải lượng <i>Q×C</i> để tránh kết luận sai.</small></div>` },
        { id: "c9-circular", title: "9.3. Kinh tế tuần hoàn và cộng sinh công nghiệp", html: `<p>Tuần hoàn có giá trị khi giữ chức năng vật liệu với tác động vòng đời thấp hơn. “Tái chế được” không đồng nghĩa thực tế được tái chế. Cần xét tỷ lệ thu gom, chất lượng vật liệu thứ cấp, năng lượng, thị trường và rủi ro chất ô nhiễm tích lũy.</p>` },
        { id: "c9-control", title: "9.4. Digital twin, MPC và học tăng cường", html: `<p>Digital twin là đại diện số được đồng bộ có mục đích với hệ vật lý, không phải mọi mô hình 3D. MPC dự báo trạng thái và tối ưu chuỗi điều khiển dưới ràng buộc. Học tăng cường trong hệ xử lý phải bắt đầu ở mô phỏng/sandbox, có giới hạn an toàn và cơ chế fallback; không thăm dò trực tiếp trên hệ thật khi có nguy cơ môi trường.</p>` }
      ],
      caseStudy: { title: "Tối ưu sục khí bùn hoạt tính", body: "Mục tiêu giảm điện nhưng duy trì amoni đầu ra và DO an toàn. Xây mô hình từ cân bằng và dữ liệu SCADA, kiểm định mùa mưa/khô, chạy shadow mode trước khi cho phép gợi ý vận hành." },
      lab: { code: "L09", title: "Thiết kế pilot có thể mở rộng", tasks: ["Viết 5 yêu cầu định lượng.", "Xác định biến kiểm soát, nhiễu và biến đáp ứng.", "Lập ma trận thí nghiệm.", "Nêu tiêu chí go/no-go và rủi ro scale-up."] },
      quiz: [
        { q: "Giảm nồng độ đầu ra luôn đồng nghĩa giảm tải lượng?", options: ["Có", "Không; cần xét lưu lượng", "Chỉ với BOD", "Chỉ khi có AI"], answer: 1, explain: "Tải lượng bằng Q×C; lưu lượng tăng có thể làm tải không giảm." },
        { q: "Điều kiện tối thiểu trước RL trên hệ thật?", options: ["Mô hình lớn", "Ràng buộc an toàn, sandbox/shadow và fallback", "Nhiều biểu đồ", "Không cần con người"], answer: 1, explain: "Thăm dò của RL có thể gây hậu quả; cần môi trường an toàn và quyền can thiệp." }
      ],
      exercises: [{ title: "Vận dụng: viết KPI cho giải pháp giảm nước rửa.", solution: "m³ nước/tấn sản phẩm, kg COD/tấn, tỷ lệ lỗi sản phẩm, năng lượng/tấn, chi phí vòng đời; kèm baseline, kỳ đo và khoảng tin cậy." }],
      refs: ["unep-lca", "swmm"]
    },
    {
      id: "chuong-10",
      number: 10,
      part: 3,
      shortTitle: "Hệ sinh thái và tài nguyên",
      title: "Hệ sinh thái, đa dạng sinh học và tài nguyên",
      duration: "4 giờ",
      level: "Ứng dụng",
      summary: "Mô hình hóa quần thể, dịch vụ hệ sinh thái, đường truyền ô nhiễm và quan trắc đa phương thức bằng ảnh/âm thanh với kiểm định sinh thái phù hợp.",
      keywords: ["quần thể", "dịch vụ hệ sinh thái", "biodiversity AI", "lan truyền"],
      outcomes: ["Mô phỏng tăng trưởng quần thể đơn giản và giới hạn giả định.", "Phân loại dịch vụ hệ sinh thái mà không đếm trùng.", "Thiết kế lấy mẫu ảnh/âm thanh đại diện.", "Xây đường nguồn–đường truyền–thụ thể cho ô nhiễm."],
      sections: [
        { id: "c10-dynamics", title: "10.1. Cấu trúc và động thái hệ sinh thái", html: `<p>Mô hình logistic mô tả tăng trưởng bị giới hạn bởi sức chứa, nhưng giả định môi trường đồng nhất và tham số ổn định. Hệ thật có mùa, cấu trúc tuổi, không gian, tương tác loài và biến cố; vì vậy logistic là đường cơ sở để hiểu cơ chế, không phải chân lý phổ quát.</p><div class="formula"><code>dN/dt = rN(1 − N/K)</code><small><i>N</i>: kích thước quần thể; <i>r</i>: tốc độ tăng nội tại; <i>K</i>: sức chứa. Cần nêu đơn vị thời gian và miền ước lượng.</small></div>` },
        { id: "c10-services", title: "10.2. Dịch vụ hệ sinh thái và lượng giá", html: `<p>Dịch vụ cung cấp, điều tiết, văn hóa và hỗ trợ có quan hệ chồng lấp. Lượng giá tiền tệ là một loại bằng chứng, không thay thế giá trị nội tại, văn hóa và phân phối. Tránh cộng cả quá trình trung gian và lợi ích cuối cùng gây đếm trùng.</p>` },
        { id: "c10-bioai", title: "10.3. Quan trắc đa dạng sinh học bằng AI", html: `<p>Soundscape, camera trap và eDNA mở rộng quan trắc nhưng có xác suất phát hiện khác nhau. Mô hình phân loại phải kiểm định theo địa điểm/thiết bị/mùa chưa thấy; nhãn chuyên gia cần phiên bản và mức chắc chắn. Tỷ lệ phát hiện không đồng nhất với độ phong phú nếu chưa hiệu chỉnh effort và detectability.</p>` },
        { id: "c10-pathway", title: "10.4. Nguồn – đường truyền – thụ thể", html: `<p>Đánh giá đường truyền xác định nguồn, môi trường vận chuyển, quá trình biến đổi, điểm phơi nhiễm và thụ thể. Mô hình lan truyền nên nối thủy văn/khí tượng với số phận hóa chất và sinh thái; không suy nồng độ mô từ nồng độ nước nếu thiếu hệ số và động học phù hợp.</p>` }
      ],
      caseStudy: { title: "Quan trắc chim đất ngập nước", body: "Kết hợp 20 máy ghi âm và 10 camera qua hai mùa. Giữ nguyên 5 điểm làm kiểm định không gian, ước lượng xác suất phát hiện, xác minh thủ công lớp hiếm và không công bố tọa độ chính xác loài nhạy cảm." },
      lab: { code: "L10", title: "Thiết kế mạng quan trắc sinh thái", tasks: ["Đặt câu hỏi quần thể hoặc phân bố.", "Thiết kế phân tầng sinh cảnh và effort.", "Nêu sai số phát hiện và cách hiệu chỉnh.", "Đặt quy tắc dữ liệu nhạy cảm."] },
      quiz: [
        { q: "Số lần mô hình nhận diện tiếng chim có bằng số cá thể không?", options: ["Luôn bằng", "Không; còn detectability, effort và trùng lặp", "Chỉ mùa khô", "Nếu accuracy cao thì bằng"], answer: 1, explain: "Lượt phát hiện là quan sát, không trực tiếp là độ phong phú." },
        { q: "K trong mô hình logistic là gì?", options: ["Hằng số phân hủy", "Sức chứa trong điều kiện mô hình", "Độ chính xác", "Số loài"], answer: 1, explain: "K là mức quần thể cân bằng lý tưởng trong giả định của mô hình." }
      ],
      exercises: [{ title: "Phân tích: vì sao kiểm định ngẫu nhiên clip âm thanh dễ lạc quan?", solution: "Clip cùng điểm/đêm chia sẻ tiếng nền, thiết bị và cá thể; nên tách theo điểm hoặc chiến dịch để đo chuyển miền." }],
      refs: ["ipcc-ar6"]
    },
    {
      id: "chuong-11",
      number: 11,
      part: 3,
      shortTitle: "Đô thị và quản lý",
      title: "Quản lý môi trường và đô thị thông minh",
      duration: "4 giờ",
      level: "Ứng dụng",
      summary: "Tích hợp EMS, bản đồ rủi ro, tài nguyên đô thị, hạ tầng xanh, khí hậu và nền tảng dữ liệu liên thông theo một kiến trúc quyết định lấy con người làm trung tâm.",
      keywords: ["ISO 14001", "WebGIS", "đô thị", "khí hậu"],
      outcomes: ["Liên hệ PDCA với dữ liệu và mô hình.", "Thiết kế bản đồ rủi ro có chú giải bất định.", "Lập KPI nước–năng lượng–chất thải theo dịch vụ.", "Đề xuất kiến trúc dữ liệu đô thị có liên thông và trách nhiệm."],
      sections: [
        { id: "c11-ems", title: "11.1. Hệ thống quản lý môi trường và PDCA", html: `<p>ISO 14001 đặt trọng tâm vào hệ thống quản lý, nghĩa vụ tuân thủ, khía cạnh môi trường, mục tiêu, vận hành, đánh giá và cải tiến. Dữ liệu và AI hỗ trợ Plan–Do–Check–Act nhưng không tự tạo sự phù hợp tiêu chuẩn; bằng chứng kiểm toán và trách nhiệm tổ chức vẫn thiết yếu.</p>` },
        { id: "c11-mapping", title: "11.2. Eco-mapping và bản đồ rủi ro", html: `<p>Bản đồ môi trường phải phân biệt hazard, exposure và risk; thể hiện ngày dữ liệu, độ phân giải, miền thiếu và mức bất định. Màu sắc mạnh không bù được sai số vị trí. Không công bố dữ liệu nhạy cảm ở độ phân giải gây hại.</p>` },
        { id: "c11-urban", title: "11.3. Chất thải, nước, năng lượng và hạ tầng xanh", html: `<p>KPI đô thị nên chuẩn hóa theo dân số, dịch vụ và cấu trúc không gian: kg chất thải/người-ngày, thất thoát nước, kWh/m², tiếp cận không gian xanh trong thời gian đi bộ. Hạ tầng xanh cần đánh giá đồng lợi ích và bảo trì, không chỉ diện tích danh nghĩa.</p><div class="formula"><code>I = Resource use / Service delivered</code><small>Cường độ <i>I</i> phải có mẫu số phản ánh dịch vụ; giảm tổng tài nguyên và giảm cường độ là hai mục tiêu khác nhau.</small></div>` },
        { id: "c11-digital", title: "11.4. Khí hậu và kiến trúc đô thị số", html: `<p>Phân tích khí hậu kết hợp hazard, phơi nhiễm, dễ tổn thương và năng lực thích ứng theo kịch bản. Kiến trúc số nên dùng API, từ điển dữ liệu và định danh chung; dashboard liên ngành cần provenance, phân quyền và nhật ký thay đổi. Digital twin chỉ có giá trị khi dữ liệu–mô hình–quyết định được đồng bộ theo mục đích cụ thể.</p>` }
      ],
      caseStudy: { title: "Bản đồ nóng đô thị và ưu tiên cây xanh", body: "Kết hợp nhiệt độ bề mặt, che phủ, dân số, tuổi, thu nhập và tiếp cận không gian xanh. Không dùng LST như nhiệt độ cơ thể; kiểm chứng bằng cảm biến tại chỗ và tham vấn cộng đồng trước khi ưu tiên đầu tư." },
      lab: { code: "L11", title: "Thiết kế dashboard ra quyết định đô thị", tasks: ["Chọn một quyết định cụ thể.", "Định nghĩa 6 chỉ báo có đơn vị và nguồn.", "Thiết kế lớp bất định/thiếu dữ liệu.", "Gắn từng cảnh báo với đơn vị chịu trách nhiệm."] },
      quiz: [
        { q: "Bản đồ hazard có đồng nghĩa bản đồ risk?", options: ["Có", "Không; risk còn phụ thuộc phơi nhiễm và dễ tổn thương", "Chỉ khác màu", "Chỉ ở nông thôn"], answer: 1, explain: "Khu hazard cao nhưng không có thụ thể có rủi ro khác khu dân cư dễ tổn thương." },
        { q: "AI có thể tự chứng nhận phù hợp ISO 14001 không?", options: ["Có", "Không; nó chỉ hỗ trợ bằng chứng và quy trình", "Nếu dùng LLM", "Nếu dữ liệu mở"], answer: 1, explain: "Chứng nhận đánh giá hệ thống quản lý bởi quy trình và tổ chức có thẩm quyền." }
      ],
      exercises: [{ title: "Vận dụng: viết chú giải bất định cho bản đồ ưu tiên.", solution: "Nêu nguồn/năm, độ phân giải, khoảng tin cậy hoặc lớp confidence, vùng không dữ liệu, phương pháp chuẩn hóa và cảnh báo không dùng cho quyết định thửa đất." }],
      refs: ["iso14001", "ipcc-ar6", "ogc-sensorthings"]
    },
    {
      id: "chuong-12",
      number: 12,
      part: 3,
      shortTitle: "Carbon và năng lượng",
      title: "Trung hòa carbon và chuyển đổi hệ thống năng lượng",
      duration: "5 giờ",
      level: "Ứng dụng nâng cao",
      summary: "Từ kiểm kê khí nhà kính đến tối ưu tổ hợp năng lượng, mạng lưới điện–giao thông và quản trị chuyển đổi công bằng theo bằng chứng có thể kiểm toán.",
      keywords: ["GHG", "carbon neutrality", "renewable energy", "just transition"],
      outcomes: ["Thiết lập ranh giới kiểm kê phát thải và tránh đếm trùng.", "Xây baseline và kịch bản giảm phát thải có điều kiện.", "Thiết kế bài toán tối ưu năng lượng đa mục tiêu.", "Đánh giá phân phối lợi ích–chi phí của chuyển đổi."],
      sections: [
        { id: "c12-inventory", title: "12.1. Kiểm kê phát thải và chất lượng dữ liệu", html: `<p>Kiểm kê phải xác định tổ chức/sản phẩm/khu vực, kỳ báo cáo, khí, nguồn, phương pháp và hệ số phát thải. AI có thể phát hiện bất thường, điền thiếu có kiểm soát và đối soát hóa đơn–cảm biến, nhưng mọi ước lượng phải có cờ, phiên bản và khoảng bất định.</p><div class="formula"><code>E = Σ Activity<sub>i</sub> × EF<sub>i</sub> × GWP</code><small>Hoạt động, hệ số phát thải và GWP phải cùng phiên bản/kỳ quy đổi; báo riêng dữ liệu đo, tính toán và giả định.</small></div>` },
        { id: "c12-scenario", title: "12.2. Baseline, kịch bản và đường cong giảm phát thải", html: `<p>Baseline không phải “không làm gì” tuyệt đối mà là quỹ đạo tham chiếu có giả định dân số, sản lượng, công nghệ và chính sách. Kịch bản cần tách hiệu quả năng lượng, điện hóa, thay nhiên liệu, thay đổi nhu cầu và hấp thụ carbon để tránh đếm trùng. Chi phí giảm biên phải đi cùng tính khả thi, thời gian và đồng lợi ích.</p>` },
        { id: "c12-energy", title: "12.3. Tối ưu năng lượng tái tạo và lưu trữ", html: `<p>Bài toán điển hình tối thiểu hóa chi phí vòng đời và phát thải trong khi đáp ứng cân bằng công suất, độ tin cậy, giới hạn lưới, tiềm năng đất và yêu cầu công bằng. Dữ liệu thời tiết và nhu cầu phải giữ tương quan thời gian; dùng “năm trung bình” có thể bỏ sót cực đoan.</p><div class="formula"><code>min {Cost(x), Emissions(x), UnservedEnergy(x)} subject to Ax ≤ b</code><small>Kết quả là tập phương án Pareto, không phải một đáp án kỹ thuật duy nhất; quyết định cuối cần quy tắc quản trị rõ ràng.</small></div>` },
        { id: "c12-governance", title: "12.4. Thị trường carbon và chuyển đổi công bằng", html: `<p>Thị trường carbon cần MRV đáng tin cậy, phân bổ hạn ngạch minh bạch, kiểm soát thao túng và cơ chế xử lý tác động phân phối. Trung Quốc đặt mục tiêu đạt đỉnh CO₂ trước 2030 và trung hòa carbon trước 2060; đây là case chính sách để phân tích bằng LONG, không phải mô hình duy nhất cho mọi quốc gia.</p>` }
      ],
      caseStudy: { title: "Lộ trình giảm phát thải cho khu công nghiệp", body: "L tích hợp đồng hồ điện, nhiên liệu và LCA; O tìm biên Pareto điện mặt trời–lưu trữ–hiệu suất; N mô hình hóa trao đổi nhiệt, vật liệu và lưới điện; G quy định MRV, chia sẻ lợi ích và bảo vệ lao động trong chuyển đổi." },
      lab: { code: "L12", title: "Xây đường cong giảm phát thải biên", tasks: ["Lập baseline có năm gốc và biên hệ thống.", "Ước lượng chi phí–tCO₂e của 6 biện pháp.", "Chạy ba kịch bản giá năng lượng/carbon.", "Viết khuyến nghị kèm bất định và tác động phân phối."] },
      quiz: [
        { q: "AI có thể thay thế MRV chính thức không?", options: ["Có", "Không; AI hỗ trợ nhưng cần dữ liệu, phương pháp và kiểm chứng có trách nhiệm", "Chỉ khi là mô hình lớn", "Nếu dữ liệu bí mật"], answer: 1, explain: "Kiểm kê phục vụ tuân thủ phải giữ provenance, phương pháp và trách nhiệm tổ chức." },
        { q: "Một phương án chi phí thấp nhất luôn là tối ưu chính sách?", options: ["Có", "Không; còn độ tin cậy, phát thải, đất và công bằng", "Chỉ với điện", "Chỉ khi có pin"], answer: 1, explain: "Tối ưu đa mục tiêu làm lộ đánh đổi thay vì che chúng trong một con số." }
      ],
      exercises: [{ title: "Vận dụng: đề xuất bốn chỉ báo chuyển đổi công bằng.", solution: "Việc làm mất/tạo theo nhóm; tỷ lệ thu nhập chi cho năng lượng; tiếp cận vốn/công nghệ; ô nhiễm địa phương; tham gia quyết định; bồi thường và đào tạo lại." }],
      refs: ["ipcc-ar6", "china-carbon-plan", "china-carbon-market"]
    },
    {
      id: "chuong-13",
      number: 13,
      part: 3,
      shortTitle: "Công bằng toàn cầu",
      title: "Công bằng môi trường, chuỗi cung ứng và hợp tác toàn cầu",
      duration: "4 giờ",
      level: "Liên ngành",
      summary: "Đặt phân tích môi trường trong cấu trúc kinh tế–xã hội toàn cầu: phơi nhiễm bất bình đẳng, dòng chất thải xuyên biên giới, khoáng sản chuyển đổi và quyền dữ liệu cộng đồng.",
      keywords: ["environmental justice", "e-waste", "supply chain", "data justice"],
      outcomes: ["Phân tích phân bố phơi nhiễm và lợi ích theo nhóm.", "Lập mạng chuỗi cung ứng và điểm rủi ro xuyên biên giới.", "Thiết kế AI hỗ trợ cộng đồng thay vì khai thác dữ liệu.", "So sánh case toàn cầu với bối cảnh Việt Nam."],
      sections: [
        { id: "c13-justice", title: "13.1. Từ rủi ro trung bình đến phân phối rủi ro", html: `<p>Giá trị trung bình có thể che khuất cộng đồng chịu tải cao. Phân tích cần tách hazard, exposure, vulnerability và capability; báo kết quả theo không gian, giới, tuổi, thu nhập, nghề nghiệp hoặc nhóm phù hợp mà không tái nhận diện cá nhân.</p>` },
        { id: "c13-trade", title: "13.2. Chất thải, công nghệ lạc hậu và chuỗi cung ứng", html: `<p>Dòng vật liệu xuyên biên giới phải được theo dõi từ nguồn phát sinh đến xử lý cuối cùng. Nhãn “tái chế” không tự bảo đảm an toàn. Phân tích LONG nối bằng chứng vòng đời, tối ưu thiết kế–thu hồi, mạng logistics–tài chính và quản trị trách nhiệm mở rộng của nhà sản xuất.</p>` },
        { id: "c13-resources", title: "13.3. Khoáng sản chuyển đổi và xung đột tài nguyên", html: `<p>Lithium, cobalt, nickel và đất hiếm hỗ trợ điện hóa nhưng khai thác có thể chuyển gánh nặng sang nước, đất, lao động và cộng đồng bản địa. Cần đánh giá vòng đời, dấu chân nước, truy xuất nguồn gốc và quyền tham vấn; “xanh” ở điểm sử dụng không đồng nghĩa công bằng trên toàn chuỗi.</p>` },
        { id: "c13-data", title: "13.4. Công bằng dữ liệu và khoa học công dân", html: `<p>Không thu thập dữ liệu cộng đồng nếu thiếu mục đích, đồng thuận, quyền truy cập và cơ chế chia sẻ lợi ích. AI cần kiểm tra khoảng trống quan trắc, sai số theo nhóm, khả năng phản đối và chi phí duy trì. Khoa học công dân có giá trị khi tri thức địa phương tham gia cả thiết kế câu hỏi lẫn giải thích kết quả.</p>` }
      ],
      caseStudy: { title: "Dòng rác điện tử từ tiêu dùng đến tái chế", body: "Nhóm lập mạng quốc gia–doanh nghiệp–đầu mối–cơ sở xử lý, phân biệt luồng hợp pháp và rủi ro, ước lượng tải kim loại nặng, đánh giá sinh kế lao động phi chính thức và đề xuất hệ thống truy xuất không xâm phạm quyền riêng tư." },
      lab: { code: "L13", title: "Bản đồ công bằng môi trường", tasks: ["Chọn một hazard và đơn vị không gian phù hợp.", "Xây chỉ báo phơi nhiễm–dễ tổn thương có nguồn.", "Kiểm tra độ nhạy theo trọng số và độ phân giải.", "Tổ chức phiên phản biện với góc nhìn cộng đồng bị ảnh hưởng."] },
      quiz: [
        { q: "Bản đồ rủi ro trung bình cấp tỉnh đủ để kết luận công bằng?", options: ["Đủ", "Không; có thể che bất bình đẳng nội vùng và sai số phân giải", "Chỉ cần màu", "Chỉ cần dân số"], answer: 1, explain: "Kết luận phân phối phải phù hợp đơn vị phân tích và chất lượng dữ liệu." },
        { q: "Truy xuất nguồn gốc có tự bảo đảm chuỗi cung ứng công bằng?", options: ["Có", "Không; còn tiêu chuẩn, kiểm chứng, quyền lao động và cơ chế khắc phục", "Nếu dùng blockchain", "Nếu dùng vệ tinh"], answer: 1, explain: "Công nghệ ghi nhận không thay thế thể chế và quyền." }
      ],
      exercises: [{ title: "Phân tích: viết nguyên tắc chống “thực dân dữ liệu” cho dự án AI.", solution: "Đồng thiết kế; tối thiểu hóa dữ liệu; đồng thuận; quyền rút; quản trị tại chỗ; chia sẻ lợi ích; minh bạch mô hình; năng lực tự vận hành; cơ chế khiếu nại." }],
      refs: ["unesco-ai", "basel-convention", "unep-ejustice"]
    },
    {
      id: "chuong-14",
      number: 14,
      part: 4,
      shortTitle: "Digital Twin lưu vực",
      title: "Xây dựng Digital Twin cho lưu vực sông theo Mô hình LONG",
      duration: "6 giờ",
      level: "Nâng cao",
      summary: "Thiết kế bản sao số lưu vực từ IoT, viễn thám, mô hình thủy văn–chất lượng nước, đồng hóa dữ liệu, kịch bản và vòng quyết định thời gian thực.",
      keywords: ["digital twin", "river basin", "data assimilation", "decision support"],
      outcomes: ["Phân biệt mô hình, dashboard và digital twin.", "Thiết kế kiến trúc dữ liệu–mô hình–quyết định có phiên bản.", "Thực hiện đồng hóa dữ liệu và cập nhật trạng thái ở mức nhập môn.", "Đặt tiêu chí vận hành, fallback và audit cho twin."],
      sections: [
        { id: "c14-definition", title: "14.1. Định nghĩa, mức trưởng thành và mục đích", html: `<p>Một digital twin môi trường phải có đối tượng thật, mục đích quyết định, liên kết dữ liệu có nhịp cập nhật, mô hình trạng thái, mô phỏng kịch bản và cơ chế phản hồi. Có thể phân bậc: bản sao dữ liệu → mô hình đồng bộ → dự báo → gợi ý → điều khiển có giám sát. Không nên nhảy cấp khi QA/QC và trách nhiệm chưa đủ.</p>` },
        { id: "c14-architecture", title: "14.2. Kiến trúc tham chiếu cho lưu vực", html: `<div class="process-strip"><div class="process-step"><b>Quan trắc</b>IoT, trạm chuẩn, radar, vệ tinh</div><div class="process-step"><b>Nền dữ liệu</b>QA/QC, schema, provenance</div><div class="process-step"><b>Twin core</b>Trạng thái, mô hình, đồng hóa</div><div class="process-step"><b>Quyết định</b>Kịch bản, cảnh báo, phản hồi</div></div><p>Định danh trạm/đoạn sông, hệ tọa độ, thời gian và đơn vị phải thống nhất. Mọi phiên bản dữ liệu, tham số, mã và kịch bản cần được truy vết từ dashboard đến nguồn.</p>` },
        { id: "c14-assimilation", title: "14.3. Đồng hóa dữ liệu và dự báo", html: `<p>Đồng hóa dữ liệu kết hợp trạng thái mô hình với quan trắc có sai số để cập nhật ước lượng. Ở mức nhập môn, có thể dùng Kalman filter cho hệ tuyến tính gần Gaussian; hệ phi tuyến có thể cần ensemble/particle methods. Cần kiểm tra innovation, coverage và độ nhạy với sai số quan trắc.</p><div class="formula"><code>x̂<sup>a</sup> = x̂<sup>f</sup> + K(y − Hx̂<sup>f</sup>)</code><small>Trạng thái phân tích bằng trạng thái dự báo cộng hiệu chỉnh theo phần dư quan trắc; K phụ thuộc bất định mô hình và đo.</small></div>` },
        { id: "c14-long", title: "14.4. Vận hành twin theo LONG", html: `<p>L quản trị bằng chứng, drift và vòng học; O tối ưu hồ chứa, cấp nước hoặc xử lý dưới ràng buộc; N giữ topology thủy văn và mạng bên liên quan; G quy định thẩm quyền, mức cảnh báo, nhật ký can thiệp và điều kiện chuyển sang chế độ an toàn.</p>` },
        { id: "c14-cases", title: "14.5. Case Trung Quốc và Châu Âu", html: `<p>Chương sử dụng các sáng kiến Digital Twin lưu vực tại Trung Quốc như bối cảnh học tập và Destination Earth của Liên minh Châu Âu như kiến trúc tham chiếu ở quy mô lớn. Người học phải phân biệt thông tin chính thức với tuyên bố dự án, đồng thời không chuyển nguyên xi hạ tầng siêu máy tính vào bài toán địa phương.</p>` }
      ],
      caseStudy: { title: "Twin cảnh báo ô nhiễm cho đoạn sông 50 km", body: "Twin cập nhật mỗi 15 phút từ 8 cảm biến và một trạm chuẩn, chạy mô hình lan truyền ensemble, phát ba cấp cảnh báo và lưu toàn bộ phiên bản. Khi quá 30% cảm biến lỗi hoặc khoảng dự báo vượt ngưỡng, hệ chuyển sang cảnh báo dữ liệu không đủ thay vì phát kết luận chắc chắn." },
      lab: { code: "L14", title: "Thiết kế kiến trúc Digital Twin tối thiểu", tasks: ["Viết quyết định và SLA của twin.", "Lập sơ đồ nguồn dữ liệu–QA–mô hình–API–người dùng.", "Đặt chu kỳ cập nhật và điều kiện fallback.", "Mô phỏng một sự cố, hậu kiểm cảnh báo và cập nhật model card."] },
      quiz: [
        { q: "Mô hình 3D tĩnh có phải digital twin đầy đủ?", options: ["Có", "Không; thiếu liên kết cập nhật, dự báo/quyết định và phản hồi", "Nếu đẹp", "Nếu chạy trên cloud"], answer: 1, explain: "Digital twin được định nghĩa bởi quan hệ vận hành với hệ thật và mục đích, không bởi hình thức 3D." },
        { q: "Khi cảm biến lỗi diện rộng, twin nên làm gì?", options: ["Vẫn phát cảnh báo chắc chắn", "Kích hoạt fallback và công bố dữ liệu không đủ", "Tự bịa dữ liệu", "Xóa log"], answer: 1, explain: "Fail-safe và khả năng từ chối là yêu cầu quản trị cốt lõi." }
      ],
      exercises: [{ title: "Sáng tạo: lập ma trận trưởng thành 5 mức cho twin lưu vực.", solution: "Dùng các trục: liên kết dữ liệu, mô hình, bất định, tự động hóa quyết định, quản trị, an ninh, khả năng tái lập và hậu kiểm." }],
      refs: ["ogc-sensorthings", "destine", "epa-modeling", "tsinghua-digital-twin"]
    },
    {
      id: "chuong-15",
      number: 15,
      part: 4,
      shortTitle: "Dự án tích hợp",
      title: "Dự án tích hợp, đạo đức và xu hướng phát triển",
      duration: "7 giờ",
      level: "Tổng hợp",
      summary: "Hoàn thiện một dự án từ câu hỏi đến sản phẩm tái lập: dữ liệu, mô hình, LONG, kịch bản, đánh giá, đạo đức, quản trị và truyền đạt cho người ra quyết định.",
      keywords: ["capstone", "reproducibility", "scenario", "digital twin"],
      outcomes: ["Xây protocol nghiên cứu có thể đăng ký trước.", "Tích hợp bốn trụ LONG có lý do, không hình thức.", "Thực hiện audit dữ liệu–mô hình–đạo đức.", "Trình bày kết quả, bất định và giới hạn cho nhiều nhóm người dùng."],
      sections: [
        { id: "c15-protocol", title: "15.1. Protocol dự án tích hợp", html: `<p>Protocol gồm vấn đề, quyết định, bên liên quan, câu hỏi, giả thuyết, ranh giới, dữ liệu, mô hình, thiết kế kiểm định, chỉ số thành công, rủi ro và kế hoạch công bố. Đăng ký trước phần cốt lõi giúp phân biệt phân tích xác nhận với khám phá.</p>` },
        { id: "c15-long", title: "15.2. Tích hợp LONG có chọn lọc", html: `<p>Không dự án nào bắt buộc dùng mọi kỹ thuật. L kiểm tra bằng chứng dữ liệu/vòng đời; O đặt phương án và đánh đổi; N làm rõ tương tác/lan truyền; G bảo đảm trách nhiệm và khả năng thực thi. Mỗi trụ phải trả lời một câu hỏi cụ thể và tạo đầu ra kiểm chứng được.</p>` },
        { id: "c15-scenario", title: "15.3. Kịch bản, dự báo và stress test", html: `<p>Kịch bản không phải dự báo xác suất nếu chưa có phân bố. Xây baseline, can thiệp và stress test; giữ nhất quán giả định dân số, khí hậu, công nghệ và chính sách. Báo khoảng kết quả và điều kiện làm đảo kết luận.</p>` },
        { id: "c15-audit", title: "15.4. Audit đạo đức và khả năng tái lập", html: `<p>Hồ sơ bàn giao gồm dữ liệu hoặc hướng dẫn truy cập, schema, mã nguồn, môi trường chạy, seed, tham số, model/data card, giấy phép, nhật ký quyết định và danh sách giới hạn. Audit đạo đức xem xét quyền, đại diện, tác động môi trường của tính toán, khả năng phản đối và kế hoạch ngừng hệ thống.</p>` },
        { id: "c15-future", title: "15.5. Từ mô hình đến hạ tầng quyết định có trách nhiệm", html: `<p>Xu hướng gồm cảm biến biên, Earth observation foundation models, mô hình lai, GNN, digital twin và agent hỗ trợ khoa học. Tiêu chí trưởng thành không phải số tham số mà là năng lực tạo bằng chứng đúng thời điểm, có bất định, có truy vết và cải thiện quyết định mà không chuyển rủi ro sang cộng đồng khác.</p>` }
      ],
      caseStudy: { title: "Đề án LONG cho một địa phương", body: "Nhóm chọn một lưu vực hoặc đô thị; xây kho dữ liệu nhỏ có provenance, mô hình baseline, hai kịch bản, biên Pareto, mạng bên liên quan và protocol quản trị. Sản phẩm gồm bài báo cáo, mã, dashboard và bản tóm tắt chính sách 2 trang." },
      lab: { code: "CAP", title: "Đồ án cuối khóa", tasks: ["Đề cương và đạo đức dữ liệu: 15%.", "Dữ liệu tái lập và QA/QC: 20%.", "Mô hình, kiểm định và bất định: 25%.", "Tích hợp LONG và phương án: 20%.", "Sản phẩm số, trình bày và phản biện: 20%."] },
      quiz: [
        { q: "Kịch bản khác dự báo xác suất ở điểm nào?", options: ["Không dùng dữ liệu", "Mô tả tương lai có điều kiện, không mặc nhiên gán xác suất", "Luôn chính xác hơn", "Không có giả định"], answer: 1, explain: "Kịch bản khám phá điều kiện; xác suất chỉ hợp lệ khi có phương pháp ước lượng phù hợp." },
        { q: "Sản phẩm nào quan trọng cho tái lập?", options: ["Chỉ PDF", "Dữ liệu/schema, mã, môi trường, tham số và provenance", "Chỉ mô hình đã huấn luyện", "Ảnh dashboard"], answer: 1, explain: "Tái lập cần đủ đầu vào và quy trình, không chỉ đầu ra tĩnh." }
      ],
      exercises: [{ title: "Sáng tạo: viết tiêu chí “ngừng sử dụng mô hình”.", solution: "Ví dụ drift vượt ngưỡng, cảm biến chuẩn mất kết nối, coverage khoảng dự báo dưới mục tiêu, thay đổi pháp lý/mục đích, chênh lệch sai số nhóm vượt ngưỡng hoặc không còn người chịu trách nhiệm." }],
      refs: ["unesco-ai", "ipcc-ar6", "fair"]
    }
  ],
  glossary: [
    { term: "Bất định (uncertainty)", definition: "Phạm vi không chắc chắn do dữ liệu, tham số, cấu trúc mô hình hoặc kịch bản; khác với sai số đã biết." },
    { term: "Đơn vị chức năng", definition: "Mô tả định lượng dịch vụ làm chuẩn tham chiếu cho mọi dòng trong LCA." },
    { term: "Hiệu chỉnh", definition: "Ước lượng tham số hoặc cấu hình mô hình từ dữ liệu phát triển." },
    { term: "Kiểm định", definition: "Đánh giá mô hình đã chốt trên dữ liệu độc lập với quá trình hiệu chỉnh/chọn mô hình." },
    { term: "Mô hình khái niệm", definition: "Biểu diễn các thành phần, quan hệ, cơ chế, ranh giới và giả định trước khi mã hóa tính toán." },
    { term: "Model card", definition: "Hồ sơ mô tả mục đích, dữ liệu, thước đo, miền sử dụng, giới hạn và trách nhiệm của mô hình." },
    { term: "Phản hồi âm", definition: "Vòng tác động có xu hướng làm giảm sai lệch hoặc chống lại biến đổi ban đầu." },
    { term: "Phản hồi dương", definition: "Vòng tác động có xu hướng khuếch đại biến đổi ban đầu; không đồng nghĩa tích cực về giá trị." },
    { term: "Provenance", definition: "Nguồn gốc và lịch sử biến đổi của dữ liệu, mô hình hoặc kết quả." },
    { term: "Surrogate model", definition: "Mô hình thay thế tính nhanh, xấp xỉ mô hình hoặc quá trình tốn kém hơn trong miền xác định." },
    { term: "Digital twin", definition: "Đại diện số có mục đích, được liên kết và cập nhật với hệ vật lý để quan sát, dự báo hoặc hỗ trợ quyết định." },
    { term: "Drift", definition: "Sự thay đổi theo thời gian của phân bố dữ liệu, quan hệ đầu vào–đầu ra hoặc hiệu năng mô hình." },
    { term: "GNN", definition: "Mạng nơ-ron học trên dữ liệu đồ thị; nút, cạnh và hướng phải phản ánh topology hoặc giả thuyết có thể kiểm chứng." },
    { term: "PINN", definition: "Mạng nơ-ron đưa phần dư phương trình vật lý và điều kiện biên/đầu vào hàm mất mát; không mặc nhiên bảo toàn chính xác." },
    { term: "MRV", definition: "Hệ thống đo lường, báo cáo và thẩm tra dùng để bảo đảm dữ liệu phát thải có thể kiểm toán." },
    { term: "Công bằng môi trường", definition: "Nguyên tắc phân phối công bằng lợi ích, gánh nặng, quyền tham gia và khả năng khắc phục trong quyết định môi trường." }
  ],
  references: [
    { id: "iso14040", type: "Tiêu chuẩn", citation: "ISO. ISO 14040:2006 — Environmental management — Life cycle assessment — Principles and framework (đã được xác nhận còn hiệu lực năm 2022; có Amendment 1:2020).", url: "https://www.iso.org/standard/37456.html" },
    { id: "iso14001", type: "Tiêu chuẩn", citation: "ISO. ISO 14001 — Environmental management systems — Requirements with guidance for use.", url: "https://www.iso.org/iso-14001-environmental-management.html" },
    { id: "ogc-sensorthings", type: "Tiêu chuẩn mở", citation: "Open Geospatial Consortium (2021). OGC SensorThings API Part 1: Sensing, Version 1.1.", url: "https://docs.ogc.org/is/18-088/18-088.html" },
    { id: "unesco-ai", type: "Khuyến nghị", citation: "UNESCO (2021). Recommendation on the Ethics of Artificial Intelligence.", url: "https://www.unesco.org/en/artificial-intelligence/recommendation-ethics" },
    { id: "ipcc-ar6", type: "Báo cáo đánh giá", citation: "IPCC (2023). AR6 Synthesis Report: Climate Change 2023.", url: "https://www.ipcc.ch/report/ar6/syr/" },
    { id: "fair", type: "Bài báo phương pháp", citation: "Wilkinson, M. D. et al. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data 3, 160018.", url: "https://doi.org/10.1038/sdata.2016.18" },
    { id: "meadows", type: "Sách nền tảng", citation: "Meadows, D. H. (2008). Thinking in Systems: A Primer. Chelsea Green Publishing.", url: "https://donellameadows.org/systems-thinking-book-sale/" },
    { id: "epa-modeling", type: "Hướng dẫn kỹ thuật", citation: "U.S. EPA. Guidance on the Development, Evaluation, and Application of Environmental Models.", url: "https://www.epa.gov/measurements-modeling/guidance-document-development-evaluation-and-application-environmental-models" },
    { id: "swmm", type: "Phần mềm khoa học", citation: "U.S. EPA. Storm Water Management Model (SWMM).", url: "https://www.epa.gov/water-research/storm-water-management-model-swmm" },
    { id: "unep-lca", type: "Tài nguyên LCA", citation: "UN Environment Programme. Life Cycle Initiative — methods, data and capacity building for life-cycle approaches.", url: "https://www.lifecycleinitiative.org/" },
    { id: "sklearn", type: "Tài liệu kỹ thuật", citation: "Scikit-learn developers. User Guide: model selection, metrics and inspection.", url: "https://scikit-learn.org/stable/user_guide.html" },
    { id: "network-science", type: "Giáo trình mở", citation: "Barabási, A.-L. Network Science — open online textbook.", url: "https://networksciencebook.com/" },
    { id: "pinns", type: "Bài báo nền tảng", citation: "Raissi, M., Perdikaris, P. & Karniadakis, G. E. (2019). Physics-informed neural networks. Journal of Computational Physics, 378, 686–707.", url: "https://doi.org/10.1016/j.jcp.2018.10.045" },
    { id: "prithvi", type: "Báo cáo mô hình", citation: "Szwarcman, D. et al. (2024). Prithvi-EO-2.0: A Versatile Multi-Temporal Foundation Model for Earth Observation Applications.", url: "https://arxiv.org/abs/2412.02732" },
    { id: "xai-eo", type: "Bài báo tổng quan", citation: "Gevaert, C. M. (2022). Explainable AI for Earth observation: societal and regulatory perspectives. International Journal of Applied Earth Observation and Geoinformation, 112, 102869.", url: "https://doi.org/10.1016/j.jag.2022.102869" },
    { id: "china-carbon-plan", type: "Chính sách chính thức", citation: "National Development and Reform Commission of China (2021). Action Plan for Carbon Dioxide Peaking Before 2030.", url: "https://en.ndrc.gov.cn/policies/202110/t20211027_1301020.html" },
    { id: "china-carbon-market", type: "Báo cáo chính thức", citation: "Ministry of Ecology and Environment of China (2024). Progress Report of China's National Carbon Market.", url: "https://www.mee.gov.cn/ywdt/xwfb/202407/W020240722528850763859.pdf" },
    { id: "destine", type: "Hạ tầng chính thức", citation: "European Commission. Destination Earth — digital model of the Earth.", url: "https://digital-strategy.ec.europa.eu/en/policies/destination-earth" },
    { id: "tsinghua-digital-twin", type: "Hồ sơ nghiên cứu", citation: "Tsinghua University, Department of Hydraulic Engineering. Research on intelligent regulation and digital twins of inter-basin water systems.", url: "https://www.civil.tsinghua.edu.cn/heen/info/1163/2002.htm" },
    { id: "basel-convention", type: "Công ước quốc tế", citation: "Basel Convention on the Control of Transboundary Movements of Hazardous Wastes and Their Disposal.", url: "https://www.basel.int/TheConvention/Overview/" },
    { id: "unep-ejustice", type: "Tài nguyên chính sách", citation: "UN Environment Programme. Environmental rights, governance and justice resources.", url: "https://www.unep.org/explore-topics/environmental-rights-and-governance" }
  ]
};
