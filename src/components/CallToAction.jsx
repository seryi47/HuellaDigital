
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-orange-50/50">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            ¿Listo para cambiar una vida?
          </h2>
          <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
            Miles de perros esperan encontrar un hogar. Tu compañero perfecto te está esperando.
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/buscar')}
            className="mt-8 bg-orange-500 hover:bg-orange-600 px-8 py-3 text-base"
          >
            Comenzar búsqueda →
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
