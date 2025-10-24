
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeaturedDogs = () => {
  const dogs = [
    {
      id: 1,
      name: 'Luna',
      age: '3 años',
      size: 'Mediano',
      energy: 'Media',
      shelter: 'Refugio Esperanza',
      location: 'Madrid',
      story: 'Luna es una perrita cariñosa que adora los paseos tranquilos y las siestas al sol.',
      image: 'Perro mestizo mediano color marrón con ojos dulces descansando en un refugio'
    },
    {
      id: 2,
      name: 'Max',
      age: '5 años',
      size: 'Grande',
      energy: 'Alta',
      shelter: 'Protectora Patitas',
      location: 'Barcelona',
      story: 'Max es un perro activo perfecto para familias deportistas. Le encanta correr y jugar.',
      image: 'Perro grande energético jugando con una pelota en un parque'
    },
    {
      id: 3,
      name: 'Coco',
      age: '8 años',
      size: 'Pequeño',
      energy: 'Baja',
      shelter: 'Refugio Amigos Peludos',
      location: 'Valencia',
      story: 'Coco es un senior tranquilo que busca un hogar donde pasar sus años dorados con amor.',
      image: 'Perro pequeño senior de color blanco descansando tranquilamente'
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Conoce a algunos de nuestros amigos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada uno con su propia historia, personalidad y necesidades. Encuentra tu match perfecto.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {dogs.map((dog, index) => (
            <motion.div
              key={dog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="relative overflow-hidden aspect-square">
                <img alt={`${dog.name} - ${dog.story}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://images.unsplash.com/photo-1597092118522-7f441ec188f6" />
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Heart className="w-5 h-5 text-primary" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{dog.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{dog.age}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{dog.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground">{dog.story}</p>

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    {dog.size}
                  </span>
                  <span className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full">
                    Energía {dog.energy}
                  </span>
                </div>

                <Link to={`/perro/${dog.id}`}>
                  <Button className="w-full">Conocer a {dog.name}</Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/buscar">
            <Button size="lg" variant="outline">
              Ver todos los perros disponibles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDogs;
