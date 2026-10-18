/* TryExam - CCNA 200-301 v2.0 sınav simülatörü
 * Tamamen istemci tarafında çalışır (GitHub Pages uyumlu).
 */
(function () {
  "use strict";

  // ---- Yapılandırma ------------------------------------------------------
  const CONFIG = {
    EXAM_MINUTES: 120,
    EXAM_QUESTIONS: 40,
    PRACTICE_QUESTIONS: 10,
    PASS_PERCENT: 80,
    SITE_URL: "https://ctaner.github.io/TryExam/",   // Yayın adresinize göre güncelleyin
    AUTHOR_SITE: "www.cemaltaner.com.tr",
    CERT_NAME: "CCNA 200-301 v2.0 Sınav Simülatörü Tamamlama Belgesi",
    ORG_NAME: "TryExam",
    STORE_KEY: "tryexam_state_v1",
    PASS_KEY: "tryexam_last_pass_v1"
  };

  // ---- Yardımcılar -------------------------------------------------------
  const $ = (id) => document.getElementById(id);
  const show = (id) => {
    ["screen-start", "screen-exam", "screen-results", "screen-cert"].forEach((s) =>
      $(s).classList.toggle("hidden", s !== id));
  };
  const pad = (n) => String(n).padStart(2, "0");
  const fmtTime = (ms) => {
    const s = Math.max(0, Math.floor(ms / 1000));
    return pad(Math.floor(s / 3600)) + ":" + pad(Math.floor((s % 3600) / 60)) + ":" + pad(s % 60);
  };
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const domainName = (id) => DOMAINS.find((d) => d.id === id).name;

  // Her soru için seçenekleri karıştır, doğru cevabın yeni indeksini hesapla
  function prepareQuestion(src) {
    const order = shuffle(src.options.map((_, i) => i));
    return {
      domain: src.domain,
      q: src.q,
      explain: src.explain,
      options: order.map((i) => src.options[i]),
      answer: order.indexOf(src.answer)
    };
  }

  // ---- Durum -------------------------------------------------------------
  let state = null;     // { mode, questions, answers, flags, current, startedAt, endsAt, finished }
  let timerId = null;

  function saveState() {
    try { localStorage.setItem(CONFIG.STORE_KEY, JSON.stringify(state)); } catch (e) { /* yoksay */ }
  }
  function loadState() {
    try {
      const raw = localStorage.getItem(CONFIG.STORE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function clearState() {
    try { localStorage.removeItem(CONFIG.STORE_KEY); } catch (e) { /* yoksay */ }
  }

  // ---- Başlangıç ekranı --------------------------------------------------
  function renderStart() {
    const lines = DOMAINS.map((d) =>
      `${d.weight}% · ${d.id}.0 ${d.name}`).join("<br>");
    $("domainWeights").innerHTML = lines;
    show("screen-start");
    $("examTimer").classList.add("hidden");
  }

  function startExam(mode) {
    const count = mode === "exam" ? CONFIG.EXAM_QUESTIONS : CONFIG.PRACTICE_QUESTIONS;
    // Konu ağırlıklarına göre seçim (sınav modu); pratikte rastgele
    let picked = [];
    if (mode === "exam") {
      DOMAINS.forEach((d) => {
        const pool = shuffle(QUESTIONS.filter((q) => q.domain === d.id));
        const n = Math.round(count * d.weight / 100);
        picked = picked.concat(pool.slice(0, n));
      });
      // Yuvarlama farkını tamamla
      if (picked.length < count) {
        const rest = shuffle(QUESTIONS.filter((q) => picked.indexOf(q) === -1));
        picked = picked.concat(rest.slice(0, count - picked.length));
      }
      picked = picked.slice(0, count);
    } else {
      picked = shuffle(QUESTIONS).slice(0, count);
    }
    const now = Date.now();
    state = {
      mode: mode,
      questions: shuffle(picked).map(prepareQuestion),
      answers: {},
      flags: {},
      current: 0,
      startedAt: now,
      endsAt: mode === "exam" ? now + CONFIG.EXAM_MINUTES * 60 * 1000 : null,
      finished: false
    };
    saveState();
    show("screen-exam");
    renderQuestion();
    startTimer();
  }

  // ---- Zamanlayıcı -------------------------------------------------------
  function startTimer() {
    stopTimer();
    if (!state || state.mode !== "exam") {
      $("examTimer").classList.add("hidden");
      return;
    }
    $("examTimer").classList.remove("hidden");
    const tick = () => {
      const left = state.endsAt - Date.now();
      $("examTimer").textContent = fmtTime(left);
      $("examTimer").classList.toggle("low", left < 10 * 60 * 1000);
      if (left <= 0) {
        stopTimer();
        finishExam(true);
      }
    };
    tick();
    timerId = setInterval(tick, 1000);
  }
  function stopTimer() {
    if (timerId) { clearInterval(timerId); timerId = null; }
  }

  // ---- Sınav ekranı ------------------------------------------------------
  function renderQuestion() {
    const total = state.questions.length;
    const idx = state.current;
    const qObj = state.questions[idx];
    const answered = Object.keys(state.answers).length;

    $("examMeta").textContent =
      (state.mode === "exam" ? "Sınav" : "Pratik") + " · Soru " + (idx + 1) + " / " + total +
      " · Cevaplanan: " + answered;
    $("progressBar").style.width = Math.round((answered / total) * 100) + "%";
    $("qDomain").textContent = qObj.domain + ".0 " + domainName(qObj.domain);
    $("qText").textContent = (idx + 1) + ". " + qObj.q;

    const box = $("qOptions");
    box.innerHTML = "";
    qObj.options.forEach((text, i) => {
      const label = document.createElement("label");
      label.className = "opt" + (state.answers[idx] === i ? " selected" : "");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "opt";
      input.value = i;
      input.checked = state.answers[idx] === i;
      input.addEventListener("change", () => {
        state.answers[idx] = i;
        saveState();
        renderQuestion();
      });
      const span = document.createElement("span");
      span.textContent = String.fromCharCode(65 + i) + ") " + text;
      label.appendChild(input);
      label.appendChild(span);
      box.appendChild(label);
    });

    $("btnPrev").disabled = idx === 0;
    $("btnNext").disabled = idx === total - 1;
    $("btnFlag").textContent = state.flags[idx] ? "İşareti kaldır" : "İşaretle";

    // Soru listesi
    const nav = $("qNav");
    nav.innerHTML = "";
    state.questions.forEach((_, i) => {
      const b = document.createElement("button");
      b.textContent = i + 1;
      let cls = "";
      if (state.answers[i] !== undefined) cls += " answered";
      if (state.flags[i]) cls += " flagged";
      if (i === idx) cls += " current";
      b.className = cls.trim();
      b.addEventListener("click", () => { state.current = i; saveState(); renderQuestion(); });
      nav.appendChild(b);
    });
    saveState();
  }

  function bindExamControls() {
    $("btnPrev").addEventListener("click", () => {
      if (state.current > 0) { state.current--; renderQuestion(); }
    });
    $("btnNext").addEventListener("click", () => {
      if (state.current < state.questions.length - 1) { state.current++; renderQuestion(); }
    });
    $("btnFlag").addEventListener("click", () => {
      state.flags[state.current] = !state.flags[state.current];
      renderQuestion();
    });
    $("btnSubmit").addEventListener("click", () => {
      const unanswered = state.questions.length - Object.keys(state.answers).length;
      const msg = unanswered > 0
        ? unanswered + " sorunuz boş. Yine de sınavı bitirmek istiyor musunuz?"
        : "Sınavı bitirmek istediğinizden emin misiniz?";
      if (confirm(msg)) finishExam(false);
    });
  }

  // ---- Sonuç -------------------------------------------------------------
  function scoreOf(st) {
    let correct = 0;
    const perDomain = {};
    DOMAINS.forEach((d) => { perDomain[d.id] = { right: 0, total: 0 }; });
    st.questions.forEach((q, i) => {
      perDomain[q.domain].total++;
      if (st.answers[i] === q.answer) { correct++; perDomain[q.domain].right++; }
    });
    const pct = Math.round((correct / st.questions.length) * 100);
    return { correct: correct, total: st.questions.length, pct: pct, scaled: Math.round(pct * 10), perDomain: perDomain };
  }

  function finishExam(timeUp) {
    stopTimer();
    state.finished = true;
    state.finishedAt = Date.now();
    saveState();
    const r = scoreOf(state);
    const passed = r.pct >= CONFIG.PASS_PERCENT;

    $("scoreBig").textContent = r.scaled + " / 1000";
    $("scoreBig").className = "result-big " + (passed ? "pass" : "fail");
    $("passLine").innerHTML = passed
      ? '<span class="pass">Tebrikler, sınavı geçtiniz.</span>'
      : '<span class="fail">Bu denemede geçme notunun altında kaldınız.</span>';
    const mins = Math.round((state.finishedAt - state.startedAt) / 60000);
    $("resultMeta").textContent =
      r.correct + " / " + r.total + " doğru (%" + r.pct + ") · Geçme notu %" + CONFIG.PASS_PERCENT +
      " · Süre: " + mins + " dk" + (timeUp ? " (süre doldu)" : "");

    // Konu bazlı
    const dr = $("domainResults");
    dr.innerHTML = "";
    DOMAINS.forEach((d) => {
      const s = r.perDomain[d.id];
      const pct = s.total ? Math.round((s.right / s.total) * 100) : 0;
      const row = document.createElement("div");
      row.className = "domain-row";
      row.innerHTML =
        '<div style="display:flex;justify-content:space-between;"><strong></strong><span class="muted"></span></div>' +
        '<div class="bar"><div style="width:' + pct + '%"></div></div>';
      row.querySelector("strong").textContent = d.id + ".0 " + d.name;
      row.querySelector(".muted").textContent = s.right + " / " + s.total + " (%" + pct + ")";
      dr.appendChild(row);
    });

    // İnceleme
    const rv = $("review");
    rv.innerHTML = "";
    state.questions.forEach((q, i) => {
      const user = state.answers[i];
      const ok = user === q.answer;
      const item = document.createElement("div");
      item.className = "review-item " + (user === undefined ? "" : ok ? "right" : "wrong");
      const title = document.createElement("div");
      title.innerHTML = "<strong></strong>";
      title.querySelector("strong").textContent = (i + 1) + ". " + q.q;
      const yours = document.createElement("div");
      yours.className = "muted";
      yours.textContent = "Cevabınız: " + (user === undefined ? "boş" : String.fromCharCode(65 + user) + ") " + q.options[user]);
      const correct = document.createElement("div");
      correct.className = "muted";
      correct.textContent = "Doğru cevap: " + String.fromCharCode(65 + q.answer) + ") " + q.options[q.answer];
      const ex = document.createElement("div");
      ex.className = "explain";
      ex.textContent = q.explain;
      item.appendChild(title); item.appendChild(yours); item.appendChild(correct); item.appendChild(ex);
      rv.appendChild(item);
    });

    // Sertifika hakkı: yalnızca sınav modunda ve geçme notunda
    const canCert = passed && state.mode === "exam";
    $("btnCert").classList.toggle("hidden", !canCert);
    if (canCert) savePass(r);

    show("screen-results");
  }

  // ---- Geçme kaydı ve sertifika ----------------------------------------
  function makeCertId() {
    const d = new Date();
    const stamp = d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate());
    const rnd = Math.random().toString(36).slice(2, 8).toUpperCase();
    return "TRY-" + stamp + "-" + rnd;
  }

  function savePass(r) {
    const rec = {
      certId: makeCertId(),
      scaled: r.scaled,
      pct: r.pct,
      date: new Date().toISOString()
    };
    try { localStorage.setItem(CONFIG.PASS_KEY, JSON.stringify(rec)); } catch (e) { /* yoksay */ }
    return rec;
  }
  function getPass() {
    try {
      const raw = localStorage.getItem(CONFIG.PASS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function certDateText(iso) {
    const d = new Date(iso);
    const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    return d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
  }

  // Sertifikayı tuvalde çiz (Türkçe karakterler için sistem yazı tipi kullanılır)
  function drawCertificate(canvas, name, pass) {
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    ctx.fillStyle = "#fbfcfe";
    ctx.fillRect(0, 0, W, H);

    // Çerçeveler
    ctx.strokeStyle = "#0b5cad"; ctx.lineWidth = 18;
    ctx.strokeRect(40, 40, W - 80, H - 80);
    ctx.strokeStyle = "#9fb8d6"; ctx.lineWidth = 4;
    ctx.strokeRect(70, 70, W - 140, H - 140);

    ctx.textAlign = "center";
    ctx.fillStyle = "#083f78";
    ctx.font = "bold 64px Georgia, 'Times New Roman', serif";
    ctx.fillText("TryExam", W / 2, 200);

    ctx.fillStyle = "#1d2733";
    ctx.font = "34px Georgia, 'Times New Roman', serif";
    ctx.fillText("Tamamlama Belgesi", W / 2, 265);

    ctx.font = "26px 'Segoe UI', Arial, sans-serif";
    ctx.fillStyle = "#5d6b7a";
    ctx.fillText("Bu belge aşağıdaki kişinin", W / 2, 345);

    ctx.fillStyle = "#1d2733";
    ctx.font = "bold 70px Georgia, 'Times New Roman', serif";
    ctx.fillText(name, W / 2, 440);

    ctx.fillStyle = "#5d6b7a";
    ctx.font = "26px 'Segoe UI', Arial, sans-serif";
    const lines = [
      "CCNA 200-301 v2.0 konu müfredatına uygun TryExam sınav simülatörünü",
      "%" + pass.pct + " başarı oranıyla (1000 üzerinden " + pass.scaled + ") tamamladığını gösterir."
    ];
    lines.forEach((l, i) => ctx.fillText(l, W / 2, 510 + i * 40));

    ctx.fillStyle = "#1d2733";
    ctx.font = "24px 'Segoe UI', Arial, sans-serif";
    ctx.fillText("Tarih: " + certDateText(pass.date), W / 2, 640);
    ctx.fillText("Sertifika No: " + pass.certId, W / 2, 680);

    ctx.fillStyle = "#0b5cad";
    ctx.font = "bold 28px 'Segoe UI', Arial, sans-serif";
    ctx.fillText(CONFIG.AUTHOR_SITE, W / 2, 790);

    ctx.fillStyle = "#5d6b7a";
    ctx.font = "20px 'Segoe UI', Arial, sans-serif";
    ctx.fillText("Bu uygulama Cisco Systems ile bağlantılı değildir; resmi bir CCNA sertifikası değildir.", W / 2, 880);
  }

  let certName = "";
  function renderCertPreview() {
    certName = $("certName").value.trim();
    if (!certName) { alert("Lütfen adınızı yazın."); return; }
    const pass = getPass();
    if (!pass) { alert("Sertifika için geçerli bir sınav sonucu bulunamadı."); return; }
    const canvas = $("certCanvas");
    drawCertificate(canvas, certName, pass);
    canvas.classList.remove("hidden");
    $("certActions").classList.remove("hidden");
    $("linkedinHelp").textContent =
      "LinkedIn'de paylaş, sertifikayı profilinizin 'Lisanslar ve sertifikalar' bölümüne ekler. " +
      "PDF'i de paylaşım sırasında ekleyebilirsiniz.";
    $("linkedinHelp").classList.remove("hidden");
  }

  function downloadPdf() {
    const pass = getPass();
    if (!certName || !pass) return;
    const canvas = $("certCanvas");
    const { jsPDF } = window.jspdf || {};
    if (!jsPDF) { alert("PDF kütüphanesi yüklenemedi. Lütfen internet bağlantınızı kontrol edin."); return; }
    const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
    pdf.save("TryExam-Sertifika-" + pass.certId + ".pdf");
  }

  function shareLinkedIn() {
    const pass = getPass();
    if (!certName || !pass) return;
    const d = new Date(pass.date);
    const params = new URLSearchParams({
      startTask: "CERTIFICATION_NAME",
      name: CONFIG.CERT_NAME,
      organizationName: CONFIG.ORG_NAME,
      issueYear: String(d.getFullYear()),
      issueMonth: String(d.getMonth() + 1),
      certUrl: CONFIG.SITE_URL + "?cert=" + encodeURIComponent(pass.certId),
      certId: pass.certId
    });
    window.open("https://www.linkedin.com/profile/add?" + params.toString(), "_blank", "noopener");
  }

  // ---- Olay bağlama -----------------------------------------------------
  function init() {
    renderStart();
    bindExamControls();

    $("btnStart").addEventListener("click", () => {
      const saved = loadState();
      if (saved && saved.mode === "exam" && !saved.finished && saved.endsAt > Date.now()) {
        if (confirm("Yarım kalmış bir sınavınız var. Devam etmek ister misiniz? (Hayır: yeni sınav başlatılır)")) {
          state = saved; show("screen-exam"); renderQuestion(); startTimer(); return;
        }
      }
      clearState();
      startExam("exam");
    });
    $("btnPractice").addEventListener("click", () => { clearState(); startExam("practice"); });

    $("btnRetry").addEventListener("click", () => { clearState(); renderStart(); });
    $("btnCert").addEventListener("click", () => {
      const pass = getPass();
      if (pass) {
        $("certCanvas").classList.add("hidden");
        $("certActions").classList.add("hidden");
        $("linkedinHelp").classList.add("hidden");
      }
      show("screen-cert");
    });
    $("btnBackResults").addEventListener("click", () => show("screen-results"));
    $("btnMakeCert").addEventListener("click", renderCertPreview);
    $("btnDownloadPdf").addEventListener("click", downloadPdf);
    $("btnLinkedin").addEventListener("click", shareLinkedIn);

    // Yarım kalan sınav varsa (sayfa yenilendiğinde) sınav ekranına dön
    const saved = loadState();
    if (saved && saved.mode === "exam" && saved.finished) {
      // Tamamlanmış sınavı tekrar gösterme; başlangıç ekranı kalsın
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
