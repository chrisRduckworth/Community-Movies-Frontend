import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import Screenings from './components/Screenings/Screenings'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Navigate to="/screenings" replace />} />
        <Route path="/screenings" element={<Screenings />} />
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App
