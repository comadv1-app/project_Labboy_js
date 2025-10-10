import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const lessons = [
  { id: "stoich", title: "Stoichiometry", subtitle: "ปริมาณสารสัมพันธ์",
    desc: "ศึกษาความสัมพันธ์ของปริมาณสารในการเกิดปฏิกิริยาเคมี และการคำนวณปริมาณสารตั้งต้นและผลิตภัณฑ์",
    img: "/stoichiometry-1.png"
  },
  { id: "solution-prep", title: "Solution Preparation", subtitle: "การเตรียมสารละลาย",
    desc: "เรียนรู้วิธีการเตรียมสารละลายตามความเข้มข้นที่ต้องการ อย่างถูกต้องและปลอดภัย",
    img: "/800wm.jpg"
  },
  { id: "paper-chroma", title: "Paper Chromatography", subtitle: "โครมาโทกราฟีแบบกระดาษ",
    desc: "ศึกษาวิธีแยกและวิเคราะห์สารปนเปื้อนด้วยเทคนิคโครมาโทกราฟีแบบกระดาษ",
    img: "/Chromatography.jpg"
  }
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [showNotice, setShowNotice] = useState(true);
  const [secs, setSecs] = useState(30);

  useEffect(() => {
    document.body.style.overflow = (menuOpen || showNotice) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, showNotice]);

  useEffect(() => {
    if (!showNotice) return;
    const tick = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    const t = setTimeout(() => setShowNotice(false), 30000);
    return () => { clearInterval(tick); clearTimeout(t); };
  }, [showNotice]);

  const go = (id) => navigate(`/lab/${id}/equipment`);

  return (
    <>
      {showNotice && (
        <div className="notice__scrim" role="dialog" aria-modal="true" aria-labelledby="notice-title">
          <div className="notice__card">
            <h2 id="notice-title" className="notice__title">LabBoy เวอร์ชันกำลังพัฒนา</h2>
            <p className="notice__text">
              ขณะนี้ระบบอยู่ระหว่างการปรับปรุง เนื้อหาบางส่วนอาจไม่ครบถ้วนและรูปแบบการใช้งานอาจเปลี่ยนแปลงได้โดยไม่แจ้งล่วงหน้า
            </p>
            <p className="notice__text">
              <b>ประกาศ:</b> เว็บไซต์นี้เป็นเวอร์ชันทดลองใช้งาน อาจเกิดข้อผิดพลาดหรือการหยุดให้บริการชั่วคราวได้ ทีมงานกำลังปรับปรุงอย่างต่อเนื่อง
            </p>
            <div className="notice__actions">
              <button
                className="notice__btnPrimary"
                onClick={() => {
                  // ถ้าต้องการให้โชว์ครั้งเดียวต่อเซสชัน:
                  sessionStorage.setItem("seenNotice","1");
                  setShowNotice(false);
                }}
              >
                เข้าใช้งานต่อ {secs > 0 ? `(${secs})` : ""}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="labboy">
        <header className="topbar">
          <div className="topbar__brand">
            <img src="/lab-tool.png" alt="LabBoy Logo" className="brand__icon" aria-hidden="true" />
            <span className="brand__name">LabBoy</span>
          </div>

          <button
            className={`hamburger ${menuOpen ? "active" : ""}`}
            aria-label="เปิดเมนู"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span /><span />
          </button>

          {menuOpen && (
            <nav className="dropdown-menu" role="menu">
              <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
              <a href="#content" onClick={() => setMenuOpen(false)}>Content</a>
            </nav>
          )}
        </header>

        {menuOpen && (
          <button className="scrim" aria-label="ปิดเมนู" onClick={() => setMenuOpen(false)} />
        )}

        <section className="intro" id="home">
          <h1 className="intro__title">LabBoy</h1>
          <p className="intro__text">
            เว็บแอปเพื่อการเรียนรู้วิทยาศาสตร์ที่ช่วยให้นักเรียนเตรียมตัวก่อนทำการทดลองวิทยาศาสตร์ในโรงเรียน
            มีขั้นตอนตั้งแต่การแนะนำวัตถุประสงค์ของแล็บ การรู้จักและเตรียมอุปกรณ์ที่ใช้
            ข้อควรระวังด้านความปลอดภัย ไปจนถึงแบบทดสอบสั้น ๆ และเครื่องมือช่วยฝึกทักษะพื้นฐานทางเคมี
          </p>
        </section>

        <main className="cards" id="content">
          {lessons.map((x) => (
            <article key={x.id} className="card">
              <div
                className="card__media card__media--clickable"
                role="button"
                tabIndex={0}
                onClick={() => go(x.id)}
                onKeyDown={(e) => e.key === "Enter" && go(x.id)}
                aria-label={`เปิดบทเรียน ${x.title}`}
                title={`เปิดบทเรียน ${x.title}`}
              >
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

                <button className="card__button" type="button" onClick={() => go(x.id)}>
                  เริ่มเรียนรู้
                </button>
              </div>
            </article>
          ))}
        </main>

        <footer className="footer">© {new Date().getFullYear()} LabBoy</footer>
      </div>
    </>
  );
}
