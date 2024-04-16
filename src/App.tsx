import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Screenings from "./components/Screenings/Screenings";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Screening from "./components/Screening/Screening";
import { useState } from "react";

function App() {
  const [cost, setCost] = useState(0);

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Navigate to="/screenings" replace />} />
        <Route path="/screenings" element={<Screenings />} />
        <Route
          path="/screenings/:screening_id"
          element={<Screening cost={cost} setCost={setCost} />}
        />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
