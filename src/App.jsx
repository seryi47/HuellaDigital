
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import HomePage from '@/pages/HomePage';
import SearchPage from '@/pages/SearchPage';
import EducationPage from '@/pages/EducationPage';
import ShelterPanelPage from '@/pages/ShelterPanelPage';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage';
import DonationPage from '@/pages/DonationPage';
import ShelterProfilePage from '@/pages/ShelterProfilePage';
import DogProfilePage from '@/pages/DogProfilePage';
import AdminPanelPage from '@/pages/AdminPanelPage';
import StoryProfilePage from '@/pages/StoryProfilePage';
import ChatPage from '@/pages/ChatPage';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';

function App() {
  return (
    <AuthProvider>
      <Helmet>
        <title>Huella Digital - Adopta, Dona y Salva una Vida</title>
        <meta name="description" content="Huella Digital es la plataforma líder en adopción de animales. Conecta con refugios, encuentra a tu compañero ideal y apoya a los animales necesitados. Adopta, dona, salva una vida." />
        <meta name="keywords" content="adopción de animales, adoptar perro, adoptar gato, refugio de animales, donar a protectoras, salvar animales, Huella Digital" />
      </Helmet>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/buscar" element={<SearchPage />} />
        <Route path="/educacion" element={<EducationPage />} />
        <Route path="/donar" element={<DonationPage />} />
        <Route path="/refugio/:id" element={<ShelterProfilePage />} />
        <Route path="/animal/:id" element={<DogProfilePage />} />
        <Route path="/historia/:id" element={<StoryProfilePage />} />
        <Route path="/panel-refugio" element={<ShelterPanelPage />} />
        <Route path="/panel-admin" element={<AdminPanelPage />} />
        <Route path="/chat/:animalId" element={<ChatPage />} />
        <Route path="/registrarse" element={<RegisterPage />} />
        <Route path="/iniciar-sesion" element={<LoginPage />} />
      </Routes>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
