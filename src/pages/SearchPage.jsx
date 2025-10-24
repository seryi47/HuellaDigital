
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Heart, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [showFilters, setShowFilters] = useState(true);

  const mockDogs = [
    { id: 1, name: 'Luna', age: '3 años', size: 'Mediano', energy: 'Media', location: 'Madrid', image: 'Perro mestizo mediano color marrón con ojos dulces' },
    { id: 2, name: 'Max', age: '5 años', size: 'Grande', energy: 'Alta', location: 'Barcelona', image: 'Perro grande energético color negro' },
    { id: 3, name: 'Coco', age: '8 años', size: 'Pequeño', energy: 'Baja', location: 'Valencia', image: 'Perro pequeño senior de color blanco' },
    { id: 4, name: 'Toby', age: '2 años', size: 'Mediano', energy: 'Alta', location: 'Sevilla', image: 'Perro joven juguetón color marrón claro' },
    { id: 5, name: 'Nala', age: '4 años', size: 'Grande', energy: 'Media', location: 'Bilbao', image: 'Perra grande tranquila color dorado' },
    { id: 6, name: 'Simba', age: '1 año', size: 'Pequeño', energy: 'Alta', location: 'Málaga', image: 'Cachorro pequeño energético color beige' }
  ];

  return (
    <>
      <Helmet>
        <title>Buscar Perros - HuellaComún</title>
        <meta name="description" content="Encuentra tu compañero perfecto usando filtros de compatibilidad. Busca por estilo de vida, no por apariencia." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center space-y-4"
            >
              <h1 className="text-4xl md:text-5xl font-bold">
                Encuentra tu compañero perfecto
              </h1>
              <p className="text-lg text-muted-foreground">
                Usa nuestros filtros inteligentes para encontrar el perro que mejor se adapte a tu estilo de vida
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}
            >
              <div className="bg-card rounded-2xl p-6 shadow-lg sticky top-20 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold flex items-center space-x-2">
                    <SlidersHorizontal className="w-5 h-5" />
                    <span>Filtros</span>
                  </h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                    Cerrar
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Ubicación</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Todas las ubicaciones" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="madrid">Madrid</SelectItem>
                        <SelectItem value="barcelona">Barcelona</SelectItem>
                        <SelectItem value="valencia">Valencia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Tamaño</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="small" />
                        <label htmlFor="small" className="text-sm cursor-pointer">Pequeño</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="medium" />
                        <label htmlFor="medium" className="text-sm cursor-pointer">Mediano</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="large" />
                        <label htmlFor="large" className="text-sm cursor-pointer">Grande</label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Nivel de energía</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Cualquiera" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Cualquiera</SelectItem>
                        <SelectItem value="low">Baja</SelectItem>
                        <SelectItem value="medium">Media</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Edad</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Cualquier edad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Cualquier edad</SelectItem>
                        <SelectItem value="puppy">Cachorro (0-1 año)</SelectItem>
                        <SelectItem value="young">Joven (1-3 años)</SelectItem>
                        <SelectItem value="adult">Adulto (3-7 años)</SelectItem>
                        <SelectItem value="senior">Senior (7+ años)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-2 block">Convivencia</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="kids" />
                        <label htmlFor="kids" className="text-sm cursor-pointer">Bueno con niños</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="cats" />
                        <label htmlFor="cats" className="text-sm cursor-pointer">Bueno con gatos</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="dogs" />
                        <label htmlFor="dogs" className="text-sm cursor-pointer">Bueno con otros perros</label>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">Aplicar filtros</Button>
                </div>
              </div>
            </motion.aside>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Mostrando <span className="font-semibold text-foreground">{mockDogs.length}</span> perros disponibles
                </p>
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockDogs.map((dog, index) => (
                  <motion.div
                    key={dog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                  >
                    <div className="relative overflow-hidden aspect-square">
                      <img alt={`${dog.name} - ${dog.image}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://images.unsplash.com/photo-1597092118522-7f441ec188f6" />
                      <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                        <Heart className="w-5 h-5 text-primary" />
                      </button>
                    </div>

                    <div className="p-5 space-y-3">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{dog.name}</h3>
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{dog.age}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{dog.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {dog.size}
                        </span>
                        <span className="px-2.5 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
                          Energía {dog.energy}
                        </span>
                      </div>

                      <Link to={`/perro/${dog.id}`}>
                        <Button className="w-full" size="sm">Ver perfil</Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
