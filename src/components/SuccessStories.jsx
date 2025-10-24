
import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const SuccessStories = () => {
  const stories = [
    {
      name: 'Rocky',
      adopter: 'María González',
      before: 'Perro triste en refugio esperando adopción',
      after: 'Perro feliz corriendo en el campo con su familia',
      story: 'Rocky pasó 2 años en el refugio. Hoy es el compañero perfecto para nuestras aventuras de senderismo. No puedo imaginar la vida sin él.',
      location: 'Madrid'
    },
    {
      name: 'Bella',
      adopter: 'Carlos Ruiz',
      before: 'Perro senior descansando en refugio',
      after: 'Perro senior feliz en sofá cómodo con su dueño',
      story: 'Adoptar a Bella siendo senior fue la mejor decisión. Su tranquilidad y cariño han llenado mi hogar de paz y amor.',
      location: 'Barcelona'
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Historias que inspiran
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Antes y después de encontrar un hogar. Cada adopción cambia dos vidas para siempre.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="grid grid-cols-2 gap-2 p-2">
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                    Antes
                  </div>
                  <img alt={`${story.name} antes de la adopción`} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1544366981-930f92d6812a" />
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    Después
                  </div>
                  <img alt={`${story.name} después de la adopción`} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1626447857058-2ba6a8868cb5" />
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <Quote className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-muted-foreground italic mb-4">
                      "{story.story}"
                    </p>
                    <div>
                      <p className="font-semibold">{story.adopter}</p>
                      <p className="text-sm text-muted-foreground">
                        Adoptó a {story.name} en {story.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
