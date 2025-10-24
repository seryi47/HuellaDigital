
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MapPin, Calendar, Activity, Home, Users, ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const DogProfilePage = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const dog = {
    id: 1,
    name: 'Luna',
    age: '3 años',
    size: 'Mediano',
    weight: '15 kg',
    energy: 'Media',
    shelter: 'Refugio Esperanza',
    location: 'Madrid',
    gender: 'Hembra',
    vaccinated: true,
    sterilized: true,
    story: 'Luna llegó al refugio hace 6 meses después de ser encontrada abandonada. A pesar de su difícil pasado, es una perrita increíblemente cariñosa y resiliente. Le encantan los paseos tranquilos por el parque y las siestas al sol. Es perfecta para una familia que busque un compañero leal y tranquilo.',
    personality: ['Cariñosa', 'Tranquila', 'Leal', 'Sociable'],
    goodWith: {
      kids: true,
      cats: true,
      dogs: true
    },
    needs: 'Luna necesita un hogar con espacio para moverse y una familia que le dedique tiempo para paseos diarios. Se adapta bien a la vida en apartamento siempre que tenga su dosis de ejercicio.',
    images: [
      'Perro mestizo mediano color marrón con ojos dulces descansando',
      'Perro mestizo jugando feliz en el parque',
      'Perro mestizo recibiendo caricias de voluntario'
    ]
  };

  const handleAdoptionRequest = () => {
    toast({
      title: '🚧 Funcionalidad en desarrollo',
      description: '¡Pronto podrás enviar solicitudes de adopción! Mientras tanto, puedes contactar directamente con el refugio.',
      duration: 5000
    });
  };

  const handleFavorite = () => {
    toast({
      title: '❤️ Añadido a favoritos',
      description: `${dog.name} ha sido añadida a tu lista de favoritos.`,
      duration: 3000
    });
  };

  return (
    <>
      <Helmet>
        <title>{dog.name} - Adopción Responsable | HuellaComún</title>
        <meta name="description" content={`Conoce a ${dog.name}, ${dog.age}, ${dog.size}. ${dog.story.substring(0, 150)}...`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Link to="/buscar">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a búsqueda
            </Button>
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="relative aspect-video">
                  <img alt={`${dog.name} - ${dog.images[0]}`} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1597092118522-7f441ec188f6" />
                  <button
                    onClick={handleFavorite}
                    className="absolute top-4 right-4 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Heart className="w-6 h-6 text-primary" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 p-2">
                  {dog.images.slice(1).map((image, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                      <img alt={`${dog.name} - foto ${index + 2}`} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-lg space-y-6"
              >
                <div>
                  <h1 className="text-4xl font-bold mb-2">{dog.name}</h1>
                  <div className="flex flex-wrap gap-4 text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{dog.age}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{dog.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4" />
                      <span>Energía {dog.energy}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {dog.personality.map((trait, index) => (
                    <span key={index} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {trait}
                    </span>
                  ))}
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Su historia</h2>
                  <p className="text-muted-foreground leading-relaxed">{dog.story}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Convivencia</h2>
                  <div className="grid grid-cols-3 gap-4">
                    <div className={`p-4 rounded-xl text-center ${dog.goodWith.kids ? 'bg-secondary/10' : 'bg-muted'}`}>
                      <Users className={`w-6 h-6 mx-auto mb-2 ${dog.goodWith.kids ? 'text-secondary' : 'text-muted-foreground'}`} />
                      <p className="text-sm font-medium">Con niños</p>
                      <p className="text-xs text-muted-foreground">{dog.goodWith.kids ? 'Sí' : 'No'}</p>
                    </div>
                    <div className={`p-4 rounded-xl text-center ${dog.goodWith.cats ? 'bg-secondary/10' : 'bg-muted'}`}>
                      <Home className={`w-6 h-6 mx-auto mb-2 ${dog.goodWith.cats ? 'text-secondary' : 'text-muted-foreground'}`} />
                      <p className="text-sm font-medium">Con gatos</p>
                      <p className="text-xs text-muted-foreground">{dog.goodWith.cats ? 'Sí' : 'No'}</p>
                    </div>
                    <div className={`p-4 rounded-xl text-center ${dog.goodWith.dogs ? 'bg-secondary/10' : 'bg-muted'}`}>
                      <Heart className={`w-6 h-6 mx-auto mb-2 ${dog.goodWith.dogs ? 'text-secondary' : 'text-muted-foreground'}`} />
                      <p className="text-sm font-medium">Con perros</p>
                      <p className="text-xs text-muted-foreground">{dog.goodWith.dogs ? 'Sí' : 'No'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Necesidades especiales</h2>
                  <p className="text-muted-foreground leading-relaxed">{dog.needs}</p>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl p-6 shadow-lg sticky top-20 space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-4">Información básica</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tamaño</span>
                      <span className="font-medium">{dog.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Peso</span>
                      <span className="font-medium">{dog.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Género</span>
                      <span className="font-medium">{dog.gender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vacunado</span>
                      <span className="font-medium">{dog.vaccinated ? '✓ Sí' : '✗ No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Esterilizado</span>
                      <span className="font-medium">{dog.sterilized ? '✓ Sí' : '✗ No'}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-xl font-semibold mb-2">{dog.shelter}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Refugio verificado en {dog.location}
                  </p>
                  <Button onClick={handleAdoptionRequest} className="w-full mb-3" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    Solicitar adopción
                  </Button>
                  <Button variant="outline" className="w-full">
                    Contactar refugio
                  </Button>
                </div>

                <div className="bg-primary/5 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground">
                    💡 <span className="font-medium">Consejo:</span> Antes de adoptar, asegúrate de que tu estilo de vida es compatible con las necesidades de {dog.name}.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DogProfilePage;
