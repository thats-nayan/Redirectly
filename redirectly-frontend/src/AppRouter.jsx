import React from 'react'
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import DashBoardLayout from "./components/dashboard/DashBoardLayout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from 'react-hot-toast';
import ShortenUrlPage from './components/ShortenUrlPage';

const AppRouter = () => {
    return (
        <>
            <Navbar />
            <Toaster position='bottom-center' />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashBoardLayout />} />
            </Routes>
            <Footer />
        </>
    )
}

export default AppRouter;

export const SubDomainRouter = () => {
    return (
        <Routes>
            <Route path="/:url" element={<ShortenUrlPage />} />
        </Routes>
    )
}
