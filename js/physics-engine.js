/**
 * Physics Engine: Gravitational Force
 * ระบบคำนวณและสุ่มโจทย์ฟิสิกส์ 20 รูปแบบ ตรวจสอบคำตอบ และสร้างตัวเลือกอัตโนมัติ
 * ความแม่นยำ 100% ตามหลักฟิสิกส์
 */

const PhysicsEngine = (function() {
  // ฟังก์ชันช่วยเหลือทางคณิตศาสตร์
  function round2(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }

  function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // หน่วยมาตรฐานที่มีให้เลือกในข้อสอบเติมคำ (ข้อ 3 - 4)
  const UNIT_OPTIONS = [
    "เท่าของมวลโลก",
    "เท่าของมวลเดิม",
    "เท่าของมวล P",
    "เท่าของมวล X",
    "เท่าของรัศมีโลก",
    "เท่าของ F",
    "เท่าของ g₀",
    "วินาที (s)",
    "นิวตัน (N)",
    "เมตร/วินาที² (m/s²)",
    "กิโลกรัม (kg)"
  ];

  // นิยามตัวสร้างโจทย์ 20 ข้อ (Generator Functions)
  const generators = {
    // ข้อ 1: เวลาตก 2 แห่ง + รัศมี ➔ มวลเทียบโลก
    1: function(randomize = false) {
      const t1 = randomize ? randomChoice([1.0, 1.2, 1.5, 2.0]) : 1.0;
      const kt = randomize ? randomChoice([2, 3]) : 2;
      const t2 = round2(t1 * kt);
      const kr = randomize ? randomChoice([2, 3, 4, 6]) : 4;
      
      const gRatio = round2(Math.pow(t1 / t2, 2)); // (1/kt)^2
      const mRatio = round2(Math.pow(t1 / t2, 2) * Math.pow(kr, 2));
      
      return {
        templateId: 1,
        category: "freefall-radius-mass",
        categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
        question: `ปล่อยวัตถุจากความสูงเท่ากันใกล้ผิวโลกและดาวเคราะห์ A พบว่าบนโลกใช้เวลา $${t1.toFixed(1)}\\text{ s}$ ส่วนบนดาวเคราะห์ A ใช้เวลา $${t2.toFixed(1)}\\text{ s}$ ถ้ารัศมีของดาวเคราะห์ A เป็น $${kr}$ เท่าของรัศมีโลก จงหาว่ามวลของดาวเคราะห์ A เป็นกี่เท่าของมวลโลก`,
        variables: { t1, t2, kr },
        correctAnswer: mRatio,
        unit: "เท่าของมวลโลก",
        unitOptions: ["เท่าของมวลโลก", "วินาที (s)", "นิวตัน (N)", "เท่าของรัศมีโลก", "เมตร/วินาที² (m/s²)"],
        solutionSummary: `$\\frac{g_A}{g_E} = \\left(\\frac{${t1.toFixed(1)}}{${t2.toFixed(1)}}\\right)^2 = \\frac{1}{${kt*kt}}$ และ $\\frac{M_A}{M_E} = \\left(\\frac{g_A}{g_E}\\right) \\times (${kr})^2 = ${mRatio}$`
      };
    },

    // ข้อ 2: คล้ายข้อ 1 เน้นทศนิยม/เศษส่วน
    2: function(randomize = false) {
      const t1 = randomize ? randomChoice([1.2, 1.5, 2.0, 2.5]) : 1.5;
      const kt = randomize ? randomChoice([2, 3]) : 2;
      const t2 = round2(t1 * kt);
      const kr = randomize ? randomChoice([3, 5]) : 3;

      const mRatio = round2(Math.pow(t1 / t2, 2) * Math.pow(kr, 2));

      return {
        templateId: 2,
        category: "freefall-radius-mass",
        categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
        question: `ปล่อยวัตถุจากความสูงเท่ากันใกล้ผิวโลกและดาวเคราะห์ B พบว่าบนโลกใช้เวลา $${t1.toFixed(1)}\\text{ s}$ ส่วนบนดาวเคราะห์ B ใช้เวลา $${t2.toFixed(1)}\\text{ s}$ ถ้าดาวเคราะห์ B มีรัศมี $${kr}$ เท่าของรัศมีโลก จงหาอัตราส่วนมวล $M_B / M_E$`,
        variables: { t1, t2, kr },
        correctAnswer: mRatio,
        unit: "เท่าของมวลโลก",
        unitOptions: ["เท่าของมวลโลก", "วินาที (s)", "นิวตัน (N)", "เท่าของรัศมีโลก", "เมตร/วินาที² (m/s²)"],
        solutionSummary: `$\\frac{g_B}{g_E} = \\left(\\frac{${t1.toFixed(1)}}{${t2.toFixed(1)}}\\right)^2 = \\frac{1}{${kt*kt}} \\implies \\frac{M_B}{M_E} = \\left(\\frac{1}{${kt*kt}}\\right) \\times (${kr})^2 = ${mRatio}$`
      };
    },

    // ข้อ 3: เวลาตก 2.0s vs 6.0s, รัศมี 6 เท่า
    3: function(randomize = false) {
      const t1 = randomize ? randomChoice([1.5, 2.0, 2.5]) : 2.0;
      const kt = randomize ? randomChoice([2, 3, 4]) : 3;
      const t2 = round2(t1 * kt);
      const kr = randomize ? randomChoice([4, 6, 8]) : 6;

      const mRatio = round2(Math.pow(t1 / t2, 2) * Math.pow(kr, 2));

      return {
        templateId: 3,
        category: "freefall-radius-mass",
        categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
        question: `วัตถุถูกปล่อยจากความสูงเท่ากันใกล้ผิวโลกและดาวเคราะห์ C โดยใช้เวลาตก $${t1.toFixed(1)}\\text{ s}$ บนโลก และ $${t2.toFixed(1)}\\text{ s}$ บนดาวเคราะห์ C ถ้ารัศมีดาวเคราะห์ C เท่ากับ $${kr}$ เท่าของรัศมีโลก ดาวเคราะห์ C มีมวลเป็นกี่เท่าของโลก`,
        variables: { t1, t2, kr },
        correctAnswer: mRatio,
        unit: "เท่าของมวลโลก",
        unitOptions: ["เท่าของมวลโลก", "วินาที (s)", "นิวตัน (N)", "เท่าของรัศมีโลก", "เมตร/วินาที² (m/s²)"],
        solutionSummary: `$\\frac{g_C}{g_E} = \\left(\\frac{1}{${kt}}\\right)^2 = \\frac{1}{${kt*kt}} \\implies \\frac{M_C}{M_E} = \\left(\\frac{1}{${kt*kt}}\\right) \\times (${kr})^2 = ${mRatio}$`
      };
    },

    // ข้อ 4: เปรียบเทียบสองดาวเคราะห์ P และ Q
    4: function(randomize = false) {
      const t1 = randomize ? randomChoice([1.5, 2.0, 2.5, 3.0]) : 2.0;
      const kt = randomize ? randomChoice([2, 3]) : 2;
      const t2 = round2(t1 * kt);
      const kr = randomize ? randomChoice([2, 3]) : 2;

      const mRatio = round2(Math.pow(t1 / t2, 2) * Math.pow(kr, 2));

      return {
        templateId: 4,
        category: "freefall-radius-mass",
        categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
        question: `ปล่อยวัตถุจากความสูงเท่ากันบนดาวเคราะห์ P และ Q พบว่าใช้เวลา $${t1.toFixed(1)}\\text{ s}$ และ $${t2.toFixed(1)}\\text{ s}$ ตามลำดับ ถ้ารัศมีของ Q เป็น $${kr}$ เท่าของรัศมี P จงหา $M_Q / M_P$`,
        variables: { t1, t2, kr },
        correctAnswer: mRatio,
        unit: "เท่าของมวล P",
        unitOptions: ["เท่าของมวล P", "เท่าของมวลโลก", "วินาที (s)", "นิวตัน (N)", "เท่าของรัศมีโลก"],
        solutionSummary: `$\\frac{g_Q}{g_P} = \\left(\\frac{1}{${kt}}\\right)^2 = \\frac{1}{${kt*kt}} \\implies \\frac{M_Q}{M_P} = \\left(\\frac{1}{${kt*kt}}\\right) \\times (${kr})^2 = ${mRatio}$`
      };
    },

    // ข้อ 5: เปรียบเทียบดาวเคราะห์ X และ Y
    5: function(randomize = false) {
      const t1 = randomize ? randomChoice([2.0, 3.0, 4.0]) : 3.0;
      const kt = randomize ? randomChoice([2, 3]) : 2;
      const t2 = round2(t1 * kt);
      const kr = randomize ? randomChoice([3, 4]) : 3;

      const mRatio = round2(Math.pow(t1 / t2, 2) * Math.pow(kr, 2));

      return {
        templateId: 5,
        category: "freefall-radius-mass",
        categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
        question: `บนดาวเคราะห์ X วัตถุตกจากความสูงหนึ่งในเวลา $${t1.toFixed(1)}\\text{ s}$ ส่วนบนดาวเคราะห์ Y วัตถุตกจากความสูงเท่ากันในเวลา $${t2.toFixed(1)}\\text{ s}$ ถ้ารัศมี Y เป็น $${kr}$ เท่าของรัศมี X จงหาว่ามวลของ Y เป็นกี่เท่าของมวล X`,
        variables: { t1, t2, kr },
        correctAnswer: mRatio,
        unit: "เท่าของมวล X",
        unitOptions: ["เท่าของมวล X", "เท่าของมวลโลก", "วินาที (s)", "นิวตัน (N)", "เท่าของรัศมีโลก"],
        solutionSummary: `$\\frac{M_Y}{M_X} = \\left(\\frac{${t1.toFixed(1)}}{${t2.toFixed(1)}}\\right)^2 \\times (${kr})^2 = ${mRatio}$`
      };
    },

    // ข้อ 6: รัศมีครึ่งหนึ่ง (1/2), เวลาตกเท่ากัน
    6: function(randomize = false) {
      const rFraction = randomize ? randomChoice([2, 3, 4]) : 2; // 1/2, 1/3, 1/4
      const mRatio = round2(1 / (rFraction * rFraction));

      return {
        templateId: 6,
        category: "freefall-radius-mass",
        categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
        question: `ดาวเคราะห์ A มีรัศมีเพียง $1/${rFraction}$ ของรัศมีโลก เมื่อปล่อยวัตถุจากความสูงเท่ากัน พบว่าใช้เวลาตกเท่ากับบนโลกพอดี จงหาว่ามวลของดาวเคราะห์ A เป็นกี่เท่าของมวลโลก`,
        variables: { rFraction },
        correctAnswer: mRatio,
        unit: "เท่าของมวลโลก",
        unitOptions: ["เท่าของมวลโลก", "วินาที (s)", "นิวตัน (N)", "เท่าของรัศมีโลก", "เมตร/วินาที² (m/s²)"],
        solutionSummary: `เวลาตกเท่ากัน $\\implies g$ เท่ากัน $\\implies \\frac{M_A}{M_E} = \\left(\\frac{R_A}{R_E}\\right)^2 = \\left(\\frac{1}{${rFraction}}\\right)^2 = ${mRatio}$`
      };
    },

    // ข้อ 7: รัศมีครึ่งหนึ่ง เวลาตกครึ่งหนึ่ง
    7: function(randomize = false) {
      const frac = randomize ? randomChoice([2, 3]) : 2; // 1/2 or 1/3
      // R = 1/frac, t = 1/frac -> g = frac^2 -> M = frac^2 * (1/frac)^2 = 1.0
      const mRatio = 1.0;

      return {
        templateId: 7,
        category: "freefall-radius-mass",
        categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
        question: `ดาวเคราะห์ B มีรัศมี $1/${frac}$ ของโลก และวัตถุที่ปล่อยจากความสูงเท่ากันใช้เวลาตกเพียง $1/${frac}$ ของเวลาบนโลก จงหาว่ามวลของดาวเคราะห์ B เป็นกี่เท่าของมวลโลก`,
        variables: { frac },
        correctAnswer: mRatio,
        unit: "เท่าของมวลโลก",
        unitOptions: ["เท่าของมวลโลก", "วินาที (s)", "นิวตัน (N)", "เท่าของรัศมีโลก", "เมตร/วินาที² (m/s²)"],
        solutionSummary: `$\\frac{g_B}{g_E} = (${frac})^2 = ${frac*frac} \\implies \\frac{M_B}{M_E} = ${frac*frac} \\times \\left(\\frac{1}{${frac}}\\right)^2 = 1.0$`
      };
    },

    // ข้อ 8: รัศมี k เท่า, เวลาตก k เท่า
    8: function(randomize = false) {
      const k = randomize ? randomChoice([2, 3, 4]) : 2;
      const mRatio = 1.0;

      return {
        templateId: 8,
        category: "freefall-radius-mass",
        categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
        question: `บนดาวเคราะห์ C ซึ่งมีรัศมีเป็น $${k}$ เท่าของโลก วัตถุใช้เวลาตกจากความสูงเดียวกันนานเป็น $${k}$ เท่าของบนโลก จงหามวลของดาวเคราะห์ C เทียบกับมวลโลก`,
        variables: { k },
        correctAnswer: mRatio,
        unit: "เท่าของมวลโลก",
        unitOptions: ["เท่าของมวลโลก", "วินาที (s)", "นิวตัน (N)", "เท่าของรัศมีโลก", "เมตร/วินาที² (m/s²)"],
        solutionSummary: `$\\frac{M_C}{M_E} = \\left(\\frac{1}{${k}}\\right)^2 \\times (${k})^2 = 1.0$`
      };
    },

    // ข้อ 9: รัศมี 3 เท่า, เวลาตก 3 เท่า
    9: function(randomize = false) {
      const k = randomize ? randomChoice([3, 4, 5]) : 3;
      const mRatio = 1.0;

      return {
        templateId: 9,
        category: "freefall-radius-mass",
        categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
        question: `ดาวเคราะห์ D มีรัศมีเป็น $${k}$ เท่าของรัศมีโลก และวัตถุใช้เวลาตกจากความสูงเดียวกันนานเป็น $${k}$ เท่าของบนโลก จงหามวลของดาวเคราะห์ D เทียบกับโลก`,
        variables: { k },
        correctAnswer: mRatio,
        unit: "เท่าของมวลโลก",
        unitOptions: ["เท่าของมวลโลก", "วินาที (s)", "นิวตัน (N)", "เท่าของรัศมีโลก", "เมตร/วินาที² (m/s²)"],
        solutionSummary: `$\\frac{M_D}{M_E} = \\left(\\frac{1}{${k}}\\right)^2 \\times (${k})^2 = 1.0$`
      };
    },

    // ข้อ 10: น้ำหนักที่ผิวโลก vs ผิวดาว + รัศมีดาว
    10: function(randomize = false) {
      const w1 = randomize ? randomChoice([60, 80, 100, 120]) : 80.0;
      const kw = randomize ? randomChoice([2, 4, 5]) : 4;
      const w2 = round2(w1 / kw);
      const kr = randomize ? randomChoice([2, 3, 4]) : 4;

      const gRatio = round2(w2 / w1);
      const mRatio = round2((w2 / w1) * (kr * kr));

      return {
        templateId: 10,
        category: "weight-radius-mass",
        categoryName: "น้ำหนัก + รัศมี ➔ มวลดาว",
        question: `วัตถุก้อนเดียวกันมีน้ำหนัก $${w1}\\text{ N}$ ที่ผิวโลก แต่มีน้ำหนักเพียง $${w2}\\text{ N}$ ที่ผิวดาวเคราะห์ A ถ้าดาวเคราะห์ A มีรัศมี $${kr}$ เท่าของรัศมีโลก จงหาว่ามวลของดาวเคราะห์ A เป็นกี่เท่าของมวลโลก`,
        variables: { w1, w2, kr },
        correctAnswer: mRatio,
        unit: "เท่าของมวลโลก",
        unitOptions: ["เท่าของมวลโลก", "นิวตัน (N)", "วินาที (s)", "เท่าของรัศมีโลก", "เมตร/วินาที² (m/s²)"],
        solutionSummary: `$\\frac{g_A}{g_E} = \\frac{${w2}}{${w1}} = \\frac{1}{${kw}} \\implies \\frac{M_A}{M_E} = \\left(\\frac{1}{${kw}}\\right) \\times (${kr})^2 = ${mRatio}$`
      };
    },

    // ข้อ 11: น้ำหนักบนดาว P และ Q, รัศมีเป็นเศษส่วน
    11: function(randomize = false) {
      // Original: Wp = 90, Wq = 40, Rq/Rp = 1.5 (3/2) -> Mq/Mp = (40/90)*(9/4) = 1
      const p = randomize ? randomChoice([2, 3]) : 3;
      const q = randomize ? randomChoice([2, 3]) : 2; // Rq/Rp = p/q = 1.5
      const w1 = randomize ? (p * p * 10) : 90;
      const w2 = randomize ? (q * q * 10) : 40;
      const rRatio = round2(p / q);

      const mRatio = round2((w2 / w1) * Math.pow(rRatio, 2));

      return {
        templateId: 11,
        category: "weight-radius-mass",
        categoryName: "น้ำหนัก + รัศมี ➔ มวลดาว",
        question: `วัตถุก้อนเดียวกันหนัก $${w1}\\text{ N}$ ที่ผิวดาวเคราะห์ P และหนัก $${w2}\\text{ N}$ ที่ผิวดาวเคราะห์ Q ถ้ารัศมีของ Q เป็น $${rRatio}$ เท่าของรัศมี P จงหา $M_Q / M_P$`,
        variables: { w1, w2, rRatio },
        correctAnswer: mRatio,
        unit: "เท่าของมวล P",
        unitOptions: ["เท่าของมวล P", "เท่าของมวลโลก", "นิวตัน (N)", "วินาที (s)", "เท่าของรัศมีโลก"],
        solutionSummary: `$\\frac{g_Q}{g_P} = \\frac{${w2}}{${w1}} \\implies \\frac{M_Q}{M_P} = \\left(\\frac{${w2}}{${w1}}\\right) \\times (${rRatio})^2 = ${mRatio}$`
      };
    },

    // ข้อ 12: มวล + รัศมี ➔ เวลาตก (g เท่าโลก)
    12: function(randomize = false) {
      const kr = randomize ? randomChoice([2, 3, 4]) : 3;
      const km = kr * kr; // g = km / kr^2 = 1.0
      const tE = randomize ? randomChoice([1.5, 2.0, 2.5, 3.0]) : 2.0;
      const tA = tE; // g เท่ากัน เวลาเท่ากัน

      return {
        templateId: 12,
        category: "mass-radius-time",
        categoryName: "มวล + รัศมี ➔ เวลาตก",
        question: `ดาวเคราะห์ A มีมวล $${km}$ เท่าของโลกและมีรัศมี $${kr}$ เท่าของโลก ถ้าวัตถุตกจากความสูงหนึ่งบนโลกในเวลา $${tE.toFixed(1)}\\text{ s}$ จงหาเวลาที่วัตถุจะใช้ตกจากความสูงเท่ากันใกล้ผิวดาวเคราะห์ A`,
        variables: { km, kr, tE },
        correctAnswer: round2(tA),
        unit: "วินาที (s)",
        unitOptions: ["วินาที (s)", "เท่าของมวลโลก", "นิวตัน (N)", "เมตร/วินาที² (m/s²)", "เท่าของรัศมีโลก"],
        solutionSummary: `$\\frac{g_A}{g_E} = \\frac{${km}}{(${kr})^2} = 1 \\implies$ เวลาตกเท่ากับบนโลก $= ${tA.toFixed(1)}\\text{ s}$`
      };
    },

    // ข้อ 13: มวล 4 เท่า, รัศมี 4 เท่า ➔ g = 1/4 ➔ t ตก 2 เท่า
    13: function(randomize = false) {
      const kr = randomize ? randomChoice([3, 4, 6]) : 4;
      const s = randomize ? randomChoice([2, 3]) : 2; // t ratio = s, g ratio = 1/s^2
      const km = round2((kr * kr) / (s * s));
      const tE = randomize ? randomChoice([1.0, 1.5, 2.0]) : 1.5;
      const tB = round2(tE * s);

      return {
        templateId: 13,
        category: "mass-radius-time",
        categoryName: "มวล + รัศมี ➔ เวลาตก",
        question: `ดาวเคราะห์ B มีมวล $${km}$ เท่าของโลกและรัศมี $${kr}$ เท่าของโลก ถ้าวัตถุตกจากความสูงหนึ่งบนโลกในเวลา $${tE.toFixed(1)}\\text{ s}$ จงหาเวลาตกจากความสูงเท่ากันบนดาวเคราะห์ B`,
        variables: { km, kr, tE },
        correctAnswer: tB,
        unit: "วินาที (s)",
        unitOptions: ["วินาที (s)", "เท่าของมวลโลก", "นิวตัน (N)", "เมตร/วินาที² (m/s²)", "เท่าของรัศมีโลก"],
        solutionSummary: `$\\frac{g_B}{g_E} = \\frac{${km}}{(${kr})^2} = \\frac{1}{${s*s}} \\implies t_B = ${tE.toFixed(1)} \\times \\sqrt{${s*s}} = ${tB.toFixed(1)}\\text{ s}$`
      };
    },

    // ข้อ 14: มวล 16 เท่า, รัศมี 2 เท่า ➔ g = 4 ➔ t ตก 1/2 เท่า
    14: function(randomize = false) {
      const kr = randomize ? randomChoice([2, 3]) : 2;
      const s = randomize ? randomChoice([2, 3]) : 2; // g = s^2
      const km = (s * s) * (kr * kr);
      const tE = randomize ? randomChoice([3.0, 4.0, 6.0]) : 4.0;
      const tC = round2(tE / s);

      return {
        templateId: 14,
        category: "mass-radius-time",
        categoryName: "มวล + รัศมี ➔ เวลาตก",
        question: `ดาวเคราะห์ C มีมวล $${km}$ เท่าของโลกและรัศมี $${kr}$ เท่าของโลก ถ้าวัตถุตกจากความสูงหนึ่งบนโลกในเวลา $${tE.toFixed(1)}\\text{ s}$ จงหาเวลาที่ใช้ตกจากความสูงเท่ากันบนดาวเคราะห์ C`,
        variables: { km, kr, tE },
        correctAnswer: tC,
        unit: "วินาที (s)",
        unitOptions: ["วินาที (s)", "เท่าของมวลโลก", "นิวตัน (N)", "เมตร/วินาที² (m/s²)", "เท่าของรัศมีโลก"],
        solutionSummary: `$\\frac{g_C}{g_E} = \\frac{${km}}{(${kr})^2} = ${s*s} \\implies t_C = \\frac{${tE.toFixed(1)}}{\\sqrt{${s*s}}} = ${tC.toFixed(1)}\\text{ s}$`
      };
    },

    // ข้อ 15: มวล 4 เท่า, เวลาตกนาน 2 เท่า ➔ รัศมี 4 เท่า
    15: function(randomize = false) {
      const sqrtM = randomize ? randomChoice([2, 3, 4]) : 2;
      const km = sqrtM * sqrtM; // 4, 9, 16
      const kt = randomize ? randomChoice([1.5, 2.0, 2.5, 3.0]) : 2.0;
      const kr = round2(kt * sqrtM);

      return {
        templateId: 15,
        category: "mass-time-radius",
        categoryName: "มวล + เวลาตก ➔ รัศมีดาว",
        question: `ดาวเคราะห์ D มีมวล $${km}$ เท่าของโลก และเมื่อปล่อยวัตถุจากความสูงเท่ากัน วัตถุใช้เวลาตกนานเป็น $${kt.toFixed(1)}$ เท่าของบนโลก จงหารัศมีของดาวเคราะห์ D ว่าเป็นกี่เท่าของรัศมีโลก`,
        variables: { km, kt },
        correctAnswer: kr,
        unit: "เท่าของรัศมีโลก",
        unitOptions: ["เท่าของรัศมีโลก", "เท่าของมวลโลก", "วินาที (s)", "นิวตัน (N)", "เมตร/วินาที² (m/s²)"],
        solutionSummary: `$\\frac{R_D}{R_E} = \\left(\\frac{t_D}{t_E}\\right) \\times \\sqrt{\\frac{M_D}{M_E}} = ${kt.toFixed(1)} \\times \\sqrt{${km}} = ${kr}$`
      };
    },

    // ข้อ 16: มวล 9 เท่า, เวลาตกนาน 3 เท่า ➔ รัศมี 9 เท่า
    16: function(randomize = false) {
      const sqrtM = randomize ? randomChoice([3, 4]) : 3;
      const km = sqrtM * sqrtM;
      const kt = randomize ? randomChoice([2, 3, 4]) : 3;
      const kr = round2(kt * sqrtM);

      return {
        templateId: 16,
        category: "mass-time-radius",
        categoryName: "มวล + เวลาตก ➔ รัศมีดาว",
        question: `ดาวเคราะห์ F มีมวล $${km}$ เท่าของโลก และวัตถุใช้เวลาตกจากความสูงเดียวกันนานเป็น $${kt}$ เท่าของบนโลก จงหาว่ารัศมีของดาวเคราะห์ F เป็นกี่เท่าของรัศมีโลก`,
        variables: { km, kt },
        correctAnswer: kr,
        unit: "เท่าของรัศมีโลก",
        unitOptions: ["เท่าของรัศมีโลก", "เท่าของมวลโลก", "วินาที (s)", "นิวตัน (N)", "เมตร/วินาที² (m/s²)"],
        solutionSummary: `$\\frac{R_F}{R_E} = ${kt} \\times \\sqrt{${km}} = ${kr}$`
      };
    },

    // ข้อ 17: แรงโน้มถ่วงนิวตัน: มวลและระยะห่างเปลี่ยน
    17: function(randomize = false) {
      const km1 = randomize ? randomChoice([2, 3, 4]) : 2;
      const km2 = randomize ? randomChoice([2, 3, 5]) : 3;
      const kr = randomize ? randomChoice([2, 3, 4]) : 2;

      const fRatio = round2((km1 * km2) / (kr * kr));

      return {
        templateId: 17,
        category: "newton-force-ratio",
        categoryName: "กฎแรงโน้มถ่วงนิวตัน",
        question: `วัตถุสองก้อนดึงดูดกันด้วยแรง $F$ ถ้าเพิ่มมวลก้อนแรกเป็น $${km1}$ เท่า เพิ่มมวลก้อนที่สองเป็น $${km2}$ เท่า และเพิ่มระยะห่างระหว่างศูนย์กลางเป็น $${kr}$ เท่าของเดิม แรงดึงดูดใหม่มีค่าเป็นกี่เท่าของ $F$`,
        variables: { km1, km2, kr },
        correctAnswer: fRatio,
        unit: "เท่าของ F",
        unitOptions: ["เท่าของ F", "เท่าของมวลโลก", "นิวตัน (N)", "วินาที (s)", "เมตร/วินาที² (m/s²)"],
        solutionSummary: `$\\frac{F_2}{F_1} = \\frac{${km1} \\times ${km2}}{(${kr})^2} = \\frac{${km1 * km2}}{${kr * kr}} = ${fRatio}$`
      };
    },

    // ข้อ 18: ย้ายวัตถุออกจากผิวไปยังระยะ 3R
    18: function(randomize = false) {
      const kr = randomize ? randomChoice([2, 3, 4, 5]) : 3;
      const f1 = randomize ? (kr * kr * randomChoice([50, 80, 100])) : 900.0;
      const f2 = round2(f1 / (kr * kr));

      return {
        templateId: 18,
        category: "newton-force-distance",
        categoryName: "กฎแรงโน้มถ่วงนิวตัน",
        question: `วัตถุมวล $m$ อยู่ที่ผิวดาวเคราะห์รัศมี $R$ และถูกดาวดึงด้วยแรง $${f1}\\text{ N}$ ถ้าย้ายวัตถุออกไปให้มีระยะจากศูนย์กลางดาวเป็น $${kr}R$ โดยมวลดาวและมวลวัตถุไม่เปลี่ยน แรงดึงดูดจะเหลือเท่าใด`,
        variables: { f1, kr },
        correctAnswer: f2,
        unit: "นิวตัน (N)",
        unitOptions: ["นิวตัน (N)", "เท่าของ F", "เท่าของมวลโลก", "วินาที (s)", "เมตร/วินาที² (m/s²)"],
        solutionSummary: `$F_2 = F_1 \\times \\left(\\frac{R}{${kr}R}\\right)^2 = \\frac{${f1}}{${kr * kr}} = ${f2}\\text{ N}$`
      };
    },

    // ข้อ 19: ความเร่งโน้มถ่วงที่ความสูง h = R (ระยะจากศูนย์กลาง 2R)
    19: function(randomize = false) {
      const hMultiple = randomize ? randomChoice([1, 2, 3]) : 1; // h = 1R, 2R, 3R
      const rDist = hMultiple + 1; // distance = (h+1)R
      const gRatio = round2(1 / (rDist * rDist));

      return {
        templateId: 19,
        category: "height-gravity",
        categoryName: "ความสูงเหนือผิวดาว",
        question: `ณ ผิวดาวเคราะห์หนึ่ง ความเร่งโน้มถ่วงมีค่า $g_0$ ถ้าขึ้นไปที่ความสูงเท่ากับ $${hMultiple}$ เท่าของรัศมีดาวเคราะห์เหนือผิว (จึงอยู่ห่างจากศูนย์กลาง $${rDist}R$) จงหาอัตราส่วนของ $g$ ที่ตำแหน่งนั้นเทียบกับ $g_0$ ($g_h / g_0$)`,
        variables: { hMultiple, rDist },
        correctAnswer: gRatio,
        unit: "เท่าของ g₀",
        unitOptions: ["เท่าของ g₀", "เท่าของมวลโลก", "นิวตัน (N)", "วินาที (s)", "เมตร/วินาที² (m/s²)"],
        solutionSummary: `$r = R + ${hMultiple}R = ${rDist}R \\implies \\frac{g_h}{g_0} = \\left(\\frac{R}{${rDist}R}\\right)^2 = \\frac{1}{${rDist * rDist}} = ${gRatio}$`
      };
    },

    // ข้อ 20: นักบินอวกาศที่ความสูงเหนือผิวดาว G
    20: function(randomize = false) {
      const rG = randomize ? randomChoice([2, 3]) : 2;
      const mG = rG * rG; // g_surf = mG / rG^2 = 1.0
      const tE = randomize ? randomChoice([1.0, 1.2, 1.5, 2.0]) : 1.2;
      // at h = R_G, distance = 2R_G -> g_high = g_surf / 4 = 1/4 -> t_high = 2 * tE
      const tHigh = round2(2.0 * tE);

      return {
        templateId: 20,
        category: "height-astronaut-fall",
        categoryName: "ความสูงเหนือผิวดาว",
        question: `ดาวเคราะห์ G มีมวล $${mG}$ เท่าของโลกและรัศมี $${rG}$ เท่าของโลก นักบินอวกาศอยู่ที่ความสูงเหนือผิวดาว G เท่ากับรัศมีของดาว G เอง ถ้าปล่อยวัตถุให้ตกเป็นระยะสั้น และวัตถุที่ผิวโลกใช้เวลา $${tE.toFixed(1)}\\text{ s}$ ในการตกจากระยะสั้นเท่ากัน จงหาเวลาตกของวัตถุ ณ ตำแหน่งของนักบินอวกาศ`,
        variables: { mG, rG, tE },
        correctAnswer: tHigh,
        unit: "วินาที (s)",
        unitOptions: ["วินาที (s)", "เท่าของมวลโลก", "นิวตัน (N)", "เมตร/วินาที² (m/s²)", "เท่าของ g₀"],
        solutionSummary: `$g_{G,\\text{surf}} = \\frac{${mG}}{(${rG})^2} = 1.0 \\implies$ ที่ $r=2R$: $g_{\\text{high}} = \\frac{1}{4} \\implies t_{\\text{high}} = ${tE.toFixed(1)} \\times \\sqrt{4} = ${tHigh.toFixed(1)}\\text{ s}$`
      };
    }
  };

  /**
   * สร้างตัวเลือก 5 ตัวเลือกแบบสมจริงสำหรับข้อ 1-2 (ปรนัย)
   */
  function generateMultipleChoices(correctAnswer, unit) {
    const choices = new Set();
    choices.add(round2(correctAnswer));

    // ตัวลวงที่พบบ่อย (Common Mistake Distractors)
    const candidates = [
      round2(correctAnswer * 2),
      round2(correctAnswer / 2),
      round2(correctAnswer * 4),
      round2(correctAnswer / 4),
      round2(Math.sqrt(correctAnswer)),
      round2(Math.pow(correctAnswer, 2)),
      round2(correctAnswer + 1),
      round2(Math.max(0.25, correctAnswer - 1)),
      round2(correctAnswer * 1.5),
      round2(correctAnswer / 1.5),
      round2(1.0)
    ];

    for (const c of candidates) {
      if (choices.size >= 5) break;
      if (c > 0 && Math.abs(c - correctAnswer) > 0.05) {
        let isDistinct = true;
        for (const existing of choices) {
          if (Math.abs(existing - c) < 0.05) {
            isDistinct = false;
            break;
          }
        }
        if (isDistinct) {
          choices.add(c);
        }
      }
    }

    // ถ้ายังไม่ครบ 5 ตัวเลือก ให้เติมค่าสมมุติที่ใกล้เคียง
    let offset = 0.5;
    while (choices.size < 5) {
      const fallback = round2(correctAnswer + offset);
      let isDistinct = true;
      for (const existing of choices) {
        if (Math.abs(existing - fallback) < 0.05) {
          isDistinct = false;
          break;
        }
      }
      if (isDistinct && fallback > 0) {
        choices.add(fallback);
      }
      offset += 0.5;
    }

    const shuffledValues = shuffle(Array.from(choices));
    return shuffledValues.map((val) => ({
      value: val,
      label: `${val} ${unit}`.trim(),
      isCorrect: Math.abs(val - correctAnswer) <= 0.05
    }));
  }

  /**
   * สุ่มสร้างข้อสอบ 4 ข้อสำหรับโหมดสอบเก็บคะแนน
   * ข้อ 1 - 2: ปรนัย 5 ช้อยส์ (เน้นคำตอบอัตราส่วน/ทศนิยม)
   * ข้อ 3 - 4: เติมคำตอบ + เลือกหน่วย (แยกตรวจคะแนนคำตอบและหน่วย)
   */
  function generateExamPaper() {
    // สุ่ม 4 ข้อที่ไม่ซ้ำกันจากแม่แบบ 1-20
    const allIds = Array.from({ length: 20 }, (_, i) => i + 1);
    const shuffledIds = shuffle(allIds);
    const selectedIds = shuffledIds.slice(0, 4);

    const questions = [];

    // ข้อ 1 - 2 (index 0, 1): ปรนัย 5 ตัวเลือก (ข้อละ 2.0 คะแนน)
    for (let i = 0; i < 2; i++) {
      const templateId = selectedIds[i];
      const qData = generators[templateId](true); // สุ่มตัวเลขใหม่ทุกครั้ง
      const choices = generateMultipleChoices(qData.correctAnswer, qData.unit);

      questions.push({
        questionNumber: i + 1,
        type: "multiple_choice",
        templateId: qData.templateId,
        category: qData.category,
        categoryName: qData.categoryName,
        question: qData.question,
        correctAnswer: qData.correctAnswer,
        unit: qData.unit,
        choices: choices,
        maxScore: 2.0, // ข้อละ 2.0 คะแนน
        solutionSummary: qData.solutionSummary
      });
    }

    // ข้อ 3 - 4 (index 2, 3): เติมคำตอบ + เลือกหน่วย (ข้อละ 3.0 คะแนน: ตัวเลข 2.0 + หน่วย 1.0)
    for (let i = 2; i < 4; i++) {
      const templateId = selectedIds[i];
      const qData = generators[templateId](true); // สุ่มตัวเลขใหม่ทุกครั้ง

      questions.push({
        questionNumber: i + 1,
        type: "fill_in_unit",
        templateId: qData.templateId,
        category: qData.category,
        categoryName: qData.categoryName,
        question: qData.question,
        correctAnswer: qData.correctAnswer,
        unit: qData.unit,
        unitOptions: shuffle(qData.unitOptions || UNIT_OPTIONS),
        maxScore: 3.0,          // รวม 3.0 คะแนน
        answerScoreWeight: 2.0, // ตัวเลขถูกได้ 2.0 คะแนน
        unitScoreWeight: 1.0,   // หน่วยถูกได้ 1.0 คะแนน
        solutionSummary: qData.solutionSummary
      });
    }

    return questions;
  }

  /**
   * ตรวจข้อสอบทั้งชุด พร้อมคำนวณคะแนนละเอียด
   */
  function gradeExam(examQuestions, studentSubmissions) {
    let totalScore = 0;
    const maxScore = 10.0;
    const results = [];

    examQuestions.forEach((q, idx) => {
      const sub = studentSubmissions[idx] || {};
      let itemScore = 0;
      let isAnswerCorrect = false;
      let isUnitCorrect = false;

      if (q.type === "multiple_choice") {
        const chosenVal = parseFloat(sub.selectedChoice);
        if (!isNaN(chosenVal) && Math.abs(chosenVal - q.correctAnswer) <= 0.05) {
          itemScore = q.maxScore;
          isAnswerCorrect = true;
          isUnitCorrect = true;
        }
        results.push({
          questionNumber: q.questionNumber,
          type: q.type,
          question: q.question,
          userAnswer: isNaN(chosenVal) ? "ไม่ได้เลือก" : chosenVal,
          userUnit: q.unit,
          correctAnswer: q.correctAnswer,
          correctUnit: q.unit,
          isAnswerCorrect,
          isUnitCorrect,
          score: round2(itemScore),
          maxScore: q.maxScore,
          solutionSummary: q.solutionSummary
        });
      } else if (q.type === "fill_in_unit") {
        const userNum = parseFloat(sub.userNumber);
        const userUnit = (sub.userUnit || "").trim();

        if (!isNaN(userNum) && Math.abs(userNum - q.correctAnswer) <= 0.05) {
          itemScore += q.answerScoreWeight;
          isAnswerCorrect = true;
        }

        if (userUnit === q.unit) {
          itemScore += q.unitScoreWeight;
          isUnitCorrect = true;
        }

        results.push({
          questionNumber: q.questionNumber,
          type: q.type,
          question: q.question,
          userAnswer: isNaN(userNum) ? "ไม่ได้ระบุ" : userNum,
          userUnit: userUnit || "ไม่ได้เลือก",
          correctAnswer: q.correctAnswer,
          correctUnit: q.unit,
          isAnswerCorrect,
          isUnitCorrect,
          score: round2(itemScore),
          maxScore: q.maxScore,
          solutionSummary: q.solutionSummary
        });
      }

      totalScore += itemScore;
    });

    totalScore = round2(totalScore);
    const isFullScore = Math.abs(totalScore - maxScore) < 0.01;

    return {
      totalScore,
      maxScore,
      percentage: round2((totalScore / maxScore) * 100),
      isFullScore,
      results
    };
  }

  /**
   * สร้าง Verification Hash Code สำหรับป้องกันการปลอมแปลงคะแนน
   */
  function generateVerificationCode(student, examResult, timestamp) {
    const raw = `${student.name}|${student.room}|${student.number}|${examResult.totalScore}|${timestamp}`;
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      hash = (hash << 5) - hash + raw.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0');
    return `COOLNUT-GRAV-${student.room.replace(/[^a-zA-Z0-9]/g, '')}-${student.number}-${hex.slice(0, 6)}`;
  }

  // Public API
  return {
    generateQuestion: (id, randomize = false) => {
      if (generators[id]) return generators[id](randomize);
      return generators[1](randomize);
    },
    generateExamPaper,
    gradeExam,
    generateVerificationCode,
    round2,
    UNIT_OPTIONS
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PhysicsEngine;
}
