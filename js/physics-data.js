/**
 * Physics Data Module: Gravitational Force (CoolNut Physics)
 * ข้อมูลสรุปเนื้อหา สูตรหลัก สูตรลัด ตัวอย่างคำนวณ และเฉลยแบบฝึกหัด 20 ข้อ
 * แสดงผลสมการ ตัวแปร และตัวห้อย ด้วยมาตรฐาน LaTeX + MathJax
 */

const PHYSICS_DATA = {
  lessonTitle: "แรงโน้มถ่วงระหว่างมวล (Gravitational Force)",
  lessonSubtitle: "สูตรหลัก • สูตรลัด • วิธีเลือกใช้ • คลังแบบฝึกหัด 20 ข้อ",
  author: "CoolNut Academy",

  // 1. สรุปเนื้อหาและสูตรลัด
  summarySections: [
    {
      id: "concept-map",
      title: "1. แผนที่ความคิดของบทนี้",
      icon: "🌌",
      content: `
        <div class="flow-chart">
          <div class="flow-step"><span>มวลและระยะ $(m, r)$</span></div>
          <div class="flow-arrow">➔</div>
          <div class="flow-step highlight"><span>แรงโน้มถ่วง $F$</span></div>
          <div class="flow-arrow">➔</div>
          <div class="flow-step highlight-cyan"><span>สนามโน้มถ่วง $g$</span></div>
          <div class="flow-arrow">➔</div>
          <div class="flow-step"><span>น้ำหนัก $W$ / เวลาตก $t$</span></div>
        </div>
        <ul class="key-points">
          <li><strong>ถ้าโจทย์ถาม “แรงระหว่างมวลสองก้อน”</strong> ให้เริ่มจาก $F = \\frac{G m_1 m_2}{r^2}$</li>
          <li><strong>ถ้าโจทย์ถาม “ความแรงของแรงโน้มถ่วง ณ จุดหนึ่ง”</strong> ให้เริ่มจาก $g = \\frac{GM}{r^2}$</li>
          <li><strong>ถ้าอยู่ที่ผิวดาว</strong> ให้แทน $r = R$ (รัศมีของดาว)</li>
          <li><strong>ถ้าโจทย์ให้เวลาตกจากความสูงเท่ากัน</strong> ให้ใช้ $g \\propto \\frac{1}{t^2}$ ก่อน แล้วค่อยเชื่อมกับ $M$ และ $R$</li>
          <li><strong>ถ้าเป็นวัตถุก้อนเดิม</strong> น้ำหนัก $W$ แปรผันตรงตาม $g$ โดยตรง ($W \\propto g$)</li>
        </ul>
      `
    },
    {
      id: "newton-law",
      title: "2. กฎความโน้มถ่วงสากลของนิวตัน",
      icon: "🍎",
      content: `
        <div class="formula-box">
          <div class="formula-main">\\[ F = \\frac{G m_1 m_2}{r^2} \\]</div>
          <div class="formula-desc">
            <div><strong>$F$</strong> = ขนาดแรงดึงดูดระหว่างมวลทั้งสอง (N)</div>
            <div><strong>$m_1, m_2$</strong> = มวลของวัตถุทั้งสองก้อน (kg)</div>
            <div><strong>$r$</strong> = ระยะห่างระหว่าง <em>“ศูนย์กลางมวล”</em> ของวัตถุทั้งสอง (ไม่ใช่ผิว!)</div>
            <div><strong>$G$</strong> = $6.67 \\times 10^{-11}\\text{ N}\\cdot\\text{m}^2/\\text{kg}^2$ (ค่าคงที่ความโน้มถ่วงสากล)</div>
          </div>
        </div>
        <div class="tip-card warning">
          <div class="tip-title">⚡ จำให้ขึ้นใจ!</div>
          <p>เพิ่มมวล ➔ แรงเพิ่มแบบเส้นตรง (แปรผันตรง)</p>
          <p>แต่เพิ่มระยะ ➔ <strong>แรงลดลงตามกำลังสองของระยะ</strong> (เพิ่มระยะ $2$ เท่า แรงลดลงเหลือ $1/4$)</p>
        </div>
        <div class="formula-box shortcut">
          <div class="formula-label">สูตรลัดเปรียบเทียบแรง 2 สถานการณ์ (ไม่ต้องแทนค่า G)</div>
          <div class="formula-main">\\[ \\frac{F_2}{F_1} = \\left(\\frac{m_{1,2}}{m_{1,1}}\\right) \\left(\\frac{m_{2,2}}{m_{2,1}}\\right) \\left(\\frac{r_1}{r_2}\\right)^2 \\]</div>
        </div>
      `
    },
    {
      id: "gravity-field",
      title: "3. ความเร่งโน้มถ่วง (สนามโน้มถ่วง $g$)",
      icon: "🪐",
      content: `
        <div class="formula-box">
          <div class="formula-main">\\[ g = \\frac{GM}{r^2} \\]</div>
          <div class="formula-desc">
            <div><strong>$M$</strong> = มวลของดาวหรือวัตถุต้นกำเนิดสนาม (kg)</div>
            <div><strong>$r$</strong> = ระยะจากศูนย์กลางดาวถึงตำแหน่งที่พิจารณา (m)</div>
            <div><em>* $g$ ไม่ขึ้นกับมวลของวัตถุทดลอง วัตถุทุกก้อนจึงตกด้วยความเร่งเท่ากันเมื่อไม่มีแรงต้านอากาศ</em></div>
          </div>
        </div>
        <div class="grid-2-col">
          <div class="formula-box sub">
            <div class="formula-label">3.1 ที่ผิวดาว ($r = R$)</div>
            <div class="formula-main">\\[ g_{\\text{surface}} = \\frac{GM}{R^2} \\]</div>
          </div>
          <div class="formula-box sub">
            <div class="formula-label">3.2 สูตรลัดเปรียบเทียบ $g$ ของดาว 2 ดวง</div>
            <div class="formula-main">\\[ \\frac{g_2}{g_1} = \\left(\\frac{M_2}{M_1}\\right) \\left(\\frac{R_1}{R_2}\\right)^2 \\]</div>
          </div>
        </div>
        <div class="formula-box shortcut">
          <div class="formula-label">3.3 สูตรลัดย้อนกลับหาอัตราส่วนมวล ($M$)</div>
          <div class="formula-main">\\[ \\frac{M_2}{M_1} = \\left(\\frac{g_2}{g_1}\\right) \\left(\\frac{R_2}{R_1}\\right)^2 \\]</div>
        </div>
      `
    },
    {
      id: "free-fall",
      title: "4. การตกอิสระจากหยุดนิ่ง (ความสูงเท่ากัน)",
      icon: "⏱️",
      content: `
        <p>จากสมการการเคลื่อนที่แนวดิ่งเมื่อปล่อยจากหยุดนิ่ง ($u = 0$): $h = \\frac{1}{2}gt^2$</p>
        <p>เมื่อปล่อยจากความสูงเดียวกัน ($h$ เท่ากัน) จะได้ความสัมพันธ์สำคัญ:</p>
        <div class="formula-box shortcut">
          <div class="formula-label">4.1 สูตรลัดเมื่อปล่อยจากความสูงเท่ากัน</div>
          <div class="formula-main">\\[ \\frac{g_2}{g_1} = \\left(\\frac{t_1}{t_2}\\right)^2 \\]</div>
        </div>
        <div class="tip-card danger">
          <div class="tip-title">🚨 จุดที่นักเรียนพลาดบ่อยที่สุด!</div>
          <p>เวลาตกนานขึ้น $k$ เท่า ➔ <strong>$g$ ลดลง $k^2$ เท่า</strong> (ไม่ใช่ลดลง $k$ เท่า)</p>
          <p><em>เช่น ตกนานขึ้นเป็น $3$ เท่า ➔ $g$ จะเหลือน้อยลงเป็น $1/9$ เท่า!</em></p>
        </div>
        <div class="formula-box sub">
          <div class="formula-label">4.2 สูตรลัดหาเวลาตกจากอัตราส่วน $g$</div>
          <div class="formula-main">\\[ \\frac{t_2}{t_1} = \\sqrt{\\frac{g_1}{g_2}} \\]</div>
        </div>
      `
    },
    {
      id: "master-combined",
      title: "5. สูตรรวม “เวลาตก + รัศมี ➔ มวล” (สูตรหัวใจของข้อสอบ)",
      icon: "🎯",
      content: `
        <p>รวมสมการการตกอิสระ $g \\propto \\frac{1}{t^2}$ เข้ากับ $g = \\frac{GM}{R^2}$ ในบรรทัดเดียว:</p>
        <div class="formula-box master">
          <div class="formula-label">🔥 สูตรรวมลัดหาอัตราส่วนมวล (ใช้บ่อยที่สุด)</div>
          <div class="formula-main">\\[ \\frac{M_2}{M_1} = \\left(\\frac{t_1}{t_2}\\right)^2 \\left(\\frac{R_2}{R_1}\\right)^2 = \\left(\\frac{t_1 \\cdot R_2}{t_2 \\cdot R_1}\\right)^2 \\]</div>
        </div>
        <div class="grid-2-col">
          <div class="formula-box sub">
            <div class="formula-label">5.1 ย้อนกลับหารัศมี ($R$)</div>
            <div class="formula-main">\\[ \\frac{R_2}{R_1} = \\left(\\frac{t_2}{t_1}\\right) \\sqrt{\\frac{M_2}{M_1}} \\]</div>
          </div>
          <div class="formula-box sub">
            <div class="formula-label">5.2 ย้อนกลับหาเวลาตก ($t$)</div>
            <div class="formula-main">\\[ \\frac{t_2}{t_1} = \\left(\\frac{R_2}{R_1}\\right) \\sqrt{\\frac{M_1}{M_2}} \\]</div>
          </div>
        </div>
      `
    },
    {
      id: "weight-and-height",
      title: "6. น้ำหนัก และ วัตถุที่ความสูงเหนือผิวดาว",
      icon: "🚀",
      content: `
        <div class="formula-box">
          <div class="formula-label">น้ำหนักของวัตถุก้อนเดิม ($m$ คงที่)</div>
          <div class="formula-main">\\[ W = mg \\implies \\frac{W_2}{W_1} = \\frac{g_2}{g_1} \\]</div>
          <p>ดังนั้น <strong>“อัตราส่วนน้ำหนัก” แทน “อัตราส่วน $g$”</strong> ได้ทันที!</p>
        </div>
        <div class="formula-box">
          <div class="formula-label">ความเร่งโน้มถ่วงที่ความสูง $h$ เหนือผิวดาว</div>
          <div class="formula-main">\\[ r = R + h \\implies \\frac{g_h}{g_{\\text{surface}}} = \\left(\\frac{R}{R + h}\\right)^2 \\]</div>
        </div>
        <div class="tip-card info">
          <div class="tip-title">💡 ตัวอย่างสำคัญ: ความสูงเท่ากับรัศมีดาว ($h = R$)</div>
          <p>ระยะจากศูนย์กลาง $r = R + R = 2R$</p>
          <p>ดังนั้น $\\frac{g_h}{g_0} = \\left(\\frac{R}{2R}\\right)^2 = \\frac{1}{4}$ (ความเร่งโน้มถ่วงลดลงเหลือ $\\frac{1}{4}$ ของที่ผิว)</p>
          <p>และเวลาตกจากความสูงสั้นๆ จะนานขึ้นเป็น $\\sqrt{4} = 2$ เท่า ของที่ผิว!</p>
        </div>
      `
    },
    {
      id: "summary-table",
      title: "7. ตารางสรุปสูตรลัดแบบพร้อมรบ",
      icon: "📊",
      content: `
        <div class="table-responsive">
          <table class="cosmic-table">
            <thead>
              <tr>
                <th>สถานการณ์</th>
                <th>สูตรที่ใช้</th>
                <th>เมื่อไหร่ควรหยิบมาใช้</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>แรงระหว่างมวล</strong></td>
                <td>$F = \\frac{G m_1 m_2}{r^2}$</td>
                <td>ต้องการหาแรงโน้มถ่วงตรงๆ</td>
              </tr>
              <tr>
                <td><strong>แรงแบบอัตราส่วน</strong></td>
                <td>$\\frac{F_2}{F_1} = \\left(\\frac{m_{1,2}}{m_{1,1}}\\right)\\left(\\frac{m_{2,2}}{m_{2,1}}\\right)\\left(\\frac{r_1}{r_2}\\right)^2$</td>
                <td>มวลหรือระยะห่างมีการเปลี่ยนแปลง</td>
              </tr>
              <tr>
                <td><strong>สนามโน้มถ่วงที่ผิว</strong></td>
                <td>$g = \\frac{GM}{R^2}$</td>
                <td>ตำแหน่งอยู่ที่ผิวของดาว</td>
              </tr>
              <tr>
                <td><strong>เปรียบเทียบ $g$ ของดาว</strong></td>
                <td>$\\frac{g_2}{g_1} = \\left(\\frac{M_2}{M_1}\\right)\\left(\\frac{R_1}{R_2}\\right)^2$</td>
                <td>รู้ข้อมูลอัตราส่วน $M$ และ $R$</td>
              </tr>
              <tr>
                <td><strong>หามวลดาวจาก $g$ และ $R$</strong></td>
                <td>$\\frac{M_2}{M_1} = \\left(\\frac{g_2}{g_1}\\right)\\left(\\frac{R_2}{R_1}\\right)^2$</td>
                <td>รู้ข้อมูล $g$ (หรือน้ำหนัก $W$) และ $R$</td>
              </tr>
              <tr>
                <td><strong>ตกจากความสูงเท่ากัน</strong></td>
                <td>$\\frac{g_2}{g_1} = \\left(\\frac{t_1}{t_2}\\right)^2$</td>
                <td>เชื่อมโยงเวลาตกอิสระกับค่า $g$</td>
              </tr>
              <tr>
                <td><strong>สูตรรวมหา $M$</strong></td>
                <td>$\\frac{M_2}{M_1} = \\left(\\frac{t_1}{t_2}\\right)^2\\left(\\frac{R_2}{R_1}\\right)^2$</td>
                <td>โจทย์ให้เวลาตก และรัศมีดาว ➔ ถามมวล</td>
              </tr>
              <tr>
                <td><strong>สูตรรวมหา $R$</strong></td>
                <td>$\\frac{R_2}{R_1} = \\left(\\frac{t_2}{t_1}\\right)\\sqrt{\\frac{M_2}{M_1}}$</td>
                <td>โจทย์ให้เวลาตก และมวลดาว ➔ ถามรัศมี</td>
              </tr>
              <tr>
                <td><strong>สูตรรวมหา $t$</strong></td>
                <td>$\\frac{t_2}{t_1} = \\left(\\frac{R_2}{R_1}\\right)\\sqrt{\\frac{M_1}{M_2}}$</td>
                <td>โจทย์ให้มวล และรัศมี ➔ ถามเวลาตก</td>
              </tr>
              <tr>
                <td><strong>อัตราส่วนน้ำหนัก</strong></td>
                <td>$\\frac{W_2}{W_1} = \\frac{g_2}{g_1}$</td>
                <td>วัตถุก้อนเดิม นำไปชั่งบนดาวคนละดวง</td>
              </tr>
              <tr>
                <td><strong>ขึ้นสูงเหนือผิว $h$</strong></td>
                <td>$\\frac{g_h}{g_0} = \\left(\\frac{R}{R + h}\\right)^2$</td>
                <td>ตำแหน่งลอยอยู่เหนือผิวของดาว</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: "mistakes-and-checklist",
      title: "8. จุดผิดพลาดที่พบบ่อย & เช็กลิสต์ก่อนส่งคำตอบ",
      icon: "🛡️",
      content: `
        <div class="checklist-grid">
          <div class="check-item">
            <span class="check-icon">⚠️</span>
            <div><strong>ใช้ระยะจากผิวแทนระยะจากศูนย์กลาง:</strong> ค่า $r$ ในสูตรต้องวัดจาก “จุดศูนย์กลางมวล” เสมอ</div>
          </div>
          <div class="check-item">
            <span class="check-icon">⚠️</span>
            <div><strong>ลืมยกกำลังสองของเวลา:</strong> จากความสูงเท่ากัน $g \\propto \\frac{1}{t^2}$ ห้ามลืมเด็ดขาด!</div>
          </div>
          <div class="check-item">
            <span class="check-icon">⚠️</span>
            <div><strong>สลับเศษส่วนเวลา:</strong> ถ้านานกว่า $g$ ต้องน้อยกว่า ตรวจสอบทิศทางให้สอดคล้องกัน</div>
          </div>
          <div class="check-item">
            <span class="check-icon">⚠️</span>
            <div><strong>คิดว่าดาวใหญ่กว่า $g$ ต้องมากกว่าเสมอ:</strong> ไม่จริง! เพราะ $g$ แปรผกผันกับ $R^2$ ถ้าใหญ่มากแต่เบา $g$ จะน้อยลง</div>
          </div>
        </div>
      `
    }
  ],

  // 2. คลังแบบฝึกหัดต้นฉบับทั้ง 20 ข้อ พร้อมเฉลยละเอียดแบบ Master
  masterExercises: [
    {
      id: 1,
      category: "freefall-radius-mass",
      categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
      question: "ปล่อยวัตถุจากความสูงเท่ากันใกล้ผิวโลกและดาวเคราะห์ A พบว่าบนโลกใช้เวลา $1.0\\text{ s}$ ส่วนบนดาวเคราะห์ A ใช้เวลา $2.0\\text{ s}$ ถ้ารัศมีของดาวเคราะห์ A เป็น $4$ เท่าของรัศมีโลก จงหาว่ามวลของดาวเคราะห์ A เป็นกี่เท่าของมวลโลก",
      variables: { t1: 1.0, t2: 2.0, rRatio: 4.0 },
      answer: 4.0,
      unit: "เท่าของมวลโลก",
      solution: `
        <div class="solution-step">
          <p><strong>ขั้นที่ 1:</strong> จากความสูงเท่ากัน เชื่อมเวลาตกกับความเร่งโน้มถ่วง $g$</p>
          <div class="math-line">\\[ \\frac{g_A}{g_E} = \\left(\\frac{t_E}{t_A}\\right)^2 = \\left(\\frac{1.0}{2.0}\\right)^2 = \\frac{1}{4} \\]</div>
        </div>
        <div class="solution-step">
          <p><strong>ขั้นที่ 2:</strong> จากสูตรสนามโน้มถ่วงที่ผิว $g = \\frac{GM}{R^2}$ จะได้ $M \\propto g \\cdot R^2$</p>
          <div class="math-line">\\[ \\frac{M_A}{M_E} = \\left(\\frac{g_A}{g_E}\\right) \\times \\left(\\frac{R_A}{R_E}\\right)^2 = \\left(\\frac{1}{4}\\right) \\times (4)^2 = \\frac{1}{4} \\times 16 = 4 \\]</div>
        </div>
        <p class="ans-badge"><strong>ตอบ:</strong> มวลของดาวเคราะห์ A เป็น <strong>$4$ เท่าของมวลโลก</strong></p>
      `
    },
    {
      id: 2,
      category: "freefall-radius-mass",
      categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
      question: "ปล่อยวัตถุจากความสูงเท่ากันใกล้ผิวโลกและดาวเคราะห์ B พบว่าบนโลกใช้เวลา $1.5\\text{ s}$ ส่วนบนดาวเคราะห์ B ใช้เวลา $3.0\\text{ s}$ ถ้าดาวเคราะห์ B มีรัศมี $3$ เท่าของรัศมีโลก จงหาอัตราส่วนมวล $\\frac{M_B}{M_E}$",
      variables: { t1: 1.5, t2: 3.0, rRatio: 3.0 },
      answer: 2.25,
      unit: "เท่าของมวลโลก",
      solution: `
        <div class="solution-step">
          <p><strong>ขั้นที่ 1:</strong> หาอัตราส่วน $g$ จากเวลาตก</p>
          <div class="math-line">\\[ \\frac{g_B}{g_E} = \\left(\\frac{t_E}{t_B}\\right)^2 = \\left(\\frac{1.5}{3.0}\\right)^2 = \\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4} \\]</div>
        </div>
        <div class="solution-step">
          <p><strong>ขั้นที่ 2:</strong> คำนวณอัตราส่วนมวล</p>
          <div class="math-line">\\[ \\frac{M_B}{M_E} = \\left(\\frac{g_B}{g_E}\\right) \\times \\left(\\frac{R_B}{R_E}\\right)^2 = \\left(\\frac{1}{4}\\right) \\times (3)^2 = \\frac{9}{4} = 2.25 \\]</div>
        </div>
        <p class="ans-badge"><strong>ตอบ:</strong> $\\frac{M_B}{M_E} = \\mathbf{2.25}$ <strong>เท่าของมวลโลก (หรือ $\\frac{9}{4}$)</strong></p>
      `
    },
    {
      id: 3,
      category: "freefall-radius-mass",
      categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
      question: "วัตถุถูกปล่อยจากความสูงเท่ากันใกล้ผิวโลกและดาวเคราะห์ C โดยใช้เวลาตก $2.0\\text{ s}$ บนโลก และ $6.0\\text{ s}$ บนดาวเคราะห์ C ถ้ารัศมีดาวเคราะห์ C เท่ากับ $6$ เท่าของรัศมีโลก ดาวเคราะห์ C มีมวลเป็นกี่เท่าของโลก",
      variables: { t1: 2.0, t2: 6.0, rRatio: 6.0 },
      answer: 4.0,
      unit: "เท่าของมวลโลก",
      solution: `
        <div class="solution-step">
          <p><strong>ขั้นที่ 1:</strong> หาอัตราส่วน $g$</p>
          <div class="math-line">\\[ \\frac{g_C}{g_E} = \\left(\\frac{t_E}{t_C}\\right)^2 = \\left(\\frac{2.0}{6.0}\\right)^2 = \\left(\\frac{1}{3}\\right)^2 = \\frac{1}{9} \\]</div>
        </div>
        <div class="solution-step">
          <p><strong>ขั้นที่ 2:</strong> คำนวณมวล</p>
          <div class="math-line">\\[ \\frac{M_C}{M_E} = \\left(\\frac{g_C}{g_E}\\right) \\times \\left(\\frac{R_C}{R_E}\\right)^2 = \\left(\\frac{1}{9}\\right) \\times (6)^2 = \\frac{36}{9} = 4 \\]</div>
        </div>
        <p class="ans-badge"><strong>ตอบ:</strong> ดาวเคราะห์ C มีมวลเป็น <strong>$4$ เท่าของมวลโลก</strong></p>
      `
    },
    {
      id: 4,
      category: "freefall-radius-mass",
      categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
      question: "ปล่อยวัตถุจากความสูงเท่ากันบนดาวเคราะห์ P และ Q พบว่าใช้เวลา $2.0\\text{ s}$ และ $4.0\\text{ s}$ ตามลำดับ ถ้ารัศมีของ Q เป็น $2$ เท่าของรัศมี P จงหา $\\frac{M_Q}{M_P}$",
      variables: { t1: 2.0, t2: 4.0, rRatio: 2.0 },
      answer: 1.0,
      unit: "เท่าของมวล P",
      solution: `
        <div class="solution-step">
          <p><strong>ขั้นที่ 1:</strong> หาอัตราส่วน $g$ จากเวลาตก</p>
          <div class="math-line">\\[ \\frac{g_Q}{g_P} = \\left(\\frac{t_P}{t_Q}\\right)^2 = \\left(\\frac{2.0}{4.0}\\right)^2 = \\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4} \\]</div>
        </div>
        <div class="solution-step">
          <p><strong>ขั้นที่ 2:</strong> คำนวณอัตราส่วนมวล</p>
          <div class="math-line">\\[ \\frac{M_Q}{M_P} = \\left(\\frac{g_Q}{g_P}\\right) \\times \\left(\\frac{R_Q}{R_P}\\right)^2 = \\left(\\frac{1}{4}\\right) \\times (2)^2 = \\frac{4}{4} = 1.0 \\]</div>
        </div>
        <p class="ans-badge"><strong>ตอบ:</strong> $\\frac{M_Q}{M_P} = \\mathbf{1.0}$ <strong>เท่าของมวล P (มวลทั้งสองดวงเท่ากัน)</strong></p>
      `
    },
    {
      id: 5,
      category: "freefall-radius-mass",
      categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
      question: "บนดาวเคราะห์ X วัตถุตกจากความสูงหนึ่งในเวลา $3.0\\text{ s}$ ส่วนบนดาวเคราะห์ Y วัตถุตกจากความสูงเท่ากันในเวลา $6.0\\text{ s}$ ถ้ารัศมี Y เป็น $3$ เท่าของรัศมี X จงหาว่ามวลของ Y เป็นกี่เท่าของมวล X",
      variables: { t1: 3.0, t2: 6.0, rRatio: 3.0 },
      answer: 2.25,
      unit: "เท่าของมวล X",
      solution: `
        <div class="solution-step">
          <p><strong>ขั้นที่ 1:</strong> หาอัตราส่วน $g$</p>
          <div class="math-line">\\[ \\frac{g_Y}{g_X} = \\left(\\frac{t_X}{t_Y}\\right)^2 = \\left(\\frac{3.0}{6.0}\\right)^2 = \\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4} \\]</div>
        </div>
        <div class="solution-step">
          <p><strong>ขั้นที่ 2:</strong> คำนวณมวล</p>
          <div class="math-line">\\[ \\frac{M_Y}{M_X} = \\left(\\frac{g_Y}{g_X}\\right) \\times \\left(\\frac{R_Y}{R_X}\\right)^2 = \\left(\\frac{1}{4}\\right) \\times (3)^2 = \\frac{9}{4} = 2.25 \\]</div>
        </div>
        <p class="ans-badge"><strong>ตอบ:</strong> มวลของ Y เป็น <strong>$2.25$ เท่าของมวล X (หรือ $\\frac{9}{4}$)</strong></p>
      `
    },
    {
      id: 6,
      category: "freefall-radius-mass",
      categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
      question: "ดาวเคราะห์ A มีรัศมีเพียงครึ่งหนึ่งของรัศมีโลก เมื่อปล่อยวัตถุจากความสูงเท่ากัน พบว่าใช้เวลาตกเท่ากับบนโลกพอดี จงหาว่ามวลของดาวเคราะห์ A เป็นกี่เท่าของมวลโลก",
      variables: { tRatio: 1.0, rRatio: 0.5 },
      answer: 0.25,
      unit: "เท่าของมวลโลก",
      solution: `
        <div class="solution-step">
          <p>เวลาตกเท่ากัน $\\implies \\frac{g_A}{g_E} = \\left(\\frac{t_E}{t_A}\\right)^2 = 1^2 = 1$</p>
          <p>รัศมีเป็นครึ่งหนึ่ง $\\implies \\frac{R_A}{R_E} = \\frac{1}{2}$</p>
          <div class="math-line">\\[ \\frac{M_A}{M_E} = \\left(\\frac{g_A}{g_E}\\right) \\times \\left(\\frac{R_A}{R_E}\\right)^2 = 1 \\times \\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4} = 0.25 \\]</div>
        </div>
        <p class="ans-badge"><strong>ตอบ:</strong> มวลของดาวเคราะห์ A เป็น <strong>$0.25$ เท่าของมวลโลก (หรือ $\\frac{1}{4}$)</strong></p>
      `
    },
    {
      id: 7,
      category: "freefall-radius-mass",
      categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
      question: "ดาวเคราะห์ B มีรัศมีครึ่งหนึ่งของโลก และวัตถุที่ปล่อยจากความสูงเท่ากันใช้เวลาตกเพียงครึ่งหนึ่งของเวลาบนโลก จงหาว่ามวลของดาวเคราะห์ B เป็นกี่เท่าของมวลโลก",
      variables: { tRatio: 0.5, rRatio: 0.5 },
      answer: 1.0,
      unit: "เท่าของมวลโลก",
      solution: `
        <div class="solution-step">
          <p>$\\frac{t_B}{t_E} = \\frac{1}{2} \\implies \\frac{t_E}{t_B} = 2$</p>
          <div class="math-line">\\[ \\frac{g_B}{g_E} = \\left(\\frac{t_E}{t_B}\\right)^2 = 2^2 = 4 \\]</div>
          <div class="math-line">\\[ \\frac{M_B}{M_E} = \\left(\\frac{g_B}{g_E}\\right) \\times \\left(\\frac{R_B}{R_E}\\right)^2 = 4 \\times \\left(\\frac{1}{2}\\right)^2 = 4 \\times \\frac{1}{4} = 1.0 \\]</div>
        </div>
        <p class="ans-badge"><strong>ตอบ:</strong> มวลของดาวเคราะห์ B เป็น <strong>$1.0$ เท่าของมวลโลก (มวลเท่ากับโลก)</strong></p>
      `
    },
    {
      id: 8,
      category: "freefall-radius-mass",
      categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
      question: "บนดาวเคราะห์ C ซึ่งมีรัศมีเป็น $2$ เท่าของโลก วัตถุใช้เวลาตกจากความสูงเดียวกันนานเป็น $2$ เท่าของบนโลก จงหามวลของดาวเคราะห์ C เทียบกับมวลโลก",
      variables: { tRatio: 2.0, rRatio: 2.0 },
      answer: 1.0,
      unit: "เท่าของมวลโลก",
      solution: `
        <div class="solution-step">
          <p>$\\frac{R_C}{R_E} = 2$ และ $\\frac{t_C}{t_E} = 2 \\implies \\frac{t_E}{t_C} = \\frac{1}{2}$</p>
          <div class="math-line">\\[ \\frac{M_C}{M_E} = \\left(\\frac{t_E}{t_C}\\right)^2 \\times \\left(\\frac{R_C}{R_E}\\right)^2 = \\left(\\frac{1}{2}\\right)^2 \\times (2)^2 = \\frac{1}{4} \\times 4 = 1.0 \\]</div>
        </div>
        <p class="ans-badge"><strong>ตอบ:</strong> มวลของดาวเคราะห์ C เท่ากับ <strong>$1.0$ เท่าของมวลโลก</strong></p>
      `
    },
    {
      id: 9,
      category: "freefall-radius-mass",
      categoryName: "เวลาตก + รัศมี ➔ มวลดาว",
      question: "ดาวเคราะห์ D มีรัศมีเป็น $3$ เท่าของรัศมีโลก และวัตถุใช้เวลาตกจากความสูงเดียวกันนานเป็น $3$ เท่าของบนโลก จงหามวลของดาวเคราะห์ D เทียบกับโลก",
      variables: { tRatio: 3.0, rRatio: 3.0 },
      answer: 1.0,
      unit: "เท่าของมวลโลก",
      solution: `
        <div class="solution-step">
          <p>$\\frac{R_D}{R_E} = 3$ และ $\\frac{t_D}{t_E} = 3 \\implies \\frac{t_E}{t_D} = \\frac{1}{3}$</p>
          <div class="math-line">\\[ \\frac{M_D}{M_E} = \\left(\\frac{t_E}{t_D}\\right)^2 \\times \\left(\\frac{R_D}{R_E}\\right)^2 = \\left(\\frac{1}{3}\\right)^2 \\times (3)^2 = \\frac{1}{9} \\times 9 = 1.0 \\]</div>
        </div>
        <p class="ans-badge"><strong>ตอบ:</strong> มวลของดาวเคราะห์ D เท่ากับ <strong>$1.0$ เท่าของมวลโลก</strong></p>
      `
    },
    {
      id: 10,
      category: "weight-radius-mass",
      categoryName: "น้ำหนัก + รัศมี ➔ มวลดาว",
      question: "วัตถุก้อนเดียวกันมีน้ำหนัก $80\\text{ N}$ ที่ผิวโลก แต่มีน้ำหนักเพียง $20\\text{ N}$ ที่ผิวดาวเคราะห์ A ถ้าดาวเคราะห์ A มีรัศมี $4$ เท่าของรัศมีโลก จงหาว่ามวลของดาวเคราะห์ A เป็นกี่เท่าของมวลโลก",
      variables: { w1: 80.0, w2: 20.0, rRatio: 4.0 },
      answer: 4.0,
      unit: "เท่าของมวลโลก",
      solution: `
        <div class="solution-step">
          <p>สำหรับวัตถุก้อนเดียวกัน $W \\propto g \\implies \\frac{g_A}{g_E} = \\frac{W_A}{W_E} = \\frac{20}{80} = \\frac{1}{4}$</p>
          <div class="math-line">\\[ \\frac{M_A}{M_E} = \\left(\\frac{g_A}{g_E}\\right) \\times \\left(\\frac{R_A}{R_E}\\right)^2 = \\left(\\frac{1}{4}\\right) \\times (4)^2 = \\frac{1}{4} \\times 16 = 4.0 \\]</div>
        </div>
        <p class="ans-badge"><strong>ตอบ:</strong> มวลของดาวเคราะห์ A เป็น <strong>$4.0$ เท่าของมวลโลก</strong></p>
      `
    },
    {
      id: 11,
      category: "weight-radius-mass",
      categoryName: "น้ำหนัก + รัศมี ➔ มวลดาว",
      question: "วัตถุก้อนเดียวกันหนัก $90\\text{ N}$ ที่ผิวดาวเคราะห์ P และหนัก $40\\text{ N}$ ที่ผิวดาวเคราะห์ Q ถ้ารัศมีของ Q เป็น $1.5$ เท่าของรัศมี P จงหา $\\frac{M_Q}{M_P}$",
      variables: { w1: 90.0, w2: 40.0, rRatio: 1.5 },
      answer: 1.0,
      unit: "เท่าของมวล P",
      solution: `
        <div class="solution-step">
          <p>$\\frac{g_Q}{g_P} = \\frac{W_Q}{W_P} = \\frac{40}{90} = \\frac{4}{9}$</p>
          <p>รัศมี $\\frac{R_Q}{R_P} = 1.5 = \\frac{3}{2}$</p>
          <div class="math-line">\\[ \\frac{M_Q}{M_P} = \\left(\\frac{g_Q}{g_P}\\right) \\times \\left(\\frac{R_Q}{R_P}\\right)^2 = \\left(\\frac{4}{9}\\right) \\times \\left(\\frac{3}{2}\\right)^2 = \\left(\\frac{4}{9}\\right) \\times \\left(\\frac{9}{4}\\right) = 1.0 \\]</div>
        </div>
        <p class="ans-badge"><strong>ตอบ:</strong> $\\frac{M_Q}{M_P} = \\mathbf{1.0}$ <strong>เท่าของมวล P (มวลเท่ากัน)</strong></p>
      `
    },
    {
      id: 12,
      category: "mass-radius-time",
      categoryName: "มวล + รัศมี ➔ เวลาตก",
      question: "ดาวเคราะห์ A มีมวล $9$ เท่าของโลกและมีรัศมี $3$ เท่าของโลก ถ้าวัตถุตกจากความสูงหนึ่งบนโลกในเวลา $2.0\\text{ s}$ จงหาเวลาที่วัตถุจะใช้ตกจากความสูงเท่ากันใกล้ผิวดาวเคราะห์ A",
      variables: { mRatio: 9.0, rRatio: 3.0, tE: 2.0 },
      answer: 2.0,
      unit: "วินาที (s)",
      solution: `
        <div class="solution-step">
          <p><strong>วิธีลัด (หัวข้อ 5.2):</strong> $\\frac{t_A}{t_E} = \\left(\\frac{R_A}{R_E}\\right)\\sqrt{\\frac{M_E}{M_A}} = 3 \\times \\sqrt{\\frac{1}{9}} = 3 \\times \\frac{1}{3} = 1.0$</p>
          <div class="math-line">\\[ t_A = 1.0 \\times 2.0\\text{ s} = 2.0\\text{ s} \\]</div>
          <p><em>(หรือวิธีคิดจากอัตราส่วน $g$: $\\frac{g_A}{g_E} = \\frac{9}{3^2} = 1.0 \\implies t_A = \\frac{2.0}{\\sqrt{1.0}} = 2.0\\text{ s}$)</em></p>
        </div>
        <p class="ans-badge"><strong>ตอบ:</strong> <strong>$2.0$ วินาที (s)</strong></p>
      `
    },
    {
      id: 13,
      category: "mass-radius-time",
      categoryName: "มวล + รัศมี ➔ เวลาตก",
      question: "ดาวเคราะห์ B มีมวล $4$ เท่าของโลกและรัศมี $4$ เท่าของโลก ถ้าวัตถุตกจากความสูงหนึ่งบนโลกในเวลา $1.5\\text{ s}$ จงหาเวลาตกจากความสูงเท่ากันบนดาวเคราะห์ B",
      variables: { mRatio: 4.0, rRatio: 4.0, tE: 1.5 },
      answer: 3.0,
      unit: "วินาที (s)",
      solution: `
        <div class="solution-step">
          <p><strong>วิธีลัด (หัวข้อ 5.2):</strong> $\\frac{t_B}{t_E} = \\left(\\frac{R_B}{R_E}\\right)\\sqrt{\\frac{M_E}{M_B}} = 4 \\times \\sqrt{\\frac{1}{4}} = 4 \\times \\frac{1}{2} = 2$</p>
          <div class="math-line">\\[ t_B = 2 \\times 1.5\\text{ s} = 3.0\\text{ s} \\]</div>
          <p><em>(หรือวิธีคิดจากอัตราส่วน $g$: $\\frac{g_B}{g_E} = \\frac{4}{4^2} = \\frac{1}{4} \\implies t_B = 1.5 \\times \\sqrt{4} = 3.0\\text{ s}$)</em></p>
        </div>
        <p class="ans-badge"><strong>ตอบ:</strong> <strong>$3.0$ วินาที (s)</strong></p>
      `
    },
    {
      id: 14,
      category: "mass-radius-time",
      categoryName: "มวล + รัศมี ➔ เวลาตก",
      question: "ดาวเคราะห์ C มีมวล $16$ เท่าของโลกและรัศมี $2$ เท่าของโลก ถ้าวัตถุตกจากความสูงหนึ่งบนโลกในเวลา $4.0\\text{ s}$ จงหาเวลาที่ใช้ตกจากความสูงเท่ากันบนดาวเคราะห์ C",
      variables: { mRatio: 16.0, rRatio: 2.0, tE: 4.0 },
      answer: 2.0,
      unit: "วินาที (s)",
      solution: `
        <div class="solution-step">
          <p><strong>วิธีลัด (หัวข้อ 5.2):</strong> $\\frac{t_C}{t_E} = \\left(\\frac{R_C}{R_E}\\right)\\sqrt{\\frac{M_E}{M_C}} = 2 \\times \\sqrt{\\frac{1}{16}} = 2 \\times \\frac{1}{4} = \\frac{1}{2}$</p>
          <div class="math-line">\\[ t_C = \\frac{1}{2} \\times 4.0\\text{ s} = 2.0\\text{ s} \\]</div>
          <p><em>(หรือวิธีคิดจากอัตราส่วน $g$: $\\frac{g_C}{g_E} = \\frac{16}{2^2} = 4 \\implies t_C = \\frac{4.0}{\\sqrt{4}} = 2.0\\text{ s}$)</em></p>
        </div>
        <p class="ans-badge"><strong>ตอบ:</strong> <strong>$2.0$ วินาที (s)</strong></p>
      `
    },
    {
      id: 15,
      category: "mass-time-radius",
      categoryName: "มวล + เวลาตก ➔ รัศมีดาว",
      question: "ดาวเคราะห์ D มีมวล $4$ เท่าของโลก และเมื่อปล่อยวัตถุจากความสูงเท่ากัน วัตถุใช้เวลาตกนานเป็น $2$ เท่าของบนโลก จงหารัศมีของดาวเคราะห์ D ว่าเป็นกี่เท่าของรัศมีโลก",
      variables: { mRatio: 4.0, tRatio: 2.0 },
      answer: 4.0,
      unit: "เท่าของรัศมีโลก",
      solution: `
        <div class="solution-step">
          <p>จากสูตรลัดหา $R$: $\\frac{R_2}{R_1} = \\left(\\frac{t_2}{t_1}\\right) \\times \\sqrt{\\frac{M_2}{M_1}}$</p>
          <div class="math-line">\\[ \\frac{R_D}{R_E} = 2 \\times \\sqrt{4} = 2 \\times 2 = 4.0 \\]</div>
        </div>
        <p class="ans-badge"><strong>ตอบ:</strong> รัศมีของดาวเคราะห์ D เป็น <strong>$4.0$ เท่าของรัศมีโลก</strong></p>
      `
    },
    {
      id: 16,
      category: "mass-time-radius",
      categoryName: "มวล + เวลาตก ➔ รัศมีดาว",
      question: "ดาวเคราะห์ F มีมวล $9$ เท่าของโลก และวัตถุใช้เวลาตกจากความสูงเดียวกันนานเป็น $3$ เท่าของบนโลก จงหาว่ารัศมีของดาวเคราะห์ F เป็นกี่เท่าของรัศมีโลก",
      variables: { mRatio: 9.0, tRatio: 3.0 },
      answer: 9.0,
      unit: "เท่าของรัศมีโลก",
      solution: `
        <div class="solution-step">
          <p>จากสูตรลัดหา $R$: $\\frac{R_F}{R_E} = \\left(\\frac{t_F}{t_E}\\right) \\times \\sqrt{\\frac{M_F}{M_E}}$</p>
          <div class="math-line">\\[ \\frac{R_F}{R_E} = 3 \\times \\sqrt{9} = 3 \\times 3 = 9.0 \\]</div>
        </div>
        <p class="ans-badge"><strong>ตอบ:</strong> รัศมีของดาวเคราะห์ F เป็น <strong>$9.0$ เท่าของรัศมีโลก</strong></p>
      `
    },
    {
      id: 17,
      category: "newton-force-ratio",
      categoryName: "กฎแรงโน้มถ่วงนิวตัน",
      question: "วัตถุสองก้อนดึงดูดกันด้วยแรง $F$ ถ้าเพิ่มมวลก้อนแรกเป็น $2$ เท่า เพิ่มมวลก้อนที่สองเป็น $3$ เท่า และเพิ่มระยะห่างระหว่างศูนย์กลางเป็น $2$ เท่าของเดิม แรงดึงดูดใหม่มีค่าเป็นกี่เท่าของ $F$",
      variables: { m1Ratio: 2.0, m2Ratio: 3.0, rRatio: 2.0 },
      answer: 1.5,
      unit: "เท่าของ F",
      solution: `
        <div class="solution-step">
          <p>จากสูตรลัดแรงดึงดูดระหว่างมวล:</p>
          <div class="math-line">\\[ \\frac{F_2}{F_1} = \\left(\\frac{m_{1,2}}{m_{1,1}}\\right) \\left(\\frac{m_{2,2}}{m_{2,1}}\\right) \\left(\\frac{r_1}{r_2}\\right)^2 \\]</div>
          <div class="math-line">\\[ \\frac{F_2}{F_1} = (2) \\times (3) \\times \\left(\\frac{1}{2}\\right)^2 = 6 \\times \\frac{1}{4} = \\frac{6}{4} = 1.5 \\]</div>
        </div>
        <p class="ans-badge"><strong>ตอบ:</strong> แรงดึงดูดใหม่มีค่าเป็น <strong>$1.5$ เท่าของ $F$ (หรือ $\\frac{3}{2}$)</strong></p>
      `
    },
    {
      id: 18,
      category: "newton-force-distance",
      categoryName: "กฎแรงโน้มถ่วงนิวตัน",
      question: "วัตถุมวล $m$ อยู่ที่ผิวดาวเคราะห์รัศมี $R$ และถูกดาวดึงด้วยแรง $900\\text{ N}$ ถ้าย้ายวัตถุออกไปให้มีระยะจากศูนย์กลางดาวเป็น $3R$ โดยมวลดาวและมวลวัตถุไม่เปลี่ยน แรงดึงดูดจะเหลือเท่าใด",
      variables: { f1: 900.0, r2Ratio: 3.0 },
      answer: 100.0,
      unit: "นิวตัน (N)",
      solution: `
        <div class="solution-step">
          <p>แรงแปรผกผันกับระยะห่างยกกำลังสอง: $F \\propto \\frac{1}{r^2}$</p>
          <div class="math-line">\\[ \\frac{F_2}{F_1} = \\left(\\frac{r_1}{r_2}\\right)^2 = \\left(\\frac{R}{3R}\\right)^2 = \\left(\\frac{1}{3}\\right)^2 = \\frac{1}{9} \\]</div>
          <div class="math-line">\\[ F_2 = \\frac{900}{9} = 100\\text{ N} \\]</div>
        </div>
        <p class="ans-badge"><strong>ตอบ:</strong> แรงดึงดูดจะเหลือ <strong>$100$ นิวตัน (N)</strong></p>
      `
    },
    {
      id: 19,
      category: "height-gravity",
      categoryName: "ความสูงเหนือผิวดาว",
      question: "ณ ผิวดาวเคราะห์หนึ่ง ความเร่งโน้มถ่วงมีค่า $g_0$ ถ้าขึ้นไปที่ความสูงเท่ากับรัศมีของดาวเคราะห์เหนือผิว (จึงอยู่ห่างจากศูนย์กลาง $2R$) จงหาอัตราส่วนของ $g$ ที่ตำแหน่งนั้นเทียบกับ $g_0$ $\\left(\\frac{g_h}{g_0}\\right)$",
      variables: { hRatio: 1.0 },
      answer: 0.25,
      unit: "เท่าของ g₀",
      solution: `
        <div class="solution-step">
          <p>ที่ความสูง $h = R$ จะได้ระยะจากศูนย์กลาง $r = R + R = 2R$</p>
          <div class="math-line">\\[ \\frac{g_h}{g_0} = \\left(\\frac{R}{2R}\\right)^2 = \\frac{1}{4} = 0.25 \\]</div>
          <p><em>(และถ้าพิจารณาเวลาตกสั้นๆ $\\frac{t_h}{t_0} = \\sqrt{\\frac{g_0}{g_h}} = \\sqrt{4} = 2$ เท่า)</em></p>
        </div>
        <p class="ans-badge"><strong>ตอบ:</strong> $g$ ที่ตำแหน่งนั้นเหลือ <strong>$0.25$ เท่าของ $g_0$ (หรือ $\\frac{1}{4}$)</strong></p>
      `
    },
    {
      id: 20,
      category: "height-astronaut-fall",
      categoryName: "ความสูงเหนือผิวดาว",
      question: "ดาวเคราะห์ G มีมวล $4$ เท่าของโลกและรัศมี $2$ เท่าของโลก นักบินอวกาศอยู่ที่ความสูงเหนือผิวดาว G เท่ากับรัศมีของดาว G เอง ถ้าปล่อยวัตถุให้ตกเป็นระยะสั้น และวัตถุที่ผิวโลกใช้เวลา $1.2\\text{ s}$ ในการตกจากระยะสั้นเท่ากัน จงหาเวลาตกของวัตถุ ณ ตำแหน่งของนักบินอวกาศ",
      variables: { mG: 4.0, rG: 2.0, tE: 1.2 },
      answer: 2.4,
      unit: "วินาที (s)",
      solution: `
        <div class="solution-step">
          <p><strong>ขั้นที่ 1:</strong> หา $g$ ที่ผิวดาว G เทียบกับโลก: $\\frac{g_{G,\\text{surf}}}{g_E} = \\frac{4}{2^2} = \\frac{4}{4} = 1 \\implies g_{G,\\text{surf}} = g_E$</p>
        </div>
        <div class="solution-step">
          <p><strong>ขั้นที่ 2:</strong> ที่ความสูง $h = R_G$ (ระยะจากศูนย์กลาง $= 2R_G$):</p>
          <div class="math-line">\\[ g_{\\text{high}} = g_{G,\\text{surf}} \\times \\left(\\frac{R_G}{2R_G}\\right)^2 = g_E \\times \\frac{1}{4} = \\frac{g_E}{4} \\]</div>
        </div>
        <div class="solution-step">
          <p><strong>ขั้นที่ 3:</strong> เปรียบเทียบเวลาตกกับผิวโลก:</p>
          <div class="math-line">\\[ \\frac{t_{\\text{high}}}{t_E} = \\sqrt{\\frac{g_E}{g_{\\text{high}}}} = \\sqrt{4} = 2 \\]</div>
          <div class="math-line">\\[ t_{\\text{high}} = 2 \\times 1.2\\text{ s} = 2.4\\text{ s} \\]</div>
        </div>
        <p class="ans-badge"><strong>ตอบ:</strong> เวลาตก ณ ตำแหน่งของนักบินอวกาศเท่ากับ <strong>$2.4$ วินาที (s)</strong></p>
      `
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PHYSICS_DATA;
}
