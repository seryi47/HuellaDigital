
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { DollarSign, Heart, MapPin, Search, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { supabase } from '@/lib/customSupabaseClient';

const DonationDialog = ({ open, setOpen, shelter }) => {
    const { toast } = useToast();
    const [amount, setAmount] = useState(20);

    const handleDonate = () => {
        toast({
            title: "🚀 ¡Función casi lista!",
            description: `Gracias por querer donar ${amount}€ a ${shelter.full_name}. El siguiente paso es integrar Stripe para procesar el pago.`,
        });
        setOpen(false);
    }
    
    if (!shelter) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Donar a {shelter.full_name}</DialogTitle>
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

const ShelterCard = ({ shelter, onDonateClick }) => {
    const navigate = useNavigate();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-lg transition-shadow duration-300 group flex flex-col"
        >
            <div className="relative h-48">
                 <img class="absolute inset-0 w-full h-full object-cover" alt={shelter.full_name} src="https://images.unsplash.com/photo-1578547166355-03f75fa3c5d8" />
            </div>
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-800">{shelter.full_name}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{shelter.location || 'Ubicación no especificada'}</span>
                </div>
                <p className="text-gray-600 text-sm flex-grow mb-4">{shelter.description || 'Este refugio aún no ha añadido una descripción.'}</p>
                <div className="flex gap-2">
                    <Button onClick={() => onDonateClick(shelter)} className="w-full bg-green-600 hover:bg-green-700">
                       <DollarSign className="w-4 h-4 mr-2" /> Donar
                    </Button>
                    <Button variant="outline" onClick={() => navigate(`/refugio/${shelter.id}`)} className="w-full">
                        Ver Perfil
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};


const DonationPage = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedShelter, setSelectedShelter] = useState(null);
    const [shelters, setShelters] = useState([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchShelters = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('role', 'shelter');
            
            if (error) {
                console.error("Error fetching shelters:", error);
                toast({ title: "Error", description: "No se pudieron cargar los refugios.", variant: "destructive" });
            } else {
                setShelters(data);
            }
            setLoading(false);
        };
        fetchShelters();
    }, [toast]);

    const handleDonateClick = (shelter) => {
        setSelectedShelter(shelter);
        setDialogOpen(true);
    }

    const handleAmazonClick = () => {
        toast({
          title: "Redirigiendo a Amazon...",
          description: "En una aplicación real, esto te llevaría a una lista de deseos de Amazon. 🚀",
        });
    };

    return (
        <>
            <Helmet>
                <title>Donar - Huella Digital</title>
                <meta name="description" content="Apoya a los refugios y protectoras. Tu donación salva vidas." />
            </Helmet>
            <div className="min-h-screen bg-orange-50/30">
                <Header />
                <main className="container mx-auto px-4 py-10">
                    <div className="text-center mb-10">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl font-bold text-gray-800"
                        >
                            Elige a quién ayudar
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto"
                        >
                            Tu donación va directamente al refugio que elijas. Gracias a ti, pueden seguir rescatando y cuidando a más animales.
                        </motion.p>
                    </div>

                    <div className="max-w-3xl mx-auto mb-10 grid md:grid-cols-2 gap-4 items-center">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input placeholder="Buscar un refugio por nombre o ciudad..." className="pl-10 h-12 text-base" />
                        </div>
                        <Button onClick={handleAmazonClick} size="lg" className="bg-sky-500 hover:bg-sky-600 h-12 text-base">
                            <Gift className="w-5 h-5 mr-2" />
                            Donar desde Lista de Deseos de Amazon
                        </Button>
                    </div>

                    {loading ? (
                        <p className="text-center">Cargando refugios...</p>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {shelters.map((shelter) => (
                                <ShelterCard key={shelter.id} shelter={shelter} onDonateClick={handleDonateClick} />
                            ))}
                        </div>
                    )}
                </main>
                <Footer />
                <DonationDialog open={dialogOpen} setOpen={setDialogOpen} shelter={selectedShelter} />
            </div>
        </>
    );
};

export default DonationPage;
