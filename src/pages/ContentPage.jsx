import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../index.css";

/** ===== ข้อมูลต่อบท ===== */
const CONTENT = {
  stoich: {
    title: "Stoichiometry",
    subtitle: "ปริมาณสารสัมพันธ์",
    objectives:
      "ศึกษาความสัมพันธ์ระหว่างสารตั้งต้นและผลิตภัณฑ์ในปฏิกิริยาเคมี ฝึกคำนวณปริมาณสารตั้งต้น/ผลิตภัณฑ์ รวมถึงร้อยละผลได้",
    theory:
      "ปริมาณสารสัมพันธ์: ความสัมพันธ์เชิงโมล มวล ปริมาตรระหว่างสารในสมการเคมีดุลย์ ใช้หลักการคำนวณทางเคมี เช่น โมล มวลโมล เลขสัมประสิทธิ์",
    detailsUrl:
      "https://www.chulatutor.com/blog/%E0%B9%80%E0%B8%84%E0%B8%A1%E0%B8%B5-%E0%B8%9B%E0%B8%A3%E0%B8%B4%E0%B8%A1%E0%B8%B2%E0%B8%93%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%B1%E0%B8%A1%E0%B8%9E%E0%B8%B1%E0%B8%99%E0%B8%98%E0%B9%8C/",
    equipment: [
      "Beaker 250 mL",
      "Graduated cylinder 100 mL",
      "Balance",
      "Filter paper & Funnel",
      "Glass rod"
    ],
    steps: [
      "ชั่ง Na2CO3 และ CaCl2 ตามปริมาณที่กำหนด",
      "ละลายในน้ำคนให้เข้ากัน → ผสมสารให้เกิดปฏิกิริยา",
      "กรองของแข็งผลผลิต (CaCO3)",
      "อบแห้งจนมวลคงที่",
      "คำนวณร้อยละผลได้"
    ],
    video: "https://youtu.be/y8rAPdwhLSc?si=6OEJKoSxADIawi_B",
    expected:
      "เกิดตะกอนสีขาวของ CaCO₃ และมวลหลังอบแห้งคงที่ คำนวณร้อยละผลได้ใกล้เคียงทฤษฎี",
    warnings: [
      "ใส่แว่นตาและถุงมือป้องกันสารเคมี",
      "หลีกเลี่ยงการสูดดมฝุ่นหรือละอองจากสาร",
      "ทิ้งของเสียตามแนวทางความปลอดภัยของห้องแล็บ"
    ]
  },

  "solution-prep": {
    title: "Solution Preparation",
    subtitle: "การเตรียมสารละลาย",
    objectives:
      "เรียนรู้การเตรียมสารละลายตามความเข้มข้นที่กำหนดอย่างถูกต้องและปลอดภัย",
    theory:
      "ความเข้มข้น (Molarity) = โมลของตัวถูกละลายในสารละลาย 1 ลิตร ใช้ volumetric flask เพื่อความแม่นยำ",
    detailsUrl: "https://chemistry.msu.ac.th/CalChem/article1.php",
    equipment: [
      "Volumetric flask 250 mL",
      "Pipette",
      "Beaker",
      "Balance",
      "Wash bottle"
    ],
    steps: [
      "คำนวณมวลสารที่ต้องใช้จากความเข้มข้นและปริมาตรเป้าหมาย",
      "ชั่งสาร → ละลายในน้ำบางส่วน",
      "ย้ายลง volumetric flask และเติมน้ำถึงขีด",
      "ปิดจุกและเขย่าเบา ๆ ให้เข้ากัน"
    ],
    video: "https://youtu.be/A2YyIo8vSCA?si=XmHtlQdSYDdNaVza",
    expected:
      "สารละลายใส ไม่มีตะกอน ระดับ meniscus ตรงขีดกำหนด ป้ายฉลากชัดเจน",
    warnings: [
      "อ่าน meniscus ระดับสายตา",
      "อย่าเขย่าแรงจนเกิดฟอง",
      "ระวังหกเลอะอุปกรณ์ไฟฟ้าและเครื่องชั่ง"
    ]
  },

  "paper-chroma": {
    title: "Paper Chromatography",
    subtitle: "โครมาโทกราฟีแบบกระดาษ",
    objectives:
      "ทดลองแยกส่วนประกอบของสารผสมด้วยเฟสคงที่ (กระดาษ) และเฟสเคลื่อนที่ (ตัวทำละลาย)",
    theory:
      "สารเคลื่อนที่ต่างกันตามการยึดเหนี่ยวกับเฟสคงที่และการละลายในเฟสเคลื่อนที่ คำนวณค่า Rf = ระยะสาร/ระยะตัวทำละลาย",
    detailsUrl: "https://chem.libretexts.org/Bookshelves/Analytical_Chemistry/Supplemental_Modules_(Analytical_Chemistry)/Instrumentation_and_Analysis/Chromatography/V._Chromatography/E._Paper_Chromatography",
    equipment: [
      "Filter paper",
      "Beaker (developing chamber)",
      "Capillary tube",
      "Ruler",
      "Pencil",
      "Solvent"
    ],
    steps: [
      "ตัดกระดาษกรอง ขีดเส้นฐานด้วยดินสอ",
      "แต้มสารด้วยหลอดแคปปิลลารี",
      "วางกระดาษในบีกเกอร์ที่มีตัวทำละลาย (ระดับต่ำกว่าเส้นฐาน)",
      "เมื่อแนวตัวทำละลายสูงพอ นำออกและทำแห้ง",
      "วัดระยะและคำนวณค่า Rf"
    ],
    video: "https://youtu.be/gAkf6x2pRoU?si=o_1UrnE0JM0l9FrI",
    expected:
      "เห็นจุดสารแยกตัวตามความสามารถในการเคลื่อนที่ สามารถคำนวณค่า Rf ได้",
    warnings: [
      "ตัวทำละลายอาจไวไฟ อยู่นอกเขตประกายไฟ",
      "ใช้ดินสอแทนปากกาเพื่อไม่ให้หมึกละลายปน"
    ]
  }
};

