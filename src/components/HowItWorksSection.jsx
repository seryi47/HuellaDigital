
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, Home, CheckCircle } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Search,
      title: 'Busca tu compañero',
      description: 'Filtra por compatibilidad con tu estilo de vida, no solo por apariencia. Encuentra el perro perfecto para ti.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Heart,
      title: 'Solicita la adopción',
      description: 'Completa un formulario sencillo y conecta directamente con la protectora. Comunicación segura y transparente.',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: CheckCircle,
      title: 'Proceso de verificación',
      description: 'La protectora revisará tu solicitud y te contactará para conocerte mejor. Queremos asegurar el mejor match.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Home,
      title: '¡Bienvenido a casa!',
      description: 'Recibe a tu nuevo compañero y comienza una historia de amor. Te acompañamos en todo el proceso.',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Adoptar es fácil y responsable. Te guiamos en cada paso del camino.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all h-full border border-gray-100">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${step.color} mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {index + 1}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-orange-300 to-orange-200"></div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
