
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, Home, Sparkles } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: 'Busca por compatibilidad',
      description: 'Usa nuestros filtros inteligentes basados en tu estilo de vida, espacio y experiencia.'
    },
    {
      icon: Heart,
      title: 'Conoce su historia',
      description: 'Lee sobre su personalidad, necesidades y lo que hace especial a cada perro.'
    },
    {
      icon: Sparkles,
      title: 'Conecta con el refugio',
      description: 'Envía tu solicitud y comienza el proceso de conocimiento mutuo.'
    },
    {
      icon: Home,
      title: 'Dale un hogar',
      description: 'Completa la adopción responsable y comienza una nueva vida juntos.'
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un proceso simple y transparente diseñado para garantizar adopciones responsables y felices.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Icon className="w-10 h-10 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
