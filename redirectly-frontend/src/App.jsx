import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import './App.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
