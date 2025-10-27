
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Heart, MapPin, PawPrint, Cake, Ruler, Zap, ShieldCheck, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import useAuthStore from '@/store/authStore';
import useDataStore from '@/store/dataStore';

const DogProfilePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { user } = useAuthStore();
    const { dogs, shelters } = useDataStore();

    const animal = dogs.find(d => d.id === parseInt(id));
    const shelter = animal ? shelters.find(s => s.id === animal.shelterId) : null;

    if (!animal || !shelter) {
        return (
            <div className="min-h-screen bg-orange-50/30">
                <Header />
                <main className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-4xl font-bold">Animal no encontrado</h1>
                    <p className="mt-4 text-lg">El perfil que buscas no existe o ha sido eliminado.</p>
                    <Button onClick={() => navigate('/buscar')} className="mt-8 bg-orange-500 hover:bg-orange-600">Volver a la búsqueda</Button>
                </main>
                <Footer />
            </div>
        );
    }
    
    const handleAdopt = () => {
        if (!user) {
            toast({ title: 'Inicia sesión para adoptar', description: 'Debes iniciar sesión para poder contactar con el refugio.', variant: 'destructive' });
            navigate('/iniciar-sesion');
            return;
        }
        toast({
            title: '¡Solicitud de adopción en camino!',
            description: 'Pronto podrás enviar formularios de adopción directamente desde aquí. ¡Gracias por tu interés!',
        });
    };

    const handleContact = () => {
        if (!user) {
            toast({ title: 'Inicia sesión para chatear', description: 'Debes iniciar sesión para poder contactar con el refugio.', variant: 'destructive' });
            navigate('/iniciar-sesion');
            return;
        }
        
        if (shelter.contactPreference === 'whatsapp' && shelter.whatsappNumber) {
            const message = `¡Hola! Estoy interesado/a en ${animal.name} que vi en Huella Digital.`;
            const whatsappUrl = `https://wa.me/${shelter.whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            toast({
                title: 'Abriendo WhatsApp...',
                description: `Estás siendo redirigido para chatear con ${shelter.name}.`,
            });
        } else {
             navigate(`/chat/${animal.id}`);
        }
    };
    
    const animalDetails = [
        { icon: Cake, label: 'Edad', value: animal.age },
        { icon: Ruler, label: 'Tamaño', value: animal.size },
        { icon: Zap, label: 'Energía', value: animal.energy },
        { icon: PawPrint, label: 'Raza', value: 'Mestizo' },
    ];

    return (
        <>
            <Helmet>
                <title>{`Conoce a ${animal.name} - Huella Digital`}</title>
                <meta name="description" content={`Descubre la historia de ${animal.name} y cómo puedes darle un hogar.`} />
            </Helmet>
            <div className="min-h-screen bg-white">
                <Header />
                <main className="container mx-auto px-4 py-10">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <div className="grid lg:grid-cols-5 gap-8">
                            {/* Gallery */}
                            <div className="lg:col-span-3">
                                <div className="relative h-[300px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-lg">
                                    <img className="w-full h-full object-cover" alt={animal.name} src="https://images.unsplash.com/photo-1597092118522-7f441ec188f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" />
                                </div>
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                     <img className="h-20 md:h-28 w-full object-cover rounded-lg" alt={animal.name} src="https://images.unsplash.com/photo-1597092118522-7f441ec188f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" />
                                     <img className="h-20 md:h-28 w-full object-cover rounded-lg" alt={animal.name} src="https://images.unsplash.com/photo-1650276061148-14fcf98747e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" />
                                     <div className="h-20 md:h-28 w-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 font-bold text-lg">+2</div>
                                </div>
                            </div>
                            
                            {/* Info */}
                            <div className="lg:col-span-2">
                                <div className="bg-orange-50/60 p-6 md:p-8 rounded-2xl h-full flex flex-col">
                                    <h1 className="text-4xl font-bold text-gray-900">{animal.name}</h1>
                                    <div className="flex items-center gap-2 mt-2 text-gray-600">
                                        <MapPin className="w-5 h-5" />
                                        <span>{shelter.location}</span>
                                    </div>

                                    <div className="my-6 grid grid-cols-2 gap-4">
                                        {animalDetails.map(detail => (
                                            <div key={detail.label} className="flex items-start gap-3">
                                                <detail.icon className="w-6 h-6 text-orange-500 mt-1" />
                                                <div>
                                                    <p className="font-semibold text-gray-800">{detail.label}</p>
                                                    <p className="text-gray-600">{detail.value}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">Su historia</h2>
                                    <p className="text-gray-600 leading-relaxed flex-grow">{animal.description}</p>
                                    
                                    <div className="mt-8 flex flex-col gap-3">
                                        <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-lg py-6" onClick={handleAdopt}>
                                            <Heart className="w-6 h-6 mr-3 fill-white"/>
                                            Solicitar adopción
                                        </Button>
                                        <Button size="lg" variant="outline" className="w-full text-lg py-6 border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700" onClick={handleContact}>
                                            <MessageCircle className="w-6 h-6 mr-3"/>
                                            Contactar con el refugio
                                        </Button>
                                    </div>
                                    
                                     <div className="mt-6 p-4 bg-green-100/70 border border-green-200 rounded-lg flex items-center gap-4">
                                        <ShieldCheck className="w-10 h-10 text-green-600 flex-shrink-0" />
                                        <div>
                                            <p className="font-bold text-green-800">Proceso de adopción seguro</p>
                                            <p className="text-sm text-green-700">Gestionado por <span className="font-semibold cursor-pointer hover:underline" onClick={() => navigate(`/refugio/${shelter.id}`)}>{shelter.name}</span>.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default DogProfilePage;
