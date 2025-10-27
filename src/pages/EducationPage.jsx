
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import useDataStore from '@/store/dataStore';
import { useNavigate } from 'react-router-dom';

const ResourceCard = ({ icon: Icon, title, description, index }) => {
  const { toast } = useToast();
  const handleClick = () => {
    toast({
      title: "🚧 ¡Contenido en preparación!",
      description: "Este artículo aún no está disponible, pero estamos trabajando en ello. 🚀",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={handleClick}
      className="bg-white p-6 rounded-lg border border-gray-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-orange-100 mb-4 group-hover:bg-orange-200 transition-colors">
        <Icon className="w-6 h-6 text-orange-600" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
};

const StoryCard = ({ id, title, description, image, index }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/historia/${id}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={handleClick}
            className="bg-white rounded-lg border border-gray-200/80 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer group overflow-hidden flex flex-col"
        >
            <div className="relative h-40">
                <img className="absolute inset-0 w-full h-full object-cover" alt={title} src="https://images.unsplash.com/photo-1595872018818-97555653a011?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-orange-600 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm flex-grow">{description.substring(0,100)}...</p>
            </div>
        </motion.div>
    );
};


const FaqCallToAction = () => {
    const { toast } = useToast();
    const handleClick = () => {
        toast({
            title: "🚧 ¡Función en camino!",
            description: "Pronto podrás contactarnos o ver las preguntas frecuentes. 🚀",
        });
    };
    return (
        <section className="bg-orange-100/70">
            <div className="container mx-auto px-4 py-16 text-center">
                 <h2 className="text-3xl font-bold text-gray-800 mb-2">¿Tienes dudas sobre la adopción?</h2>
                 <p className="text-gray-600 mb-6">Nuestro equipo está aquí para ayudarte en cada paso del proceso. No dudes en contactarnos.</p>
                 <div className="flex justify-center gap-4">
                     <Button onClick={handleClick} className="bg-orange-500 hover:bg-orange-600">Contactar</Button>
                     <Button onClick={handleClick} variant="outline" className="bg-white">Ver FAQ</Button>
                 </div>
            </div>
        </section>
    );
};

const EducationPage = () => {
  const { resources, stories } = useDataStore();

  return (
    <>
      <Helmet>
        <title>Guías y Recursos - Huella Digital</title>
        <meta name="description" content="Todo lo que necesitas saber para ser un adoptante responsable y darle la mejor vida a tu nuevo compañero." />
      </Helmet>
      <div className="min-h-screen bg-orange-50/30">
        <Header />
        <main>
          <div className="container mx-auto px-4 py-10">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-gray-800">Guías y recursos esenciales</h1>
              <p className="text-lg text-gray-600 mt-2">Todo lo que necesitas saber para ser un adoptante responsable</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource, index) => (
                <ResourceCard key={resource.id} icon={BookOpen} {...resource} index={index} />
              ))}
            </div>
          </div>

          <div className="py-20">
              <div className="container mx-auto px-4">
                  <div className="text-center mb-12">
                      <h2 className="text-3xl font-bold text-gray-800">Historias reales que cambian el mundo</h2>
                      <p className="text-lg text-gray-600 mt-2">Experiencias reales de adopción que demuestran el poder del amor y la segunda oportunidad</p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {stories.map((story, index) => (
                          <StoryCard key={story.id} {...story} index={index} />
                      ))}
                  </div>
              </div>
          </div>
          <FaqCallToAction />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default EducationPage;
