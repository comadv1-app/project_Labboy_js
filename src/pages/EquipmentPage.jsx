import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const LABS = {
  stoich: {
    title: "Stoichiometry",
    steps: [
      { id: "beaker", image: "/Beaker.jpg", choices: ["Beaker", "Pipette", "Funnel"], answerIndex: 0, tip: "ใช้สำหรับใส่ ผสม และให้ความร้อนสารเคมี" },
      { id: "pipette", image: "/Pipette.jpg", choices: ["Beaker", "Pipette", "Funnel"], answerIndex: 1, tip: "ใช้ดูดและปล่อยปริมาตรสารอย่างแม่นยำ" },
      { id: "funnel", image: "/Funnel.jpg", choices: ["Beaker", "Pipette", "Funnel"], answerIndex: 2, tip: "ช่วยเท/กรองสารไม่ให้หก เลื่อนลงภาชนะได้สะดวก" },
      { id: "Graduated cylinder", image: "/Graduated cylinder.jpg", choices: ["Beaker", "Graduated cylinder", "Balance"], answerIndex: 1, tip: "ใช้ตวงปริมาตรของเหลวได้แม่นยำกว่า beaker" },
      { id: "Balance", image: "/Balance.jpg", choices: ["Balance", "Pipette", "Funnel"], answerIndex: 0, tip: "ใช้ชั่งน้ำหนักสารเคมีได้แม่นยำ" },
      { id: "Stirring rod", image: "/Stirring rod.jpg", choices: ["Beaker", "Funnel", "Stirring rod"], answerIndex: 2, tip: "ใช้คนสารละลายให้เข้ากัน" },
    ],
    checklist: ["Beaker", "Graduated cylinder", "Balance", "Pipette", "Funnel", "Stirring rod"],
  },

  "solution-prep": {
    title: "Solution Preparation",
    steps: [
      { id: "volumetric-flask", image: "/Volumetric flask.jpg", choices: ["Volumetric flask", "Beaker", "Burette"], answerIndex: 0, tip: "ขวดวัดปริมาตร ใช้กำหนดปริมาตรสุดท้ายอย่างแม่นยำ" },
      { id: "beaker", image: "/Beaker.jpg", choices: ["Beaker", "Pipette", "Funnel"], answerIndex: 0, tip: "ใช้สำหรับใส่ ผสม และให้ความร้อนสารเคมี" },
      { id: "pipette", image: "/Pipette.jpg", choices: ["Beaker", "Pipette", "Volumetric flask"], answerIndex: 1, tip: "ดูดปริมาตรคงที่อย่างแม่นยำ" },
      { id: "funnel", image: "/Funnel.jpg", choices: ["Wash bottle", "Funnel", "Beaker"], answerIndex: 1, tip: "ใช้ช่วยเทของเหลวไม่ให้หก" },
      { id: "balance", image: "/Balance.jpg", choices: ["Balance", "Pipette", "Funnel"], answerIndex: 0, tip: "ใช้ชั่งน้ำหนักสารเคมีได้แม่นยำ" },
      { id: "dropper", image: "/Dropper.jpg", choices: ["Wash bottle", "Beaker", "Dropper"], answerIndex: 2, tip: "ใช้หยดของเหลวทีละหยด" },
    ],
    checklist: ["Volumetric flask", "Funnel", "Pipette", "Beaker", "Balance", "Dropper"],
  },

  "paper-chroma": {
    title: "Paper Chromatography",
    steps: [
      { id: "filter paper", image: "/Filter paper.jpg", choices: ["Filter paper", "Beaker", "Capillary tube"], answerIndex: 0, tip: "ทำหน้าที่เป็น stationary phase ในการแยกสาร" },
      { id: "capillary", image: "/Capillary tube.jpg", choices: ["Capillary tube", "Pipette", "Spatula"], answerIndex: 0, tip: "ใช้แต้มสารตัวอย่างลงบนกระดาษ" },
      { id: "beaker", image: "/Beaker.jpg", choices: ["Beaker", "Cylinder", "Flask"], answerIndex: 0, tip: "ใช้เป็นห้องพัฒนา (developing chamber)" },
      { id: "ruler", image: "/Ruler.jpg", choices: ["Ruler", "Pipette", "Funnel"], answerIndex: 0, tip: "ใช้วัดระยะห่างของจุดบนกระดาษ" },
      { id: "pencil", image: "/Pencil.jpg", choices: ["Pen", "Pencil", "Marker"], answerIndex: 1, tip: "ใช้ขีดเส้นบนกระดาษ (ไม่ควรใช้ปากกา)" },
      { id: "solvent", image: "/Solvent.jpg", choices: ["Solvent", "Beaker", "Funnel"], answerIndex: 0, tip: "ใช้เป็น mobile phase ละลายและพาสารตัวอย่างขึ้นบนกระดาษ" },
    ],
    checklist: ["Filter paper", "Capillary tube", "Beaker", "Ruler", "Pencil", "Solvent"],
  },
};

