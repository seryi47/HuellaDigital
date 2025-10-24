
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import HomePage from '@/pages/HomePage';
import SearchPage from '@/pages/SearchPage';
import DogProfilePage from '@/pages/DogProfilePage';
import EducationPage from '@/pages/EducationPage';
import ShelterDashboard from '@/pages/ShelterDashboard';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function App() {
  return (
    <>
      <Helmet>
        <title>HuellaComún - Adopción Responsable de Perros</title>
        <meta name="description" content="Plataforma de adopción responsable que conecta personas con refugios y protectoras. Encuentra tu compañero perfecto basándote en compatibilidad, no en apariencia." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/buscar" element={<SearchPage />} />
            <Route path="/perro/:id" element={<DogProfilePage />} />
            <Route path="/educacion" element={<EducationPage />} />
            <Route path="/panel-refugio" element={<ShelterDashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegisterPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
