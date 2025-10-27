
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import useDataStore from '@/store/dataStore';

const StoryProfilePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { stories } = useDataStore();
    const story = stories.find(s => s.id === parseInt(id));

    if (!story) {
        return (
            <div className="min-h-screen bg-orange-50/30">
                <Header />
                <main className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-4xl font-bold">Historia no encontrada</h1>
                    <p className="mt-4 text-lg">La historia que buscas no existe o ha sido eliminada.</p>
                    <Button onClick={() => navigate('/educacion')} className="mt-8 bg-orange-500 hover:bg-orange-600">Volver a Educación</Button>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{`${story.title} - Huella Digital`}</title>
                <meta name="description" content={story.description} />
            </Helmet>
            <div className="min-h-screen bg-white">
                <Header />
                <main className="container mx-auto px-4 py-10">
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{story.title}</h1>
                                <p className="text-lg text-gray-500 mt-2">Una historia de final feliz</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                                <div className="relative">
                                    <img alt="Animal antes de ser adoptado" className="w-full h-80 object-cover rounded-lg shadow-md" src="https://images.unsplash.com/photo-1626447857058-2ba6a8868cb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" />
                                    <div className="absolute top-3 left-3 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
                                        Antes
                                    </div>
                                </div>
                                <div className="relative">
                                    <img alt={story.image} className="w-full h-80 object-cover rounded-lg shadow-md" src="https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" />
                                    <div className="absolute top-3 left-3 bg-orange-500 text-white text-sm px-3 py-1 rounded-full">
                                        Después
                                    </div>
                                </div>
                            </div>
                            
                            <div className="prose lg:prose-lg max-w-none text-gray-700">
                                <p>{story.description}</p>
                            </div>

                             <div className="text-center mt-12">
                                <Button onClick={() => navigate('/buscar')} size="lg" className="bg-orange-500 hover:bg-orange-600">
                                    Encuentra tu propia historia feliz
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default StoryProfilePage;
