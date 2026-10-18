/* TryExam - CCNA 200-301 v2.0 sınav simülatörü
 * Soru türleri: tek seçim, çoklu seçim, eşleştirme (sürükle-bırak), yapılandırma (komut yazma)
 * Tamamen istemci tarafında çalışır (GitHub Pages uyumlu).
 */
(function () {
  "use strict";

  // ---- Yapılandırma ------------------------------------------------------
  const CONFIG = {
    EXAM_MINUTES: 120,
    EXAM_QUESTIONS: 100,
    PRACTICE_QUESTIONS: 10,
    PASS_PERCENT: 80,
    SITE_URL: "https://ctaner.github.io/TryExam/",   // Yayın adresinize göre güncelleyin
    AUTHOR_SITE: "www.cemaltaner.com.tr",
    CERT_NAME: "CCNA 200-301 v2.0 Sınav Simülatörü Tamamlama Belgesi",
    ORG_NAME: "TryExam",
    STORE_KEY: "tryexam_state_v2",
    PASS_KEY: "tryexam_last_pass_v1"
  };

  // ---- Yardımcılar -------------------------------------------------------
  const $ = (id) => document.getElementById(id);
  const show = (id) => {
    ["screen-start", "screen-exam", "screen-results", "screen-cert"].forEach((s) =>
      $(s).classList.toggle("hidden", s !== id));
  };
  const pad = (n) => String(n).padStart(2, "0");
  const LETTER = (i) => String.fromCharCode(65 + i);
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
  const normLine = (s) => String(s).trim().toLowerCase().replace(/\s+/g, " ");
  const typeOf = (q) => q.type || "single";

  // Sorular için seçenekleri/eşleştirmeleri karıştır, doğru cevapları yeniden eşle
  function prepareQuestion(src) {
    const type = typeOf(src);
    const base = { type: type, domain: src.domain, q: src.q, explain: src.explain };

    if (type === "multi") {
      const order = shuffle(src.options.map((_, i) => i));
      return Object.assign(base, {
        options: order.map((i) => src.options[i]),
        answer: src.answer.map((a) => order.indexOf(a)).sort((x, y) => x - y)
      });
    }
    if (type === "match") {
      const lOrder = shuffle(src.left.map((_, i) => i));
      const rOrder = shuffle(src.right.map((_, i) => i));
      return Object.assign(base, {
        left: lOrder.map((i) => src.left[i]),
        right: rOrder.map((i) => src.right[i]),
        answer: lOrder.map((li) => rOrder.indexOf(src.answer[li]))
      });
    }
    if (type === "lab") {
      return Object.assign(base, {
        topology: src.topology, devices: src.devices, init: src.init, tasks: src.tasks
      });
    }
    if (type === "config") {
      return Object.assign(base, { answerSets: src.answerSets });
    }
    // single
    const order = shuffle(src.options.map((_, i) => i));
    return Object.assign(base, {
      options: order.map((i) => src.options[i]),
      answer: order.indexOf(src.answer)
    });
  }

  // Cevap kontrolleri
  function isAnswered(q, a) {
    const t = typeOf(q);
    if (t === "single") return a !== undefined && a !== null;
    if (t === "multi") return Array.isArray(a) && a.length > 0;
    if (t === "match") return Array.isArray(a) && a.some((x) => x !== null && x !== undefined);
    if (t === "config") return typeof a === "string" && a.trim() !== "";
    if (t === "lab") return !!(a && Array.isArray(a.log) && a.log.length > 0);
    return false;
  }

  function isCorrect(q, a) {
    if (!isAnswered(q, a)) return false;
    const t = typeOf(q);
    if (t === "lab") return IOSLab.taskResults(q, IOSLab.replay(q, a.log)).every(Boolean);
    if (t === "single") return a === q.answer;
    if (t === "multi") {
      const u = a.slice().sort((x, y) => x - y);
      return u.length === q.answer.length && u.every((v, i) => v === q.answer[i]);
    }
    if (t === "match") return q.answer.every((v, i) => a[i] === v);
    if (t === "config") {
      const lines = a.split(/\r?\n/).map(normLine).filter(Boolean).sort();
      return q.answerSets.some((set) => {
        const s = set.map(normLine).sort();
        return s.length === lines.length && s.every((v, i) => v === lines[i]);
      });
    }
    return false;
  }

  function answerText(q, a) {
    if (!isAnswered(q, a)) return "boş";
    const t = typeOf(q);
    if (t === "single") return LETTER(a) + ") " + q.options[a];
    if (t === "multi") return a.map((i) => LETTER(i) + ") " + q.options[i]).join("\n");
    if (t === "match") return q.left.map((l, j) =>
      l + " → " + (a[j] === null || a[j] === undefined ? "(boş)" : q.right[a[j]])).join("\n");
    if (t === "config") return a.trim();
    if (t === "lab") return a.log.map((e) => e.prompt + e.cmd).join("\n");
    return "";
  }

  function correctText(q) {
    const t = typeOf(q);
    if (t === "single") return LETTER(q.answer) + ") " + q.options[q.answer];
    if (t === "multi") return q.answer.map((i) => LETTER(i) + ") " + q.options[i]).join("\n");
    if (t === "match") return q.left.map((l, j) => l + " → " + q.right[q.answer[j]]).join("\n");
    if (t === "config") return q.answerSets[0].join("\n");
    if (t === "lab") return q.tasks.map((x, k) => (k + 1) + ". " + x.text).join("\n");
    return "";
  }

  // ---- Durum -------------------------------------------------------------
  let state = null;     // { mode, questions, answers, flags, current, startedAt, endsAt, finished }
  let timerId = null;
  let selectedChip = null;   // eşleştirmede tıklama ile seçilen sağ öğe
  let labDev = null;         // simülasyon sorusunda seçili konsol sekmesi
  let lastIdx = -1;

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
    $("domainWeights").innerHTML = DOMAINS.map((d) =>
      d.weight + "% · " + d.id + ".0 " + d.name).join("<br>");
    show("screen-start");
    $("examTimer").classList.add("hidden");
  }

  function startExam(mode) {
    const count = mode === "exam" ? CONFIG.EXAM_QUESTIONS : CONFIG.PRACTICE_QUESTIONS;
    let picked = [];
    if (mode === "exam") {
      DOMAINS.forEach((d) => {
        const pool = shuffle(QUESTIONS.filter((q) => q.domain === d.id));
        const n = Math.round(count * d.weight / 100);
        picked = picked.concat(pool.slice(0, n));
      });
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
  function typeHint(q) {
    const t = typeOf(q);
    if (t === "multi") return "Birden fazla doğru seçenek vardır; tümünü işaretleyin (kısmi puan yoktur).";
    if (t === "match") return "Sol kutulara sağdaki açıklamaları sürükleyip bırakın (veya önce açıklamaya, sonra kutuya tıklayın). Dolu bir kutuya tıklayarak eşleşmeyi kaldırabilirsiniz.";
    if (t === "config") return "Komutu IOS yazım kurallarına uygun yazın. Birden fazla komut gerekiyorsa her komutu yeni satıra yazın.";
    return "";
  }

  function renderQuestion() {
    if (state.current !== lastIdx) { selectedChip = null; labDev = null; lastIdx = state.current; }
    const total = state.questions.length;
    const idx = state.current;
    const qObj = state.questions[idx];
    const t = typeOf(qObj);
    const answeredCount = state.questions.filter((q, i) => isAnswered(q, state.answers[i])).length;

    $("examMeta").textContent =
      (state.mode === "exam" ? "Sınav" : "Pratik") + " · Soru " + (idx + 1) + " / " + total +
      " · Cevaplanan: " + answeredCount;
    $("progressBar").style.width = Math.round((answeredCount / total) * 100) + "%";
    $("qDomain").textContent = qObj.domain + ".0 " + domainName(qObj.domain) +
      (t === "single" ? "" : " · " + ({ multi: "Çoklu seçim", match: "Eşleştirme", config: "Yapılandırma", lab: "Simülasyon" })[t]);
    $("qText").textContent = (idx + 1) + ". " + qObj.q;
    $("qText").style.whiteSpace = "pre-line";

    const box = $("qOptions");
    box.innerHTML = "";
    const hint = document.createElement("p");
    hint.className = "muted";
    hint.textContent = typeHint(qObj);
    if (hint.textContent) box.appendChild(hint);

    if (t === "single") renderSingle(box, qObj, idx);
    else if (t === "multi") renderMulti(box, qObj, idx);
    else if (t === "match") renderMatch(box, qObj, idx);
    else if (t === "config") renderConfig(box, qObj, idx);
    else if (t === "lab") renderLab(box, qObj, idx);

    $("btnPrev").disabled = idx === 0;
    $("btnNext").disabled = idx === total - 1;
    $("btnFlag").textContent = state.flags[idx] ? "İşareti kaldır" : "İşaretle";

    // Soru listesi
    const nav = $("qNav");
    nav.innerHTML = "";
    state.questions.forEach((q, i) => {
      const b = document.createElement("button");
      b.textContent = i + 1;
      let cls = "";
      if (isAnswered(q, state.answers[i])) cls += " answered";
      if (state.flags[i]) cls += " flagged";
      if (i === idx) cls += " current";
      b.className = cls.trim();
      b.addEventListener("click", () => { state.current = i; saveState(); renderQuestion(); });
      nav.appendChild(b);
    });
    saveState();
  }

  function renderSingle(box, qObj, idx) {
    qObj.options.forEach((text, i) => {
      const label = document.createElement("label");
      label.className = "opt" + (state.answers[idx] === i ? " selected" : "");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "opt";
      input.checked = state.answers[idx] === i;
      input.addEventListener("change", () => {
        state.answers[idx] = i;
        saveState();
        renderQuestion();
      });
      const span = document.createElement("span");
      span.textContent = LETTER(i) + ") " + text;
      label.appendChild(input);
      label.appendChild(span);
      box.appendChild(label);
    });
  }

  function renderMulti(box, qObj, idx) {
    const current = Array.isArray(state.answers[idx]) ? state.answers[idx] : [];
    qObj.options.forEach((text, i) => {
      const checked = current.indexOf(i) !== -1;
      const label = document.createElement("label");
      label.className = "opt" + (checked ? " selected" : "");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = checked;
      input.addEventListener("change", () => {
        let arr = Array.isArray(state.answers[idx]) ? state.answers[idx].slice() : [];
        if (input.checked) arr.push(i); else arr = arr.filter((v) => v !== i);
        arr.sort((x, y) => x - y);
        if (arr.length) state.answers[idx] = arr; else delete state.answers[idx];
        saveState();
        renderQuestion();
      });
      const span = document.createElement("span");
      span.textContent = LETTER(i) + ") " + text;
      label.appendChild(input);
      label.appendChild(span);
      box.appendChild(label);
    });
  }

  function renderMatch(box, qObj, idx) {
    if (!Array.isArray(state.answers[idx])) {
      state.answers[idx] = qObj.left.map(() => null);
    }
    const ans = state.answers[idx];
    const used = ans.filter((v) => v !== null);

    const assign = (j, r) => {
      const arr = state.answers[idx].slice();
      for (let k = 0; k < arr.length; k++) if (arr[k] === r) arr[k] = null;
      arr[j] = r;
      state.answers[idx] = arr;
      selectedChip = null;
      saveState();
      renderQuestion();
    };
    const unassign = (j) => {
      const arr = state.answers[idx].slice();
      arr[j] = null;
      state.answers[idx] = arr;
      saveState();
      renderQuestion();
    };

    const wrap = document.createElement("div");
    wrap.className = "match-wrap";

    // Sol: hedef kutuları
    const left = document.createElement("div");
    left.className = "match-col";
    const lh = document.createElement("div");
    lh.className = "match-head";
    lh.textContent = "Kavram";
    left.appendChild(lh);
    qObj.left.forEach((label, j) => {
      const row = document.createElement("div");
      row.className = "slot-row";
      const name = document.createElement("div");
      name.className = "slot-name";
      name.textContent = (j + 1) + ". " + label;
      const drop = document.createElement("div");
      drop.className = "drop" + (ans[j] !== null ? " filled" : "");
      drop.textContent = ans[j] !== null ? qObj.right[ans[j]] : "Buraya sürükleyin";
      drop.addEventListener("dragover", (e) => { e.preventDefault(); drop.classList.add("over"); });
      drop.addEventListener("dragleave", () => drop.classList.remove("over"));
      drop.addEventListener("drop", (e) => {
        e.preventDefault();
        const r = parseInt(e.dataTransfer.getData("text/plain"), 10);
        if (!isNaN(r)) assign(j, r);
      });
      drop.addEventListener("click", () => {
        if (selectedChip !== null) assign(j, selectedChip);
        else if (ans[j] !== null) unassign(j);
      });
      row.appendChild(name);
      row.appendChild(drop);
      left.appendChild(row);
    });

    // Sağ: sürüklenebilir açıklamalar
    const right = document.createElement("div");
    right.className = "match-col";
    const rh = document.createElement("div");
    rh.className = "match-head";
    rh.textContent = "Açıklamalar";
    right.appendChild(rh);
    qObj.right.forEach((text, r) => {
      if (used.indexOf(r) !== -1) return;   // zaten yerleştirilmiş
      const chip = document.createElement("div");
      chip.className = "chip" + (selectedChip === r ? " selected" : "");
      chip.draggable = true;
      chip.textContent = text;
      chip.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", String(r));
        e.dataTransfer.effectAllowed = "move";
      });
      chip.addEventListener("click", () => {
        selectedChip = selectedChip === r ? null : r;
        renderQuestion();
      });
      right.appendChild(chip);
    });
    if (!right.querySelector(".chip")) {
      const done = document.createElement("div");
      done.className = "muted";
      done.textContent = "Tüm açıklamalar yerleştirildi.";
      right.appendChild(done);
    }

    wrap.appendChild(left);
    wrap.appendChild(right);
    box.appendChild(wrap);
  }

  // Simülasyon (topoloji + IOS konsolu) sorusu
  function renderLab(box, qObj, idx) {
    const devices = qObj.devices;
    if (!labDev || devices.indexOf(labDev) === -1) labDev = devices[0];
    if (!state.answers[idx] || !Array.isArray(state.answers[idx].log)) state.answers[idx] = { log: [] };
    const log = state.answers[idx].log;

    const topo = document.createElement("div");
    topo.className = "topo-wrap";
    topo.innerHTML = IOSLab.renderTopology(qObj.topology);
    box.appendChild(topo);

    const th = document.createElement("h4");
    th.textContent = "Görevler (tümü tamamlanmalıdır)";
    box.appendChild(th);
    const ol = document.createElement("ol");
    ol.className = "tasks";
    qObj.tasks.forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t.text;
      ol.appendChild(li);
    });
    box.appendChild(ol);

    const tabs = document.createElement("div");
    tabs.className = "tabs";
    devices.forEach((dn) => {
      const b = document.createElement("button");
      b.className = "tab" + (dn === labDev ? " active" : "");
      b.textContent = dn;
      b.addEventListener("click", () => { labDev = dn; renderQuestion(); });
      tabs.appendChild(b);
    });
    box.appendChild(tabs);

    const term = document.createElement("pre");
    term.className = "term";
    const shown = log.filter((e) => e.dev === labDev).map((e) => e.prompt + e.cmd + (e.out ? "\n" + e.out : ""));
    term.textContent = shown.length ? shown.join("\n") : "Konsol hazır. Örnek: enable, configure terminal, show ip interface brief";
    box.appendChild(term);

    const row = document.createElement("div");
    row.className = "term-input";
    const pr = document.createElement("span");
    pr.className = "term-prompt";
    pr.textContent = IOSLab.prompt(IOSLab.replay(qObj, log), labDev);
    const inp = document.createElement("input");
    inp.type = "text";
    inp.id = "labInput";
    inp.autocomplete = "off";
    inp.spellcheck = false;
    inp.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); submitLabCmd(qObj, idx, inp.value); }
    });
    row.appendChild(pr);
    row.appendChild(inp);
    box.appendChild(row);
    term.scrollTop = term.scrollHeight;
    inp.focus();
  }

  function submitLabCmd(qObj, idx, cmd) {
    const raw = String(cmd || "").trim();
    if (!raw) return;
    const log = state.answers[idx].log;
    const lab = IOSLab.replay(qObj, log);
    log.push({ dev: labDev, cmd: raw, prompt: IOSLab.prompt(lab, labDev), out: IOSLab.run(lab, labDev, raw) });
    saveState();
    renderQuestion();
  }

  // Sayfa yenilendiğinde yalnızca kaydedilebilir alanlar saklanır; görevleri bankadan geri yükle
  function reattachTasks() {
    if (!state) return;
    state.questions.forEach((q) => {
      if (typeOf(q) !== "lab") return;
      const src = QUESTIONS.find((s) => s.q === q.q);
      if (src) q.tasks = src.tasks;
    });
  }

  function renderConfig(box, qObj, idx) {
    const ta = document.createElement("textarea");
    ta.className = "cli";
    ta.rows = 4;
    ta.spellcheck = false;
    ta.placeholder = "Komutunuzu buraya yazın...";
    ta.value = typeof state.answers[idx] === "string" ? state.answers[idx] : "";
    ta.addEventListener("input", () => {
      if (ta.value.trim()) state.answers[idx] = ta.value;
      else delete state.answers[idx];
      saveState();
    });
    ta.addEventListener("change", () => renderQuestion());
    box.appendChild(ta);
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
      const unanswered = state.questions.filter((q, i) => !isAnswered(q, state.answers[i])).length;
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
      if (isCorrect(q, st.answers[i])) { correct++; perDomain[q.domain].right++; }
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

    const rv = $("review");
    rv.innerHTML = "";
    state.questions.forEach((q, i) => {
      const user = state.answers[i];
      const answered = isAnswered(q, user);
      const ok = isCorrect(q, user);
      const item = document.createElement("div");
      item.className = "review-item " + (!answered ? "" : ok ? "right" : "wrong");

      const title = document.createElement("div");
      const strong = document.createElement("strong");
      strong.textContent = (i + 1) + ". " + q.q;
      title.appendChild(strong);

      const yours = document.createElement("div");
      yours.className = "muted pre";
      yours.textContent = "Cevabınız: " + answerText(q, user);
      const correct = document.createElement("div");
      correct.className = "muted pre";
      correct.textContent = "Doğru cevap: " + correctText(q);
      const ex = document.createElement("div");
      ex.className = "explain";
      ex.textContent = q.explain;

      item.appendChild(title);
      item.appendChild(yours);
      item.appendChild(correct);
      item.appendChild(ex);
      if (typeOf(q) === "lab") {
        const res = IOSLab.taskResults(q, IOSLab.replay(q, user && user.log ? user.log : []));
        const ul = document.createElement("ul");
        ul.className = "tasks-res";
        q.tasks.forEach((t, k) => {
          const li = document.createElement("li");
          li.textContent = (res[k] ? "✓ " : "✗ ") + t.text;
          li.className = res[k] ? "t-ok" : "t-bad";
          ul.appendChild(li);
        });
        item.appendChild(ul);
      }
      rv.appendChild(item);
    });

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

  function drawCertificate(canvas, name, pass) {
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    ctx.fillStyle = "#fbfcfe";
    ctx.fillRect(0, 0, W, H);

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
          state = saved; reattachTasks(); show("screen-exam"); renderQuestion(); startTimer(); return;
        }
      }
      clearState();
      startExam("exam");
    });
    $("btnPractice").addEventListener("click", () => { clearState(); startExam("practice"); });

    $("btnRetry").addEventListener("click", () => { clearState(); renderStart(); });
    $("btnCert").addEventListener("click", () => {
      $("certCanvas").classList.add("hidden");
      $("certActions").classList.add("hidden");
      $("linkedinHelp").classList.add("hidden");
      show("screen-cert");
    });
    $("btnBackResults").addEventListener("click", () => show("screen-results"));
    $("btnMakeCert").addEventListener("click", renderCertPreview);
    $("btnDownloadPdf").addEventListener("click", downloadPdf);
    $("btnLinkedin").addEventListener("click", shareLinkedIn);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
