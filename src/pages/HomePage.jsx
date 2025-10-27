
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import UrgentDogsSection from '@/components/UrgentDogsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import SuccessStoriesSection from '@/components/SuccessStoriesSection';
import DonationSection from '@/components/DonationSection';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Huella Digital - Adopta, Dona y Salva una Vida</title>
        <meta name="description" content="Conectamos personas con protectoras y refugios para adopciones responsables. Cada animal merece un hogar lleno de amor." />
      </Helmet>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <HeroSection />
          <UrgentDogsSection />
          <HowItWorksSection />
          <SuccessStoriesSection />
          <DonationSection />
          <CallToAction />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
