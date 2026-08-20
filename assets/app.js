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
    const completed = getProgress().length;
    const next = course.chapters.find((chapter) => !getProgress().includes(chapter.id)) || course.chapters[0];
    return `
      <section class="hero">
        <p class="eyebrow">Giáo trình mở · ${escapeHtml(course.meta.edition)}</p>
        <h1 class="display-title">Phân tích hệ thống môi trường<br>dựa trên AI và Mô hình LONG</h1>
        <p class="lead">Giáo trình đại học mở kết nối khoa học hệ thống, GeoAI, carbon, công bằng môi trường và Digital Twin — từ bằng chứng đến quyết định có trách nhiệm.</p>
        <div class="hero-actions">
          <a class="button" href="#/chapter/${next.id}">${completed ? "Tiếp tục học" : "Bắt đầu học"} · Chương ${next.number}</a>
          <a class="button secondary" href="#/about">Xem đề cương học phần</a>
        </div>
      </section>

      <section class="stat-grid" aria-label="Thông tin học phần">
        <div class="stat-card"><strong>${course.chapters.length}</strong><span>chương học có cấu trúc</span></div>
        <div class="stat-card"><strong>4 TC</strong><span>45 tiết lý thuyết · 30 tiết thực hành</span></div>
        <div class="stat-card"><strong>${course.chapters.length}</strong><span>bài thực hành và đồ án</span></div>
        <div class="stat-card"><strong>MIT</strong><span>mở để học và phát triển</span></div>
      </section>

      <div class="academic-note">
        <strong>Định vị học thuật</strong>
        <p>LONG là khung sư phạm do tác giả đề xuất để nối Learning & Life-cycle evidence, Optimization, Network và Governance. Khung không thay thế ISO 14040/14044, LCA, EIA, DPSIR, MCA hay mô hình chuyên ngành. Các thư góp ý được dùng như đầu vào biên tập; tên cá nhân/tổ chức chưa được xác minh không được xem là chứng thực.</p>
      </div>

      <section class="download-band">
        <div><p class="eyebrow">Bộ giáo trình xuất bản</p><h2>Đọc trực tuyến hoặc tải bản hoàn chỉnh</h2><p>Hai bản Word tách theo người học và giảng viên; ebook PDF/EPUB tối ưu cho đọc, in và tra cứu.</p></div>
        <div class="download-actions"><a class="button" href="downloads/Giao_trinh_AI_LONG.docx">Word · Giáo trình</a><a class="button secondary" href="downloads/So_tay_giang_vien_AI_LONG.docx">Word · Giảng viên</a><a class="button secondary" href="downloads/Giao_trinh_AI_LONG.pdf">PDF</a><a class="button secondary" href="downloads/Giao_trinh_AI_LONG.epub">EPUB</a></div>
      </section>

      <section>
        <div class="section-heading"><div><p class="eyebrow">Khung tích hợp</p><h2>LONG: bốn góc nhìn, một quy trình</h2></div><p>Từ dữ liệu đến quyết định, mỗi trụ trả lời một nhóm câu hỏi khác nhau và phải để lại bằng chứng có thể kiểm toán.</p></div>
        <div class="long-grid">
          <article class="long-card"><span>L</span><strong>Learning & Life-cycle</strong><p>Học từ dữ liệu, kiểm kê vòng đời, chất lượng bằng chứng và khả năng tổng quát hóa.</p><div class="long-letter">L</div></article>
          <article class="long-card"><span>O</span><strong>Optimization</strong><p>Hàm mục tiêu, ràng buộc, đánh đổi Pareto và tính khả thi của phương án.</p><div class="long-letter">O</div></article>
          <article class="long-card"><span>N</span><strong>Network</strong><p>Dòng vật chất, hạ tầng, sinh thái, bên liên quan và vòng phản hồi.</p><div class="long-letter">N</div></article>
          <article class="long-card"><span>G</span><strong>Governance</strong><p>Trách nhiệm, pháp lý, tham gia, cảnh báo, đạo đức và giám sát con người.</p><div class="long-letter">G</div></article>
        </div>
      </section>

      <section>
        <div class="section-heading"><div><p class="eyebrow">Lộ trình 4 phần</p><h2>Từ nền tảng đến đồ án</h2></div><p>Học theo thứ tự để xây năng lực, hoặc đi thẳng đến chương phù hợp với công việc hiện tại.</p></div>
        <div class="path-grid">${course.parts.map((part) => {
          const chapters = course.chapters.filter((chapter) => chapter.part === part.id);
          const descriptions = ["", "Ngôn ngữ hệ thống, dữ liệu, mô hình và AI đáng tin cậy.", "Bốn trụ LONG và các công cụ phân tích quyết định.", "Carbon, công bằng, hệ kỹ thuật, sinh thái và đô thị.", "Digital Twin lưu vực và đồ án tích hợp có thể tái lập."];
          return `<article class="path-card"><small>Phần ${part.id}</small><h3>${escapeHtml(part.title.replace(/^Phần [IVX]+ · /, ""))}</h3><p>${descriptions[part.id]}</p><div class="path-list">${chapters.map((chapter) => `<a href="#/chapter/${chapter.id}"><span>${chapter.number}. ${escapeHtml(chapter.shortTitle)}</span><span>→</span></a>`).join("")}</div></article>`;
        }).join("")}</div>
      </section>
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
    const completed = getProgress().includes(chapter.id);
    const previous = course.chapters[chapter.number - 2];
    const next = course.chapters[chapter.number];
    return `
      <header class="chapter-head">
        <div>
          <p class="eyebrow">${escapeHtml(course.parts.find((part) => part.id === chapter.part).title)}</p>
          <h1>${escapeHtml(chapter.title)}</h1>
          <div class="chapter-meta"><span>${escapeHtml(chapter.duration)}</span><span>${escapeHtml(chapter.level)}</span><span>${chapter.keywords.map(escapeHtml).join(" · ")}</span></div>
        </div>
        <div class="chapter-badge" aria-label="Chương ${chapter.number}">${String(chapter.number).padStart(2, "0")}</div>
      </header>
      <div class="chapter-layout">
        <article>
          <section class="lesson-section" id="tong-quan">
            <h2>Tổng quan chương</h2>
            <p>${escapeHtml(chapter.summary)}</p>
            <h3>Chuẩn đầu ra</h3>
            <ol class="objective-list">${chapter.outcomes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
          </section>

          ${chapter.sections.map((section) => `<section class="lesson-section" id="${section.id}"><h2>${escapeHtml(section.title)}</h2>${section.html}</section>`).join("")}

          <section class="lesson-section" id="case-study">
            <h2>Ca nghiên cứu</h2>
            <div class="case-study"><small>Case study</small><h3>${escapeHtml(chapter.caseStudy.title)}</h3><p>${escapeHtml(chapter.caseStudy.body)}</p></div>
            ${chapter.simulator ? formulaSimulator() : ""}
          </section>

          <section class="lesson-section" id="thuc-hanh">
            <h2>Thực hành có hướng dẫn</h2>
            <div class="lab-card"><div class="lab-icon">${escapeHtml(chapter.lab.code)}</div><div><h3>${escapeHtml(chapter.lab.title)}</h3><ul>${chapter.lab.tasks.map((task) => `<li>${escapeHtml(task)}</li>`).join("")}</ul></div></div>
            <h3>Bài tập mở rộng và gợi ý</h3>
            <div class="exercise-list">${chapter.exercises.map((exercise) => `<details class="exercise"><summary>${escapeHtml(exercise.title)}</summary><div><b>Gợi ý:</b> ${escapeHtml(exercise.solution)}</div></details>`).join("")}</div>
          </section>

          <section class="lesson-section" id="tu-kiem-tra">
            <h2>Tự kiểm tra</h2>
            <div class="quiz" data-chapter="${chapter.id}">${chapter.quiz.map((item, index) => `
              <article class="quiz-card" data-answer="${item.answer}">
                <fieldset><legend>${index + 1}. ${escapeHtml(item.q)}</legend>${item.options.map((option, optionIndex) => `<label class="quiz-option"><input type="radio" name="${chapter.id}-q${index}" value="${optionIndex}"><span>${escapeHtml(option)}</span></label>`).join("")}</fieldset>
                <p class="quiz-feedback">${escapeHtml(item.explain)}</p>
              </article>`).join("")}
              <button class="button small quiz-submit" type="button">Chấm bài</button>
            </div>
          </section>

          <section class="lesson-section" id="tai-lieu">
            <h2>Tài liệu học tập chính</h2>
            <ul class="reference-list">${refItems.map((ref) => `<li><span>${escapeHtml(ref.type)}</span><cite>${escapeHtml(ref.citation)}</cite><a href="${ref.url}" target="_blank" rel="noreferrer">Mở nguồn chính thức ↗</a></li>`).join("")}</ul>
          </section>

          <div class="chapter-complete"><div><strong>Đã hoàn tất chương ${chapter.number}?</strong><small>Tiến độ được lưu cục bộ trên trình duyệt này.</small></div><button class="button complete-button ${completed ? "done" : ""}" data-id="${chapter.id}" type="button">${completed ? "✓ Đã hoàn thành" : "Đánh dấu hoàn thành"}</button></div>
          <nav class="chapter-pager" aria-label="Chuyển chương">
            ${previous ? `<a class="pager-link" href="#/chapter/${previous.id}">← Chương trước<strong>${escapeHtml(previous.shortTitle)}</strong></a>` : `<a class="pager-link" href="#/home">← Trang chủ<strong>Tổng quan giáo trình</strong></a>`}
            ${next ? `<a class="pager-link" href="#/chapter/${next.id}">Chương tiếp →<strong>${escapeHtml(next.shortTitle)}</strong></a>` : `<a class="pager-link" href="#/references">Tiếp theo →<strong>Tài liệu tham khảo</strong></a>`}
          </nav>
        </article>
        <aside class="chapter-toc" aria-label="Trong chương này"><strong>Trong chương</strong><a href="#tong-quan">Tổng quan & chuẩn đầu ra</a>${chapter.sections.map((section) => `<a href="#${section.id}">${escapeHtml(section.title)}</a>`).join("")}<a href="#case-study">Ca nghiên cứu</a><a href="#thuc-hanh">Thực hành</a><a href="#tu-kiem-tra">Tự kiểm tra</a><a href="#tai-lieu">Tài liệu</a></aside>
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
