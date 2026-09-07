/**
 * Application Controller: CoolNut Physics - Gravitational Force
 * ระบบจัดการโหมดเรียนรู้, คลังโจทย์ 20 ข้อ, และห้องสอบจับเวลา 15 นาที
 */

(function () {
  'use strict';

  // State Management
  const AppState = {
    currentTab: 'tab-learning',
    soundEnabled: true,
    audioCtx: null,
    
    // Exam State
    exam: {
      active: false,
      student: null,
      startTime: null,
      endTime: null,
      durationMinutes: 15,
      remainingSeconds: 15 * 60,
      timerInterval: null,
      questions: [],
      submissions: {},
      isSubmitted: false,
      result: null
    },

    // Sandbox State
    sandbox: {
      mass: 1.0,
      radius: 1.0
    }
  };

  const STORAGE_KEY = 'COOLNUT_GRAV_EXAM_ACTIVE_SESSION';

  // ==========================================================================
  // Web Audio Synthesizer (Retro Sci-Fi Sound Effects)
  // ==========================================================================
  function initAudio() {
    if (!AppState.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        AppState.audioCtx = new AudioContext();
      }
    }
    if (AppState.audioCtx && AppState.audioCtx.state === 'suspended') {
      AppState.audioCtx.resume();
    }
  }

  function playTone(freq, type, duration, gainVal = 0.1) {
    if (!AppState.soundEnabled) return;
    try {
      initAudio();
      if (!AppState.audioCtx) return;
      const osc = AppState.audioCtx.createOscillator();
      const gain = AppState.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, AppState.audioCtx.currentTime);
      gain.gain.setValueAtTime(gainVal, AppState.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, AppState.audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(AppState.audioCtx.destination);
      osc.start();
      osc.stop(AppState.audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  const Sound = {
    click: () => playTone(600, 'sine', 0.08, 0.08),
    switchTab: () => playTone(440, 'triangle', 0.12, 0.08),
    correct: () => {
      playTone(523.25, 'sine', 0.1, 0.1);
      setTimeout(() => playTone(659.25, 'sine', 0.15, 0.1), 100);
      setTimeout(() => playTone(783.99, 'sine', 0.25, 0.1), 200);
    },
    incorrect: () => {
      playTone(250, 'sawtooth', 0.15, 0.08);
      setTimeout(() => playTone(180, 'sawtooth', 0.2, 0.08), 150);
    },
    fanfare: () => {
      // Victory cosmic fanfare for 100% full score
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        setTimeout(() => playTone(freq, 'sine', 0.35, 0.15), idx * 160);
      });
    },
    tick: () => playTone(880, 'square', 0.03, 0.03)
  };

  // Toast Notifications
  function showToast(text) {
    const toast = document.getElementById('toast-msg');
    const toastText = document.getElementById('toast-text');
    if (toast && toastText) {
      toastText.textContent = text;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  }

  // ==========================================================================
  // Starfield Canvas Background Animation
  // ==========================================================================
  function initStarfield() {
    const canvas = document.getElementById('space-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars = [];
      const starCount = Math.floor((width * height) / 3500);
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.02 + 0.005,
          color: Math.random() > 0.8 ? '#00f0ff' : (Math.random() > 0.6 ? '#ffd166' : '#ffffff')
        });
      }
    }

    window.addEventListener('resize', resize);
    resize();

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Deep space gradient backdrop
      const grad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width);
      grad.addColorStop(0, 'rgba(10, 14, 38, 0.4)');
      grad.addColorStop(1, 'rgba(5, 6, 15, 0.8)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw stars
      for (let star of stars) {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0.2) {
          star.speed = -star.speed;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.shadowBlur = star.radius * 2;
        ctx.shadowColor = star.color;
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;
      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
  }

  // ==========================================================================
  // Tab Navigation
  // ==========================================================================
  function switchTab(tabId) {
    if (tabId === AppState.currentTab) return;
    Sound.switchTab();

    // Check if user is in active exam and trying to switch away
    if (AppState.exam.active && !AppState.exam.isSubmitted && tabId !== 'tab-exam') {
      const confirmLeave = confirm('⚠️ คุณกำลังอยู่ในระหว่างการสอบจับเวลา 15 นาที! ต้องการสลับหน้าหรือไม่? (เวลานับถอยหลังจะยังคงดำเนินต่อไป)');
      if (!confirmLeave) return;
    }

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
      btn.setAttribute('aria-selected', btn.getAttribute('data-tab') === tabId);
    });

    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === tabId);
    });

    AppState.currentTab = tabId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderMath();
  }

  // ==========================================================================
  // Learning Hub & Gravity Sandbox
  // ==========================================================================
  function renderLearningSections() {
    const container = document.getElementById('learning-sections-container');
    if (!container || !PHYSICS_DATA || !PHYSICS_DATA.summarySections) return;

    let html = '';
    PHYSICS_DATA.summarySections.forEach(sec => {
      html += `
        <div class="glass-card" id="${sec.id}">
          <div class="section-header-title">
            <span class="icon">${sec.icon}</span>
            <h3>${sec.title}</h3>
          </div>
          <div class="section-body">
            ${sec.content}
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
    renderMath(container);
  }

  function initGravitySandbox() {
    const sliderMass = document.getElementById('slider-mass');
    const sliderRadius = document.getElementById('slider-radius');
    const valMass = document.getElementById('val-mass');
    const valRadius = document.getElementById('val-radius');
    const metricG = document.getElementById('metric-g');
    const metricW = document.getElementById('metric-w');
    const metricT = document.getElementById('metric-t');
    const simPlanet = document.getElementById('sim-planet');
    const simRocket = document.getElementById('sim-rocket');
    const btnDrop = document.getElementById('btn-drop-sim') || document.getElementById('btn-sim-drop');

    if (!sliderMass || !sliderRadius) return;

    function updateSandbox() {
      const M = parseFloat(sliderMass.value);
      const R = parseFloat(sliderRadius.value);
      AppState.sandbox.mass = M;
      AppState.sandbox.radius = R;

      valMass.textContent = `${M.toFixed(2)} เท่า`;
      valRadius.textContent = `${R.toFixed(2)} เท่า`;

      // g_ratio = M / R^2
      const gRatio = M / (R * R);
      const weight = 80.0 * gRatio; // Base weight 80 N on Earth
      const fallTime = 1.0 / Math.sqrt(gRatio); // Base fall time 1.0 s on Earth

      metricG.textContent = `${gRatio.toFixed(2)} g_E`;
      metricW.textContent = `${weight.toFixed(1)} N`;
      metricT.textContent = `${fallTime.toFixed(2)} s`;

      // Visual adjustments: planet size proportional to R, color glow proportional to gRatio
      if (simPlanet) {
        const sizePx = Math.max(40, Math.min(110, 40 + R * 14));
        simPlanet.style.width = `${sizePx}px`;
        simPlanet.style.height = `${sizePx}px`;

        if (gRatio >= 2.0) {
          simPlanet.style.background = 'radial-gradient(circle at 30% 30%, #ff7b00 0%, #ff477e 60%, #1a0022 100%)';
          simPlanet.style.boxShadow = '0 0 30px rgba(255, 71, 126, 0.6)';
        } else if (gRatio >= 1.0) {
          simPlanet.style.background = 'radial-gradient(circle at 30% 30%, #4facfe 0%, #00f2fe 50%, #000 100%)';
          simPlanet.style.boxShadow = '0 0 25px rgba(0, 240, 255, 0.5)';
        } else {
          simPlanet.style.background = 'radial-gradient(circle at 30% 30%, #a855f7 0%, #6366f1 60%, #090a1a 100%)';
          simPlanet.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.4)';
        }
      }
    }

    sliderMass.addEventListener('input', updateSandbox);
    sliderRadius.addEventListener('input', updateSandbox);
    updateSandbox();

    if (btnDrop && simRocket) {
      btnDrop.addEventListener('click', () => {
        Sound.click();
        const M = AppState.sandbox.mass;
        const R = AppState.sandbox.radius;
        const gRatio = M / (R * R);
        const animDuration = Math.max(0.3, Math.min(2.5, 1.0 / Math.sqrt(gRatio)));

        simRocket.style.transition = 'none';
        simRocket.style.top = '10px';

        setTimeout(() => {
          simRocket.style.transition = `top ${animDuration.toFixed(2)}s cubic-bezier(0.5, 0, 1, 1)`;
          simRocket.style.top = '75px';
        }, 50);

        setTimeout(() => {
          Sound.click();
        }, animDuration * 1000);
      });
    }
  }

  // ==========================================================================
  // Practice Mode (20 Questions & Random Generator)
  // ==========================================================================
  function renderPracticeList(filterCategory = 'all', searchQuery = '') {
    const container = document.getElementById('practice-list-container');
    if (!container || !PHYSICS_DATA || !PHYSICS_DATA.masterExercises) return;

    const filtered = PHYSICS_DATA.masterExercises.filter(item => {
      const matchCat = (filterCategory === 'all') || (item.category === filterCategory);
      const matchSearch = searchQuery === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="glass-card" style="text-align: center; padding: 2.5rem;">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🛸</div>
          <p style="color: var(--text-secondary);">ไม่พบโจทย์ที่ตรงกับคำค้นหาของคุณ ลองค้นหาด้วยคำอื่นดูนะ</p>
        </div>
      `;
      return;
    }

    let html = '';
    filtered.forEach(q => {
      html += `
        <div class="problem-card" id="master-q-${q.id}">
          <div class="problem-header">
            <span class="problem-num-badge">ข้อที่ ${q.id}</span>
            <span class="problem-category-badge">${q.categoryName}</span>
          </div>

          <div class="problem-text">${q.question}</div>

          <div class="problem-actions">
            <button class="btn btn-outline btn-toggle-sol" data-qid="${q.id}">
              <span>💡</span> ดูเฉลยละเอียด
            </button>
            <button class="btn btn-primary btn-random-practice" data-qid="${q.id}">
              <span>🎲</span> สุ่มตัวเลขฝึกทำใหม่
            </button>
          </div>

          <!-- Collapsible Master Solution -->
          <div class="solution-collapse" id="solution-collapse-${q.id}">
            <h4 style="color: var(--cyan-glow); margin-bottom: 0.5rem; font-size: 0.95rem;">เฉลยวิธีคิดละเอียด:</h4>
            ${q.solution}
          </div>

          <!-- Dynamic Practice Workbench (Appended on demand) -->
          <div class="random-workbench-container" id="workbench-container-${q.id}"></div>
        </div>
      `;
    });

    container.innerHTML = html;
    renderMath(container);

    // Attach Event Listeners
    container.querySelectorAll('.btn-toggle-sol').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const qid = e.currentTarget.getAttribute('data-qid');
        const collapse = document.getElementById(`solution-collapse-${qid}`);
        if (collapse) {
          Sound.click();
          collapse.classList.toggle('open');
          e.currentTarget.classList.toggle('active');
          if (collapse.classList.contains('open')) {
            renderMath(collapse);
          }
        }
      });
    });

    container.querySelectorAll('.btn-random-practice').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const qid = parseInt(e.currentTarget.getAttribute('data-qid'), 10);
        openRandomWorkbench(qid);
      });
    });
  }

  function openRandomWorkbench(templateId) {
    Sound.click();
    const targetContainer = document.getElementById(`workbench-container-${templateId}`);
    if (!targetContainer) return;

    // Generate random question using PhysicsEngine
    const randQ = PhysicsEngine.generateQuestion(templateId, true);

    targetContainer.innerHTML = `
      <div class="random-workbench">
        <span class="workbench-badge">โหมดฝึกซ้อมรบ • สุ่มตัวเลขใหม่</span>
        <div style="font-size: 0.98rem; margin: 0.5rem 0; color: #fff;">${randQ.question}</div>

        <div class="workbench-input-group">
          <input type="number" step="0.01" class="cosmic-input wb-input-ans" placeholder="พิมพ์คำตอบทศนิยม เช่น 2.25">
          
          <select class="cosmic-select wb-select-unit">
            <option value="">-- เลือกหน่วย --</option>
            ${(randQ.unitOptions || PhysicsEngine.UNIT_OPTIONS).map(u => `<option value="${u}">${u}</option>`).join('')}
          </select>

          <button class="btn btn-gold btn-wb-check">
            <span>🚀</span> ตรวจคำตอบ
          </button>
          <button class="btn btn-outline btn-wb-close">
            <span>✖</span> ปิด
          </button>
        </div>

        <div class="wb-feedback" style="display: none; padding-top: 0.5rem; font-size: 0.92rem;"></div>
      </div>
    `;

    renderMath(targetContainer);

    const wbBox = targetContainer.querySelector('.random-workbench');
    const inputAns = wbBox.querySelector('.wb-input-ans');
    const selectUnit = wbBox.querySelector('.wb-select-unit');
    const btnCheck = wbBox.querySelector('.btn-wb-check');
    const btnClose = wbBox.querySelector('.btn-wb-close');
    const feedbackBox = wbBox.querySelector('.wb-feedback');

    btnCheck.addEventListener('click', () => {
      const userVal = parseFloat(inputAns.value);
      const userUnit = selectUnit.value;

      if (isNaN(userVal)) {
        showToast('กรุณากรอกตัวเลขคำตอบก่อนตรวจนะ');
        return;
      }

      const isMathCorrect = Math.abs(userVal - randQ.correctAnswer) <= 0.05;
      const isUnitCorrect = userUnit === randQ.unit;

      feedbackBox.style.display = 'block';

      if (isMathCorrect && isUnitCorrect) {
        Sound.correct();
        feedbackBox.innerHTML = `
          <div style="color: var(--emerald); font-weight: 600;">
            ✅ ยอดเยี่ยมมาก! ถูกต้องสมบูรณ์ทั้งตัวเลข (${randQ.correctAnswer}) และหน่วย (${randQ.unit})
          </div>
          <div style="color: var(--text-secondary); margin-top: 0.25rem; font-size: 0.85rem;">
            วิธีคิด: ${randQ.solutionSummary}
          </div>
        `;
      } else if (isMathCorrect && !isUnitCorrect) {
        Sound.incorrect();
        feedbackBox.innerHTML = `
          <div style="color: var(--gold-glow); font-weight: 600;">
            ⚠️ ตัวเลขถูกต้องแล้ว (${userVal}) แต่หน่วยยังไม่ถูกต้องนะ! หน่วยที่ถูกต้องคือ "${randQ.unit}"
          </div>
        `;
      } else if (!isMathCorrect && isUnitCorrect) {
        Sound.incorrect();
        feedbackBox.innerHTML = `
          <div style="color: var(--crimson); font-weight: 600;">
            ❌ ตัวเลขยังไม่ถูกต้อง ลองคำนวณใหม่อีกครั้งนะ (หน่วยถูกต้องแล้ว)
          </div>
          <div style="color: var(--text-secondary); margin-top: 0.25rem; font-size: 0.85rem;">
            คำใบ้สูตร: ${randQ.solutionSummary}
          </div>
        `;
      } else {
        Sound.incorrect();
        feedbackBox.innerHTML = `
          <div style="color: var(--crimson); font-weight: 600;">
            ❌ ยังไม่ถูกต้องทั้งตัวเลขและหน่วย
          </div>
          <div style="color: var(--text-secondary); margin-top: 0.25rem; font-size: 0.85rem;">
            เฉลย: <strong>${randQ.correctAnswer} ${randQ.unit}</strong> (${randQ.solutionSummary})
          </div>
        `;
      }

      renderMath(feedbackBox);
    });

    btnClose.addEventListener('click', () => {
      Sound.click();
      targetContainer.innerHTML = '';
    });
  }

  // ==========================================================================
  // Exam System (15-Minute Timed Test with Anti-Cheat & Auto-Submit)
  // ==========================================================================
  function restoreExamSession() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const session = JSON.parse(raw);
      if (!session || !session.active) return;

      const elapsed = Math.floor((Date.now() - session.startTime) / 1000);
      const totalAllowed = session.durationMinutes * 60;
      const remaining = totalAllowed - elapsed;

      if (remaining <= 0) {
        // Exam time is up
        localStorage.removeItem(STORAGE_KEY);
        return;
      }

      // Restore active exam session
      AppState.exam = {
        active: true,
        student: session.student,
        startTime: session.startTime,
        endTime: null,
        durationMinutes: session.durationMinutes,
        remainingSeconds: remaining,
        timerInterval: null,
        questions: session.questions,
        submissions: session.submissions || {},
        isSubmitted: false,
        result: null
      };

      // Switch to exam UI
      document.getElementById('exam-preflight-card').style.display = 'none';
      document.getElementById('exam-active-screen').style.display = 'block';
      document.getElementById('hud-student-name').textContent = session.student.name;
      document.getElementById('hud-student-info').textContent = `ชั้น ${session.student.room} • เลขที่ ${session.student.number}`;

      renderExamQuestions();
      startExamTimer();
      showToast('ระบบกู้คืนชุดข้อสอบเดิมและเวลานับถอยหลังต่อให้เรียบร้อยแล้ว');
    } catch (e) {
      console.warn('Session restore failed:', e);
    }
  }

  function saveExamSession() {
    if (!AppState.exam.active || AppState.exam.isSubmitted) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }
    const session = {
      active: true,
      student: AppState.exam.student,
      startTime: AppState.exam.startTime,
      durationMinutes: AppState.exam.durationMinutes,
      questions: AppState.exam.questions,
      submissions: AppState.exam.submissions
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }

  function startExam() {
    Sound.click();
    const nameInput = document.getElementById('student-name');
    const roomInput = document.getElementById('student-room');
    const numberInput = document.getElementById('student-number');

    const name = nameInput.value.trim();
    const room = roomInput.value.trim();
    const number = numberInput.value.trim();

    if (!name || !room || !number) {
      showToast('กรุณากรอกชื่อ-นามสกุล ชั้น และเลขที่ให้ครบถ้วนก่อนเริ่มสอบ');
      return;
    }

    // Generate 4 randomized questions
    const examQuestions = PhysicsEngine.generateExamPaper();

    AppState.exam = {
      active: true,
      student: { name, room, number },
      startTime: Date.now(),
      endTime: null,
      durationMinutes: 15,
      remainingSeconds: 15 * 60,
      timerInterval: null,
      questions: examQuestions,
      submissions: {},
      isSubmitted: false,
      result: null
    };

    saveExamSession();

    // Show Exam Screen
    document.getElementById('exam-preflight-card').style.display = 'none';
    document.getElementById('exam-active-screen').style.display = 'block';

    document.getElementById('hud-student-name').textContent = name;
    document.getElementById('hud-student-info').textContent = `ชั้น ${room} • เลขที่ ${number}`;

    renderExamQuestions();
    startExamTimer();
    showToast('ภารกิจเริ่มแล้ว! คุณมีเวลา 15 นาที ขอให้โชคดี');
  }

  function startExamTimer() {
    if (AppState.exam.timerInterval) {
      clearInterval(AppState.exam.timerInterval);
    }

    const countdownEl = document.getElementById('exam-countdown');
    const timerBox = document.getElementById('timer-box');

    function tick() {
      if (AppState.exam.remainingSeconds <= 0) {
        clearInterval(AppState.exam.timerInterval);
        submitExam(true); // Auto-submit
        return;
      }

      AppState.exam.remainingSeconds--;

      const mins = Math.floor(AppState.exam.remainingSeconds / 60);
      const secs = AppState.exam.remainingSeconds % 60;
      countdownEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

      // Urgency states
      if (AppState.exam.remainingSeconds <= 60) {
        timerBox.className = 'timer-container urgent';
        if (AppState.exam.remainingSeconds % 10 === 0) Sound.tick();
      } else if (AppState.exam.remainingSeconds <= 300) {
        timerBox.className = 'timer-container warning';
      } else {
        timerBox.className = 'timer-container';
      }
    }

    tick();
    AppState.exam.timerInterval = setInterval(tick, 1000);
  }

  function renderExamQuestions() {
    const container = document.getElementById('exam-questions-container');
    if (!container) return;

    let html = '';
    AppState.exam.questions.forEach((q, idx) => {
      const qNum = idx + 1;
      const savedSub = AppState.exam.submissions[idx] || {};

      if (q.type === 'multiple_choice') {
        // ข้อ 1 - 2: ปรนัย 5 ตัวเลือก
        html += `
          <div class="exam-item-card ${savedSub.selectedChoice !== undefined ? 'answered' : ''}" id="exam-card-${idx}">
            <div class="exam-item-header">
              <div class="exam-item-num">ข้อที่ ${qNum} (ปรนัย 5 ตัวเลือก)</div>
              <div class="exam-item-score-badge">คะแนนเต็ม ${q.maxScore} คะแนน</div>
            </div>

            <div class="problem-text">${q.question}</div>

            <div class="choices-container">
              ${q.choices.map((c, cIdx) => {
                const isSelected = savedSub.selectedChoice === c.value;
                const letter = String.fromCharCode(65 + cIdx); // A, B, C, D, E
                return `
                  <div class="choice-option ${isSelected ? 'selected' : ''}" data-qid="${idx}" data-val="${c.value}">
                    <div class="choice-circle">${letter}</div>
                    <div class="choice-label">${c.label}</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      } else if (q.type === 'fill_in_unit') {
        // ข้อ 3 - 4: เติมคำตอบ + เลือกหน่วย
        html += `
          <div class="exam-item-card ${(savedSub.userNumber && savedSub.userUnit) ? 'answered' : ''}" id="exam-card-${idx}">
            <div class="exam-item-header">
              <div class="exam-item-num">ข้อที่ ${qNum} (เติมคำตอบและระบุหน่วย)</div>
              <div class="exam-item-score-badge">คะแนนเต็ม ${q.maxScore} คะแนน (ตัวเลข 2.0 + หน่วย 1.0)</div>
            </div>

            <div class="problem-text">${q.question}</div>

            <div class="fill-in-container">
              <div class="fill-in-box">
                <label for="exam-input-num-${idx}">1. กรอกตัวเลขคำตอบ (ทศนิยม 2 ตำแหน่ง):</label>
                <input type="number" step="0.01" class="cosmic-input exam-fill-num" id="exam-input-num-${idx}" data-qid="${idx}" value="${savedSub.userNumber || ''}" placeholder="เช่น 2.25">
              </div>

              <div class="fill-in-box">
                <label for="exam-select-unit-${idx}">2. เลือกหน่วยให้ถูกต้อง:</label>
                <select class="cosmic-select exam-fill-unit" id="exam-select-unit-${idx}" data-qid="${idx}">
                  <option value="">-- เลือกหน่วย --</option>
                  ${q.unitOptions.map(u => `
                    <option value="${u}" ${savedSub.userUnit === u ? 'selected' : ''}>${u}</option>
                  `).join('')}
                </select>
              </div>
            </div>

            <div class="hint-split-score">
              💡 <em>เกณฑ์การให้คะแนน: ตัวเลขถูกต้องได้ 2.0 คะแนน | เลือกหน่วยถูกต้องได้ 1.0 คะแนน (ได้คะแนนแม้จะถูกเพียงส่วนใดส่วนหนึ่ง)</em>
            </div>
          </div>
        `;
      }
    });

    container.innerHTML = html;
    renderMath(container);

    // Attach choice option click listener
    container.querySelectorAll('.choice-option').forEach(opt => {
      opt.addEventListener('click', (e) => {
        Sound.click();
        const qid = parseInt(e.currentTarget.getAttribute('data-qid'), 10);
        const val = parseFloat(e.currentTarget.getAttribute('data-val'));

        // Deselect siblings
        const parent = document.getElementById(`exam-card-${qid}`);
        parent.querySelectorAll('.choice-option').forEach(el => el.classList.remove('selected'));
        e.currentTarget.classList.add('selected');
        parent.classList.add('answered');

        if (!AppState.exam.submissions[qid]) AppState.exam.submissions[qid] = {};
        AppState.exam.submissions[qid].selectedChoice = val;
        saveExamSession();
      });
    });

    // Attach fill-in numeric input listeners
    container.querySelectorAll('.exam-fill-num').forEach(input => {
      input.addEventListener('input', (e) => {
        const qid = parseInt(e.currentTarget.getAttribute('data-qid'), 10);
        if (!AppState.exam.submissions[qid]) AppState.exam.submissions[qid] = {};
        AppState.exam.submissions[qid].userNumber = e.currentTarget.value.trim();

        const parent = document.getElementById(`exam-card-${qid}`);
        if (AppState.exam.submissions[qid].userNumber) parent.classList.add('answered');
        saveExamSession();
      });
    });

    // Attach fill-in unit selector listeners
    container.querySelectorAll('.exam-fill-unit').forEach(select => {
      select.addEventListener('change', (e) => {
        Sound.click();
        const qid = parseInt(e.currentTarget.getAttribute('data-qid'), 10);
        if (!AppState.exam.submissions[qid]) AppState.exam.submissions[qid] = {};
        AppState.exam.submissions[qid].userUnit = e.currentTarget.value;
        saveExamSession();
      });
    });
  }

  function submitExam(isTimeout = false) {
    if (!AppState.exam.active || AppState.exam.isSubmitted) return;

    // Harvest latest values from inputs in case student just typed
    for (let idx = 0; idx < AppState.exam.questions.length; idx++) {
      if (AppState.exam.questions[idx].type === 'fill_in_unit') {
        const numEl = document.getElementById(`exam-input-num-${idx}`);
        const unitEl = document.getElementById(`exam-select-unit-${idx}`);
        if (!AppState.exam.submissions[idx]) AppState.exam.submissions[idx] = {};
        if (numEl && numEl.value.trim() !== '') {
          AppState.exam.submissions[idx].userNumber = numEl.value.trim();
        }
        if (unitEl && unitEl.value !== '') {
          AppState.exam.submissions[idx].userUnit = unitEl.value;
        }
      }
    }

    if (!isTimeout) {
      // Check unanswered questions
      let answeredCount = 0;
      for (let i = 0; i < 4; i++) {
        const sub = AppState.exam.submissions[i];
        if (sub && (sub.selectedChoice !== undefined || (sub.userNumber && sub.userUnit))) {
          answeredCount++;
        }
      }
      if (answeredCount < 4) {
        const confirmSub = confirm(`คุณตอบไปแล้ว ${answeredCount}/4 ข้อ ยังมีข้อที่ไม่ได้ตอบ ต้องการส่งข้อสอบทันทีหรือไม่?`);
        if (!confirmSub) return;
      } else {
        const confirmSub = confirm('คุณแน่ใจหรือไม่ว่าต้องการส่งข้อสอบเพื่อตรวจผลคะแนน?');
        if (!confirmSub) return;
      }
    }

    clearInterval(AppState.exam.timerInterval);
    AppState.exam.active = false;
    AppState.exam.isSubmitted = true;
    AppState.exam.endTime = Date.now();

    // Grade exam
    const gradeResult = PhysicsEngine.gradeExam(AppState.exam.questions, AppState.exam.submissions);
    AppState.exam.result = gradeResult;

    // Remove active storage
    localStorage.removeItem(STORAGE_KEY);

    // Show Results Modal
    showExamResultModal(gradeResult, isTimeout);
  }

  function showExamResultModal(result, isTimeout) {
    const modal = document.getElementById('exam-result-modal');
    if (!modal) return;

    const startTimestamp = new Date(AppState.exam.startTime);
    const endTimestamp = new Date(AppState.exam.endTime);
    const durationSeconds = Math.round((AppState.exam.endTime - AppState.exam.startTime) / 1000);
    const durationMins = Math.floor(durationSeconds / 60);
    const durationSecs = durationSeconds % 60;
    const durationStr = `${durationMins} นาที ${durationSecs} วินาที`;

    // Verification code
    const vCode = PhysicsEngine.generateVerificationCode(
      AppState.exam.student,
      result,
      AppState.exam.endTime
    );

    // Update Result Board
    document.getElementById('res-score-total').textContent = `${result.totalScore.toFixed(2)} / 10.0 คะแนน`;
    document.getElementById('res-percentage').textContent = `${result.percentage}%`;
    document.getElementById('res-duration').textContent = `${String(durationMins).padStart(2, '0')}:${String(durationSecs).padStart(2, '0')}`;

    // Update Score Slip Card
    document.getElementById('slip-name').textContent = AppState.exam.student.name;
    document.getElementById('slip-room').textContent = AppState.exam.student.room;
    document.getElementById('slip-number').textContent = AppState.exam.student.number;
    document.getElementById('slip-start-time').textContent = startTimestamp.toLocaleTimeString('th-TH');
    document.getElementById('slip-submit-time').textContent = endTimestamp.toLocaleTimeString('th-TH');
    document.getElementById('slip-duration').textContent = durationStr;
    const slipScoreEl = document.getElementById('slip-score');
    if (slipScoreEl) slipScoreEl.textContent = `${result.totalScore.toFixed(2)} / 10.0 คะแนน (${result.percentage}%)`;
    const slipStatusEl = document.getElementById('slip-status');
    if (slipStatusEl) {
      slipStatusEl.textContent = result.isFullScore ? 'ยอดเยี่ยม (10 เต็ม 10)' : (result.totalScore >= 7.0 ? 'ผ่านเกณฑ์ดีมาก' : (result.totalScore >= 5.0 ? 'ผ่านเกณฑ์' : 'ควรทบทวนเพิ่มเติม'));
      slipStatusEl.style.color = result.isFullScore ? 'var(--emerald)' : (result.totalScore >= 5.0 ? 'var(--cyan-glow)' : 'var(--crimson)');
    }
    document.getElementById('slip-verification-code').textContent = vCode;

    // Full score check (100% -> Cat dance)
    const celebrationBox = document.getElementById('celebration-box');
    const normalHeader = document.getElementById('normal-result-header');

    if (result.isFullScore) {
      Sound.fanfare();
      celebrationBox.classList.add('show');
      normalHeader.style.display = 'none';
      launchConfetti();
    } else {
      celebrationBox.classList.remove('show');
      normalHeader.style.display = 'block';
      if (result.totalScore >= 7.0) Sound.correct();
      else Sound.incorrect();
    }

    // Render Solutions Review
    renderExamSolutionsReview(result.results);

    modal.classList.add('open');

    if (isTimeout) {
      showToast('⏰ หมดเวลา 15 นาที! ระบบได้ทำการส่งข้อสอบอัตโนมัติแล้ว');
    } else {
      showToast('ส่งข้อสอบเรียบร้อยแล้ว ตรวจผลคะแนนของคุณได้เลย');
    }
  }

  function renderExamSolutionsReview(items) {
    const container = document.getElementById('exam-solutions-items');
    if (!container) return;

    let html = '';
    items.forEach(item => {
      const isFull = Math.abs(item.score - item.maxScore) < 0.01;
      const isZero = item.score === 0;
      const statusClass = isFull ? 'pass' : (isZero ? 'fail' : 'partial');
      const statusText = isFull ? '✅ ถูกต้องสมบูรณ์' : (isZero ? '❌ ยังไม่ถูกต้อง' : '⚠️ ถูกบางส่วน');

      html += `
        <div class="review-item ${statusClass}">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-weight: 600;">
            <span style="color: var(--cyan-glow);">ข้อที่ ${item.questionNumber}</span>
            <span style="color: ${isFull ? 'var(--emerald)' : (isZero ? 'var(--crimson)' : 'var(--gold-glow)')};">
              ${statusText} (${item.score.toFixed(2)} / ${item.maxScore} คะแนน)
            </span>
          </div>

          <div style="font-size: 0.92rem; margin-bottom: 0.5rem;">${item.question}</div>

          <div style="font-size: 0.88rem; background: rgba(0,0,0,0.3); padding: 0.6rem; border-radius: var(--radius-sm); margin-bottom: 0.5rem;">
            <div>คำตอบที่คุณตอบ: <strong>${item.userAnswer}</strong> | หน่วย: <strong>${item.userUnit}</strong></div>
            <div style="color: var(--gold-glow); margin-top: 0.2rem;">
              คำตอบที่ถูกต้อง: <strong>${item.correctAnswer}</strong> | หน่วย: <strong>${item.correctUnit}</strong>
            </div>
          </div>

          <div style="font-size: 0.85rem; color: var(--text-secondary);">
            <strong>วิธีคิดสั้นๆ:</strong> ${item.solutionSummary}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    renderMath(container);
  }

  // ==========================================================================
  // Celebration Confetti Cannon
  // ==========================================================================
  function launchConfetti() {
    // Simple pure JS particle confetti
    const count = 70;
    const container = document.body;
    for (let i = 0; i < count; i++) {
      const conf = document.createElement('div');
      const size = Math.random() * 10 + 6;
      const colors = ['#00f0ff', '#ffd166', '#a855f7', '#06d6a0', '#ff477e', '#ff7b00'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      conf.style.position = 'fixed';
      conf.style.zIndex = '300';
      conf.style.width = `${size}px`;
      conf.style.height = `${size}px`;
      conf.style.backgroundColor = color;
      conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      conf.style.left = `${Math.random() * 100}vw`;
      conf.style.top = '-20px';
      conf.style.pointerEvents = 'none';
      conf.style.opacity = '1';
      conf.style.transform = `rotate(${Math.random() * 360}deg)`;
      conf.style.transition = `top ${Math.random() * 2 + 2}s cubic-bezier(0.2, 0.8, 0.2, 1), transform ${Math.random() * 3 + 1}s ease, opacity 2s ease`;
      
      container.appendChild(conf);

      setTimeout(() => {
        conf.style.top = `${window.innerHeight + 20}px`;
        conf.style.transform = `rotate(${Math.random() * 720}deg) scale(0.5)`;
        conf.style.opacity = '0';
      }, 50);

      setTimeout(() => {
        conf.remove();
      }, 4000);
    }
  }

  // ==========================================================================
  // Event Listeners & Initialization
  // ==========================================================================
  function initEventListeners() {
    // Brand home click
    const brandBtn = document.getElementById('brand-home-btn');
    if (brandBtn) {
      brandBtn.addEventListener('click', () => switchTab('tab-learning'));
    }

    // Nav tabs
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab');
        switchTab(tab);
      });
    });

    // Sound toggle
    const soundBtn = document.getElementById('sound-toggle-btn');
    const soundIcon = document.getElementById('sound-icon');
    if (soundBtn && soundIcon) {
      soundBtn.addEventListener('click', () => {
        AppState.soundEnabled = !AppState.soundEnabled;
        soundIcon.textContent = AppState.soundEnabled ? '🔊' : '🔇';
        showToast(AppState.soundEnabled ? 'เปิดเสียงเอฟเฟกต์แล้ว' : 'ปิดเสียงเอฟเฟกต์แล้ว');
      });
    }

    // Practice filter pills
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        Sound.click();
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const cat = e.currentTarget.getAttribute('data-filter');
        const searchVal = (document.getElementById('practice-search-input') || {}).value || '';
        renderPracticeList(cat, searchVal);
      });
    });

    // Practice search input
    const searchInput = document.getElementById('practice-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const activeFilterBtn = document.querySelector('.filter-btn.active');
        const cat = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
        renderPracticeList(cat, e.target.value.trim());
      });
    }

    // Exam start button
    const btnStartExam = document.getElementById('btn-start-exam');
    if (btnStartExam) {
      btnStartExam.addEventListener('click', startExam);
    }

    // Exam submit buttons (HUD & Bottom)
    const btnHudSubmit = document.getElementById('btn-hud-submit');
    const btnBottomSubmit = document.getElementById('btn-bottom-submit');
    if (btnHudSubmit) btnHudSubmit.addEventListener('click', () => submitExam(false));
    if (btnBottomSubmit) btnBottomSubmit.addEventListener('click', () => submitExam(false));

    // Result Modal Actions
    const btnCloseModal = document.getElementById('btn-close-modal');
    if (btnCloseModal) {
      btnCloseModal.addEventListener('click', () => {
        Sound.click();
        document.getElementById('exam-result-modal').classList.remove('open');
        // Reset exam screen to allow practicing or new exam
        document.getElementById('exam-preflight-card').style.display = 'block';
        document.getElementById('exam-active-screen').style.display = 'none';
      });
    }

    const btnToggleSolutions = document.getElementById('btn-toggle-solutions');
    const solutionsReviewBox = document.getElementById('exam-solutions-review-container');
    if (btnToggleSolutions && solutionsReviewBox) {
      btnToggleSolutions.addEventListener('click', () => {
        Sound.click();
        const isOpen = solutionsReviewBox.style.display === 'block';
        solutionsReviewBox.style.display = isOpen ? 'none' : 'block';
        btnToggleSolutions.innerHTML = isOpen ? '<span>📖</span> ดูวิธีทำและเฉลยละเอียด' : '<span>📕</span> ซ่อนเฉลยละเอียด';
        if (!isOpen) {
          renderMath(solutionsReviewBox);
        }
      });
    }

    // Copy Verification Code
    const btnCopyCode = document.getElementById('btn-copy-code');
    if (btnCopyCode) {
      btnCopyCode.addEventListener('click', () => {
        Sound.click();
        const code = document.getElementById('slip-verification-code').textContent;
        navigator.clipboard.writeText(code).then(() => {
          showToast(`คัดลอกรหัส "${code}" เรียบร้อยแล้ว สามารถส่งให้คุณครูได้เลย`);
        }).catch(() => {
          showToast('ไม่สามารถคัดลอกได้อัตโนมัติ กรุณาคลุมดำและคัดลอกด้วยตนเอง');
        });
      });
    }

    // Print / Save Score Slip
    const btnPrintSlip = document.getElementById('btn-print-slip');
    if (btnPrintSlip) {
      btnPrintSlip.addEventListener('click', () => {
        Sound.click();
        window.print();
      });
    }

    // Prevent accidental unload during active exam
    window.addEventListener('beforeunload', (e) => {
      if (AppState.exam.active && !AppState.exam.isSubmitted) {
        e.preventDefault();
        e.returnValue = 'คุณกำลังอยู่ในระหว่างการสอบเก็บคะแนน ข้อมูลและเวลาจะถูกบันทึกไว้';
      }
    });
  }

  function renderMath(target) {
    if (window.MathJax && window.MathJax.typesetPromise) {
      try {
        const targets = target ? (Array.isArray(target) ? target : [target]) : [document.body];
        const validTargets = targets.filter(t => t && t.nodeType);
        if (validTargets.length === 0) return;
        if (window.MathJax.typesetClear) {
          window.MathJax.typesetClear(validTargets);
        }
        window.MathJax.typesetPromise(validTargets).catch(err => {
          console.warn('MathJax typeset error:', err);
        });
      } catch (e) {
        console.warn('MathJax error:', e);
      }
    } else if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
      window.MathJax.startup.promise.then(() => renderMath(target));
    } else {
      setTimeout(() => renderMath(target), 150);
    }
  }

  // App Initialization
  function init() {
    initStarfield();
    renderLearningSections();
    initGravitySandbox();
    renderPracticeList('all', '');
    initEventListeners();
    restoreExamSession();
    renderMath();
    console.log('CoolNut Physics: Gravitational Force App Initialized Successfully 🚀');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
