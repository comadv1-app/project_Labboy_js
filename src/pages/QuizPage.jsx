import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../index.css";

/** ===== ชุดคำถาม (7 ข้อต่อบท) ===== */
const QUIZZES = {
  stoich: {
    title: "Stoichiometry",
    items: [
      {
        q: "หน่วยใดต่อไปนี้เกี่ยวข้องโดยตรงกับ ‘โมล’",
        choices: ["g/mL", "mol", "N·m", "Pa"],
        a: 1,
      },
      {
        q: "ในสมการเคมีดุลย์ ค่าสัมประสิทธิ์หน้าสารแสดงถึงอะไร",
        choices: [
          "ปริมาตรของสาร",
          "จำนวนโมลสัมพัทธ์ของสาร",
          "ความหนาแน่นของสาร",
          "พลังงานความร้อน",
        ],
        a: 1,
      },
      {
        q: "สารตั้งต้น 2.0 mol ให้ผลิตภัณฑ์สูงสุด 1.0 mol เรียกผลได้เชิงทฤษฎีว่า",
        choices: ["2.0 mol", "1.0 mol", "0.5 mol", "ไม่สามารถระบุ"],
        a: 1,
      },
      {
        q: "การคำนวณร้อยละผลได้ (percent yield) ใช้สูตรใด",
        choices: [
          "ผลได้จริง/ผลได้ทฤษฎี × 100",
          "ผลได้ทฤษฎี/ผลได้จริง × 100",
          "(ผลได้จริง+ผลได้ทฤษฎี)/2",
          "ผลได้จริง × ผลได้ทฤษฎี",
        ],
        a: 0,
      },
      {
        q: "เครื่องแก้วใดเหมาะกับ ‘ผสม/ให้ความร้อนสาร’ มากที่สุด",
        choices: ["Beaker", "Pipette", "Funnel", "Volumetric flask"],
        a: 0,
      },
      {
        q: "ตัวอย่างใดคือ ‘reagent in excess’",
        choices: [
          "สารที่ทำปฏิกิริยาหมดก่อน",
          "สารที่มีมากเกินพอ ทำให้มีเหลือ",
          "สารที่ไม่เกิดปฏิกิริยา",
          "สารผลิตภัณฑ์",
        ],
        a: 1,
      },
      {
        q: "เมื่อกรอง CaCO₃ แล้วควรทำอะไรเพื่อชั่งมวลได้แม่นยำ",
        choices: [
          "ชั่งทันที",
          "อบให้แห้งจนมวลคงที่แล้วชั่ง",
          "เติมน้ำเพิ่ม",
          "ผึ่งลมสั้น ๆ แล้วชั่งทันที",
        ],
        a: 1,
      },
    ],
  },

  "solution-prep": {
    title: "Solution Preparation",
    items: [
      {
        q: "Molarity (M) คืออะไร",
        choices: [
          "mol ของตัวถูกละลายใน 1 ลิตรสารละลาย",
          "g ของตัวถูกละลายใน 1 ลิตรสารละลาย",
          "mol ของตัวทำละลายใน 1 ลิตรสารละลาย",
          "g ของตัวทำละลายใน 1 ลิตรสารละลาย",
        ],
        a: 0,
      },
      {
        q: "เครื่องแก้วใดใช้กำหนด ‘ปริมาตรสุดท้าย’ ได้แม่นยำที่สุด",
        choices: ["Beaker", "Burette", "Volumetric flask", "Erlenmeyer flask"],
        a: 2,
      },
      {
        q: "อ่านระดับของเหลวอย่างถูกต้องควรอ่านที่จุดใด",
        choices: ["ยอด meniscus", "ฐาน meniscus ระดับสายตา", "ด้านข้างภาชนะ", "อ่านตรงไหนก็ได้"],
        a: 1,
      },
      {
        q: "ขั้นตอนที่ถูกต้องคือ",
        choices: [
          "ชั่งสาร → เติมน้ำจนเต็ม → เขย่าแรง ๆ",
          "ชั่งสาร → ละลายในน้ำบางส่วน → ย้ายลง volumetric flask → เติมถึงขีด",
          "เทสารแห้งลง volumetric flask แล้วเติมน้ำทีเดียว",
          "ใช้ beaker อ่านปริมาตร",
        ],
        a: 1,
      },
      {
        q: "อุปกรณ์ใดใช้ปล่อยปริมาตรละเอียดในงานไทเทรต",
        choices: ["Burette", "Pipette bulb", "Beaker", "Wash bottle"],
        a: 0,
      },
      {
        q: "ข้อควรระวังที่ถูกต้องคือ",
        choices: [
          "เขย่าแรง ๆ ให้เกิดฟองมาก ๆ",
          "ติดฉลากสารละลายทุกครั้ง",
          "อ่าน meniscus มุมเฉียง",
          "ใช้ปากเป่าพิเปต",
        ],
        a: 1,
      },
      {
        q: "ถ้าสารละลายขุ่นมีตะกอน สะท้อนถึงอะไร",
        choices: [
          "ปริมาตรถูกต้องแล้ว",
          "อาจละลายไม่หมด/มีการปนเปื้อน",
          "ความเข้มข้นสูงขึ้น",
          "อ่าน meniscus ถูกต้อง",
        ],
        a: 1,
      },
    ],
  },

  "paper-chroma": {
    title: "Paper Chromatography",
    items: [
      {
        q: "เฟสคงที่ (stationary phase) ใน paper chromatography คืออะไร",
        choices: ["ตัวทำละลาย", "กระดาษ", "อากาศ", "บีกเกอร์"],
        a: 1,
      },
      {
        q: "ใช้ดินสอแทนปากกาเพื่อเหตุผลใด",
        choices: [
          "ถูกกว่า",
          "หมึกปากกาอาจละลายและรบกวนการวัด",
          "สวยกว่า",
          "ไม่มีเหตุผลใดถูก",
        ],
        a: 1,
      },
      {
        q: "ค่า Rf คำนวณจาก",
        choices: [
          "ระยะตัวทำละลาย/ระยะสาร",
          "ระยะสาร/ระยะตัวทำละลาย",
          "ปริมาตรสาร/เวลา",
          "ความเข้มข้น/ระยะทาง",
        ],
        a: 1,
      },
      {
        q: "ตำแหน่งสารตอนเริ่มทดลองควรอยู่ที่",
        choices: ["ต่ำกว่าเส้นฐาน", "เส้นฐานพอดี", "สูงกว่าเส้นฐานเล็กน้อย", "จุ่มอยู่ในตัวทำละลาย"],
        a: 1,
      },
      {
        q: "อุปกรณ์ใดใช้แต้มสารลงกระดาษ",
        choices: ["Capillary tube", "Pipette", "Spatula", "Dropper bottle"],
        a: 0,
      },
      {
        q: "ตัวทำละลาย (mobile phase) ทำหน้าที่ใด",
        choices: [
          "ละลายและพาสารเคลื่อนที่",
          "ตรึงสารไว้กับกระดาษ",
          "กำหนดค่า Rf โดยตรง",
          "อ่านผลการทดลอง",
        ],
        a: 0,
      },
      {
        q: "ปลอดภัยที่สุดคือการทำงาน",
        choices: [
          "ใกล้เปลวไฟ",
          "ในที่อับอากาศ",
          "หลีกเลี่ยงประกายไฟ/ระบายอากาศดี",
          "ไม่มีข้อใดถูก",
        ],
        a: 2,
      },
    ],
  },
};

