import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const sourcePath = path.join(root, "assets/course.js");
const source = fs.readFileSync(sourcePath, "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox);
const course = sandbox.window.COURSE;

const supplements = {
  "chuong-1": {
    memory: { hook: "MỤC ĐÍCH → RANH GIỚI → DÒNG → PHẢN HỒI", points: ["Nêu quyết định cần hỗ trợ", "Chốt không gian, thời gian và đối tượng", "Theo dõi vật chất, năng lượng, thông tin", "Tìm vòng khuếch đại và cân bằng"] },
    readings: [
      { ref: "meadows", minutes: 20, focus: "Ranh giới, tồn lượng và vòng phản hồi", task: "Vẽ một sơ đồ stock–flow cho ca nghiên cứu của chương." },
      { ref: "epa-modeling", minutes: 15, focus: "Mô hình gắn với bối cảnh quyết định", task: "Viết một câu về mục đích, người dùng và hậu quả nếu mô hình sai." }
    ],
    quiz: [
      { q: "Khi thiết kế mô hình cho cùng một lưu vực, vì sao ranh giới có thể khác nhau?", options: ["Vì ranh giới phải phù hợp quyết định và quy mô phân tích", "Vì dữ liệu nào cũng có cùng độ phân giải", "Vì ranh giới hành chính luôn là ranh giới vật lý", "Vì thuật toán tự xác định ranh giới đúng"], answer: 0, explain: "Ranh giới là lựa chọn mô hình gắn với mục đích, quy mô và bên chịu ảnh hưởng; nó cần được công bố và kiểm tra độ nhạy." },
      { q: "Phát biểu nào phân biệt đúng tồn lượng (stock) và dòng (flow)?", options: ["Tồn lượng tích lũy theo thời gian; dòng làm thay đổi tồn lượng", "Tồn lượng luôn đo bằng mg/L; dòng luôn đo bằng m³/s", "Tồn lượng là đầu vào; dòng là đầu ra", "Hai khái niệm đồng nhất nếu hệ ở trạng thái ổn định"], answer: 0, explain: "Stock là lượng tích lũy tại một thời điểm; flow có đơn vị trên thời gian và làm stock tăng hoặc giảm." },
      { q: "Một vòng phản hồi dương trong hệ môi trường có nghĩa là gì?", options: ["Vòng khuếch đại biến đổi, không hàm ý tốt hay xấu", "Vòng luôn cải thiện chất lượng môi trường", "Vòng luôn đưa hệ về cân bằng", "Vòng chỉ tồn tại trong hệ sinh học"], answer: 0, explain: "Dấu dương mô tả tác động khuếch đại của vòng; đánh giá tốt/xấu phụ thuộc mục tiêu và bối cảnh." }
    ]
  },
  "chuong-2": {
    memory: { hook: "QUYẾT ĐỊNH → CÂN BẰNG → KIỂM ĐỊNH → BẤT ĐỊNH", points: ["Bắt đầu bằng câu hỏi quyết định", "Giữ nhất quán khối lượng và đơn vị", "Tách hiệu chỉnh khỏi kiểm định", "Báo cáo miền áp dụng và bất định"] },
    readings: [
      { ref: "epa-modeling", minutes: 20, focus: "Chất lượng mô hình và khả năng áp dụng", task: "Lập checklist hiệu chỉnh–kiểm định–đánh giá bất định." },
      { ref: "swmm", minutes: 15, focus: "Kiến trúc mô hình thủy văn đô thị", task: "Chỉ ra biến trạng thái, tham số và dữ liệu quan trắc trong một mô-đun." }
    ],
    quiz: [
      { q: "Tại sao không nên đánh giá mô hình chỉ trên chính dữ liệu dùng để hiệu chỉnh?", options: ["Vì dễ đánh giá quá lạc quan khả năng tổng quát hóa", "Vì dữ liệu hiệu chỉnh luôn có đơn vị sai", "Vì kiểm định không cần quan trắc", "Vì mô hình cơ chế không có tham số"], answer: 0, explain: "Tách dữ liệu kiểm định giúp kiểm tra mô hình trên thông tin chưa dùng để khớp tham số." },
      { q: "Trong cân bằng khối lượng, biểu thức tổng quát đúng là gì?", options: ["Tích lũy = vào − ra + sinh − mất", "Tích lũy = vào + ra", "Nồng độ = lưu lượng × thời gian", "Sinh = vào − tích lũy trong mọi hệ"], answer: 0, explain: "Phương trình phải bao gồm dòng vào, dòng ra và các quá trình sinh/mất nội tại, với đơn vị nhất quán." },
      { q: "Khi nào mô hình phức tạp hơn là hợp lý?", options: ["Khi cải thiện được quyết định và được dữ liệu/kiểm định hỗ trợ", "Khi có nhiều tham số hơn baseline", "Khi đồ thị đầu ra đẹp hơn", "Khi huấn luyện lâu hơn"], answer: 0, explain: "Độ phức tạp chỉ có giá trị khi tạo thêm năng lực giải thích/dự báo phù hợp mục đích và không vượt quá bằng chứng." }
    ]
  },
  "chuong-3": {
    memory: { hook: "NGUỒN → QA/QC → ĐỒNG BỘ → QUẢN TRỊ", points: ["Giữ nguồn gốc và metadata", "Kiểm tra cảm biến và ngoại lai", "Khớp không gian–thời gian", "Phân quyền, phiên bản và tái sử dụng"] },
    readings: [
      { ref: "ogc-sensorthings", minutes: 20, focus: "Mô hình dữ liệu cảm biến–quan trắc", task: "Ánh xạ một trạm thực tế vào Thing, Sensor, Datastream và Observation." },
      { ref: "fair", minutes: 15, focus: "Findable, Accessible, Interoperable, Reusable", task: "Chấm một bộ dữ liệu theo bốn nguyên tắc FAIR và ghi bằng chứng." }
    ],
    quiz: [
      { q: "Hành động nào bảo toàn tốt nhất khả năng truy xuất dữ liệu?", options: ["Lưu dữ liệu thô bất biến, metadata, phiên bản và nhật ký xử lý", "Ghi đè dữ liệu thô sau làm sạch", "Xóa mọi giá trị ngoại lai", "Chỉ lưu biểu đồ cuối cùng"], answer: 0, explain: "Provenance cần chuỗi từ dữ liệu gốc đến từng phép biến đổi và phiên bản sản phẩm." },
      { q: "FAIR có đồng nghĩa với việc mọi dữ liệu phải công khai không?", options: ["Không; dữ liệu có thể hạn chế truy cập nhưng vẫn mô tả, liên thông và tái sử dụng có điều kiện", "Có; FAIR luôn yêu cầu tải xuống tự do", "Có; FAIR loại bỏ mọi quyền riêng tư", "Không; FAIR chỉ áp dụng cho mã nguồn"], answer: 0, explain: "Accessible bao gồm quy trình truy cập rõ ràng, kể cả xác thực/phân quyền; FAIR không phủ định đạo đức hay bảo mật." },
      { q: "Một đỉnh đo cảm biến bất thường nên được xử lý đầu tiên thế nào?", options: ["Gắn cờ và kiểm tra ngữ cảnh, hiệu chuẩn, cảm biến lân cận trước khi quyết định", "Xóa ngay vì chắc chắn là lỗi", "Thay bằng trung bình toàn năm", "Giữ nhưng bỏ timestamp"], answer: 0, explain: "Ngoại lai có thể là lỗi hoặc sự kiện môi trường thật; quyết định cần dựa trên bằng chứng QA/QC và được ghi lại." }
    ]
  },
  "chuong-4": {
    memory: { hook: "BASELINE → CHIA TẬP → GIẢI THÍCH → VẬN HÀNH", points: ["Dựng đường cơ sở đơn giản", "Ngăn rò rỉ không gian–thời gian", "Định lượng bất định và lời giải thích", "Theo dõi drift, quyền hạn và fallback"] },
    readings: [
      { ref: "pinns", minutes: 20, focus: "Ràng buộc phương trình trong hàm mất mát", task: "Viết sơ đồ ba thành phần loss: dữ liệu, vật lý và điều kiện biên." },
      { ref: "prithvi", minutes: 15, focus: "Foundation model cho dữ liệu quan sát Trái Đất", task: "Ghi rõ bài toán pretraining, fine-tuning và phép đo benchmark." },
      { ref: "xai-eo", minutes: 15, focus: "Giải thích AI trong quan sát Trái Đất", task: "Phân biệt giải thích mô hình với kết luận nhân quả trong một ví dụ." }
    ],
    quiz: [
      { q: "Cách chia tập nào giảm rò rỉ khi dự báo chất lượng nước cho một trạm mới?", options: ["Chia theo nhóm trạm hoặc vùng, giữ trạm kiểm tra hoàn toàn độc lập", "Chia ngẫu nhiên từng bản ghi từ mọi trạm", "Dùng toàn bộ dữ liệu để chuẩn hóa rồi chia", "Chọn tập kiểm tra có sai số nhỏ nhất"], answer: 0, explain: "Group/spatial split mô phỏng đúng mục tiêu tổng quát hóa sang vị trí mới và tránh bản ghi cùng trạm xuất hiện ở cả train/test." },
      { q: "SHAP hoặc bản đồ saliency cho phép kết luận chắc chắn điều gì?", options: ["Mức đóng góp theo mô hình, không tự chứng minh quan hệ nhân quả", "Nguyên nhân vật lý duy nhất của hiện tượng", "Mô hình không thể sai", "Dữ liệu không có thiên lệch"], answer: 0, explain: "XAI mô tả hành vi của mô hình trong điều kiện nhất định; nhân quả cần thiết kế và giả định bổ sung." },
      { q: "Điểm khác cốt lõi của PINN là gì?", options: ["Đưa phương trình vật lý/điều kiện biên vào quá trình học", "Không cần dữ liệu hoặc giả định", "Luôn chính xác hơn mô hình số", "Chỉ dùng được cho ảnh vệ tinh"], answer: 0, explain: "PINN kết hợp sai số dữ liệu với phần dư phương trình và điều kiện; vẫn cần kiểm định, cân trọng số loss và kiểm tra miền áp dụng." }
    ]
  },
  "chuong-5": {
    memory: { hook: "MỤC TIÊU → ĐƠN VỊ CHỨC NĂNG → KIỂM KÊ → DIỄN GIẢI", points: ["Nêu câu hỏi và đối tượng so sánh", "Neo mọi dòng vào một chức năng", "Thu thập dữ liệu và kiểm tra chất lượng", "Độ nhạy, bất định và giới hạn tuyên bố"] },
    readings: [
      { ref: "iso14040", minutes: 20, focus: "Bốn pha LCA và quan hệ giữa chúng", task: "Viết mục tiêu, phạm vi, đơn vị chức năng và ranh giới cho một sản phẩm." },
      { ref: "unep-lca", minutes: 15, focus: "Tư duy vòng đời trong quyết định", task: "Liệt kê hai dịch chuyển gánh nặng có thể xảy ra khi tối ưu một công đoạn." }
    ],
    quiz: [
      { q: "Vai trò quan trọng nhất của đơn vị chức năng trong LCA là gì?", options: ["Tạo cơ sở định lượng nhất quán để so sánh các hệ thực hiện cùng chức năng", "Thay thế toàn bộ dữ liệu kiểm kê", "Xác định giá bán sản phẩm", "Loại bỏ nhu cầu phân tích độ nhạy"], answer: 0, explain: "Đơn vị chức năng mô tả dịch vụ đầu ra; các dòng vật chất/năng lượng phải quy về cùng cơ sở này." },
      { q: "Nếu kết quả đảo chiều khi thay đổi hợp lý quy tắc phân bổ, cần làm gì?", options: ["Báo cáo độ nhạy và tránh kết luận ưu thế tuyệt đối", "Chỉ giữ quy tắc cho kết quả mong muốn", "Bỏ qua vì phân bổ không ảnh hưởng LCA", "Gộp hai kết quả bằng trung bình đơn giản"], answer: 0, explain: "Đảo chiều cho thấy lựa chọn mô hình có ảnh hưởng quyết định; cần minh bạch kịch bản và giới hạn kết luận." },
      { q: "Dấu chân carbon của một công đoạn giảm nhưng tác động nước tăng mạnh là ví dụ của gì?", options: ["Dịch chuyển gánh nặng giữa nhóm tác động", "Lỗi số học chắc chắn", "Tối ưu Pareto hoàn hảo", "Loại trừ hệ thống nền"], answer: 0, explain: "Tư duy vòng đời yêu cầu xem nhiều giai đoạn và nhóm tác động để tránh chuyển vấn đề sang nơi khác." }
    ]
  },
  "chuong-6": {
    memory: { hook: "BIẾN → MỤC TIÊU → RÀNG BUỘC → PARETO", points: ["Xác định đòn bẩy có thể điều khiển", "Đo điều cần tối ưu", "Giữ luật vật lý, ngân sách và công bằng", "So sánh đánh đổi, không che giấu trọng số"] },
    readings: [
      { ref: "convex-optimization", minutes: 25, focus: "Biến, hàm mục tiêu, ràng buộc và đối ngẫu", task: "Phát biểu một bài toán xử lý nước ở dạng tối ưu chuẩn." },
      { ref: "epa-modeling", minutes: 15, focus: "Miền áp dụng và bất định của mô hình", task: "Đánh dấu các ràng buộc nào cần stress test trước triển khai." }
    ],
    quiz: [
      { q: "Một nghiệm Pareto tối ưu có nghĩa là gì?", options: ["Không thể cải thiện một mục tiêu mà không làm xấu ít nhất một mục tiêu khác", "Tối ưu đồng thời tuyệt đối mọi mục tiêu", "Có chi phí nhỏ nhất bất kể phát thải", "Luôn là lựa chọn chính sách công bằng nhất"], answer: 0, explain: "Biên Pareto mô tả tập đánh đổi hiệu quả; lựa chọn cuối vẫn cần giá trị, quản trị và tham vấn." },
      { q: "Tại sao ràng buộc pháp lý không nên chỉ đưa vào như một trọng số nhỏ trong hàm mục tiêu?", options: ["Vì yêu cầu bắt buộc thường cần biểu diễn như điều kiện khả thi", "Vì trọng số luôn bằng một", "Vì luật không liên quan tối ưu", "Vì ràng buộc làm thuật toán nhanh hơn"], answer: 0, explain: "Nếu vi phạm pháp luật là không chấp nhận được, nghiệm vi phạm phải bị loại khỏi miền khả thi thay vì chỉ chịu một mức phạt có thể đánh đổi." },
      { q: "Sau khi thuật toán trả về nghiệm tối ưu, bước kiểm tra quan trọng nhất là gì?", options: ["Mô phỏng/đánh giá lại tính khả thi và độ bền dưới bất định", "Triển khai ngay vì tối ưu bảo đảm đúng", "Làm tròn mọi biến mà không kiểm tra", "Bỏ các kịch bản bất lợi"], answer: 0, explain: "Sai số mô hình, làm tròn và biến động đầu vào có thể khiến nghiệm danh nghĩa vi phạm ràng buộc ngoài thực tế." }
    ]
  },
  "chuong-7": {
    memory: { hook: "NÚT → CẠNH → DÒNG → CAN THIỆP", points: ["Định nghĩa thực thể và lớp mạng", "Nêu hướng, trọng số và ý nghĩa cạnh", "Phân biệt dòng vật chất với tương quan", "Kiểm tra điểm nghẽn và hệ quả lan truyền"] },
    readings: [
      { ref: "network-science", minutes: 25, focus: "Mạng có hướng, trọng số và centrality", task: "Xây ma trận kề và giải thích từng loại cạnh bằng ngôn ngữ miền." },
      { ref: "meadows", minutes: 15, focus: "Cấu trúc phản hồi và điểm đòn bẩy", task: "Nối một vòng nhân quả với một mạng dòng vật chất, chỉ rõ phần không tương đương." }
    ],
    quiz: [
      { q: "Trước khi tính centrality, câu hỏi cần làm rõ nhất là gì?", options: ["Nút, cạnh, hướng và trọng số đại diện cho hiện tượng nào", "Màu nút nào đẹp nhất", "Đồ thị có thể vẽ 3D hay không", "Thuật toán dùng bao nhiêu RAM"], answer: 0, explain: "Chỉ số mạng chỉ có ý nghĩa khi ngữ nghĩa của nút/cạnh và cơ chế tạo dữ liệu được xác định." },
      { q: "Cạnh tương quan giữa hai trạm quan trắc có được diễn giải là dòng ô nhiễm không?", options: ["Không; cần hướng dòng, thủy văn và bằng chứng cơ chế bổ sung", "Có; mọi tương quan đều là dòng vật chất", "Có nếu hệ số tương quan dương", "Không vì mạng không thể mô tả dòng"], answer: 0, explain: "Tương quan có thể do nguồn chung, mùa vụ hoặc tự tương quan; nó không tự xác định hướng hay cơ chế truyền tải." },
      { q: "Một nút có betweenness cao gợi ý điều gì?", options: ["Nút nằm trên nhiều đường đi ngắn và có thể là điểm trung gian quan trọng", "Nút gây ra mọi biến đổi của mạng", "Nút luôn có phát thải lớn nhất", "Nút chắc chắn nên bị loại bỏ"], answer: 0, explain: "Betweenness là chỉ báo cấu trúc; quyết định can thiệp cần kiểm tra năng lực, thay thế, nhân quả và hậu quả công bằng." }
    ]
  },
  "chuong-8": {
    memory: { hook: "RỦI RO → HÀNH ĐỘNG → TRÁCH NHIỆM → HỌC THÍCH ỨNG", points: ["Đặc trưng xác suất và hậu quả", "Gắn tín hiệu với ngưỡng và playbook", "Giữ người phê duyệt và cơ chế khiếu nại", "Theo dõi kết quả và cập nhật"] },
    readings: [
      { ref: "unesco-ai", minutes: 20, focus: "Giám sát con người, trách nhiệm và tác động xã hội", task: "Lập ma trận ai được biết, quyết định, hành động và chịu trách nhiệm." },
      { ref: "ipcc-ar6", minutes: 15, focus: "Khung rủi ro khí hậu và thích ứng", task: "Tách hazard, exposure và vulnerability trong ca nghiên cứu." }
    ],
    quiz: [
      { q: "Khi nào dashboard trở thành một hệ hỗ trợ quyết định thực chất?", options: ["Khi chỉ báo gắn với ngưỡng, hành động, người chịu trách nhiệm và phản hồi", "Khi có nhiều biểu đồ", "Khi cập nhật màu theo thời gian thực", "Khi thay thế người ra quyết định"], answer: 0, explain: "DSS cần nối bằng chứng với lựa chọn và quy trình hành động, đồng thời lưu lại quyết định và kết quả." },
      { q: "Human-in-the-loop hiệu quả cần thêm điều gì ngoài nút phê duyệt?", options: ["Quyền hạn rõ, đủ ngữ cảnh, thời gian phản ứng và khả năng override/fallback", "Một mật khẩu dùng chung", "Mô hình không cần giải thích", "Tự động chấp nhận mọi cảnh báo"], answer: 0, explain: "Giám sát con người chỉ có ý nghĩa khi người giám sát có năng lực và quyền can thiệp trong điều kiện vận hành thật." },
      { q: "Trong đặc trưng rủi ro, phát biểu nào đúng?", options: ["Rủi ro phụ thuộc hazard, phơi nhiễm, dễ bị tổn thương và năng lực ứng phó", "Hazard map luôn là risk map", "Xác suất thấp đồng nghĩa hậu quả nhỏ", "Giảm bất định luôn quan trọng hơn giảm hậu quả"], answer: 0, explain: "Rủi ro là kết quả kết hợp nhiều thành phần; bản đồ mối nguy thiếu phơi nhiễm và dễ bị tổn thương chưa phải bản đồ rủi ro." }
    ]
  },
  "chuong-9": {
    memory: { hook: "YÊU CẦU → ĐIỂM NÓNG → ĐIỀU KHIỂN → KIỂM CHỨNG", points: ["Chuyển nhu cầu thành tiêu chí đo", "Ưu tiên tải lượng và điểm nghẽn", "Thiết kế điều khiển cùng giới hạn an toàn", "Pilot, M&V và kế hoạch mở rộng"] },
    readings: [
      { ref: "unep-lca", minutes: 15, focus: "Tư duy vòng đời trong sản xuất sạch hơn", task: "Xác định một giải pháp có nguy cơ dịch chuyển gánh nặng sang thượng nguồn." },
      { ref: "swmm", minutes: 20, focus: "Hiệu chỉnh mô hình hạ tầng nước đô thị", task: "Đề xuất một phép thử pilot và chỉ số measurement & verification." }
    ],
    quiz: [
      { q: "Vì sao tải lượng thường hữu ích hơn chỉ nồng độ khi tìm điểm nóng sản xuất?", options: ["Vì tải lượng kết hợp nồng độ với lưu lượng và phản ánh lượng chất theo thời gian", "Vì tải lượng không cần đơn vị", "Vì nồng độ luôn không đo được", "Vì tải lượng loại bỏ mọi bất định"], answer: 0, explain: "Dòng có nồng độ vừa phải nhưng lưu lượng lớn có thể mang tải lượng cao; cả hai đại lượng vẫn cần được xem xét." },
      { q: "Một pilot thành công có đủ để mở rộng toàn nhà máy không?", options: ["Chưa; cần kiểm tra tính đại diện, độ bền, M&V, an toàn và kinh tế khi scale-up", "Có; pilot luôn đại diện mọi điều kiện", "Có nếu chi phí pilot thấp", "Chưa vì không bao giờ được scale-up"], answer: 0, explain: "Scale-up thay đổi tải, động học, vận hành và rủi ro; cần tiêu chí chuyển giai đoạn và bằng chứng độc lập." },
      { q: "Học tăng cường cho điều khiển môi trường nên được thử đầu tiên ở đâu?", options: ["Mô phỏng/sandbox có ràng buộc an toàn và fallback", "Ngay trên thiết bị thật không giới hạn", "Chỉ trên tập test tĩnh", "Không cần mô hình quá trình"], answer: 0, explain: "Thử nghiệm an toàn cần môi trường mô phỏng, giới hạn hành động, giám sát và đường quay về bộ điều khiển đã kiểm chứng." }
    ]
  },
  "chuong-10": {
    memory: { hook: "TRẠNG THÁI → ĐỘNG LỰC → DỊCH VỤ → CAN THIỆP", points: ["Đo quần thể, quần xã và sinh cảnh", "Xác định tác nhân trực tiếp/gián tiếp", "Theo dõi đóng góp của tự nhiên cho con người", "Đánh giá hiệu quả và phân phối lợi ích"] },
    readings: [
      { ref: "ipbes-global", minutes: 25, focus: "Trạng thái đa dạng sinh học, tác nhân và thay đổi hệ thống", task: "Lập bảng tác nhân trực tiếp–gián tiếp cho hệ sinh thái địa phương." },
      { ref: "ipcc-ar6", minutes: 15, focus: "Rủi ro khí hậu đối với hệ sinh thái", task: "Nêu một tương tác giữa khí hậu, sử dụng đất và dễ bị tổn thương." }
    ],
    quiz: [
      { q: "Vì sao số lần camera trap ghi nhận không thể đồng nhất trực tiếp với độ phong phú?", options: ["Vì khả năng phát hiện thay đổi theo loài, vị trí, mùa và nỗ lực lấy mẫu", "Vì camera không tạo dữ liệu", "Vì mọi loài có xác suất phát hiện bằng nhau", "Vì độ phong phú chỉ đo bằng vệ tinh"], answer: 0, explain: "Cần mô hình/thiết kế tính đến detectability và effort trước khi suy luận trạng thái quần thể." },
      { q: "Trong mô hình logistic, K biểu diễn gì?", options: ["Sức chứa môi trường trong điều kiện mô hình", "Tốc độ di cư tức thời", "Xác suất phát hiện", "Số loài tối đa toàn cầu"], answer: 0, explain: "K là mức quần thể mà tăng trưởng ròng tiến về 0 dưới giả định tài nguyên và điều kiện xác định." },
      { q: "Lượng giá dịch vụ hệ sinh thái có giới hạn quan trọng nào?", options: ["Không phải mọi giá trị sinh thái/văn hóa đều quy đổi đầy đủ thành tiền", "Luôn cho một giá trị khách quan duy nhất", "Loại bỏ nhu cầu tham gia cộng đồng", "Chỉ áp dụng cho dịch vụ cung cấp"], answer: 0, explain: "Lượng giá là đầu vào quyết định; cần đa phương pháp, minh bạch phân phối và tránh coi giá tiền là toàn bộ giá trị." }
    ]
  },
  "chuong-11": {
    memory: { hook: "PDCA → BẢN ĐỒ RỦI RO → HẠ TẦNG → ĐÔ THỊ SỐ", points: ["Lập kế hoạch và bằng chứng tuân thủ", "Nối hazard với phơi nhiễm/dễ tổn thương", "Tích hợp nước–rác–năng lượng–xanh", "Cập nhật dữ liệu và playbook vận hành"] },
    readings: [
      { ref: "iso14001", minutes: 20, focus: "Tư duy vòng đời và chu trình PDCA", task: "Ánh xạ một khía cạnh môi trường vào Plan–Do–Check–Act." },
      { ref: "ogc-sensorthings", minutes: 15, focus: "Dòng dữ liệu cảm biến đô thị", task: "Thiết kế tên, đơn vị, vị trí và timestamp cho một datastream." },
      { ref: "ipcc-ar6", minutes: 15, focus: "Rủi ro và thích ứng đô thị", task: "Chỉ rõ hazard, exposure, vulnerability và công bằng trong một điểm ngập." }
    ],
    quiz: [
      { q: "Điều gì biến chu trình PDCA thành cơ chế cải tiến chứ không chỉ thủ tục?", options: ["Chỉ số, audit, phân tích nguyên nhân và hành động khắc phục được theo dõi đến kết quả", "Chỉ ban hành chính sách một lần", "Chỉ thu thập càng nhiều cảm biến càng tốt", "Tự động coi mọi mục tiêu đã đạt"], answer: 0, explain: "Check và Act phải dùng bằng chứng để sửa nguyên nhân và cập nhật mục tiêu/quy trình." },
      { q: "Một bản đồ ngập chỉ thể hiện độ sâu nước là loại bản đồ gì?", options: ["Bản đồ hazard; chưa đủ để gọi là risk map", "Bản đồ rủi ro hoàn chỉnh", "Bản đồ dễ bị tổn thương", "Bản đồ công bằng"], answer: 0, explain: "Risk map cần bổ sung phơi nhiễm, dễ bị tổn thương, năng lực ứng phó và hậu quả." },
      { q: "Digital twin đô thị đáng tin cậy cần gì ngoài mô hình 3D?", options: ["Liên kết dữ liệu cập nhật, mô hình trạng thái, kịch bản, quyết định và phản hồi", "Nhiều texture hơn", "Chỉ ảnh vệ tinh độ phân giải cao", "Không cần kiểm định"], answer: 0, explain: "Mô hình 3D tĩnh là biểu diễn; twin cần đồng bộ trạng thái và vòng vận hành/ra quyết định." }
    ]
  },
  "chuong-12": {
    memory: { hook: "MRV → BASELINE → GIẢM PHÁT THẢI → CHUYỂN ĐỔI CÔNG BẰNG", points: ["Đo–báo cáo–thẩm tra có truy xuất", "Chốt kịch bản cơ sở và giả định", "So sánh chi phí, tiềm năng và ràng buộc", "Theo dõi phân phối lợi ích và chi phí"] },
    readings: [
      { ref: "ipcc-ar6", minutes: 20, focus: "Con đường giảm phát thải và chuyển đổi hệ thống", task: "Trích ba nhóm giải pháp và điều kiện triển khai liên ngành." },
      { ref: "china-carbon-plan", minutes: 15, focus: "Lộ trình đạt đỉnh carbon và trung hòa carbon", task: "Lập bảng mục tiêu–công cụ–dữ liệu cần MRV." },
      { ref: "china-carbon-market", minutes: 15, focus: "Vận hành thị trường carbon quốc gia và chất lượng dữ liệu", task: "Chỉ ra hai điểm kiểm soát chống đếm trùng hoặc báo cáo sai." }
    ],
    quiz: [
      { q: "MRV trong quản trị carbon là viết tắt của chuỗi nào?", options: ["Measurement/Monitoring – Reporting – Verification", "Model – Ranking – Visualization", "Market – Regulation – Value", "Mitigation – Resilience – Vulnerability"], answer: 0, explain: "MRV bảo đảm số liệu phát thải/giảm phát thải được đo hoặc giám sát, báo cáo và thẩm tra theo quy tắc." },
      { q: "Vì sao baseline phải ghi rõ giả định?", options: ["Vì mức giảm phát thải phụ thuộc kịch bản ‘nếu không can thiệp’", "Vì baseline luôn là số 0", "Vì baseline không ảnh hưởng tín chỉ", "Vì chỉ cần mô hình AI chọn baseline"], answer: 0, explain: "Thay đổi tăng trưởng, công nghệ, ranh giới hay thời tiết trong baseline có thể làm thay đổi mạnh lượng giảm được công nhận." },
      { q: "Một danh mục năng lượng tối ưu về chi phí nhưng làm tăng mất việc tập trung ở nhóm dễ tổn thương còn thiếu tiêu chí nào?", options: ["Chuyển đổi công bằng và tác động phân phối", "Độ phân giải ảnh", "Số lượng thuật toán", "Tốc độ huấn luyện"], answer: 0, explain: "Lựa chọn chuyển đổi cần tính cả phân phối chi phí/lợi ích, kỹ năng, sinh kế, tham gia và biện pháp hỗ trợ." }
    ]
  },
  "chuong-13": {
    memory: { hook: "PHÂN PHỐI → CÔNG NHẬN → THỦ TỤC → KHẮC PHỤC", points: ["Ai nhận lợi ích và gánh rủi ro", "Tri thức và danh tính nào được tôn trọng", "Ai có tiếng nói và quyền phản biện", "Cơ chế khiếu nại, bồi thường và theo dõi"] },
    readings: [
      { ref: "basel-convention", minutes: 20, focus: "Kiểm soát vận chuyển xuyên biên giới chất thải nguy hại", task: "Vẽ chuỗi chứng từ và điểm trách nhiệm cho một lô e-waste." },
      { ref: "unep-ejustice", minutes: 20, focus: "Quyền môi trường, tham gia và tiếp cận công lý", task: "Đánh giá một ca theo phân phối–công nhận–thủ tục–khắc phục." },
      { ref: "unesco-ai", minutes: 15, focus: "Công bằng và quản trị dữ liệu trong AI", task: "Nêu nhóm nào có thể bị thiếu đại diện và cách phát hiện." }
    ],
    quiz: [
      { q: "Ba chiều thường dùng để phân tích công bằng môi trường là gì?", options: ["Phân phối, công nhận và thủ tục", "Tốc độ, bộ nhớ và độ phân giải", "Chi phí, doanh thu và lợi nhuận", "Nguồn, đường truyền và thụ thể"], answer: 0, explain: "Khung công bằng xem ai gánh/nhận, ai được công nhận và ai có tiếng nói trong quy trình; nhiều ca còn cần chiều khắc phục." },
      { q: "Truy xuất nguồn gốc đầy đủ có tự động bảo đảm chuỗi cung ứng công bằng không?", options: ["Không; còn cần tiêu chuẩn quyền lợi, kiểm chứng, tham gia và khắc phục", "Có; có ID là đủ", "Có nếu dùng blockchain", "Không vì truy xuất không có giá trị"], answer: 0, explain: "Traceability tạo bằng chứng, nhưng chuẩn mực và cơ chế thực thi quyết định bằng chứng đó dẫn đến công bằng hay không." },
      { q: "Trong dự án khoa học công dân, lựa chọn nào giảm bất công dữ liệu?", options: ["Đồng thiết kế chỉ số, bù đắp hợp lý, phản hồi kết quả và bảo vệ dữ liệu cộng đồng", "Thu dữ liệu mà không thông báo mục đích", "Chỉ lấy mẫu nơi dễ tiếp cận", "Công khai mọi vị trí nhạy cảm"], answer: 0, explain: "Công bằng dữ liệu đòi hỏi sự tham gia có ý nghĩa, đại diện, quyền kiểm soát và lợi ích quay lại cộng đồng." }
    ]
  },
  "chuong-14": {
    memory: { hook: "CẢM NHẬN → ĐỒNG HÓA → DỰ BÁO → HÀNH ĐỘNG", points: ["Thu dữ liệu có QA/QC và độ trễ rõ", "Cập nhật trạng thái cùng bất định", "Chạy kịch bản và stress test", "Playbook, người phê duyệt và fallback"] },
    readings: [
      { ref: "ogc-sensorthings", minutes: 15, focus: "Giao tiếp dữ liệu quan trắc", task: "Thiết kế luồng từ Observation đến lớp đồng hóa." },
      { ref: "destine", minutes: 20, focus: "Digital twin cho kịch bản hệ thống Trái Đất", task: "Phân biệt dữ liệu, mô hình, dịch vụ kịch bản và người dùng quyết định." },
      { ref: "tsinghua-digital-twin", minutes: 15, focus: "Ca nghiên cứu điều tiết hệ thống nước", task: "Rút ra kiến trúc và câu hỏi kiểm định; không xem hồ sơ là chứng thực giáo trình." }
    ],
    quiz: [
      { q: "Thuộc tính nào phân biệt digital twin với mô hình số tĩnh?", options: ["Liên kết cập nhật giữa hệ thực, trạng thái số và vòng quyết định/phản hồi", "Đồ họa 3D", "Tệp mô hình có dung lượng lớn", "Dùng thuật toán học sâu"], answer: 0, explain: "Twin cần tính đồng bộ, cập nhật trạng thái và mục đích vận hành; 3D hay AI chỉ là thành phần tùy chọn." },
      { q: "Vai trò của đồng hóa dữ liệu là gì?", options: ["Kết hợp quan trắc với dự báo mô hình để cập nhật trạng thái và bất định", "Thay mọi quan trắc bằng mô hình", "Xóa toàn bộ sai số đo", "Bảo đảm dự báo luôn đúng"], answer: 0, explain: "Data assimilation cân bằng thông tin từ mô hình và quan trắc theo giả định sai số; kết quả vẫn cần kiểm định." },
      { q: "Khi cảm biến chính mất kết nối, thiết kế twin an toàn nên làm gì?", options: ["Phát hiện lỗi, hạ mức tin cậy, dùng chế độ suy giảm/fallback và cảnh báo người vận hành", "Nội suy im lặng và giữ mức tin cậy cũ", "Tự động ra quyết định mạnh hơn", "Xóa lịch sử vận hành"], answer: 0, explain: "Graceful degradation và provenance giúp tránh tự động hóa dựa trên trạng thái không còn được quan sát đầy đủ." }
    ]
  },
  "chuong-15": {
    memory: { hook: "PROTOCOL → TÍCH HỢP LONG → STRESS TEST → BÀN GIAO", points: ["Đóng băng câu hỏi, dữ liệu và tiêu chí", "Chọn trụ LONG tạo giá trị thực", "Thử kịch bản bất lợi và audit đạo đức", "Mã, dữ liệu, model card, policy brief, fallback"] },
    readings: [
      { ref: "fair", minutes: 15, focus: "Khả năng tìm thấy, liên thông và tái sử dụng", task: "Chấm gói bàn giao capstone bằng checklist FAIR." },
      { ref: "unesco-ai", minutes: 15, focus: "Đạo đức, trách nhiệm và giám sát AI", task: "Viết ba rủi ro, chủ sở hữu rủi ro và cơ chế khắc phục." },
      { ref: "retrieval-practice", minutes: 10, focus: "Tự kiểm tra có phản hồi và tải nhận thức", task: "Làm 5 câu quiz sau khi đọc; ghi lại hai lỗi và ôn lại đúng mục liên quan." }
    ],
    quiz: [
      { q: "Protocol dự án nên được chốt trước phân tích để làm gì?", options: ["Giảm lựa chọn hậu nghiệm và làm rõ câu hỏi, dữ liệu, tiêu chí, ngoại lệ", "Ngăn mọi cập nhật hợp lý", "Bảo đảm kết quả có ý nghĩa thống kê", "Thay thế kiểm định"], answer: 0, explain: "Protocol tạo dấu vết quyết định; thay đổi vẫn được phép nhưng phải có lý do, phiên bản và đánh giá ảnh hưởng." },
      { q: "Stress test khác dự báo điểm như thế nào?", options: ["Nó chủ động thử các điều kiện bất lợi, sai lệch và đứt gãy để đánh giá độ bền", "Nó chỉ báo cáo giá trị trung bình", "Nó loại bỏ bất định", "Nó chỉ dùng dữ liệu huấn luyện"], answer: 0, explain: "Stress test khảo sát thất bại dưới kịch bản khó, kể cả ngoài lịch sử, và nối kết quả với fallback/can thiệp." },
      { q: "Gói bàn giao nào hỗ trợ tái lập tốt nhất?", options: ["Dữ liệu/metadata hợp lệ, mã và môi trường, cấu hình, model card, kết quả kiểm thử và hướng dẫn vận hành", "Một ảnh dashboard", "Chỉ tệp trọng số mô hình", "Một bản PDF không nêu phiên bản"], answer: 0, explain: "Tái lập và vận hành cần toàn bộ chuỗi bằng chứng, phụ thuộc, phiên bản, giới hạn và trách nhiệm." }
    ]
  }
};

const newReferences = [
  {
    id: "convex-optimization",
    type: "Giáo trình học thuật",
    citation: "Boyd, S. & Vandenberghe, L. (2004). Convex Optimization. Cambridge University Press; Stanford University materials.",
    url: "https://web.stanford.edu/~boyd/cvxbook/"
  },
  {
    id: "ipbes-global",
    type: "Báo cáo đánh giá liên chính phủ",
    citation: "IPBES (2019). Global Assessment Report on Biodiversity and Ecosystem Services. IPBES Secretariat. DOI: 10.5281/zenodo.3831673.",
    url: "https://doi.org/10.5281/zenodo.3831673"
  },
  {
    id: "retrieval-practice",
    type: "Bài báo khoa học mở",
    citation: "Zheng, Y., Sun, P. & Liu, X. L. (2023). Retrieval practice is costly and is beneficial only when working memory capacity is abundant. npj Science of Learning, 8, 8.",
    url: "https://doi.org/10.1038/s41539-023-00159-w"
  }
];

for (const reference of newReferences) {
  const index = course.references.findIndex((item) => item.id === reference.id);
  if (index === -1) course.references.push(reference);
  else course.references[index] = reference;
}

for (const chapter of course.chapters) {
  const supplement = supplements[chapter.id];
  if (!supplement) throw new Error(`Thiếu bổ sung cho ${chapter.id}`);
  chapter.memory = supplement.memory;
  chapter.readings = supplement.readings;
  chapter.quiz = [...chapter.quiz.slice(0, 2), ...supplement.quiz];
}

const refsToAdd = {
  "chuong-6": ["convex-optimization"],
  "chuong-10": ["ipbes-global"],
  "chuong-15": ["retrieval-practice"]
};
for (const chapter of course.chapters) {
  for (const ref of refsToAdd[chapter.id] || []) if (!chapter.refs.includes(ref)) chapter.refs.push(ref);
}

fs.writeFileSync(sourcePath, `window.COURSE = ${JSON.stringify(course, null, 2)};\n`);
console.log(`Đã nâng cấp ${course.chapters.length} chương, ${course.chapters.reduce((sum, chapter) => sum + chapter.quiz.length, 0)} câu hỏi.`);
