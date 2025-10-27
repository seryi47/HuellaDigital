
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, PawPrint, Heart, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

// Mock data, in a real app this would come from an API
const sheltersData = {
    1: { name: "Refugio Patitas Felices", location: "Madrid", description: "Dedicados a rescatar y rehabilitar animales abandonados desde 2010. Nuestra misión es encontrar un hogar responsable para cada uno de nuestros rescatados.", image: "A clean and friendly dog shelter entrance", phone: "+34 123 456 789", email: "contacto@patitasfelices.org", dogs_count: 32, adoptions_year: 150 },
    2: { name: "Amigos Peludos BCN", location: "Barcelona", description: "Especializados en casos urgentes y animales con necesidades especiales. Creemos en las segundas oportunidades.", image: "Volunteers playing with dogs in a sunny yard", phone: "+34 987 654 321", email: "info@apbcn.org", dogs_count: 55, adoptions_year: 210 },
    3: { name: "Corazón Canino Valencia", location: "Valencia", description: "Un pequeño refugio familiar con mucho amor para dar. Cada animal es parte de nuestra familia hasta que encuentra la suya.", image: "Several happy dogs of different breeds together", phone: "+34 555 123 456", email: "corazoncanino@email.com", dogs_count: 18, adoptions_year: 75 },
    4: { name: "Esperanza Animal Sevilla", location: "Sevilla", description: "Luchamos por una segunda oportunidad para todos los animales. Funcionamos gracias a voluntarios y donaciones.", image: "A person petting a grateful rescue dog", phone: "+34 444 987 654", email: "esperanza@animales.org", dogs_count: 40, adoptions_year: 120 },
};
const animals = [
  { id: 1, name: 'Luna', age: '3 años', image: 'Happy dog face' },
  { id: 2, name: 'Max', age: '5 años', image: 'Happy dog face' },
  { id: 3, name: 'Coco', age: '8 años', image: 'Happy dog face' },
];

const DonationDialog = ({ open, setOpen, shelter }) => {
    const { toast } = useToast();
    const [amount, setAmount] = useState(20);

    const handleDonate = () => {
        toast({
            title: "🚀 ¡Función casi lista!",
            description: `Gracias por querer donar ${amount}€ a ${shelter.name}. El siguiente paso es integrar Stripe para procesar el pago.`,
        });
        setOpen(false);
    }
    
    if (!shelter) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Donar a {shelter.name}</DialogTitle>
                    <DialogDescription>
                        Tu donación irá directamente a ayudar a los animales de este refugio. ¡Gracias por tu generosidad!
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <div className="flex justify-center items-center text-5xl font-bold text-orange-600 mb-6">
                        <span className="text-3xl mr-1">€</span>
                        {amount}
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {[10, 20, 50, 100].map(val => (
                            <Button key={val} variant={amount === val ? "default" : "outline"} onClick={() => setAmount(val)} className={amount === val ? 'bg-orange-500 hover:bg-orange-600' : ''}>
                                {val}€
                            </Button>
                        ))}
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleDonate} className="w-full bg-green-600 hover:bg-green-700">
                        <Heart className="w-4 h-4 mr-2" /> Donar {amount}€ ahora
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const ShelterProfilePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const shelter = sheltersData[id];
    const [dialogOpen, setDialogOpen] = useState(false);

    if (!shelter) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-orange-50/30">
                <Header/>
                <h1 className="text-2xl font-bold text-orange-600 mb-4">Refugio no encontrado</h1>
                <Button onClick={() => navigate('/donar')}>Volver a la lista</Button>
            </div>
        )
    }

    return (
        <>
            <Helmet>
                <title>{shelter.name} - Huella Digital</title>
                <meta name="description" content={shelter.description} />
            </Helmet>
            <div className="min-h-screen bg-orange-50/30">
                <Header />
                <main>
                    <div className="relative h-72">
                         <img class="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1548681528-6a5c45b66b42" alt={`Imagen de ${shelter.name}`} />
                         <div className="absolute inset-0 bg-black/50" />
                         <div className="container mx-auto px-4 relative h-full flex flex-col justify-center">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl font-bold text-white mb-2"
                            >
                                {shelter.name}
                            </motion.h1>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{delay: 0.1}}
                                className="flex items-center text-orange-200"
                            >
                                <MapPin className="w-5 h-5 mr-2" />
                                <span className="text-lg">{shelter.location}</span>
                            </motion.div>
                         </div>
                    </div>
                    
                    <div className="container mx-auto px-4 py-12">
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Sobre nosotros</h2>
                                <p className="text-gray-600 leading-relaxed">{shelter.description}</p>
                                
                                <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Nuestros peludos en adopción</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {animals.map(animal => (
                                    <div key={animal.id} className="text-center group cursor-pointer" onClick={() => navigate('/buscar')}>
                                        <div className="rounded-lg overflow-hidden mb-2 shadow-md">
                                            <img class="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300" src="https://images.unsplash.com/photo-1597092118522-7f441ec188f6" alt={animal.image} />
                                        </div>
                                        <p className="font-semibold text-gray-700">{animal.name}</p>
                                        <p className="text-sm text-gray-500">{animal.age}</p>
                                    </div>
                                ))}
                                </div>
                            </div>
                            <aside className="lg:col-span-1 h-fit relative">
                               <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200/80 sticky top-24">
                                <Button onClick={() => setDialogOpen(true)} size="lg" className="w-full bg-green-600 hover:bg-green-700 text-lg mb-6">
                                    <DollarSign className="w-5 h-5 mr-2"/> Donar
                                </Button>
                                <h3 className="text-xl font-bold mb-4">Información</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-3 text-gray-600"><Phone className="w-4 h-4 text-orange-500"/> {shelter.phone}</div>
                                    <div className="flex items-center gap-3 text-gray-600"><Mail className="w-4 h-4 text-orange-500"/> {shelter.email}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-6 text-center">
                                    <div>
                                        <PawPrint className="w-8 h-8 mx-auto text-orange-500 mb-1"/>
                                        <p className="text-2xl font-bold">{shelter.dogs_count}</p>
                                        <p className="text-xs text-gray-500">Animales alojados</p>
                                    </div>
                                    <div>
                                        <Heart className="w-8 h-8 mx-auto text-orange-500 mb-1"/>
                                        <p className="text-2xl font-bold">{shelter.adoptions_year}</p>
                                        <p className="text-xs text-gray-500">Adopciones / año</p>
                                    </div>
                                </div>
                               </div>
                            </aside>
                        </div>
                    </div>
                </main>
                <Footer />
                <DonationDialog open={dialogOpen} setOpen={setDialogOpen} shelter={shelter} />
            </div>
        </>
    );
};

export default ShelterProfilePage;
