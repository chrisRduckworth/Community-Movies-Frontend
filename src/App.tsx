import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Screenings from "./components/Screenings/Screenings";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Screening from "./components/Screening/Screening";
import Checkout from "./components/Checkout/Checkout";

function App() {

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Navigate to="/screenings" replace />} />
        <Route path="/screenings" element={<Screenings/>} />
        <Route
          path="/screenings/:screening_id"
          element={<Screening/>}
        />
        <Route
          path="/screenings/:screening_id/book"
          element={<Checkout/>}
        />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
