
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Search, Shield, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SuccessStories from '@/components/SuccessStories';
import FeaturedDogs from '@/components/FeaturedDogs';
import HowItWorks from '@/components/HowItWorks';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>HuellaComún - Adopción Responsable de Perros</title>
        <meta name="description" content="Encuentra tu compañero perfecto. Plataforma de adopción responsable que conecta personas con refugios basándose en compatibilidad de vida, no en apariencia." />
      </Helmet>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                <Heart className="w-4 h-4 text-primary fill-current" />
                <span className="text-sm font-medium text-primary">Adopción Responsable</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Cada perro merece un hogar lleno de amor
              </h1>
              
              <p className="text-lg text-muted-foreground">
                Conectamos personas con refugios y protectoras para facilitar adopciones basadas en compatibilidad real, no en apariencia. Porque cada historia importa.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/buscar">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Buscar mi compañero
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/registro">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Soy un refugio
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img alt="Perro feliz adoptado jugando en el parque con su nueva familia" src="https://images.unsplash.com/photo-1636910826493-b7d89120e0ce" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary fill-current" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl text-foreground">+2,500</p>
                    <p className="text-sm text-muted-foreground">Adopciones felices</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Búsqueda Inteligente</h3>
              <p className="text-muted-foreground">
                Filtra por compatibilidad de estilo de vida, no por raza o apariencia
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Adopción Segura</h3>
              <p className="text-muted-foreground">
                Proceso verificado con refugios certificados y seguimiento post-adopción
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Comunidad Activa</h3>
              <p className="text-muted-foreground">
                Conecta con otros adoptantes y comparte experiencias
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <FeaturedDogs />
      <HowItWorks />
      <SuccessStories />

      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-bold">
              ¿Listo para cambiar una vida?
            </h2>
            <p className="text-lg text-muted-foreground">
              Miles de perros esperan encontrar un hogar. Tu compañero perfecto te está esperando.
            </p>
            <Link to="/buscar">
              <Button size="lg" className="group">
                Comenzar búsqueda
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
