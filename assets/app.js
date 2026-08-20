(() => {
  "use strict";

  const course = window.COURSE;
  const app = document.querySelector("#app");
  const nav = document.querySelector("#chapter-nav");
  const progressBar = document.querySelector("#progress-bar");
  const progressPercent = document.querySelector("#progress-percent");
  const progressDetail = document.querySelector("#progress-detail");
  const toast = document.querySelector("#toast");
  const storageKey = "evmcourse-progress-v2";
  let toastTimer;

  const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  }[char]));

  const stripHtml = (value = "") => {
    const holder = document.createElement("div");
    holder.innerHTML = value;
    return holder.textContent || "";
  };

  const getProgress = () => {
    try { return JSON.parse(localStorage.getItem(storageKey)) || []; }
    catch { return []; }
  };

  const setProgress = (items) => {
    localStorage.setItem(storageKey, JSON.stringify([...new Set(items)]));
    updateProgress();
  };

  const notify = (message) => {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("show");
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  };

  function updateProgress() {
    const completed = getProgress().filter((id) => course.chapters.some((chapter) => chapter.id === id));
    const percent = Math.round((completed.length / course.chapters.length) * 100);
    progressBar.style.width = `${percent}%`;
    progressPercent.textContent = `${percent}%`;
    progressDetail.textContent = `${completed.length}/${course.chapters.length} chương hoàn thành`;
    document.querySelectorAll(".chapter-link").forEach((link) => {
      link.classList.toggle("done", completed.includes(link.dataset.id));
    });
  }

  function buildNavigation() {
    nav.innerHTML = course.parts.map((part) => {
      const chapters = course.chapters.filter((chapter) => chapter.part === part.id);
      return `<div class="nav-part">${escapeHtml(part.title)}</div>${chapters.map((chapter) => `
        <a class="chapter-link" data-id="${chapter.id}" href="#/chapter/${chapter.id}">
          <span class="chapter-number">${String(chapter.number).padStart(2, "0")}</span>
          <span>${escapeHtml(chapter.shortTitle)}</span>
          <span class="chapter-state" aria-hidden="true"></span>
        </a>`).join("")}`;
    }).join("");
    updateProgress();
  }

  function homeView() {
    const completedIds = getProgress();
    const completed = completedIds.length;
    const percent = Math.round((completed / course.chapters.length) * 100);
    const next = course.chapters.find((chapter) => !completedIds.includes(chapter.id)) || course.chapters[0];
    const skillCloud = [...new Set(course.chapters.flatMap((chapter) => chapter.keywords))].slice(0, 12);
    const retrievalRef = course.references.find((ref) => ref.id === "retrieval-practice");
    return `
      <div class="network-layout home-network">
        <aside class="network-left">
          <section class="network-card profile-card">
            <div class="profile-cover"><span>AI</span><span>LONG</span></div>
            <div class="course-avatar" aria-hidden="true">EL</div>
            <div class="profile-body">
              <h2>EnviroLONG</h2>
              <p>Hồ sơ năng lực · Phân tích hệ thống môi trường</p>
              <small>${escapeHtml(course.meta.author)} · ${escapeHtml(course.meta.edition)}</small>
            </div>
            <div class="profile-stats">
              <a href="#/chapter/${next.id}"><span>Tiến độ</span><strong>${percent}%</strong></a>
              <a href="#/references"><span>Nguồn học thuật</span><strong>${course.references.length}</strong></a>
            </div>
            <div class="profile-progress"><span style="width:${percent}%"></span></div>
          </section>
          <section class="network-card compact-card">
            <h3>Kỹ năng sẽ xây dựng</h3>
            <div class="skill-cloud">${skillCloud.map((skill) => `<span>${escapeHtml(skill)}</span>`).join("")}</div>
          </section>
          <section class="network-card compact-card downloads-card">
            <h3>Thư viện khóa học</h3>
            <a href="downloads/Giao_trinh_AI_LONG.docx"><span>Giáo trình Word</span><b>DOCX</b></a>
            <a href="downloads/So_tay_giang_vien_AI_LONG.docx"><span>Sổ tay giảng viên</span><b>DOCX</b></a>
            <a href="downloads/Giao_trinh_AI_LONG.pdf"><span>Ebook hoàn chỉnh</span><b>PDF</b></a>
            <a href="downloads/Giao_trinh_AI_LONG.epub"><span>Máy đọc sách</span><b>EPUB</b></a>
          </section>
        </aside>

        <section class="course-feed" aria-label="Dòng nội dung khóa học">
          <article class="network-card course-hero-card">
            <div class="course-hero-cover" aria-hidden="true"><span>L</span><span>O</span><span>N</span><span>G</span></div>
            <div class="course-hero-body">
              <div class="course-avatar hero-avatar">EL</div>
              <p class="eyebrow">Giáo trình đại học mở · 4 tín chỉ</p>
              <h1>Phân tích hệ thống môi trường dựa trên AI và Mô hình LONG</h1>
              <p class="lead">Một lộ trình nghề nghiệp từ tư duy hệ thống, dữ liệu và GeoAI đến carbon, công bằng môi trường và Digital Twin—mỗi quyết định đều có bằng chứng, bất định và trách nhiệm.</p>
              <div class="hero-metrics"><span><b>15</b> chương</span><span><b>75</b> câu tự kiểm tra</span><span><b>15</b> lab</span><span><b>4</b> trụ LONG</span></div>
              <div class="hero-actions"><a class="button" href="#/chapter/${next.id}">${completed ? "Tiếp tục" : "Bắt đầu"} · Chương ${next.number}</a><a class="button secondary" href="#/about">Xem đề cương</a></div>
            </div>
          </article>

          <article class="network-card feed-card long-post">
            <div class="post-author"><div class="mini-avatar">L</div><div><strong>Khung LONG</strong><small>Bản đồ tư duy xuyên suốt · 4 năng lực</small></div></div>
            <p class="post-intro">Dùng bốn câu hỏi này để không lạc trong một bài toán môi trường phức tạp.</p>
            <div class="long-strip">
              <div><b>L</b><strong>Learning & Life-cycle</strong><span>Bằng chứng nào đáng tin?</span></div>
              <div><b>O</b><strong>Optimization</strong><span>Phương án nào khả thi?</span></div>
              <div><b>N</b><strong>Network</strong><span>Tác động lan truyền ra sao?</span></div>
              <div><b>G</b><strong>Governance</strong><span>Ai quyết định và chịu trách nhiệm?</span></div>
            </div>
          </article>

          ${course.parts.map((part) => {
          const chapters = course.chapters.filter((chapter) => chapter.part === part.id);
          const descriptions = ["", "Ngôn ngữ hệ thống, dữ liệu, mô hình và AI đáng tin cậy.", "Bốn trụ LONG và công cụ phân tích quyết định.", "Carbon, công bằng, hệ kỹ thuật, sinh thái và đô thị.", "Digital Twin lưu vực và đồ án tích hợp có thể tái lập."];
          return `<article class="network-card feed-card pathway-post"><div class="post-author"><div class="mini-avatar">${part.id}</div><div><strong>${escapeHtml(part.title)}</strong><small>${escapeHtml(descriptions[part.id])}</small></div></div><div class="course-list">${chapters.map((chapter) => `<a href="#/chapter/${chapter.id}" class="course-row"><span class="chapter-number">${String(chapter.number).padStart(2, "0")}</span><span><strong>${escapeHtml(chapter.shortTitle)}</strong><small>${escapeHtml(chapter.memory.hook)} · 5 câu quiz</small></span><span class="row-arrow">→</span></a>`).join("")}</div></article>`;
        }).join("")}

          <article class="network-card academic-disclaimer"><strong>Minh bạch học thuật</strong><p>LONG là khung sư phạm do tác giả đề xuất để nối Learning & Life-cycle evidence, Optimization, Network và Governance; không thay thế ISO, LCA, EIA, DPSIR, MCA hoặc mô hình chuyên ngành. Các thư góp ý chưa xác minh là đầu vào biên tập, không phải chứng thực.</p></article>
        </section>

        <aside class="network-right">
          <section class="network-card compact-card smart-study">
            <p class="eyebrow">Học dễ nhớ</p><h3>Nhịp 20–5–2</h3>
            <ol><li><b>20 phút</b> đọc một mục và vẽ lại móc nhớ.</li><li><b>5 câu</b> tự kiểm tra, nhận phản hồi ngay.</li><li><b>2 ghi chú</b>: một lỗi sai và một điều chưa chắc.</li></ol>
            ${retrievalRef ? `<a href="${retrievalRef.url}" target="_blank" rel="noreferrer">Cơ sở khoa học và giới hạn ↗</a>` : ""}
          </section>
          <section class="network-card compact-card continue-card">
            <p class="eyebrow">Tiếp tục học</p>
            <span class="continue-number">${String(next.number).padStart(2, "0")}</span>
            <h3>${escapeHtml(next.shortTitle)}</h3>
            <p>${escapeHtml(next.memory.hook)}</p>
            <a class="button" href="#/chapter/${next.id}">Mở bài giảng</a>
          </section>
          <section class="network-card compact-card source-note">
            <h3>Nguyên tắc nguồn</h3>
            <p>Ưu tiên tiêu chuẩn, báo cáo liên chính phủ, tài liệu cơ quan phát hành và bài báo có DOI. Mỗi chương có nhiệm vụ đọc cụ thể, không chỉ là một danh sách liên kết.</p>
            <a href="#/references">Xem toàn bộ học liệu →</a>
          </section>
        </aside>
      </div>
    `;
  }

  function formulaSimulator() {
    return `
      <div class="simulator" id="river-simulator">
        <div class="simulator-head"><div><h3>Mô phỏng BOD dọc sông</h3><p>Pha trộn hoàn toàn tại x=0; phân hủy bậc nhất; vận tốc không đổi.</p></div><span class="sim-badge">Học cụ tương tác</span></div>
        <div class="sim-grid">
          <div class="controls">
            <div class="control"><label for="qr">Q sông <output id="qr-out">10,0 m³/s</output></label><input id="qr" type="range" min="2" max="50" step="0.5" value="10"></div>
            <div class="control"><label for="cr">BOD sông <output id="cr-out">4 mg/L</output></label><input id="cr" type="range" min="1" max="20" step="0.5" value="4"></div>
            <div class="control"><label for="qw">Q nước thải <output id="qw-out">0,50 m³/s</output></label><input id="qw" type="range" min="0.05" max="2" step="0.05" value="0.5"></div>
            <div class="control"><label for="cw">BOD nước thải <output id="cw-out">250 mg/L</output></label><input id="cw" type="range" min="20" max="500" step="10" value="250"></div>
            <div class="control"><label for="decay">Hệ số k <output id="decay-out">0,30 ngày⁻¹</output></label><input id="decay" type="range" min="0" max="1.2" step="0.05" value="0.3"></div>
            <div class="control"><label for="velocity">Vận tốc <output id="velocity-out">0,30 m/s</output></label><input id="velocity" type="range" min="0.05" max="1.5" step="0.05" value="0.3"></div>
          </div>
          <div class="sim-output">
            <div class="sim-metrics">
              <div class="sim-metric"><small>Sau trộn</small><strong id="mix-value">—</strong></div>
              <div class="sim-metric"><small>Tại 5 km</small><strong id="km5-value">—</strong></div>
              <div class="sim-metric"><small>Suy giảm</small><strong id="drop-value">—</strong></div>
            </div>
            <svg id="river-chart" viewBox="0 0 620 240" role="img" aria-label="Biểu đồ nồng độ BOD theo khoảng cách"></svg>
          </div>
        </div>
      </div>`;
  }

  function chapterView(chapter) {
    const refItems = chapter.refs.map((id) => course.references.find((ref) => ref.id === id)).filter(Boolean);
    const readingItems = chapter.readings.map((item) => ({ ...item, reference: course.references.find((ref) => ref.id === item.ref) })).filter((item) => item.reference);
    const completed = getProgress().includes(chapter.id);
    const previous = course.chapters[chapter.number - 2];
    const next = course.chapters[chapter.number];
    const totalRead = readingItems.reduce((sum, item) => sum + item.minutes, 0);
    return `
      <div class="network-layout lesson-network">
        <aside class="network-left chapter-left-rail">
          <section class="network-card chapter-identity">
            <div class="chapter-mini-cover"></div>
            <div class="chapter-avatar">${String(chapter.number).padStart(2, "0")}</div>
            <div class="profile-body"><h2>${escapeHtml(chapter.shortTitle)}</h2><p>${escapeHtml(chapter.level)}</p><small>${escapeHtml(chapter.duration)}</small></div>
            <div class="skill-cloud">${chapter.keywords.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
          </section>
          <section class="network-card compact-card memory-card">
            <p class="eyebrow">Móc ghi nhớ</p><h3>${escapeHtml(chapter.memory.hook)}</h3>
            <ol>${chapter.memory.points.map((point, index) => `<li><b>${index + 1}</b><span>${escapeHtml(point)}</span></li>`).join("")}</ol>
          </section>
          <a class="back-course" href="#/home">← Hồ sơ khóa học</a>
        </aside>

        <article class="course-feed lesson-feed">
          <header class="network-card chapter-profile-card" id="tong-quan">
            <div class="chapter-profile-cover"><span>${escapeHtml(course.parts.find((part) => part.id === chapter.part).title)}</span></div>
            <div class="chapter-profile-body">
              <div class="chapter-avatar large">${String(chapter.number).padStart(2, "0")}</div>
              <p class="eyebrow">Bài giảng chuyên đề · 5 câu tự kiểm tra</p>
              <h1>${escapeHtml(chapter.title)}</h1>
              <p class="lead">${escapeHtml(chapter.summary)}</p>
              <div class="chapter-meta"><span>${escapeHtml(chapter.duration)}</span><span>${escapeHtml(chapter.level)}</span><span>${readingItems.length} tài liệu đọc · ${totalRead} phút</span></div>
              <div class="outcome-panel"><strong>Sau chương này, bạn có thể</strong><ol class="objective-list">${chapter.outcomes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol></div>
            </div>
          </header>

          ${chapter.sections.map((section, index) => `<section class="network-card feed-card lesson-post lesson-section" id="${section.id}"><div class="post-author"><div class="mini-avatar">${index + 1}</div><div><strong>Bài giảng ${chapter.number}.${index + 1}</strong><small>Khái niệm → mô hình → quyết định</small></div></div><h2>${escapeHtml(section.title)}</h2>${section.html}<div class="post-actions"><a href="#tu-kiem-tra">Kiểm tra ghi nhớ</a><a href="#doc-sau">Đọc sâu</a></div></section>`).join("")}

          <section class="network-card feed-card lesson-post lesson-section" id="case-study">
            <div class="post-author"><div class="mini-avatar case">CS</div><div><strong>Nghiên cứu tình huống</strong><small>Chuyển kiến thức thành lập luận quyết định</small></div></div>
            <div class="case-study"><small>Case study</small><h2>${escapeHtml(chapter.caseStudy.title)}</h2><p>${escapeHtml(chapter.caseStudy.body)}</p></div>
            ${chapter.simulator ? formulaSimulator() : ""}
          </section>

          <section class="network-card feed-card lesson-post lesson-section" id="thuc-hanh">
            <div class="post-author"><div class="mini-avatar lab">LAB</div><div><strong>Thực hành có hướng dẫn</strong><small>Sản phẩm có thể kiểm tra và phản biện</small></div></div>
            <div class="lab-card"><div class="lab-icon">${escapeHtml(chapter.lab.code)}</div><div><h2>${escapeHtml(chapter.lab.title)}</h2><ul>${chapter.lab.tasks.map((task) => `<li>${escapeHtml(task)}</li>`).join("")}</ul></div></div>
            <h3>Bài tập mở rộng và gợi ý</h3>
            <div class="exercise-list">${chapter.exercises.map((exercise) => `<details class="exercise"><summary>${escapeHtml(exercise.title)}</summary><div><b>Gợi ý:</b> ${escapeHtml(exercise.solution)}</div></details>`).join("")}</div>
          </section>

          <section class="network-card feed-card lesson-post lesson-section quiz-section" id="tu-kiem-tra">
            <div class="post-author"><div class="mini-avatar quiz-avatar">5</div><div><strong>Tự kiểm tra có phản hồi</strong><small>5 câu · Làm sau khi gấp ghi chú</small></div></div>
            <h2>Kiểm tra mức hiểu, không chỉ trí nhớ</h2><p>Chọn đáp án cho cả năm câu rồi chấm một lần. Đọc phản hồi của cả câu đúng lẫn câu sai; quay lại đúng mục nếu chưa giải thích được bằng lời của mình.</p>
            <div class="quiz" data-chapter="${chapter.id}">${chapter.quiz.map((item, index) => `
              <article class="quiz-card" data-answer="${item.answer}">
                <fieldset><legend><span>${index + 1}</span>${escapeHtml(item.q)}</legend>${item.options.map((option, optionIndex) => `<label class="quiz-option"><input type="radio" name="${chapter.id}-q${index}" value="${optionIndex}"><span>${escapeHtml(option)}</span></label>`).join("")}</fieldset>
                <p class="quiz-feedback">${escapeHtml(item.explain)}</p>
              </article>`).join("")}
              <button class="button quiz-submit" type="button">Chấm 5 câu</button>
            </div>
          </section>

          <section class="network-card feed-card lesson-post lesson-section reading-section" id="doc-sau">
            <div class="post-author"><div class="mini-avatar read">↗</div><div><strong>Đọc sâu có định hướng</strong><small>${readingItems.length} nguồn · khoảng ${totalRead} phút</small></div></div>
            <h2>Học qua tài liệu khoa học</h2><p>Không cần đọc từ đầu đến cuối. Mỗi nguồn có một tiêu điểm và một sản phẩm đọc để biến tài liệu thành năng lực.</p>
            <div class="reading-path">${readingItems.map((item, index) => `<article class="reading-card"><div class="reading-index"><span>${index + 1}</span><small>${item.minutes}′</small></div><div><span class="source-type">${escapeHtml(item.reference.type)}</span><h3>${escapeHtml(item.focus)}</h3><cite>${escapeHtml(item.reference.citation)}</cite><p><b>Sản phẩm đọc:</b> ${escapeHtml(item.task)}</p><a href="${item.reference.url}" target="_blank" rel="noreferrer">Mở tài liệu gốc ↗</a></div></article>`).join("")}</div>
          </section>

          <section class="network-card feed-card lesson-post lesson-section" id="tai-lieu">
            <div class="post-author"><div class="mini-avatar refs">R</div><div><strong>Thư mục chương</strong><small>Nguồn chính thức và học thuật</small></div></div>
            <ul class="reference-list">${refItems.map((ref) => `<li><span>${escapeHtml(ref.type)}</span><cite>${escapeHtml(ref.citation)}</cite><a href="${ref.url}" target="_blank" rel="noreferrer">Mở nguồn ↗</a></li>`).join("")}</ul>
          </section>

          <div class="network-card chapter-complete"><div><strong>Đã hoàn tất Chương ${chapter.number}?</strong><small>Tiến độ được lưu cục bộ trên trình duyệt này.</small></div><button class="button complete-button ${completed ? "done" : ""}" data-id="${chapter.id}" type="button">${completed ? "✓ Đã hoàn thành" : "Đánh dấu hoàn thành"}</button></div>
          <nav class="chapter-pager" aria-label="Chuyển chương">
            ${previous ? `<a class="pager-link" href="#/chapter/${previous.id}">← Chương trước<strong>${escapeHtml(previous.shortTitle)}</strong></a>` : `<a class="pager-link" href="#/home">← Trang chủ<strong>Tổng quan giáo trình</strong></a>`}
            ${next ? `<a class="pager-link" href="#/chapter/${next.id}">Chương tiếp →<strong>${escapeHtml(next.shortTitle)}</strong></a>` : `<a class="pager-link" href="#/references">Tiếp theo →<strong>Tài liệu tham khảo</strong></a>`}
          </nav>
        </article>

        <aside class="network-right chapter-right-rail">
          <nav class="network-card compact-card chapter-toc" aria-label="Trong chương này"><strong>Trong chương</strong><a href="#tong-quan">Tổng quan & đầu ra</a>${chapter.sections.map((section) => `<a href="#${section.id}">${escapeHtml(section.title)}</a>`).join("")}<a href="#case-study">Ca nghiên cứu</a><a href="#thuc-hanh">Thực hành</a><a href="#tu-kiem-tra">5 câu tự kiểm tra</a><a href="#doc-sau">Đọc sâu khoa học</a><a href="#tai-lieu">Thư mục</a></nav>
          <section class="network-card compact-card chapter-study-tip"><p class="eyebrow">Chiến thuật</p><h3>Đọc → nhớ → làm</h3><p>Đọc một bài post, che nội dung và nói lại một phút. Sau đó làm sản phẩm đọc hoặc một câu quiz.</p></section>
        </aside>
      </div>`;
  }

  function glossaryView() {
    return `<article class="content-page"><p class="eyebrow">Tra cứu nhanh</p><h1>Thuật ngữ cốt lõi</h1><p>Các định nghĩa được dùng nhất quán trong toàn giáo trình. Khi dùng trong nghiên cứu chuyên ngành, cần đối chiếu tiêu chuẩn và miền ứng dụng tương ứng.</p><div class="glossary-grid">${course.glossary.map((item) => `<div class="term-card"><strong>${escapeHtml(item.term)}</strong><p>${escapeHtml(item.definition)}</p></div>`).join("")}</div></article>`;
  }

  function referencesView() {
    return `<article class="content-page"><p class="eyebrow">Nguồn học thuật</p><h1>Tài liệu tham khảo</h1><p>Ưu tiên tiêu chuẩn, báo cáo đánh giá, đặc tả kỹ thuật và tài liệu phương pháp từ tổ chức phát hành. Liên kết ngoài có thể được cập nhật theo thời gian.</p><ul class="reference-list">${course.references.map((ref) => `<li><span>${escapeHtml(ref.type)}</span><cite>${escapeHtml(ref.citation)}</cite><a href="${ref.url}" target="_blank" rel="noreferrer">Truy cập nguồn ↗</a></li>`).join("")}</ul></article>`;
  }

  function aboutView() {
    return `<article class="content-page"><p class="eyebrow">Đề cương học phần</p><h1>Về giáo trình</h1><p><b>${escapeHtml(course.meta.title)}</b> do ${escapeHtml(course.meta.author)} biên soạn cho ${escapeHtml(course.meta.audience)}. Quy mô đề xuất: ${escapeHtml(course.meta.credits)}.</p>
      <div class="section-heading"><div><h2>Triết lý biên soạn</h2></div></div>
      <p>Mỗi chương đi từ khái niệm đến biểu diễn định lượng, ca nghiên cứu, thực hành, tự kiểm tra và nguồn đọc. Nội dung tách rõ phương pháp đã được chuẩn hóa với khung tổ chức do tác giả đề xuất; số liệu minh họa không được dùng thay dữ liệu hiện trường.</p>
      <div class="data-table-wrap"><table class="data-table"><caption>Ma trận đánh giá gợi ý</caption><thead><tr><th>Thành phần</th><th>Tỷ trọng</th><th>Minh chứng</th></tr></thead><tbody><tr><td>Thực hành cá nhân</td><td>30%</td><td>Notebook, sơ đồ, bảng tính</td></tr><tr><td>Dự án nhóm</td><td>30%</td><td>Mô hình, dashboard, hồ sơ dữ liệu</td></tr><tr><td>Thuyết trình và phản biện</td><td>20%</td><td>Seminar, review đồng cấp</td></tr><tr><td>Kiểm tra cuối kỳ mở</td><td>20%</td><td>Phân tích tình huống và bảo vệ lựa chọn</td></tr></tbody></table></div>
      <div class="academic-note"><strong>Bản quyền và sử dụng</strong><p>Mã nguồn và nội dung gốc trong kho được phát hành theo Giấy phép MIT, ghi công Long Ngo. Trích dẫn, hình ảnh hoặc tiêu chuẩn của bên thứ ba tuân theo điều kiện của nguồn tương ứng; giấy phép MIT không chuyển quyền đối với chúng.</p></div>
      <div class="hero-actions"><a class="button" href="docs/DE_CUONG_HOC_PHAN.md" target="_blank">Đề cương chi tiết</a><a class="button secondary" href="downloads/Giao_trinh_AI_LONG.pdf">Tải ebook PDF</a><a class="button secondary" href="https://github.com/Base27-CVNSS/EVMCourse" target="_blank" rel="noreferrer">Đóng góp trên GitHub</a></div>
    </article>`;
  }

  function attachChapterEvents(chapter) {
    const completeButton = document.querySelector(".complete-button");
    completeButton?.addEventListener("click", () => {
      const progress = getProgress();
      const exists = progress.includes(chapter.id);
      const next = exists ? progress.filter((id) => id !== chapter.id) : [...progress, chapter.id];
      setProgress(next);
      completeButton.classList.toggle("done", !exists);
      completeButton.textContent = exists ? "Đánh dấu hoàn thành" : "✓ Đã hoàn thành";
      notify(exists ? "Đã bỏ đánh dấu hoàn thành." : `Đã hoàn thành Chương ${chapter.number}.`);
    });

    document.querySelector(".quiz-submit")?.addEventListener("click", () => {
      let correct = 0;
      const cards = [...document.querySelectorAll(".quiz-card")];
      cards.forEach((card) => {
        const selected = card.querySelector("input:checked");
        const isCorrect = selected && Number(selected.value) === Number(card.dataset.answer);
        card.classList.add("answered");
        card.classList.toggle("correct", Boolean(isCorrect));
        card.classList.toggle("incorrect", !isCorrect);
        if (isCorrect) correct += 1;
      });
      notify(`Kết quả: ${correct}/${cards.length} câu đúng.`);
    });

    if (chapter.simulator) initRiverSimulator();
  }

  function initRiverSimulator() {
    const ids = ["qr", "cr", "qw", "cw", "decay", "velocity"];
    const elements = Object.fromEntries(ids.map((id) => [id, document.querySelector(`#${id}`)]));
    if (!elements.qr) return;
    const svg = document.querySelector("#river-chart");
    const format = (value, digits = 1) => Number(value).toLocaleString("vi-VN", { maximumFractionDigits: digits, minimumFractionDigits: digits });

    const update = () => {
      const qr = Number(elements.qr.value);
      const cr = Number(elements.cr.value);
      const qw = Number(elements.qw.value);
      const cw = Number(elements.cw.value);
      const k = Number(elements.decay.value);
      const velocity = Number(elements.velocity.value);
      const mix = (qr * cr + qw * cw) / (qr + qw);
      const concentrationAt = (km) => mix * Math.exp(-k * ((km * 1000) / (velocity * 86400)));
      const km5 = concentrationAt(5);
      const drop = (1 - concentrationAt(10) / mix) * 100;

      document.querySelector("#qr-out").textContent = `${format(qr)} m³/s`;
      document.querySelector("#cr-out").textContent = `${format(cr)} mg/L`;
      document.querySelector("#qw-out").textContent = `${format(qw, 2)} m³/s`;
      document.querySelector("#cw-out").textContent = `${format(cw, 0)} mg/L`;
      document.querySelector("#decay-out").textContent = `${format(k, 2)} ngày⁻¹`;
      document.querySelector("#velocity-out").textContent = `${format(velocity, 2)} m/s`;
      document.querySelector("#mix-value").textContent = `${format(mix, 2)} mg/L`;
      document.querySelector("#km5-value").textContent = `${format(km5, 2)} mg/L`;
      document.querySelector("#drop-value").textContent = `${format(drop, 1)}%`;

      const width = 620, height = 240, left = 42, right = 16, top = 18, bottom = 32;
      const chartWidth = width - left - right, chartHeight = height - top - bottom;
      const ymax = Math.max(mix * 1.15, 5);
      const points = Array.from({ length: 41 }, (_, index) => {
        const km = index / 4;
        const value = concentrationAt(km);
        return { x: left + (km / 10) * chartWidth, y: top + chartHeight - (value / ymax) * chartHeight, km, value };
      });
      const line = points.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
      const area = `${line} L${points.at(-1).x},${top + chartHeight} L${left},${top + chartHeight} Z`;
      const gridY = [0, .25, .5, .75, 1].map((ratio) => {
        const y = top + chartHeight - ratio * chartHeight;
        return `<line class="chart-grid" x1="${left}" y1="${y}" x2="${width - right}" y2="${y}"/><text class="chart-text" x="5" y="${y + 3}">${format(ymax * ratio, 1)}</text>`;
      }).join("");
      const gridX = [0, 2, 4, 6, 8, 10].map((km) => {
        const x = left + (km / 10) * chartWidth;
        return `<line class="chart-grid" x1="${x}" y1="${top}" x2="${x}" y2="${top + chartHeight}"/><text class="chart-text" x="${x - 5}" y="${height - 10}">${km}</text>`;
      }).join("");
      svg.innerHTML = `${gridY}${gridX}<path class="chart-area" d="${area}"/><path class="chart-line" d="${line}"/><circle class="chart-dot" cx="${points[20].x}" cy="${points[20].y}" r="4"/><text class="chart-text" x="${width - 125}" y="14">Khoảng cách (km)</text><text class="chart-text" x="8" y="14">BOD (mg/L)</text>`;
    };
    ids.forEach((id) => elements[id].addEventListener("input", update));
    update();
  }

  function highlight(text, query) {
    const safe = escapeHtml(text);
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return safe.replace(new RegExp(`(${escapedQuery})`, "ig"), "<mark>$1</mark>");
  }

  function initSearch() {
    const dialog = document.querySelector("#search-dialog");
    const input = document.querySelector("#search-input");
    const results = document.querySelector("#search-results");
    const openSearch = () => {
      dialog.showModal();
      setTimeout(() => input.focus(), 30);
    };
    document.querySelector("#search-open").addEventListener("click", openSearch);
    document.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); openSearch(); }
    });
    input.addEventListener("input", () => {
      const query = input.value.trim();
      if (query.length < 2) { results.innerHTML = "<p>Nhập ít nhất 2 ký tự để tìm kiếm.</p>"; return; }
      const normalized = query.toLocaleLowerCase("vi");
      const matches = course.chapters.filter((chapter) => {
        const content = [chapter.title, chapter.summary, ...chapter.keywords, ...chapter.sections.map((section) => `${section.title} ${stripHtml(section.html)}`)].join(" ").toLocaleLowerCase("vi");
        return content.includes(normalized);
      });
      results.innerHTML = matches.length ? matches.map((chapter) => `<a class="search-result" href="#/chapter/${chapter.id}" data-search-result><span>${String(chapter.number).padStart(2, "0")}</span><div><strong>${highlight(chapter.title, query)}</strong><small>${highlight(chapter.summary.slice(0, 150), query)}…</small></div></a>`).join("") : "<p>Không tìm thấy nội dung phù hợp.</p>";
      results.querySelectorAll("[data-search-result]").forEach((link) => link.addEventListener("click", () => dialog.close()));
    });
  }

  function initTheme() {
    const saved = localStorage.getItem("tinhocmoitruong-theme");
    if (saved) document.documentElement.dataset.theme = saved;
    document.querySelector("#theme-toggle").addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("tinhocmoitruong-theme", next);
    });
  }

  function initMobileMenu() {
    const toggle = document.querySelector("#menu-toggle");
    const scrim = document.querySelector("#sidebar-scrim");
    const close = () => {
      document.body.classList.remove("sidebar-open");
      toggle.setAttribute("aria-expanded", "false");
      scrim.hidden = true;
    };
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("sidebar-open");
      toggle.setAttribute("aria-expanded", String(open));
      scrim.hidden = !open;
    });
    scrim.addEventListener("click", close);
    nav.addEventListener("click", (event) => { if (event.target.closest("a")) close(); });
  }

  function route() {
    const raw = location.hash.replace(/^#\/?/, "");
    const [page, id] = raw.split("/");
    document.querySelectorAll(".chapter-link").forEach((link) => link.classList.toggle("active", page === "chapter" && link.dataset.id === id));
    document.querySelectorAll("[data-global-page]").forEach((link) => {
      const target = link.dataset.globalPage;
      link.classList.toggle("active", target === (page || "home") || (target === "references" && page === "glossary"));
    });
    if (!raw || page === "home") app.innerHTML = homeView();
    else if (page === "chapter") {
      const chapter = course.chapters.find((item) => item.id === id);
      if (chapter) { app.innerHTML = chapterView(chapter); attachChapterEvents(chapter); }
      else app.innerHTML = `<article class="content-page"><h1>Không tìm thấy chương</h1><p><a href="#/home">Quay về trang chủ</a></p></article>`;
    } else if (page === "glossary") app.innerHTML = glossaryView();
    else if (page === "references") app.innerHTML = referencesView();
    else if (page === "about") app.innerHTML = aboutView();
    else app.innerHTML = homeView();
    window.scrollTo({ top: 0, behavior: "instant" });
    document.querySelector("#main-content").focus({ preventScroll: true });
  }

  buildNavigation();
  initSearch();
  initTheme();
  initMobileMenu();
  window.addEventListener("hashchange", route);
  route();

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
})();