/** helper: รองรับทั้ง YouTube & mp4 */
function VideoBox({ src, title }) {
  if (!src) return null;
  const ytMatch =
    src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_\-]{6,})/) || [];
  const ytId = ytMatch[1];

  return (
    <div className="content__video">
      {ytId ? (
        <iframe
          src={`https://www.youtube.com/embed/${ytId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video controls>
          <source src={src} type="video/mp4" />
          เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
        </video>
      )}
    </div>
  );
}

export default function ContentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = CONTENT[id];

  if (!data) return <div style={{ padding: 24 }}>ไม่พบบทเรียนนี้</div>;

  return (
    <div className="content__wrap">
      <header className="topbar">
        <div className="topbar__brand">
          <img src="/lab-tool.png" alt="LabBoy Logo" className="brand__icon" aria-hidden="true" />
          <span className="brand__name">LabBoy</span>
        </div>
      </header>

      <main className="content__container">
        <h1 className="content__title">
          เนื้อหา: {data.title}
          <div className="content__subtitle">{data.subtitle}</div>
        </h1>

        {/* 1) วัตถุประสงค์ */}
        <section className="content__card">
          <h3>วัตถุประสงค์</h3>
          <p>{data.objectives}</p>
        </section>

        {/* 2) ทฤษฎี */}
        <section className="content__card">
          <h3>ทฤษฎี</h3>
          <p className="content__theory">{data.theory}</p>
          <a className="content__link" href={data.detailsUrl} target="_blank" rel="noreferrer">
            รายละเอียด
          </a>
        </section>

        {/* 3) อุปกรณ์ */}
        {data.equipment?.length > 0 && (
          <section className="content__card">
            <h3>อุปกรณ์</h3>
            <ul className="content__bullets">
              {data.equipment.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </section>
        )}

        {/* 4) ขั้นตอนการทดลอง */}
        <section className="content__card">
          <h3>ขั้นตอนการทดลอง</h3>
          <ol className="content__steps">
            {data.steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </section>

        {/* 5) VDO */}
        <section className="content__card">
          <h3>Lab</h3>
          <VideoBox src={data.video} title={`${data.title} video`} />
        </section>

        {/* 6) ผลการสังเกต/ผลคาดหวัง */}
        {data.expected && (
          <section className="content__card">
            <h3>ผลการสังเกต / ผลคาดหวัง</h3>
            <p>{data.expected}</p>
          </section>
        )}

        {/* 7) คำเตือน */}
        {data.warnings?.length > 0 && (
          <section className="content__card content__card--warn">
            <h3>คำเตือน</h3>
            <ul className="content__bullets">
              {data.warnings.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </section>
        )}

        <div className="content__actions">
          <button className="content__quizbtn" onClick={() => navigate(`/lab/${id}/quiz`)}>
            Quiz
          </button>
        </div>
      </main>
    </div>
  );
}

