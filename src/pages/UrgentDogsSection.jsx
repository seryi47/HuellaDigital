
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Heart, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import useAuthStore from '@/store/authStore';

const UrgentDogsSection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const urgentAnimals = [
    {
      id: 1,
      name: 'Luna',
      age: '3 años',
      size: 'Mediano',
      location: 'Madrid',
      description: 'Luna es una perrita cariñosa que busca un hogar tranquilo. Perfecta para familias con experiencia.',
      image: 'Sweet medium-sized dog with gentle eyes looking for home',
    },
    {
      id: 2,
      name: 'Max',
      age: '7 años',
      size: 'Grande',
      location: 'Barcelona',
      description: 'Max es un senior lleno de amor. Necesita un hogar donde pasar sus años dorados con tranquilidad.',
      image: 'Senior large dog with kind expression needing loving home',
    },
    {
      id: 3,
      name: 'Bella',
      age: '2 años',
      size: 'Pequeño',
      location: 'Valencia',
      description: 'Bella es energética y juguetona. Ideal para personas activas que disfruten del ejercicio.',
      image: 'Small energetic dog ready to play and bring joy',
    },
  ];

  const animalsToShow = user ? urgentAnimals : urgentAnimals.slice(0, 3);

  const handleAdoptClick = (animalId) => {
    navigate(`/animal/${animalId}`);
  };

  const handleSeeAllUrgent = () => {
    if (user) {
      navigate('/buscar'); // Eventually, this should navigate to a pre-filtered search page
      toast({
        title: "Mostrando todos los casos urgentes",
        description: "Filtro aplicado para ver solo los animales que necesitan ayuda inmediata.",
      });
    } else {
       navigate('/iniciar-sesion');
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-red-800">Casos Urgentes</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Necesitan un hogar ahora
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estos peludos necesitan encontrar una familia con urgencia. Tu ayuda puede cambiar sus vidas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {animalsToShow.map((animal, index) => (
            <motion.div
              key={animal.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  alt={`${animal.name} - ${animal.description}`}
                  src="https://images.unsplash.com/photo-1597092118522-7f441ec188f6" />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Urgente
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{animal.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{animal.age}</span>
                    <span>•</span>
                    <span>{animal.size}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{animal.location}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed">
                  {animal.description}
                </p>
                
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={() => handleAdoptClick(animal.id)}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Quiero adoptarlo
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleAdoptClick(animal.id)}
                    className="border-orange-500 text-orange-600 hover:bg-orange-50"
                  >
                    Ver más
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            onClick={handleSeeAllUrgent}
            className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
          >
            {user ? "Ver todos los casos urgentes" : "Ver más animales urgentes"}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default UrgentDogsSection;
