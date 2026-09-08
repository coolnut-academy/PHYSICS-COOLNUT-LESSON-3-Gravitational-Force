/**
 * Physics Engine: Gravitational Force
 * ระบบคำนวณและสุ่มโจทย์ฟิสิกส์ 20 รูปแบบ ตรวจสอบคำตอบ และสร้างตัวเลือกอัตโนมัติ
 * ความแม่นยำ 100% ตามหลักฟิสิกส์ พร้อมระบบ Secure Solver และ Anti-Cheat
 */

const PhysicsEngine = (function() {
  'use strict';

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

  /**
   * Secure Physics Solver: คำนวณหาคำตอบที่ถูกต้องและเฉลยจากตัวแปรโจทย์
   * ใช้สำหรับตรวจข้อสอบแบบไดนามิก โดยไม่ต้องส่งเฉลยไปเก็บไว้ในฝั่ง Client
   */
  function solveQuestion(templateId, vars) {
    switch (templateId) {
      case 1: {
        const { t1, t2, kr } = vars;
        const kt = round2(t2 / t1);
        const mRatio = round2(Math.pow(t1 / t2, 2) * Math.pow(kr, 2));
        return {
          correctAnswer: mRatio,
          unit: "เท่าของมวลโลก",
          solutionSummary: `$\\frac{g_A}{g_E} = \\left(\\frac{${t1.toFixed(1)}}{${t2.toFixed(1)}}\\right)^2$ และ $\\frac{M_A}{M_E} = \\left(\\frac{g_A}{g_E}\\right) \\times (${kr})^2 = ${mRatio}$`
        };
      }
      case 2: {
        const { t1, t2, kr } = vars;
        const mRatio = round2(Math.pow(t1 / t2, 2) * Math.pow(kr, 2));
        return {
          correctAnswer: mRatio,
          unit: "เท่าของมวลโลก",
          solutionSummary: `$\\frac{g_B}{g_E} = \\left(\\frac{${t1.toFixed(1)}}{${t2.toFixed(1)}}\\right)^2 \\implies \\frac{M_B}{M_E} = \\left(\\frac{${t1.toFixed(1)}}{${t2.toFixed(1)}}\\right)^2 \\times (${kr})^2 = ${mRatio}$`
        };
      }
      case 3: {
        const { t1, t2, kr } = vars;
        const mRatio = round2(Math.pow(t1 / t2, 2) * Math.pow(kr, 2));
        return {
          correctAnswer: mRatio,
          unit: "เท่าของมวลโลก",
          solutionSummary: `$\\frac{g_C}{g_E} = \\left(\\frac{${t1.toFixed(1)}}{${t2.toFixed(1)}}\\right)^2 \\implies \\frac{M_C}{M_E} = \\left(\\frac{${t1.toFixed(1)}}{${t2.toFixed(1)}}\\right)^2 \\times (${kr})^2 = ${mRatio}$`
        };
      }
      case 4: {
        const { t1, t2, kr } = vars;
        const mRatio = round2(Math.pow(t1 / t2, 2) * Math.pow(kr, 2));
        return {
          correctAnswer: mRatio,
          unit: "เท่าของมวล P",
          solutionSummary: `$\\frac{g_Q}{g_P} = \\left(\\frac{${t1.toFixed(1)}}{${t2.toFixed(1)}}\\right)^2 \\implies \\frac{M_Q}{M_P} = \\left(\\frac{${t1.toFixed(1)}}{${t2.toFixed(1)}}\\right)^2 \\times (${kr})^2 = ${mRatio}$`
        };
      }
      case 5: {
        const { t1, t2, kr } = vars;
        const mRatio = round2(Math.pow(t1 / t2, 2) * Math.pow(kr, 2));
        return {
          correctAnswer: mRatio,
          unit: "เท่าของมวล X",
          solutionSummary: `$\\frac{M_Y}{M_X} = \\left(\\frac{${t1.toFixed(1)}}{${t2.toFixed(1)}}\\right)^2 \\times (${kr})^2 = ${mRatio}$`
        };
      }
      case 6: {
        const { rFraction } = vars;
        const mRatio = round2(1 / (rFraction * rFraction));
        return {
          correctAnswer: mRatio,
          unit: "เท่าของมวลโลก",
          solutionSummary: `เวลาตกเท่ากัน $\\implies g$ เท่ากัน $\\implies \\frac{M_A}{M_E} = \\left(\\frac{R_A}{R_E}\\right)^2 = \\left(\\frac{1}{${rFraction}}\\right)^2 = ${mRatio}$`
        };
      }
      case 7: {
        // แก้ไข Invariant: kr และ kt สุ่มอิสระ คำตอบเป็นอัตราส่วนไดนามิก
        const { kr, kt } = vars;
        const mRatio = round2((kt * kt) / (kr * kr));
        return {
          correctAnswer: mRatio,
          unit: "เท่าของมวลโลก",
          solutionSummary: `$\\frac{g_B}{g_E} = (${kt})^2 = ${kt * kt} \\implies \\frac{M_B}{M_E} = ${kt * kt} \\times \\left(\\frac{1}{${kr}}\\right)^2 = ${mRatio}$`
        };
      }
      case 8: {
        // แก้ไข Invariant: kr และ kt สุ่มอิสระ คำตอบเป็นอัตราส่วนไดนามิก
        const { kr, kt } = vars;
        const mRatio = round2((kr * kr) / (kt * kt));
        return {
          correctAnswer: mRatio,
          unit: "เท่าของมวลโลก",
          solutionSummary: `$\\frac{g_C}{g_E} = \\left(\\frac{1}{${kt}}\\right)^2 = \\frac{1}{${kt * kt}} \\implies \\frac{M_C}{M_E} = \\left(\\frac{1}{${kt * kt}}\\right) \\times (${kr})^2 = ${mRatio}$`
        };
      }
      case 9: {
        // แก้ไข Invariant: kr และ kt สุ่มอิสระ คำตอบเป็นอัตราส่วนไดนามิก
        const { kr, kt } = vars;
        const mRatio = round2((kr * kr) / (kt * kt));
        return {
          correctAnswer: mRatio,
          unit: "เท่าของมวลโลก",
          solutionSummary: `$\\frac{M_D}{M_E} = \\left(\\frac{1}{${kt}}\\right)^2 \\times (${kr})^2 = ${mRatio}$`
        };
      }
      case 10: {
        const { w1, w2, kr } = vars;
        const mRatio = round2((w2 / w1) * (kr * kr));
        return {
          correctAnswer: mRatio,
          unit: "เท่าของมวลโลก",
          solutionSummary: `$\\frac{g_A}{g_E} = \\frac{${w2}}{${w1}} \\implies \\frac{M_A}{M_E} = \\left(\\frac{${w2}}{${w1}}\\right) \\times (${kr})^2 = ${mRatio}$`
        };
      }
      case 11: {
        // แก้ไข Invariant: w1, w2, rRatio แยกอิสระ คำตอบไดนามิก
        const { w1, w2, rRatio } = vars;
        const mRatio = round2((w2 / w1) * Math.pow(rRatio, 2));
        return {
          correctAnswer: mRatio,
          unit: "เท่าของมวล P",
          solutionSummary: `$\\frac{g_Q}{g_P} = \\frac{${w2}}{${w1}} \\implies \\frac{M_Q}{M_P} = \\left(\\frac{${w2}}{${w1}}\\right) \\times (${rRatio})^2 = ${mRatio}$`
        };
      }
      case 12: {
        const { km, kr, tE } = vars;
        const gRatio = km / (kr * kr);
        const tA = round2(tE / Math.sqrt(gRatio));
        return {
          correctAnswer: tA,
          unit: "วินาที (s)",
          solutionSummary: `$\\frac{g_A}{g_E} = \\frac{${km}}{(${kr})^2} = ${round2(gRatio)} \\implies t_A = \\frac{${tE.toFixed(1)}}{\\sqrt{${round2(gRatio)}}} = ${tA.toFixed(1)}\\text{ s}$`
        };
      }
      case 13: {
        const { km, kr, tE, s } = vars;
        const tB = round2(tE * s);
        return {
          correctAnswer: tB,
          unit: "วินาที (s)",
          solutionSummary: `$\\frac{g_B}{g_E} = \\frac{${km}}{(${kr})^2} = \\frac{1}{${s * s}} \\implies t_B = ${tE.toFixed(1)} \\times \\sqrt{${s * s}} = ${tB.toFixed(1)}\\text{ s}$`
        };
      }
      case 14: {
        const { km, kr, tE, s } = vars;
        const tC = round2(tE / s);
        return {
          correctAnswer: tC,
          unit: "วินาที (s)",
          solutionSummary: `$\\frac{g_C}{g_E} = \\frac{${km}}{(${kr})^2} = ${s * s} \\implies t_C = \\frac{${tE.toFixed(1)}}{\\sqrt{${s * s}}} = ${tC.toFixed(1)}\\text{ s}$`
        };
      }
      case 15: {
        const { km, kt } = vars;
        const kr = round2(kt * Math.sqrt(km));
        return {
          correctAnswer: kr,
          unit: "เท่าของรัศมีโลก",
          solutionSummary: `$\\frac{R_D}{R_E} = \\left(\\frac{t_D}{t_E}\\right) \\times \\sqrt{\\frac{M_D}{M_E}} = ${kt.toFixed(1)} \\times \\sqrt{${km}} = ${kr}$`
        };
      }
      case 16: {
        const { km, kt } = vars;
        const kr = round2(kt * Math.sqrt(km));
        return {
          correctAnswer: kr,
          unit: "เท่าของรัศมีโลก",
          solutionSummary: `$\\frac{R_F}{R_E} = ${kt} \\times \\sqrt{${km}} = ${kr}$`
        };
      }
      case 17: {
        const { km1, km2, kr } = vars;
        const fRatio = round2((km1 * km2) / (kr * kr));
        return {
          correctAnswer: fRatio,
          unit: "เท่าของ F",
          solutionSummary: `$\\frac{F_2}{F_1} = \\frac{${km1} \\times ${km2}}{(${kr})^2} = \\frac{${km1 * km2}}{${kr * kr}} = ${fRatio}$`
        };
      }
      case 18: {
        // แก้ไข Invariant: f1 และ kr ขยายช่วงหลากหลาย คำตอบไดนามิก
        const { f1, kr } = vars;
        const f2 = round2(f1 / (kr * kr));
        return {
          correctAnswer: f2,
          unit: "นิวตัน (N)",
          solutionSummary: `$F_2 = F_1 \\times \\left(\\frac{R}{${kr}R}\\right)^2 = \\frac{${f1}}{${kr * kr}} = ${f2}\\text{ N}$`
        };
      }
      case 19: {
        // ขยายช่วงระดับความสูง hMultiple
        const { hMultiple, rDist } = vars;
        const gRatio = round2(1 / (rDist * rDist));
        return {
          correctAnswer: gRatio,
          unit: "เท่าของ g₀",
          solutionSummary: `$r = R + ${hMultiple}R = ${rDist}R \\implies \\frac{g_h}{g_0} = \\left(\\frac{R}{${rDist}R}\\right)^2 = \\frac{1}{${rDist * rDist}} = ${gRatio}$`
        };
      }
      case 20: {
        const { mG, rG, tE } = vars;
        const tHigh = round2(2.0 * tE);
        return {
          correctAnswer: tHigh,
          unit: "วินาที (s)",
          solutionSummary: `$g_{G,\\text{surf}} = \\frac{${mG}}{(${rG})^2} = 1.0 \\implies$ ที่ $r=2R$: $g_{\\text{high}} = \\frac{1}{4} \\implies t_{\\text{high}} = ${tE.toFixed(1)} \\times \\sqrt{4} = ${tHigh.toFixed(1)}\\text{ s}$`
        };
      }
      default:
        return {
          correctAnswer: 1.0,
          unit: "เท่าของมวลโลก",
          solutionSummary: "สูตรมาตรฐาน"
        };
    }
  }

  // นิยามตัวสร้างโจทย์ 20 ข้อ (Generator Functions)
  const generators = {
    // ข้อ 1: เวลาตก 2 แห่ง + รัศมี ➔ มวลเทียบโลก
    1: function(randomize = false) {
      const t1 = randomize ? randomChoice([1.0, 1.2, 1.5, 2.0, 2.5]) : 1.0;
      const kt = randomize ? randomChoice([2, 3, 4]) : 2;
      const t2 = round2(t1 * kt);
      const kr = randomize ? randomChoice([2, 3, 4, 5, 6]) : 4;
      const vars = { t1, t2, kr };
      const sol = solveQuestion(1, vars);

      return {
        templateId: 1,
        category: "freefall-radius-mass",
        categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
        question: `ปล่อยวัตถุจากความสูงเท่ากันใกล้ผิวโลกและดาวเคราะห์ A พบว่าบนโลกใช้เวลา $${t1.toFixed(1)}\\text{ s}$ ส่วนบนดาวเคราะห์ A ใช้เวลา $${t2.toFixed(1)}\\text{ s}$ ถ้ารัศมีของดาวเคราะห์ A เป็น $${kr}$ เท่าของรัศมีโลก จงหาว่ามวลของดาวเคราะห์ A เป็นกี่เท่าของมวลโลก`,
        variables: vars,
        correctAnswer: sol.correctAnswer,
        unit: sol.unit,
        unitOptions: ["เท่าของมวลโลก", "วินาที (s)", "นิวตัน (N)", "เท่าของรัศมีโลก", "เมตร/วินาที² (m/s²)"],
        solutionSummary: sol.solutionSummary
      };
    },

    // ข้อ 2: คล้ายข้อ 1 เน้นทศนิยม/เศษส่วน
    2: function(randomize = false) {
      const t1 = randomize ? randomChoice([1.0, 1.2, 1.5, 2.0, 2.5]) : 1.5;
      const kt = randomize ? randomChoice([2, 3, 4]) : 2;
      const t2 = round2(t1 * kt);
      const kr = randomize ? randomChoice([2, 3, 4, 5, 6]) : 3;
      const vars = { t1, t2, kr };
      const sol = solveQuestion(2, vars);

      return {
        templateId: 2,
        category: "freefall-radius-mass",
        categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
        question: `ปล่อยวัตถุจากความสูงเท่ากันใกล้ผิวโลกและดาวเคราะห์ B พบว่าบนโลกใช้เวลา $${t1.toFixed(1)}\\text{ s}$ ส่วนบนดาวเคราะห์ B ใช้เวลา $${t2.toFixed(1)}\\text{ s}$ ถ้าดาวเคราะห์ B มีรัศมี $${kr}$ เท่าของรัศมีโลก จงหาอัตราส่วนมวล $\\frac{M_B}{M_E}`,
        variables: vars,
        correctAnswer: sol.correctAnswer,
        unit: sol.unit,
        unitOptions: ["เท่าของมวลโลก", "วินาที (s)", "นิวตัน (N)", "เท่าของรัศมีโลก", "เมตร/วินาที² (m/s²)"],
        solutionSummary: sol.solutionSummary
      };
    },

    // ข้อ 3: เวลาตกบนโลก vs ดาวเคราะห์ C
    3: function(randomize = false) {
      const t1 = randomize ? randomChoice([1.0, 1.5, 2.0, 2.5, 3.0]) : 2.0;
      const kt = randomize ? randomChoice([2, 3, 4, 5]) : 3;
      const t2 = round2(t1 * kt);
      const kr = randomize ? randomChoice([2, 3, 4, 5, 6, 8]) : 6;
      const vars = { t1, t2, kr };
      const sol = solveQuestion(3, vars);

      return {
        templateId: 3,
        category: "freefall-radius-mass",
        categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
        question: `วัตถุถูกปล่อยจากความสูงเท่ากันใกล้ผิวโลกและดาวเคราะห์ C โดยใช้เวลาตก $${t1.toFixed(1)}\\text{ s}$ บนโลก และ $${t2.toFixed(1)}\\text{ s}$ บนดาวเคราะห์ C ถ้ารัศมีดาวเคราะห์ C เท่ากับ $${kr}$ เท่าของรัศมีโลก ดาวเคราะห์ C มีมวลเป็นกี่เท่าของโลก`,
        variables: vars,
        correctAnswer: sol.correctAnswer,
        unit: sol.unit,
        unitOptions: ["เท่าของมวลโลก", "วินาที (s)", "นิวตัน (N)", "เท่าของรัศมีโลก", "เมตร/วินาที² (m/s²)"],
        solutionSummary: sol.solutionSummary
      };
    },

    // ข้อ 4: เปรียบเทียบสองดาวเคราะห์ P และ Q
    4: function(randomize = false) {
      const t1 = randomize ? randomChoice([1.2, 1.5, 2.0, 2.5, 3.0]) : 2.0;
      const kt = randomize ? randomChoice([2, 3, 4]) : 2;
      const t2 = round2(t1 * kt);
      const kr = randomize ? randomChoice([2, 3, 4, 5]) : 2;
      const vars = { t1, t2, kr };
      const sol = solveQuestion(4, vars);

      return {
        templateId: 4,
        category: "freefall-radius-mass",
        categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
        question: `ปล่อยวัตถุจากความสูงเท่ากันบนดาวเคราะห์ P และ Q พบว่าใช้เวลา $${t1.toFixed(1)}\\text{ s}$ และ $${t2.toFixed(1)}\\text{ s}$ ตามลำดับ ถ้ารัศมีของ Q เป็น $${kr}$ เท่าของรัศมี P จงหา $\\frac{M_Q}{M_P}`,
        variables: vars,
        correctAnswer: sol.correctAnswer,
        unit: sol.unit,
        unitOptions: ["เท่าของมวล P", "เท่าของมวลโลก", "วินาที (s)", "นิวตัน (N)", "เท่าของรัศมีโลก"],
        solutionSummary: sol.solutionSummary
      };
    },

    // ข้อ 5: เปรียบเทียบดาวเคราะห์ X และ Y
    5: function(randomize = false) {
      const t1 = randomize ? randomChoice([1.5, 2.0, 2.5, 3.0, 4.0]) : 3.0;
      const kt = randomize ? randomChoice([2, 3, 4]) : 2;
      const t2 = round2(t1 * kt);
      const kr = randomize ? randomChoice([2, 3, 4, 5, 6]) : 3;
      const vars = { t1, t2, kr };
      const sol = solveQuestion(5, vars);

      return {
        templateId: 5,
        category: "freefall-radius-mass",
        categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
        question: `บนดาวเคราะห์ X วัตถุตกจากความสูงหนึ่งในเวลา $${t1.toFixed(1)}\\text{ s}$ ส่วนบนดาวเคราะห์ Y วัตถุตกจากความสูงเท่ากันในเวลา $${t2.toFixed(1)}\\text{ s}$ ถ้ารัศมี Y เป็น $${kr}$ เท่าของรัศมี X จงหาว่ามวลของ Y เป็นกี่เท่าของมวล X`,
        variables: vars,
        correctAnswer: sol.correctAnswer,
        unit: sol.unit,
        unitOptions: ["เท่าของมวล X", "เท่าของมวลโลก", "วินาที (s)", "นิวตัน (N)", "เท่าของรัศมีโลก"],
        solutionSummary: sol.solutionSummary
      };
    },

    // ข้อ 6: รัศมีเศษส่วน, เวลาตกเท่ากัน
    6: function(randomize = false) {
      const rFraction = randomize ? randomChoice([2, 3, 4, 5]) : 2; // 1/2, 1/3, 1/4, 1/5
      const vars = { rFraction };
      const sol = solveQuestion(6, vars);

      return {
        templateId: 6,
        category: "freefall-radius-mass",
        categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
        question: `ดาวเคราะห์ A มีรัศมีเพียง $1/${rFraction}$ ของรัศมีโลก เมื่อปล่อยวัตถุจากความสูงเท่ากัน พบว่าใช้เวลาตกเท่ากับบนโลกพอดี จงหาว่ามวลของดาวเคราะห์ A เป็นกี่เท่าของมวลโลก`,
        variables: vars,
        correctAnswer: sol.correctAnswer,
        unit: sol.unit,
        unitOptions: ["เท่าของมวลโลก", "วินาที (s)", "นิวตัน (N)", "เท่าของรัศมีโลก", "เมตร/วินาที² (m/s²)"],
        solutionSummary: sol.solutionSummary
      };
    },

    // ข้อ 7: รัศมีและเวลาตกเป็นเศษส่วนอิสระต่อกัน (แก้ Invariant = 1.0)
    7: function(randomize = false) {
      const kr = randomize ? randomChoice([2, 3, 4, 5]) : 2;
      let kt = randomize ? randomChoice([2, 3, 4, 5]) : 2;
      if (randomize && kr === kt && Math.random() < 0.6) {
        kt = (kr % 4) + 2;
      }
      const vars = { kr, kt };
      const sol = solveQuestion(7, vars);

      return {
        templateId: 7,
        category: "freefall-radius-mass",
        categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
        question: `ดาวเคราะห์ B มีรัศมี $1/${kr}$ ของโลก และวัตถุที่ปล่อยจากความสูงเท่ากันใช้เวลาตกเพียง $1/${kt}$ ของเวลาบนโลก จงหาว่ามวลของดาวเคราะห์ B เป็นกี่เท่าของมวลโลก`,
        variables: vars,
        correctAnswer: sol.correctAnswer,
        unit: sol.unit,
        unitOptions: ["เท่าของมวลโลก", "วินาที (s)", "นิวตัน (N)", "เท่าของรัศมีโลก", "เมตร/วินาที² (m/s²)"],
        solutionSummary: sol.solutionSummary
      };
    },

    // ข้อ 8: รัศมี k_r เท่า, เวลาตก k_t เท่า (แก้ Invariant = 1.0)
    8: function(randomize = false) {
      const kr = randomize ? randomChoice([2, 3, 4, 5, 6]) : 2;
      let kt = randomize ? randomChoice([2, 3, 4, 5]) : 2;
      if (randomize && kr === kt && Math.random() < 0.6) {
        kt = (kr % 3) + 2;
      }
      const vars = { kr, kt };
      const sol = solveQuestion(8, vars);

      return {
        templateId: 8,
        category: "freefall-radius-mass",
        categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
        question: `บนดาวเคราะห์ C ซึ่งมีรัศมีเป็น $${kr}$ เท่าของโลก วัตถุใช้เวลาตกจากความสูงเดียวกันนานเป็น $${kt}$ เท่าของบนโลก จงหามวลของดาวเคราะห์ C เทียบกับมวลโลก`,
        variables: vars,
        correctAnswer: sol.correctAnswer,
        unit: sol.unit,
        unitOptions: ["เท่าของมวลโลก", "วินาที (s)", "นิวตัน (N)", "เท่าของรัศมีโลก", "เมตร/วินาที² (m/s²)"],
        solutionSummary: sol.solutionSummary
      };
    },

    // ข้อ 9: รัศมี k_r เท่า, เวลาตก k_t เท่า (แก้ Invariant = 1.0)
    9: function(randomize = false) {
      const kr = randomize ? randomChoice([2, 3, 4, 5, 6]) : 3;
      let kt = randomize ? randomChoice([2, 3, 4, 5]) : 3;
      if (randomize && kr === kt && Math.random() < 0.6) {
        kt = (kr % 4) + 2;
      }
      const vars = { kr, kt };
      const sol = solveQuestion(9, vars);

      return {
        templateId: 9,
        category: "freefall-radius-mass",
        categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
        question: `ดาวเคราะห์ D มีรัศมีเป็น $${kr}$ เท่าของรัศมีโลก และวัตถุใช้เวลาตกจากความสูงเดียวกันนานเป็น $${kt}$ เท่าของบนโลก จงหามวลของดาวเคราะห์ D เทียบกับโลก`,
        variables: vars,
        correctAnswer: sol.correctAnswer,
        unit: sol.unit,
        unitOptions: ["เท่าของมวลโลก", "วินาที (s)", "นิวตัน (N)", "เท่าของรัศมีโลก", "เมตร/วินาที² (m/s²)"],
        solutionSummary: sol.solutionSummary
      };
    },

    // ข้อ 10: น้ำหนักที่ผิวโลก vs ผิวดาว + รัศมีดาว
    10: function(randomize = false) {
      const w1 = randomize ? randomChoice([60, 80, 100, 120, 150, 160, 200]) : 80.0;
      const kw = randomize ? randomChoice([2, 4, 5, 8]) : 4;
      const w2 = round2(w1 / kw);
      const kr = randomize ? randomChoice([2, 3, 4, 5]) : 4;
      const vars = { w1, w2, kr };
      const sol = solveQuestion(10, vars);

      return {
        templateId: 10,
        category: "weight-radius-mass",
        categoryName: "น้ำหนัก + รัศมี ➔ มวลดาว",
        question: `วัตถุก้อนเดียวกันมีน้ำหนัก $${w1}\\text{ N}$ ที่ผิวโลก แต่มีน้ำหนักเพียง $${w2}\\text{ N}$ ที่ผิวดาวเคราะห์ A ถ้าดาวเคราะห์ A มีรัศมี $${kr}$ เท่าของรัศมีโลก จงหาว่ามวลของดาวเคราะห์ A เป็นกี่เท่าของมวลโลก`,
        variables: vars,
        correctAnswer: sol.correctAnswer,
        unit: sol.unit,
        unitOptions: ["เท่าของมวลโลก", "นิวตัน (N)", "วินาที (s)", "เท่าของรัศมีโลก", "เมตร/วินาที² (m/s²)"],
        solutionSummary: sol.solutionSummary
      };
    },

    // ข้อ 11: น้ำหนักบนดาว P และ Q, รัศมีเป็นเศษส่วน (แก้ Invariant = 1.0)
    11: function(randomize = false) {
      const w1 = randomize ? randomChoice([50, 60, 80, 90, 100, 120, 150]) : 90;
      const w2 = randomize ? randomChoice([20, 30, 40, 50, 60, 80]) : 40;
      const rRatio = randomize ? randomChoice([1.2, 1.5, 1.8, 2.0, 2.5, 3.0]) : 1.5;
      const vars = { w1, w2, rRatio };
      const sol = solveQuestion(11, vars);

      return {
        templateId: 11,
        category: "weight-radius-mass",
        categoryName: "น้ำหนัก + รัศมี ➔ มวลดาว",
        question: `วัตถุก้อนเดียวกันหนัก $${w1}\\text{ N}$ ที่ผิวดาวเคราะห์ P และหนัก $${w2}\\text{ N}$ ที่ผิวดาวเคราะห์ Q ถ้ารัศมีของ Q เป็น $${rRatio}$ เท่าของรัศมี P จงหา $\\frac{M_Q}{M_P}`,
        variables: vars,
        correctAnswer: sol.correctAnswer,
        unit: sol.unit,
        unitOptions: ["เท่าของมวล P", "เท่าของมวลโลก", "นิวตัน (N)", "วินาที (s)", "เท่าของรัศมีโลก"],
        solutionSummary: sol.solutionSummary
      };
    },

    // ข้อ 12: มวล + รัศมี ➔ เวลาตก
    12: function(randomize = false) {
      const kr = randomize ? randomChoice([2, 3, 4, 5]) : 3;
      const s = randomize ? randomChoice([1, 2]) : 1;
      const km = round2((kr * kr) / (s * s));
      const tE = randomize ? randomChoice([1.5, 2.0, 2.5, 3.0]) : 2.0;
      const vars = { km, kr, tE };
      const sol = solveQuestion(12, vars);

      return {
        templateId: 12,
        category: "mass-radius-time",
        categoryName: "มวล + รัศมี ➔ เวลาตก",
        question: `ดาวเคราะห์ A มีมวล $${km}$ เท่าของโลกและมีรัศมี $${kr}$ เท่าของโลก ถ้าวัตถุตกจากความสูงหนึ่งบนโลกในเวลา $${tE.toFixed(1)}\\text{ s}$ จงหาเวลาที่วัตถุจะใช้ตกจากความสูงเท่ากันใกล้ผิวดาวเคราะห์ A`,
        variables: vars,
        correctAnswer: sol.correctAnswer,
        unit: sol.unit,
        unitOptions: ["วินาที (s)", "เท่าของมวลโลก", "นิวตัน (N)", "เมตร/วินาที² (m/s²)", "เท่าของรัศมีโลก"],
        solutionSummary: sol.solutionSummary
      };
    },

    // ข้อ 13: มวล และ รัศมี ➔ g น้อยลง ➔ เวลาตกนานขึ้น
    13: function(randomize = false) {
      const kr = randomize ? randomChoice([3, 4, 5, 6]) : 4;
      const s = randomize ? randomChoice([2, 3]) : 2; // t ratio = s
      const km = round2((kr * kr) / (s * s));
      const tE = randomize ? randomChoice([1.0, 1.2, 1.5, 2.0, 2.5]) : 1.5;
      const vars = { km, kr, tE, s };
      const sol = solveQuestion(13, vars);

      return {
        templateId: 13,
        category: "mass-radius-time",
        categoryName: "มวล + รัศมี ➔ เวลาตก",
        question: `ดาวเคราะห์ B มีมวล $${km}$ เท่าของโลกและรัศมี $${kr}$ เท่าของโลก ถ้าวัตถุตกจากความสูงหนึ่งบนโลกในเวลา $${tE.toFixed(1)}\\text{ s}$ จงหาเวลาตกจากความสูงเท่ากันบนดาวเคราะห์ B`,
        variables: vars,
        correctAnswer: sol.correctAnswer,
        unit: sol.unit,
        unitOptions: ["วินาที (s)", "เท่าของมวลโลก", "นิวตัน (N)", "เมตร/วินาที² (m/s²)", "เท่าของรัศมีโลก"],
        solutionSummary: sol.solutionSummary
      };
    },

    // ข้อ 14: มวล และ รัศมี ➔ g มากขึ้น ➔ เวลาตกเร็วขึ้น
    14: function(randomize = false) {
      const kr = randomize ? randomChoice([2, 3, 4]) : 2;
      const s = randomize ? randomChoice([2, 3, 4]) : 2; // g = s^2
      const km = (s * s) * (kr * kr);
      const tE = randomize ? randomChoice([2.0, 3.0, 4.0, 6.0, 8.0]) : 4.0;
      const vars = { km, kr, tE, s };
      const sol = solveQuestion(14, vars);

      return {
        templateId: 14,
        category: "mass-radius-time",
        categoryName: "มวล + รัศมี ➔ เวลาตก",
        question: `ดาวเคราะห์ C มีมวล $${km}$ เท่าของโลกและรัศมี $${kr}$ เท่าของโลก ถ้าวัตถุตกจากความสูงหนึ่งบนโลกในเวลา $${tE.toFixed(1)}\\text{ s}$ จงหาเวลาที่ใช้ตกจากความสูงเท่ากันบนดาวเคราะห์ C`,
        variables: vars,
        correctAnswer: sol.correctAnswer,
        unit: sol.unit,
        unitOptions: ["วินาที (s)", "เท่าของมวลโลก", "นิวตัน (N)", "เมตร/วินาที² (m/s²)", "เท่าของรัศมีโลก"],
        solutionSummary: sol.solutionSummary
      };
    },

    // ข้อ 15: มวล + เวลาตก ➔ รัศมีดาว
    15: function(randomize = false) {
      const sqrtM = randomize ? randomChoice([2, 3, 4]) : 2;
      const km = sqrtM * sqrtM; // 4, 9, 16
      const kt = randomize ? randomChoice([1.5, 2.0, 2.5, 3.0, 3.5]) : 2.0;
      const vars = { km, kt };
      const sol = solveQuestion(15, vars);

      return {
        templateId: 15,
        category: "mass-time-radius",
        categoryName: "มวล + เวลาตก ➔ รัศมีดาว",
        question: `ดาวเคราะห์ D มีมวล $${km}$ เท่าของโลก และเมื่อปล่อยวัตถุจากความสูงเท่ากัน วัตถุใช้เวลาตกนานเป็น $${kt.toFixed(1)}$ เท่าของบนโลก จงหารัศมีของดาวเคราะห์ D ว่าเป็นกี่เท่าของรัศมีโลก`,
        variables: vars,
        correctAnswer: sol.correctAnswer,
        unit: sol.unit,
        unitOptions: ["เท่าของรัศมีโลก", "เท่าของมวลโลก", "วินาที (s)", "นิวตัน (N)", "เมตร/วินาที² (m/s²)"],
        solutionSummary: sol.solutionSummary
      };
    },

    // ข้อ 16: มวล + เวลาตก ➔ รัศมีดาว
    16: function(randomize = false) {
      const sqrtM = randomize ? randomChoice([2, 3, 4, 5]) : 3;
      const km = sqrtM * sqrtM;
      const kt = randomize ? randomChoice([1.5, 2.0, 2.5, 3.0, 4.0]) : 3;
      const vars = { km, kt };
      const sol = solveQuestion(16, vars);

      return {
        templateId: 16,
        category: "mass-time-radius",
        categoryName: "มวล + เวลาตก ➔ รัศมีดาว",
        question: `ดาวเคราะห์ F มีมวล $${km}$ เท่าของโลก และวัตถุใช้เวลาตกจากความสูงเดียวกันนานเป็น $${kt}$ เท่าของบนโลก จงหาว่ารัศมีของดาวเคราะห์ F เป็นกี่เท่าของรัศมีโลก`,
        variables: vars,
        correctAnswer: sol.correctAnswer,
        unit: sol.unit,
        unitOptions: ["เท่าของรัศมีโลก", "เท่าของมวลโลก", "วินาที (s)", "นิวตัน (N)", "เมตร/วินาที² (m/s²)"],
        solutionSummary: sol.solutionSummary
      };
    },

    // ข้อ 17: แรงโน้มถ่วงนิวตัน: มวลและระยะห่างเปลี่ยน
    17: function(randomize = false) {
      const km1 = randomize ? randomChoice([2, 3, 4, 5]) : 2;
      const km2 = randomize ? randomChoice([2, 3, 4, 5]) : 3;
      const kr = randomize ? randomChoice([2, 3, 4, 5]) : 2;
      const vars = { km1, km2, kr };
      const sol = solveQuestion(17, vars);

      return {
        templateId: 17,
        category: "newton-force-ratio",
        categoryName: "กฎแรงโน้มถ่วงนิวตัน",
        question: `วัตถุสองก้อนดึงดูดกันด้วยแรง $F$ ถ้าเพิ่มมวลก้อนแรกเป็น $${km1}$ เท่า เพิ่มมวลก้อนที่สองเป็น $${km2}$ เท่า และเพิ่มระยะห่างระหว่างศูนย์กลางเป็น $${kr}$ เท่าของเดิม แรงดึงดูดใหม่มีค่าเป็นกี่เท่าของ $F$`,
        variables: vars,
        correctAnswer: sol.correctAnswer,
        unit: sol.unit,
        unitOptions: ["เท่าของ F", "เท่าของมวลโลก", "นิวตัน (N)", "วินาที (s)", "เมตร/วินาที² (m/s²)"],
        solutionSummary: sol.solutionSummary
      };
    },

    // ข้อ 18: ย้ายวัตถุออกจากผิวไปยังระยะ kr*R (แก้ Invariant วนแค่ 50, 80, 100)
    18: function(randomize = false) {
      const kr = randomize ? randomChoice([2, 3, 4, 5]) : 3;
      const f1 = randomize ? randomChoice([360, 400, 450, 500, 600, 720, 800, 900, 1000, 1200, 1500, 1600, 1800, 2000, 2400]) : 900.0;
      const vars = { f1, kr };
      const sol = solveQuestion(18, vars);

      return {
        templateId: 18,
        category: "newton-force-distance",
        categoryName: "กฎแรงโน้มถ่วงนิวตัน",
        question: `วัตถุมวล $m$ อยู่ที่ผิวดาวเคราะห์รัศมี $R$ และถูกดาวดึงด้วยแรง $${f1}\\text{ N}$ ถ้าย้ายวัตถุออกไปให้มีระยะจากศูนย์กลางดาวเป็น $${kr}R$ โดยมวลดาวและมวลวัตถุไม่เปลี่ยน แรงดึงดูดจะเหลือเท่าใด`,
        variables: vars,
        correctAnswer: sol.correctAnswer,
        unit: sol.unit,
        unitOptions: ["นิวตัน (N)", "เท่าของ F", "เท่าของมวลโลก", "วินาที (s)", "เมตร/วินาที² (m/s²)"],
        solutionSummary: sol.solutionSummary
      };
    },

    // ข้อ 19: ความเร่งโน้มถ่วงที่ความสูง h เหนือผิว (ขยายชุดตัวเลือก h)
    19: function(randomize = false) {
      const hMultiple = randomize ? randomChoice([1, 2, 3, 4, 5, 7, 9]) : 1;
      const rDist = hMultiple + 1; // distance = (h+1)R
      const vars = { hMultiple, rDist };
      const sol = solveQuestion(19, vars);

      return {
        templateId: 19,
        category: "height-gravity",
        categoryName: "ความสูงเหนือผิวดาว",
        question: `ณ ผิวดาวเคราะห์หนึ่ง ความเร่งโน้มถ่วงมีค่า $g_0$ ถ้าขึ้นไปที่ความสูงเท่ากับ $${hMultiple}$ เท่าของรัศมีดาวเคราะห์เหนือผิว (จึงอยู่ห่างจากศูนย์กลาง $${rDist}R$) จงหาอัตราส่วนของ $g$ ที่ตำแหน่งนั้นเทียบกับ $g_0$ $\\left(\\frac{g_h}{g_0}\\right)`,
        variables: vars,
        correctAnswer: sol.correctAnswer,
        unit: sol.unit,
        unitOptions: ["เท่าของ g₀", "เท่าของมวลโลก", "นิวตัน (N)", "วินาที (s)", "เมตร/วินาที² (m/s²)"],
        solutionSummary: sol.solutionSummary
      };
    },

    // ข้อ 20: นักบินอวกาศที่ความสูงเหนือผิวดาว G
    20: function(randomize = false) {
      const rG = randomize ? randomChoice([2, 3, 4]) : 2;
      const mG = rG * rG; // g_surf = mG / rG^2 = 1.0
      const tE = randomize ? randomChoice([1.0, 1.2, 1.5, 1.8, 2.0, 2.5]) : 1.2;
      const vars = { mG, rG, tE };
      const sol = solveQuestion(20, vars);

      return {
        templateId: 20,
        category: "height-astronaut-fall",
        categoryName: "ความสูงเหนือผิวดาว",
        question: `ดาวเคราะห์ G มีมวล $${mG}$ เท่าของโลกและรัศมี $${rG}$ เท่าของโลก นักบินอวกาศอยู่ที่ความสูงเหนือผิวดาว G เท่ากับรัศมีของดาว G เอง ถ้าปล่อยวัตถุให้ตกเป็นระยะสั้น และวัตถุที่ผิวโลกใช้เวลา $${tE.toFixed(1)}\\text{ s}$ ในการตกจากระยะสั้นเท่ากัน จงหาเวลาตกของวัตถุ ณ ตำแหน่งของนักบินอวกาศ`,
        variables: vars,
        correctAnswer: sol.correctAnswer,
        unit: sol.unit,
        unitOptions: ["วินาที (s)", "เท่าของมวลโลก", "นิวตัน (N)", "เมตร/วินาที² (m/s²)", "เท่าของ g₀"],
        solutionSummary: sol.solutionSummary
      };
    }
  };

  /**
   * สร้างตัวเลือก 5 ตัวเลือกแบบสมจริงสำหรับข้อ 1-2 (ปรนัย)
   * SECURITY: ไม่มี property 'isCorrect' แนบไปในตัวเลือก
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
      label: `${val} ${unit}`.trim()
    }));
  }

  /**
   * สุ่มสร้างข้อสอบ 4 ข้อสำหรับโหมดสอบเก็บคะแนน
   * SECURITY: ตัด correctAnswer, solutionSummary และ isCorrect ออกทั้งหมด
   * เพื่อป้องกันการส่องเฉลยผ่าน F12 DevTools หรือ LocalStorage
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
        variables: qData.variables,
        choices: choices, // ไม่มี isCorrect
        maxScore: 2.0
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
        variables: qData.variables,
        unitOptions: shuffle(qData.unitOptions || UNIT_OPTIONS),
        maxScore: 3.0,          // รวม 3.0 คะแนน
        answerScoreWeight: 2.0, // ตัวเลขถูกได้ 2.0 คะแนน
        unitScoreWeight: 1.0    // หน่วยถูกได้ 1.0 คะแนน
      });
    }

    return questions;
  }

  /**
   * ตรวจข้อสอบทั้งชุด พร้อมคำนวณคะแนนละเอียดด้วย Secure Solver
   * คำนวณคำตอบสดๆ โดยอาศัย templateId และ variables ของโจทย์
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

      // ตรวจคำตอบด้วย Secure Solver สดๆ จากตัวแปรโจทย์
      const solution = solveQuestion(q.templateId, q.variables);
      const correctAnswer = solution.correctAnswer;
      const correctUnit = solution.unit;
      const solutionSummary = solution.solutionSummary;

      if (q.type === "multiple_choice") {
        const chosenVal = parseFloat(sub.selectedChoice);
        if (!isNaN(chosenVal) && Math.abs(chosenVal - correctAnswer) <= 0.05) {
          itemScore = q.maxScore;
          isAnswerCorrect = true;
          isUnitCorrect = true;
        }
        results.push({
          questionNumber: q.questionNumber,
          type: q.type,
          question: q.question,
          userAnswer: isNaN(chosenVal) ? "ไม่ได้เลือก" : chosenVal,
          userUnit: correctUnit,
          correctAnswer: correctAnswer,
          correctUnit: correctUnit,
          isAnswerCorrect,
          isUnitCorrect,
          score: round2(itemScore),
          maxScore: q.maxScore,
          solutionSummary: solutionSummary
        });
      } else if (q.type === "fill_in_unit") {
        const userNum = parseFloat(sub.userNumber);
        const userUnit = (sub.userUnit || "").trim();

        if (!isNaN(userNum) && Math.abs(userNum - correctAnswer) <= 0.05) {
          itemScore += q.answerScoreWeight;
          isAnswerCorrect = true;
        }

        if (userUnit === correctUnit) {
          itemScore += q.unitScoreWeight;
          isUnitCorrect = true;
        }

        results.push({
          questionNumber: q.questionNumber,
          type: q.type,
          question: q.question,
          userAnswer: isNaN(userNum) ? "ไม่ได้ระบุ" : userNum,
          userUnit: userUnit || "ไม่ได้เลือก",
          correctAnswer: correctAnswer,
          correctUnit: correctUnit,
          isAnswerCorrect,
          isUnitCorrect,
          score: round2(itemScore),
          maxScore: q.maxScore,
          solutionSummary: solutionSummary
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
   * สร้าง Verification Hash Code สำหรับป้องกันการปลอมแปลงคะแนนและเวลา
   */
  function generateVerificationCode(student, examResult, timestamp, timeSpentSeconds = 0, cheatWarnings = 0) {
    const raw = `${student.name}|${student.room}|${student.number}|${examResult.totalScore}|${timestamp}|${timeSpentSeconds}|${cheatWarnings}`;
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      hash = (hash << 5) - hash + raw.charCodeAt(i);
      hash |= 0;
    }
    // Avalanche mixer to guarantee all bits affect the hash code
    hash ^= hash >>> 16;
    hash = Math.imul(hash, 0x85ebca6b);
    hash ^= hash >>> 13;
    hash = Math.imul(hash, 0xc2b2ae35);
    hash ^= hash >>> 16;
    const hex = (hash >>> 0).toString(16).toUpperCase().padStart(8, '0');
    return `COOLNUT-GRAV-${student.room.replace(/[^a-zA-Z0-9]/g, '')}-${student.number}-${hex.slice(0, 6)}`;
  }

  // Public API
  return {
    generateQuestion: (id, randomize = false) => {
      if (generators[id]) return generators[id](randomize);
      return generators[1](randomize);
    },
    solveQuestion,
    generateExamPaper,
    gradeExam,
    generateVerificationCode,
    round2,
    UNIT_OPTIONS
  };
})();
