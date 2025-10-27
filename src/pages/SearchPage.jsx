
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import useAuthStore from '@/store/authStore';

const allAnimals = [
  { id: 1, name: 'Luna', age: '3 años', location: 'Madrid', size: 'Mediano', energy: 'Media', image: 'Close up of a happy dog face' },
  { id: 2, name: 'Max', age: '5 años', location: 'Barcelona', size: 'Grande', energy: 'Alta', image: 'Close up of a happy dog face' },
  { id: 3, name: 'Coco', age: '8 años', location: 'Valencia', size: 'Pequeño', energy: 'Baja', image: 'Close up of a happy dog face' },
  { id: 4, name: 'Rocky', age: '2 años', location: 'Sevilla', size: 'Grande', energy: 'Alta', image: 'Close up of a happy dog face' },
  { id: 5, name: 'Bella', age: '6 años', location: 'Zaragoza', size: 'Mediano', energy: 'Media', image: 'Close up of a happy dog face' },
  { id: 6, name: 'Toby', age: '4 años', location: 'Málaga', size: 'Pequeño', energy: 'Alta', image: 'Close up of a happy dog face' },
  { id: 7, name: 'Simba', age: '1 año', location: 'Bilbao', size: 'Mediano', energy: 'Alta', image: 'Close up of a happy dog face' },
  { id: 8, name: 'Nala', age: '7 años', location: 'Alicante', size: 'Pequeño', energy: 'Baja', image: 'Close up of a happy dog face' },
];

const AnimalCard = ({ animal, index }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/animal/${animal.id}`);
  };

  const handleFavorite = () => {
    toast({
      title: "❤️ ¡Añadido a favoritos!",
      description: "Pronto podrás ver todos tus animales favoritos en tu perfil.",
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="bg-white rounded-lg overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-lg transition-shadow duration-300 group"
    >
      <div className="relative">
        <img class="w-full h-56 object-cover" alt={animal.image} src="https://images.unsplash.com/photo-1597092118522-7f441ec188f6" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full h-9 w-9"
          onClick={handleFavorite}
        >
          <Heart className="w-5 h-5 text-gray-600 group-hover:text-orange-500 group-hover:fill-orange-500 transition-colors" />
        </Button>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{animal.name}</h3>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <span>{animal.age}</span>
          <span className="mx-2">•</span>
          <MapPin className="w-4 h-4 mr-1" />
          <span>{animal.location}</span>
        </div>
        <div className="flex gap-2 mt-3">
          <span className="text-xs font-semibold bg-orange-100 text-orange-800 px-2 py-1 rounded-full">{animal.size}</span>
          <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Energía {animal.energy}</span>
        </div>
        <Button onClick={handleViewProfile} className="w-full mt-4 bg-orange-500 hover:bg-orange-600">
          Ver perfil
        </Button>
      </div>
    </motion.div>
  );
};

const SearchPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  const animalsToShow = user ? allAnimals : allAnimals.slice(0, 6);

  const handleApplyFilters = () => {
    toast({
      title: "🚧 ¡Los filtros están en camino!",
      description: "Esta función aún no está implementada, pero pronto podrás usarla. 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Encuentra tu compañero - Huella Digital</title>
        <meta name="description" content="Usa nuestros filtros inteligentes para encontrar el animal que mejor se adapte a tu estilo de vida." />
      </Helmet>
      <div className="min-h-screen bg-orange-50/30">
        <Header />
        <main className="container mx-auto px-4 py-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800">Encuentra tu compañero perfecto</h1>
            <p className="text-lg text-gray-600 mt-2">Usa nuestros filtros inteligentes para encontrar el animal que mejor se adapte a tu estilo de vida</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200/80 h-fit sticky top-24">
              <h2 className="text-xl font-bold mb-6">Filtros</h2>
              <div className="space-y-6">
                <div>
                  <Label className="font-semibold">Ubicación</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Todas las ubicaciones" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="madrid">Madrid</SelectItem>
                      <SelectItem value="barcelona">Barcelona</SelectItem>
                      <SelectItem value="valencia">Valencia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="font-semibold">Tamaño</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Pequeño', 'Mediano', 'Grande'].map(size => (
                      <Button key={size} variant="outline" className="flex-grow">{size}</Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="font-semibold">Convivencia</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2"><Checkbox id="with-kids" /><Label htmlFor="with-kids" className="font-normal">Bueno con niños</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="with-cats" /><Label htmlFor="with-cats" className="font-normal">Bueno con gatos</Label></div>
                    <div className="flex items-center space-x-2"><Checkbox id="with-dogs" /><Label htmlFor="with-dogs" className="font-normal">Bueno con otros animales</Label></div>
                  </div>
                </div>
                <Button onClick={handleApplyFilters} className="w-full bg-orange-500 hover:bg-orange-600">Aplicar filtros</Button>
              </div>
            </aside>

            <div className="lg:col-span-3">
              <p className="text-gray-600 mb-4">Mostrando {animalsToShow.length} de {allAnimals.length} animales disponibles</p>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {animalsToShow.map((animal, index) => (
                  <AnimalCard key={animal.id} animal={animal} index={index} />
                ))}
              </div>
              {!user && (
                <div className="mt-10 text-center">
                    <Button 
                        size="lg"
                        onClick={() => navigate('/iniciar-sesion')} 
                        className="bg-orange-500 hover:bg-orange-600"
                    >
                        Ver más animales disponibles
                    </Button>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default SearchPage;