export default function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pack = QUIZZES[id];

  const total = pack?.items?.length ?? 0;
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [startedAt] = useState(() => Date.now());
  const [done, setDone] = useState(false);

  // เวลา (นาที:วินาที)
  const elapsed = useMemo(() => Math.floor((Date.now() - startedAt) / 1000), [startedAt, idx, picked, done]);
  const mmss = useMemo(() => {
    const m = Math.floor(elapsed / 60).toString();
    const s = (elapsed % 60).toString().padStart(2, "0");
    return `${m}:${s} น.`;
  }, [elapsed]);

  if (!pack) return <div style={{ padding: 24 }}>ไม่พบบทเรียนนี้</div>;

  const q = pack.items[idx];
  const answered = picked !== null;

  const pick = (i) => {
    if (answered) return;
    setPicked(i);
    if (i === q.a) setScore((s) => s + 1);
  };

  const next = () => {
    if (!answered) return;
    if (idx < total - 1) {
      setIdx((n) => n + 1);
      setPicked(null);
    } else {
      setDone(true);
    }
  };

  const reset = () => {
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  // แถบสถานะคะแนน (เขียว/เทา)
  const barPercent = Math.round((score / total) * 100);

  return (
    <div className="quiz__wrap">
      <header className="topbar">
        <div className="topbar__brand">
          <img src="/lab-tool.png" alt="LabBoy Logo" className="brand__icon" aria-hidden="true" />
          <span className="brand__name">LabBoy</span>
        </div>
      </header>

      <main className="quiz__container">
        <h1 className="quiz__title">Quiz</h1>

        {!done ? (
          <>
            {/* progress on top */}
            <div className="quiz__qhead">
              <div className="quiz__qnum">question {idx + 1}/{total}</div>
              <div className="quiz__qbar">
                <span style={{ width: `${((idx + (answered ? 1 : 0)) / total) * 100}%` }} />
              </div>
            </div>

            {/* question box */}
            <div className="quiz__question">{q.q}</div>

            {/* choices */}
            <div className="quiz__choices">
              {q.choices.map((c, i) => {
                let cls = "quiz__btn";
                if (answered) {
                  if (i === q.a) cls += " correct";
                  else if (i === picked) cls += " wrong";
                }
                return (
                  <button key={c + i} className={cls} onClick={() => pick(i)}>
                    {c}
                  </button>
                );
              })}
            </div>

            {/* result panel */}
            <div className="quiz__panel">
              <div className="quiz__panelTitle">ผลลัพธ์</div>
              {answered ? (
                <>
                  <div className={`quiz__state ${picked === q.a ? "ok" : "no"}`}>
                    {picked === q.a ? "ถูก" : "ผิด"}
                  </div>
                  <div className="quiz__scorebar">
                    <span className="ok" style={{ width: `${barPercent}%` }} />
                  </div>
                  <div className="quiz__stats">
                    <div>เวลา: {mmss}</div>
                    <div>คะแนน: {score}/{total}</div>
                  </div>
                </>
              ) : (
                <div className="quiz__hint">เลือกคำตอบเพื่อดูผลลัพธ์</div>
              )}
            </div>

            {/* next button */}
            <div className="quiz__nextWrap">
              <button className="quiz__next" disabled={!answered} onClick={next}>
                {idx < total - 1 ? "next" : "สรุปผล"}
              </button>
            </div>
          </>
        ) : (
          // summary
          <section className="quiz__summary">
            <h2>สรุปผล: {pack.title}</h2>
            <p>คะแนนรวม: <b>{score}/{total}</b></p>
            <p>ใช้เวลา: <b>{mmss}</b></p>
            <div className="quiz__actions">
              <button className="quiz__btnPrimary" onClick={reset}>เริ่มใหม่</button>
              <button className="quiz__btnOutline" onClick={() => navigate(`/lab/${id}/content`)}>กลับเนื้อหา</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
