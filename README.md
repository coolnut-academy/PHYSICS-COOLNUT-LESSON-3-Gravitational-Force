# 🚀 CoolNut Physics: แรงโน้มถ่วงระหว่างมวล (Gravitational Force)
### ฟิสิกส์ ม.4 บทที่ 3 • สรุปสูตรลัด • แล็บจำลอง • คลังโจทย์ 20 ข้อ • ห้องสอบออนไลน์พร้อมระบบกันโกง

[![Physics](https://img.shields.io/badge/Subject-Physics%20ม.4-00f0ff?style=for-the-badge&logo=atom)](https://github.com/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://github.com/)
[![CSS3](https://img.shields.io/badge/CSS3-Vanilla_Glassmorphism-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://github.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://github.com/)
[![MathJax](https://img.shields.io/badge/MathJax-LaTeX_3.0-278280?style=for-the-badge&logo=latex&logoColor=white)](https://www.mathjax.org/)
[![License](https://img.shields.io/badge/License-MIT-06d6a0?style=for-the-badge)](LICENSE)

---

## 🌌 ภาพรวมโครงการ (Project Overview)

**CoolNut Physics: Gravitational Force** คือเว็บแอปพลิเคชันเพื่อการศึกษา (EdTech WebApp) แบบอินเทอร์แอคทีฟ ออกแบบภายใต้ธีม **Space Sci-Fi Galaxy** เพื่อช่วยให้นักเรียนระดับชั้นมัธยมศึกษาปีที่ 4 เข้าใจฟิสิกส์เรื่อง **"แรงโน้มถ่วงระหว่างมวลและสนามโน้มถ่วง"** ได้อย่างลึกซึ้งผ่านการทดลองจริง สรุปสูตรลัดที่นำไปใช้สอบได้ทันที ฝึกทำโจทย์พร้อมเฉลยละเอียด และทดสอบเก็บคะแนนผ่านห้องสอบจับเวลาออนไลน์ที่มีระบบความปลอดภัยสูง

---

## ✨ ไฮไลต์ฟีเจอร์เด่น (Key Features)

### 🪐 1. คลังความรู้ & สูตรลัดพร้อมรบ (Learning Hub)
* **แผนที่ความคิด (Concept Map)**: ลำดับขั้นตอนการคิดจาก $(m, r) \rightarrow F \rightarrow g \rightarrow W, t$
* **สูตรลัดเปรียบเทียบอัตราส่วน**: ไม่ต้องแทนค่าคงที่ $G$ ($6.67 \times 10^{-11}$) ให้เสียเวลา
* **การตกอิสระจากความสูงเท่ากัน**: เทคนิคเชื่อมโยง $g \propto \frac{1}{t^2}$
* **ตารางสูตรลัดพร้อมรบ & เช็กลิสต์จุดผิดบ่อย**: ป้องกันข้อผิดพลาดคลาสสิก เช่น ลืมยกกำลังสอง หรือใช้ระยะจากผิวแทนศูนย์กลางมวล

### 🔬 2. ห้องแล็บจำลองแรงโน้มถ่วง (Gravity Sandbox)
* ปรับค่ามวล ($M$) และรัศมี ($R$) ของดาวเคราะห์แบบ Real-time
* สังเกตค่าสนามโน้มถ่วง ($g$), น้ำหนักวัตถุ ($W$), และระยะเวลาการตกอิสระ ($t$) ที่เปลี่ยนไปทันที
* แอนิเมชันจำลองการทิ้งวัตถุเพื่อเห็นความเร็วการตกเปรียบเทียบกับโลก

### 🛰️ 3. คลังแบบฝึกหัด 20 ข้อ & สุ่มโจทย์ฝึกทำใหม่ (Practice Mode)
* รวมโจทย์ครอบคลุมทั้ง 6 รูปแบบสำคัญ (เวลาตก, รัศมี, มวลดาว, น้ำหนัก, กฎนิวตัน, ความสูงเหนือผิว)
* **เฉลยละเอียดแบบ Master Step-by-Step**: แสดงสมการ $\LaTeX$ สวยงามทุกขั้นตอน
* **Workbench สุ่มตัวเลขใหม่ (Dynamic Practice)**: สุ่มตัวเลขใหม่เพื่อฝึกคิดเลขด้วยตนเอง พร้อมระบบตรวจคำตอบและหน่วยทันที

### ⏱️ 4. ห้องสอบออนไลน์ 15 นาที พร้อมระบบกันโกง (Exam Mode & Anti-Cheat)
* **สุ่ม 4 ข้อไม่ซ้ำ**: ข้อ 1–2 ปรนัย 5 ตัวเลือก (4.0 คะแนน) และ ข้อ 3–4 เติมคำตอบ + ระบุหน่วย (6.0 คะแนน) รวม 10.0 คะแนนเต็ม
* **สุ่มตัวเลขไดนามิก 100%**: ไม่มีคำตอบซ้ำ ทุกข้อสุ่มตัวแปรอิสระ คำตอบคำนวณตามหลักฟิสิกส์จริง
* 🛡️ **ระบบรักษาความปลอดภัย Secure Solver**:
  * **ตัดเฉลยออกจาก Client**: ไม่มีการเก็บ `correctAnswer` และ `solutionSummary` ใน `localStorage` หรือใน DOM ป้องกันการกด `F12 DevTools` ดูเฉลย
  * **ไม่มีฟิลด์ `isCorrect` ในช้อยส์**: ตัวเลือกสุ่มสลับตำแหน่งอย่างปลอดภัย
  * **ตรวจคำตอบสดบนเครื่อง**: คำนวณตรวจผลเมื่อส่งข้อสอบเท่านั้น
* 🚨 **ระบบตรวจจับการทุจริต (Anti-Cheat Sensors)**:
  * **Strict Tab Lock**: ล็อกไม่ให้คลิกสลับไปยังแท็บเรียนรู้หรือฝึกซ้อมขณะสอบ
  * **Visibility Change & Window Blur**: ดักจับเมื่อนักเรียนสลับแท็บบราวเซอร์หรือย่อหน้าต่าง พร้อมบันทึกจำนวนครั้งที่สลับหน้าจอ
  * **Minimum Exam Duration**: ต้องใช้เวลาคิดและตรวจทานอย่างน้อย **60 วินาที** ก่อนอนุญาตให้กดส่ง
* 📜 **Digital Score Slip & Verification Hash**:
  * สรุปผลคะแนน เวลาที่ใช้จริง และประวัติการสลับหน้าจอ
  * สร้างรหัสตรวจสอบ **Verification Hash Code** (เช่น `COOLNUT-GRAV-M4-01-9B6167`) ด้วย Bit Avalanche Mixer ป้องกันการปลอมแปลงผลคะแนนและเวลา
  * รองรับการพิมพ์ใบผลสอบ (Print / Save as PDF)
* 🐱 **Full Score Celebration**: แอนิเมชันแมวอวกาศเต้นฉลอง (Cat Dance) พร้อมพลุกระดาษ Confetti เมื่อได้คะแนน 10 เต็ม 10!

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

| ส่วนประกอบ | เทคโนโลยี | รายละเอียด |
| :--- | :--- | :--- |
| **Core** | Semantic HTML5 | โครงสร้างตามมาตรฐาน Accessibility (ARIA, Semantic Tags) |
| **Styling** | Vanilla CSS3 | Space Glassmorphism, CSS Variables, Responsive Grid/Flexbox |
| **Logic** | Vanilla JavaScript (ES6+) | Physics Calculation Engine, State Management, Anti-Cheat |
| **Math Rendering** | MathJax 3.x | แสดงผลสมการคณิตศาสตร์และฟิสิกส์ด้วยฟอร์แมต $\LaTeX$ คมชัดสูง |
| **Audio Engine** | Web Audio API | สังเคราะห์เสียง Retro Sci-Fi Sound Effects โดยไม่ต้องโหลดไฟล์เสียงภายนอก |
| **Canvas** | HTML5 2D Canvas | พื้นหลังดวงดาวเคลื่อนไหว 3 มิติ (Animated Starfield Canvas) |

---

## 📁 โครงสร้างโปรเจกต์ (File Structure)

```text
PHYSICS-COOLNUT-LESSON-3-Gravitational-Force/
│
├── index.html                           # โครงสร้างหน้าเว็บหลักและ Modal ข้อสอบ
├── style.css                            # ระบบดีไซน์ Space Sci-Fi Theme & Print Stylesheet
├── cat_dance.gif                        # แอนิเมชันฉลองคะแนนเต็ม 10/10
├── สรุปแรงโน้มถ่วง_สูตรลัดและตัวอย่าง.docx   # เอกสารประกอบการสอนฉบับครูผู้สอน
├── แบบฝึกหัด_แรงโน้มถ่วง_20ข้อ.docx       # เอกสารแบบฝึกหัด 20 ข้อฉบับครูผู้สอน
│
└── js/
    ├── physics-data.js                  # คลังเนื้อหา สรุปสูตรลัด และแบบฝึกหัด Master 20 ข้อ
    ├── physics-engine.js                # เครื่องมือสุ่มโจทย์, Secure Solver, และ Hash Verification
    └── app.js                           # ตัวควบคุม UI, ตัวจับเวลา 15 นาที, และระบบ Anti-Cheat
```

---

## 🚀 วิธีการติดตั้งและรันใช้งาน (Getting Started)

โปรเจกต์นี้เขียนด้วย **Pure Vanilla Web Technologies (Zero-Dependency)** ไม่จำเป็นต้องติดตั้ง Node.js หรือ Bundle เครื่องมือใดๆ สามารถเปิดใช้งานได้ทันที:

### วิธีที่ 1: เปิดใช้งานโดยตรง
ดับเบิลคลิกที่ไฟล์ `index.html` เพื่อเปิดใช้งานบนเว็บบราวเซอร์ใดก็ได้ (Chrome, Edge, Safari, Firefox)

### วิธีที่ 2: รันผ่าน Local Static Server
```bash
# รันด้วย Python 3
python -m http.server 8000

# หรือรันด้วย Node.js (npx)
npx serve .
```
จากนั้นเปิดบราวเซอร์ไปที่ `http://localhost:8000`

### วิธีที่ 3: เผยแพร่ผ่าน GitHub Pages
1. Push โค้ดขึ้น GitHub Repository
2. ไปที่ **Settings** $\rightarrow$ **Pages**
3. เลือก Source เป็น `main` branch และ root `/`
4. เว็บแอปพลิเคชันพร้อมให้นักเรียนเข้าสอบออนไลน์ได้ทันที 🌍

---

## 👨‍🏫 สำหรับครูผู้สอน (Teacher Guide)

* **การตรวจความถูกต้องของผลสอบ**:
  * เมื่อนักเรียนส่งข้อสอบ ระบบจะสร้างรหัส เช่น `COOLNUT-GRAV-41-15-9B6167`
  * รหัสนี้คำนวณจาก `ชื่อ|ห้อง|เลขที่|คะแนน|เวลาที่ใช้|จำนวนครั้งสลับจอ` ทำให้นักเรียนไม่สามารถแก้คะแนนในหน้าเว็บแล้วแคปหน้าจอมาส่งครูได้
* **การตรวจสอบเวลาทำข้อสอบ**:
  * ใบผลสอบจะระบุ "ระยะเวลาที่ใช้" ชัดเจน (เช่น 4 นาที 35 วินาที)
  * หากนักเรียนทำข้อสอบได้ 10 เต็ม แต่ใช้เวลาเพียง 15 วินาที หรือมีประวัติสลับหน้าจอ ครูผู้สอนสามารถสังเกตและตรวจสอบได้ทันที

---

## 📄 ลิขสิทธิ์ (License)

พัฒนาขึ้นเพื่อการศึกษาโดย **CoolNut Academy**  
สงวนลิขสิทธิ์สำหรับการเผยแพร่และนำไปใช้ในการเรียนการสอนวิชาฟิสิกส์ 🪐✨
