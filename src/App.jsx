
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import EquipmentPage from "./pages/EquipmentPage";
import ContentPage from "./pages/ContentPage";
import QuizPage from "./pages/QuizPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lab/:id/equipment" element={<EquipmentPage />} />
        <Route path="/lab/:id/content" element={<ContentPage />} />
        <Route path="/lab/:id/quiz" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
