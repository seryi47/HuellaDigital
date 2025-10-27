
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-orange-50 to-white opacity-60"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
              <Heart className="w-4 h-4 text-orange-600 fill-orange-600" />
              <span className="text-sm font-medium text-orange-800">Adopción Responsable</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Cada animal merece un hogar lleno de{' '}
              <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                amor
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Conectamos personas con refugios y protectoras para facilitar adopciones basadas en compatibilidad real. Porque cada historia merece un final feliz.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <Button
                size="lg"
                onClick={() => navigate('/buscar')}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
              >
                <Search className="w-5 h-5 mr-2" />
                Buscar mi compañero
              </Button>
              {!user || user.role !== 'shelter' && (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/registrarse', { state: { defaultTab: 'shelter' } })}
                  className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 text-lg px-8 py-6"
                >
                  Soy un refugio
                </Button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                className="w-full h-[500px] object-cover"
                alt="Animal feliz en un parque con su familia adoptiva"
               src="https://images.unsplash.com/photo-1636910826493-b7d89120e0ce" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Heart className="w-6 h-6 text-orange-600 fill-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">+2,500</p>
                  <p className="text-sm text-gray-600">Adopciones exitosas</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
