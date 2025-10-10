// src/pages/EquipmentPage.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

/** ===== ข้อมูลตัวอย่าง ปรับพาธรูปตามที่คุณวางไว้ใน public/images ===== */
const LABS = {
  stoich: {
    title: "Stoichiometry",
    steps: [
      {
        id: "beaker",
        image: "/Beaker.jpg",
        choices: ["Beaker", "Pipette", "Funnel"],
        answerIndex: 0,
        tip: "ใช้สำหรับใส่ ผสม และให้ความร้อนสารเคมี",
      },
      {
        id: "pipette",
        image: "/Pipette.jpg",
        choices: ["Beaker", "Pipette", "Funnel"],
        answerIndex: 1,
        tip: "ใช้ดูดและปล่อยปริมาตรสารอย่างแม่นยำ",
      },
      {
        id: "funnel",
        image: "/Funnel.jpg",
        choices: ["Beaker", "Pipette", "Funnel"],
        answerIndex: 2,
        tip: "ช่วยเท/กรองสารไม่ให้หก เลื่อนลงภาชนะได้สะดวก",
      },
      { id: "Graduated cylinder",
        image: "/Graduated cylinder.jpg",
        choices: ["Beaker", "Graduated cylinder", "Balance"],
        answerIndex: 1,
        tip: "ใช้ตวงปริมาตรของเหลวได้แม่นยำกว่า beaker",
      },
      { id: "Balance",
        image: "/Balance.jpg",
        choices: ["Balance", "Pipette", "Funnel"],
        answerIndex: 0,
        tip: "ใช้ชั่งน้ำหนักสารเคมีได้แม่นยำ",
      },
      { id: "Stirring rod",
        image: "/Stirring rod.jpg",
        choices: ["Beaker", "Funnel", "Stirring rod"],
        answerIndex: 2,
        tip: "ใช้คนสารละลายให้เข้ากัน",
      },
    ],
    checklist: [
      "Beaker",
      "Graduated cylinder",
      "Balance",
      "Pipette",
      "Funnel",
      "Stirring rod",
    ],
  },

  "solution-prep": {
    title: "Solution Preparation",
    steps: [
      {
        id: "volumetric-flask",
        image: "/Volumetric flask.jpg",
        choices: ["Volumetric flask", "Beaker", "Burette"],
        answerIndex: 0,
        tip: "ขวดวัดปริมาตร ใช้กำหนดปริมาตรสุดท้ายอย่างแม่นยำ",
      },
      {
        id: "beaker",
        image: "/Beaker.jpg",
        choices: ["Beaker", "Pipette", "Funnel"],
        answerIndex: 0,
        tip: "ใช้สำหรับใส่ ผสม และให้ความร้อนสารเคมี",
      },
      {
        id: "pipette",
        image: "/Pipette.jpg",
        choices: ["Beaker", "Pipette", "Volumetric flask"],
        answerIndex: 1,
        tip: "ดูดปริมาตรคงที่อย่างแม่นยำ",
      },
      { id: "funnel",
        image: "/Funnel.jpg",
        choices: ["Wash bottle", "Funnel", "Beaker"],
        answerIndex: 1,
        tip: "ใช้ช่วยเทของเหลวไม่ให้หก",
      },
      { id: "balance",
        image: "/Balance.jpg",
        choices: ["Balance", "Pipette", "Funnel"],
        answerIndex: 0,
        tip: "ใช้ชั่งน้ำหนักสารเคมีได้แม่นยำ",
      },
      { id: "dropper",
        image: "/Dropper.jpg",
        choices: ["Wash bottle", "Beaker", "Dropper"],
        answerIndex: 2,
        tip: "ใช้หยดของเหลวทีละหยด",
      },
    ],
    checklist: [
      "Volumetric flask",
      "Funnel",
      "Pipette",
      "Beaker",
      "Balance",
      "Dropper",
    ],
  },

  "paper-chroma": {
    title: "Paper Chromatography",
    steps: [
      {
        id: "filter paper",
        image: "/Filter paper.jpg",
        choices: ["Filter paper", "Beaker", "Capillary tube"],
        answerIndex: 0,
        tip: "ทำหน้าที่เป็น stationary phase ในการแยกสาร",
      },
      {
        id: "capillary",
        image: "/Capillary tube.jpg",
        choices: ["Capillary tube", "Pipette", "Spatula"],
        answerIndex: 0,
        tip: "ใช้แต้มสารตัวอย่างลงบนกระดาษ",
      },
      {
        id: "beaker",
        image: "/Beaker.jpg",
        choices: ["Beaker", "Cylinder", "Flask"],
        answerIndex: 0,
        tip: "ใช้เป็นห้องพัฒนา (developing chamber)",
      },
      { id: "ruler",
        image: "/Ruler.jpg",
        choices: ["Ruler", "Pipette", "Funnel"],
        answerIndex: 0,
        tip: "ใช้วัดระยะห่างของจุดบนกระดาษ",
      },
      { id: "pencil",
        image: "/Pencil.jpg",
        choices: ["Pen", "Pencil", "Marker"],
        answerIndex: 1,
        tip: "ใช้ขีดเส้นบนกระดาษ (ไม่ควรใช้ปากกา)",
      },
      { id: "solvent",
        image: "/Solvent.jpg",
        choices: ["Solvent", "Beaker", "Funnel"],
        answerIndex: 0,
        tip: "ใช้เป็น mobile phase ละลายและพาสารตัวอย่างขึ้นบนกระดาษ",
      },
    ],
    checklist: [
      "Filter paper",
      "Capillary tube",
      "Beaker", 
      "Ruler", 
      "Pencil", 
      "Solvent"
    ],
  },
};