export default function EquipmentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lab = LABS[id];

  if (!lab) {
    return (
      <div style={{ padding: 24 }}>
        <h2>ไม่พบแล็บนี้</h2>
      </div>
    );
  }

  const [qIndex, setQIndex] = useState(0);
  const [pickedIndex, setPickedIndex] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [hasAnswer, setHasAnswer] = useState(null);

  const [equipmentStatus, setEquipmentStatus] = useState({});

  const [qtyInput, setQtyInput] = useState("");

  const total = lab.steps.length;
  const step = lab.steps[qIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPickedIndex(null);
    setIsCorrect(null);
    setHasAnswer(null);
    setQtyInput("");
  }, [qIndex]);

  const onPick = (i) => {
    setPickedIndex(i);
    const correct = i === step.answerIndex;
    setIsCorrect(correct);
    setHasAnswer(null);
    setQtyInput("");
  };

  const onHasItem = (has) => {
    setHasAnswer(has);
    const correctName = step.choices[step.answerIndex];
    if (isCorrect) {
      setEquipmentStatus((prev) => ({
        ...prev,
        [correctName]: {
          has,
          qty: has ? (prev[correctName]?.qty ?? 1) : null,
        },
      }));
      if (!has) setQtyInput("");
      else setQtyInput((v) => (v && Number(v) > 0 ? v : "1"));
    }
  };

  const onQtyChange = (e) => {
    const v = e.target.value.replace(/[^\d]/g, "");
    setQtyInput(v);
    const n = v === "" ? null : Math.max(1, parseInt(v, 10));
    const correctName = step.choices[step.answerIndex];
    setEquipmentStatus((prev) => ({
      ...prev,
      [correctName]: {
        has: true,
        qty: n,
      },
    }));
  };

  const onNext = () => {
    if (qIndex < total - 1) {
      setQIndex((n) => n + 1);
    } else {
      navigate(`/lab/${id}/content`);
    }
  };

  const qtyOk = hasAnswer === false || (hasAnswer === true && Number(qtyInput) > 0);
  const nextDisabled = !(isCorrect === true && hasAnswer !== null && qtyOk);

  const checklistMap = useMemo(() => {
    const m = {};
    lab.checklist.forEach((name) => {
      const rec = equipmentStatus[name];
      m[name] = rec ?? { has: null, qty: null };
    });
    return m;
  }, [lab.checklist, equipmentStatus]);

  return (
    <div className="equip__wrap">
      <header className="topbar">
        <div className="topbar__brand">
          <img src="/lab-tool.png" alt="LabBoy Logo" className="brand__icon" aria-hidden="true" />
          <span className="brand__name">LabBoy</span>
        </div>
      </header>

      <section className="equip__container">
        <div className="equip__title">อุปกรณ์: {lab.title}</div>
        <div className="equip__progress">clause {qIndex + 1}/{total}</div>

        <div className="equip__grid">
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

                {hasAnswer === true && (
                  <div className="equip__qtyWrap" style={{ marginTop: 12 }}>
                    <label className="equip__qtyLabel" htmlFor="qty-input">
                      ใช่กี่อัน
                    </label>
                    <input
                      id="qty-input"
                      type="number"
                      min={1}
                      step={1}
                      inputMode="numeric"
                      className="equip__qty"
                      value={qtyInput}
                      onChange={onQtyChange}
                      placeholder="เช่น 3"
                      style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #d0d7de", width: 120 }}
                    />
                  </div>
                )}
              </>
            )}

            <div className="equip__buttons">
              <button className="equip__next" onClick={onNext} disabled={nextDisabled}>
                {qIndex < total - 1 ? "next" : "ไปหน้าเนื้อหา"}
              </button>
            </div>
          </div>

          <aside className="equip__aside">
            <div className="equip__legend">
              <span className="dot dot--right" /> มี
              <span className="dot dot--wrong" /> ไม่มี
            </div>

            <div className="equip__table">
              <div className="equip__thead">
              <span>อุปกรณ์</span>
              <span className="equip__thCenter">อัน</span>
              <span className="equip__thCenter">มี/ไม่มี</span>
            </div>

              {lab.checklist.map((name) => {
                const rec = checklistMap[name]; 
                const dotClass =
                  "equip__dot " +
                  (rec.has === true ? "dot--right" : rec.has === false ? "dot--wrong" : "dot--unk");

                return (
                  <div key={name} className="equip__row">
                    <span className="equip__name">{name}</span>

                    <span className="equip__qtyCell">
                      {rec.has === true && rec.qty ? (
                        <span
                          className="equip__qtyBadge"
                          title={`จำนวน ${rec.qty}`}
                        >
                          x{rec.qty}
                        </span>
                      ) : (
                        <span className="equip__qtyDash">–</span>
                      )}
                    </span>

                    <span className="equip__statusCell">
                      <span
                        className={dotClass}
                        title={rec.has === true ? "มี" : rec.has === false ? "ไม่มี" : "ยังไม่ตอบ"}
                      />
                    </span>
                  </div>
                );
              })}
            </div>

          </aside>
        </div>
      </section>
    </div>
  );
}
