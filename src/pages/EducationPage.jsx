
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Shield, Home, Stethoscope, Scissors } from 'lucide-react';

const EducationPage = () => {
  const articles = [
    {
      icon: Heart,
      title: 'Guía completa de adopción responsable',
      description: 'Todo lo que necesitas saber antes de adoptar: preparación del hogar, costos, tiempo y compromiso.',
      color: 'primary'
    },
    {
      icon: Home,
      title: 'Preparando tu hogar para un nuevo perro',
      description: 'Consejos prácticos para hacer tu casa segura y acogedora para tu nuevo compañero.',
      color: 'secondary'
    },
    {
      icon: Stethoscope,
      title: 'Cuidados veterinarios esenciales',
      description: 'Vacunas, desparasitación, revisiones y cómo mantener la salud de tu perro.',
      color: 'primary'
    },
    {
      icon: Scissors,
      title: 'Importancia de la esterilización',
      description: 'Beneficios para la salud y cómo contribuye a reducir el abandono animal.',
      color: 'secondary'
    },
    {
      icon: Shield,
      title: 'Primeros días en casa',
      description: 'Cómo ayudar a tu perro a adaptarse a su nuevo hogar y crear rutinas saludables.',
      color: 'primary'
    },
    {
      icon: BookOpen,
      title: 'Educación y adiestramiento positivo',
      description: 'Técnicas de refuerzo positivo para educar a tu perro con amor y respeto.',
      color: 'secondary'
    }
  ];

  const successStories = [
    {
      title: 'De la calle al sofá: La historia de Bruno',
      excerpt: 'Bruno pasó 3 años viviendo en las calles antes de ser rescatado. Hoy es el perro más feliz del mundo.',
      image: 'Perro rescatado feliz en su nuevo hogar con su familia'
    },
    {
      title: 'Adoptar un senior: La mejor decisión de mi vida',
      excerpt: 'María nos cuenta por qué adoptar a Rex, un perro de 10 años, cambió su vida para siempre.',
      image: 'Perro senior descansando feliz con su dueña'
    },
    {
      title: 'Superando el miedo: La transformación de Lola',
      excerpt: 'Lola llegó al refugio asustada y desconfiada. Con paciencia y amor, hoy es una perra segura y cariñosa.',
      image: 'Perro tímido transformado en perro confiado y feliz'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Educación y Recursos - HuellaComún</title>
        <meta name="description" content="Aprende todo sobre adopción responsable, cuidados, esterilización y bienestar animal. Recursos educativos para futuros adoptantes." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center space-y-4"
            >
              <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Centro de Recursos</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                Educación para una adopción responsable
              </h1>
              <p className="text-lg text-muted-foreground">
                Conocimiento y recursos para garantizar el bienestar de tu futuro compañero
              </p>
            </motion.div>
          </div>
        </div>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Guías y recursos esenciales
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Todo lo que necesitas saber para ser un adoptante responsable
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => {
                const Icon = article.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
                  >
                    <div className={`w-14 h-14 bg-${article.color}/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-7 h-7 text-${article.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {article.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Historias que inspiran
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experiencias reales de adopción que demuestran el poder del amor y la segunda oportunidad
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://images.unsplash.com/photo-1626447857058-2ba6a8868cb5" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {story.excerpt}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto space-y-6"
              >
                <h2 className="text-3xl md:text-4xl font-bold">
                  ¿Tienes dudas sobre la adopción?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Nuestro equipo está aquí para ayudarte en cada paso del proceso. No dudes en contactarnos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    Contactar
                  </button>
                  <button className="px-6 py-3 bg-card text-foreground rounded-lg font-medium hover:bg-accent transition-colors">
                    Ver FAQ
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EducationPage;