export default function EquipmentPage() {
  const { id } = useParams(); // เช่น 'stoich'
  const navigate = useNavigate();
  const lab = LABS[id];

  // ถ้า id ไม่ถูกต้อง
  if (!lab) {
    return (
        
      <div style={{ padding: 24 }}>
        <h2>ไม่พบแล็บนี้</h2>
      </div>
    );
  }

  // สถานะคำถาม
  const [qIndex, setQIndex] = useState(0);
  const [pickedIndex, setPickedIndex] = useState(null); // index ของตัวเลือกที่กด
  const [isCorrect, setIsCorrect] = useState(null); // true/false/null
  const [hasAnswer, setHasAnswer] = useState(null); // คำตอบ "มี/ไม่มี" ของข้อนี้ (true/false/null)

  // map สรุปผลว่าผู้เรียนตอบ "มี/ไม่มี" สำหรับแต่ละอุปกรณ์ (ชื่อ)
  // true = มี (เขียว), false = ไม่มี (แดง), undefined = ยังไม่ตอบ (เทา)
  const [equipmentStatus, setEquipmentStatus] = useState({});

  const total = lab.steps.length;
  const step = lab.steps[qIndex];

  // reset scroll ไปบนสุดเล็กน้อยเมื่อเปลี่ยนข้อ
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [qIndex]);

  // เลือกคำตอบชื่ออุปกรณ์
  const onPick = (i) => {
    setPickedIndex(i);
    const correct = i === step.answerIndex;
    setIsCorrect(correct);
    // เมื่อเปลี่ยนคำตอบชื่อ ให้รีเซ็ต "มี/ไม่มี" ของข้อนี้
    setHasAnswer(null);
  };

  // กด "มี" หรือ "ไม่มี"
  const onHasItem = (has) => {
    setHasAnswer(has);
    if (isCorrect) {
      // บันทึกผลในตารางสรุปด้านขวาด้วย "ชื่อที่ถูกต้อง" ของข้อนี้
      const correctName = step.choices[step.answerIndex];
      setEquipmentStatus((prev) => ({ ...prev, [correctName]: has }));
    }
  };

  // ไปข้อถัดไป/ไปหน้า content
  const onNext = () => {
    if (qIndex < total - 1) {
      setQIndex((n) => n + 1);
      setPickedIndex(null);
      setIsCorrect(null);
      setHasAnswer(null);
    } else {
      navigate(`/lab/${id}/content`);
    }
  };

  const nextDisabled = !(isCorrect === true && hasAnswer !== null);

  // ทำ map สำหรับตารางสรุป (ยังไม่ตอบ = null)
  const checklistMap = useMemo(() => {
    const m = {};
    lab.checklist.forEach((name) => {
      // undefined → null เพื่อ map เป็นสีเทา
      m[name] = equipmentStatus[name] ?? null;
    });
    return m;
  }, [lab.checklist, equipmentStatus]);

  return (
    <div className="equip__wrap">
      {/* ใช้ topbar เดิมของคุณได้ หากมี; ที่นี่แสดงหัวเรื่องง่าย ๆ */}
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
      </header>

      <section className="equip__container">
        <div className="equip__title">อุปกรณ์: {lab.title}</div>
        <div className="equip__progress">clause {qIndex + 1}/{total}</div>

        <div className="equip__grid">
          {/* ซ้าย: รูป + ชื่ออุปกรณ์ + คำถามมี/ไม่มี */}
          <div className="equip__left">
            <div className="equip__image">
              <img src={step.image} alt={step.choices[step.answerIndex]} />
            </div>

            <div className="equip__question">ในรูปคืออุปกรณ์อะไร</div>

            <div className="equip__choices">
              {step.choices.map((c, i) => (
                <button
                  key={c}
                  className={"equip__chip" + (pickedIndex === i ? " is-picked" : "")}
                  onClick={() => onPick(i)}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Feedback */}
            {isCorrect === false && (
              <div className="equip__feedback equip__feedback--wrong">❌ ผิด</div>
            )}

            {isCorrect === true && (
              <>
                <div className="equip__feedback equip__feedback--right">
                  ✅ ใช้สำหรับ {step.tip}
                </div>

                <div className="equip__question2">มีอุปกรณ์นี้หรือไม่</div>
                <div className="equip__choices">
                  <button
                    className={"equip__chip" + (hasAnswer === true ? " is-picked" : "")}
                    onClick={() => onHasItem(true)}
                  >
                    มี
                  </button>
                  <button
                    className={"equip__chip" + (hasAnswer === false ? " is-picked" : "")}
                    onClick={() => onHasItem(false)}
                  >
                    ไม่มี
                  </button>
                </div>
              </>
            )}

            <div className="equip__buttons">
              <button className="equip__next" onClick={onNext} disabled={nextDisabled}>
                {qIndex < total - 1 ? "next" : "ไปหน้าเนื้อหา"}
              </button>
            </div>
          </div>

          {/* ขวา: ตารางสรุปผล มี/ไม่มี */}
          <aside className="equip__aside">
            <div className="equip__legend">
              <span className="dot dot--right" /> มี
              <span className="dot dot--wrong" /> ไม่มี
            </div>

            <div className="equip__table">
              {lab.checklist.map((name) => (
                <div key={name} className="equip__row">
                  <span className="equip__name">{name}</span>
                  <span
                    className={
                      "equip__dot " +
                      (checklistMap[name] === true
                        ? "dot--right"
                        : checklistMap[name] === false
                        ? "dot--wrong"
                        : "dot--unk")
                    }
                    title={
                      checklistMap[name] === true
                        ? "มี"
                        : checklistMap[name] === false
                        ? "ไม่มี"
                        : "ยังไม่ตอบ"
                    }
                  />
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
