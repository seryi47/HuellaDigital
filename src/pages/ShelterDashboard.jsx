
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, BarChart3, Users, Heart, Dog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ShelterDashboard = () => {
  const { toast } = useToast();
  const [dogs] = useState([
    { id: 1, name: 'Luna', status: 'Disponible', views: 245, favorites: 32 },
    { id: 2, name: 'Max', status: 'En proceso', views: 189, favorites: 28 },
    { id: 3, name: 'Coco', status: 'Disponible', views: 156, favorites: 19 }
  ]);

  const handleAction = (action) => {
    toast({
      title: '🚧 Funcionalidad en desarrollo',
      description: '¡Esta característica estará disponible pronto! Mientras tanto, puedes explorar el resto de la plataforma.',
      duration: 5000
    });
  };

  return (
    <>
      <Helmet>
        <title>Panel de Refugio - HuellaComún</title>
        <meta name="description" content="Gestiona tus perros en adopción, visualiza estadísticas y administra solicitudes desde tu panel de refugio." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div>
                <h1 className="text-4xl font-bold mb-2">Panel de Refugio</h1>
                <p className="text-muted-foreground">Gestiona tus perros y solicitudes de adopción</p>
              </div>
              <Button onClick={() => handleAction('add')} size="lg">
                <Plus className="w-4 h-4 mr-2" />
                Añadir perro
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Dog className="w-6 h-6 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">12</p>
              <p className="text-sm text-muted-foreground">Perros activos</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">1,847</p>
              <p className="text-sm text-muted-foreground">Visitas totales</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">234</p>
              <p className="text-sm text-muted-foreground">Favoritos</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">8</p>
              <p className="text-sm text-muted-foreground">Solicitudes pendientes</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-border">
              <h2 className="text-2xl font-semibold">Mis perros</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="text-left p-4 font-semibold">Nombre</th>
                    <th className="text-left p-4 font-semibold">Estado</th>
                    <th className="text-left p-4 font-semibold">Visitas</th>
                    <th className="text-left p-4 font-semibold">Favoritos</th>
                    <th className="text-right p-4 font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {dogs.map((dog, index) => (
                    <motion.tr
                      key={dog.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="border-b border-border hover:bg-muted/20 transition-colors"
                    >
                      <td className="p-4 font-medium">{dog.name}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          dog.status === 'Disponible' 
                            ? 'bg-secondary/10 text-secondary' 
                            : 'bg-primary/10 text-primary'
                        }`}>
                          {dog.status}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">{dog.views}</td>
                      <td className="p-4 text-muted-foreground">{dog.favorites}</td>
                      <td className="p-4">
                        <div className="flex justify-end space-x-2">
                          <Button onClick={() => handleAction('view')} variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button onClick={() => handleAction('edit')} variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button onClick={() => handleAction('delete')} variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ShelterDashboard;
