import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
// Hello
const lessons = [
  {
    id: "stoich",
    title: "Stoichiometry",
    subtitle: "ปริมาณสารสัมพันธ์",
    desc:
      "ศึกษาความสัมพันธ์ของปริมาณสารในการเกิดปฏิกิริยาเคมี และการคำนวณปริมาณสารตั้งต้นและผลิตภัณฑ์",
    img: "/stoichiometry-1.png"            
  },
  {
    id: "solution-prep",
    title: "Solution Preparation",
    subtitle: "การเตรียมสารละลาย",
    desc:
      "เรียนรู้วิธีการเตรียมสารละลายตามความเข้มข้นที่ต้องการ อย่างถูกต้องและปลอดภัย",
    img: "/800wm.jpg"                      
  },
  {
    id: "paper-chroma",
    title: "Paper Chromatography",
    subtitle: "โครมาโทกราฟีแบบกระดาษ",
    desc:
      "ศึกษาวิธีแยกและวิเคราะห์สารปนเปื้อนด้วยเทคนิคโครมาโทกราฟีแบบกระดาษ",
    img: "/Chromatography.jpg"              
  }
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // ✅ เพิ่มบรรทัดนี้

  // ล็อคสกอร์ลหน้าเมื่อเมนูเปิด
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <div className="labboy">
      {/* Top Bar */}
      <header className="topbar">
        <div className="topbar__brand">
            <img
                src="/lab-tool.png"
                alt="LabBoy Logo"
                className="brand__icon"
                aria-hidden="true"
            />
            <span className="brand__name">LabBoy</span>
            </div>

        {/* ปุ่ม 3 ขีด */}
        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          aria-label="เปิดเมนู"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* เมนูด้านขวา */}
        {menuOpen && (
          <nav className="dropdown-menu" role="menu">
            <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#content" onClick={() => setMenuOpen(false)}>Content</a>
          </nav>
        )}
      </header>

      {/* คลิคนอกเมนูเพื่อปิด */}
      {menuOpen && (
        <button
          className="scrim"
          aria-label="ปิดเมนู"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Yellow Intro Banner */}
      <section className="intro" id="home">
        <h1 className="intro__title">LabBoy</h1>
        <p className="intro__text">
          เว็บแอปเพื่อการเรียนรู้วิทยาศาสตร์ที่ช่วยให้นักเรียนเตรียมตัวก่อนทำการทดลองวิทยาศาสตร์ในโรงเรียน
          มีขั้นตอนตั้งแต่การแนะนำวัตถุประสงค์ของแล็บ การรู้จักและเตรียมอุปกรณ์ที่ใช้
          ข้อควรระวังด้านความปลอดภัย ไปจนถึงแบบทดสอบสั้น ๆ และเครื่องมือช่วยฝึกทักษะพื้นฐานทางเคมี
        </p>
      </section>

      {/* Cards */}
      <main className="cards" id="content">
        {lessons.map((x) => (
          <article key={x.id} className="card">
            <div className="card__media">
              <img src={x.img} alt={`${x.title} illustration`} />
              <div className="card__headline">
                <span className="card__headlineMain">{x.title}</span>
              </div>
            </div>

            <div className="card__body">
              <h3 className="card__title">
                {x.title} <span className="card__subtitle">({x.subtitle})</span>
              </h3>
              <p className="card__desc">{x.desc}</p>

              {/* ✅ ปุ่มไปยังหน้าอุปกรณ์ของ lab นั้น */}
              <button
                className="card__button"
                type="button"
                onClick={() => navigate(`/lab/${x.id}/equipment`)}
              >
                เริ่มเรียนรู้
              </button>
            </div>
          </article>
        ))}
      </main>

      <footer className="footer">© {new Date().getFullYear()} LabBoy</footer>
    </div>
  );
}
