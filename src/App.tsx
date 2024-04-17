import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Screenings from "./components/Screenings/Screenings";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Screening from "./components/Screening/Screening";
import Checkout from "./components/Checkout/Checkout";
import Booking from "./components/Booking/Booking";
import Staff from "./components/Staff/Staff";
import { useState } from "react";
import NewScreening from "./components/NewScreening/NewScreening";

function App() {
  const [jwt, setJwt] = useState("");

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Navigate to="/screenings" replace />} />
        <Route path="/screenings" element={<Screenings />} />
        <Route path="/screenings/:screening_id" element={<Screening />} />
        <Route path="/screenings/:screening_id/book" element={<Checkout />} />
        <Route
          path="/screenings/:screening_id/book/:booking_id"
          element={<Booking />}
        />
        <Route path="/staff" element={<Staff jwt={jwt} setJwt={setJwt} />} />
        <Route
          path="/staff/screenings/new"
          element={<NewScreening jwt={jwt} />}
        />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
