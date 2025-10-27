
import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Plus, PawPrint, Users, Edit, Trash2, Save, X, BookHeart, Link as LinkIcon, Star, MessageCircle, Settings, UploadCloud, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { supabase } from '@/lib/customSupabaseClient';

const BulkUploadDialog = ({ open, setOpen, onUpload }) => {
    const { t } = useTranslation();
    const { toast } = useToast();
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            toast({ title: "No hay archivo", description: "Por favor, selecciona un archivo CSV.", variant: "destructive" });
            return;
        }
        toast({ title: "Subiendo...", description: "Esta función está en desarrollo." });
        // Aquí iría la lógica para parsear el CSV y subir los datos a Supabase
        onUpload();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('shelterPanel.bulkUploadDialog.title')}</DialogTitle>
                    <DialogDescription>{t('shelterPanel.bulkUploadDialog.description')}</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <p className="text-sm text-gray-600">{t('shelterPanel.bulkUploadDialog.instructions')}</p>
                    <Button variant="outline" className="w-full" asChild><a href="/template.csv" download><FileText className="w-4 h-4 mr-2" />{t('shelterPanel.bulkUploadDialog.downloadTemplate')}</a></Button>
                    <div className="p-4 border-2 border-dashed rounded-lg text-center">
                        <UploadCloud className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                        <Input type="file" accept=".csv" onChange={handleFileChange} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"/>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>{t('shelterPanel.bulkUploadDialog.cancel')}</Button>
                    <Button onClick={handleUpload} className="bg-orange-500 hover:bg-orange-600"><UploadCloud className="w-4 h-4 mr-2" />{t('shelterPanel.bulkUploadDialog.uploadAndProcess')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const ShelterPanelPage = () => {
    const { t } = useTranslation();
    const { toast } = useToast();
    const { user, profile, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    
    const [animals, setAnimals] = useState([]);
    const [stories, setStories] = useState([]);
    const [shelterChats, setShelterChats] = useState([]);
    const [shelterPromotions, setShelterPromotions] = useState([]);
    const [bulkUploadOpen, setBulkUploadOpen] = useState(false);
    const [stats, setStats] = useState({ activeAnimals: 0, promotions: 0, messages: 0, requests: 0 });

    const [editingAnimalId, setEditingAnimalId] = useState(null);
    const [editingAnimalData, setEditingAnimalData] = useState({});
    const [editingStoryId, setEditingStoryId] = useState(null);
    const [editingStoryData, setEditingStoryData] = useState({});
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [editingProfileData, setEditingProfileData] = useState({});

    const [activeChat, setActiveChat] = useState(null);
    const [newMessage, setNewMessage] = useState("");

    const fetchData = useCallback(async () => {
        if (!user) return;
        
        // Fetch Animals
        const { data: animalsData, error: animalsError } = await supabase.from('animals').select('*').eq('shelter_id', user.id);
        if (animalsError) console.error(animalsError); else setAnimals(animalsData);

        // Fetch Stories
        const { data: storiesData, error: storiesError } = await supabase.from('stories').select('*').eq('shelter_id', user.id);
        if (storiesError) console.error(storiesError); else setStories(storiesData);

        // Fetch Promotions
        const { data: promotionsData, error: promotionsError } = await supabase.from('promotions').select('*', { count: 'exact' }).eq('shelter_id', user.id);
        if (promotionsError) console.error(promotionsError); else setShelterPromotions(promotionsData);

        // Fetch Chats
        const { data: chatsData, error: chatsError } = await supabase.from('chats').select('*, adopter:adopter_id(full_name), animal:animal_id(name)').eq('shelter_id', user.id);
        if (chatsError) console.error(chatsError); else setShelterChats(chatsData);

        setStats({ activeAnimals: animalsData?.length || 0, promotions: promotionsData?.length || 0, messages: chatsData?.length || 0, requests: 0 });

    }, [user]);

    useEffect(() => {
        if (!authLoading) {
            if (!user || profile?.role !== 'shelter') {
                toast({ title: "Acceso denegado", description: "Debes ser un refugio para ver esta página.", variant: "destructive" });
                navigate('/iniciar-sesion');
            } else {
                setEditingProfileData(profile);
                fetchData();
            }
        }
    }, [user, profile, authLoading, navigate, toast, fetchData]);
    
    const earnedFreePromotions = Math.floor(shelterPromotions.length / 5);

    const handleAddAnimal = async () => { 
        const { data, error } = await supabase.from('animals').insert({ shelter_id: user.id, name: 'Nuevo Animal', description: '' }).select().single();
        if (error) {
            toast({ title: "Error", description: "No se pudo añadir el animal.", variant: "destructive" });
        } else {
            setEditingAnimalId(data.id);
            setEditingAnimalData(data);
            fetchData();
            toast({ title: "Animal añadido", description: "Completa los detalles." });
        }
    };
    const handleEditAnimal = (animal) => { setEditingAnimalId(animal.id); setEditingAnimalData(animal); };
    const handleSaveAnimal = async (id) => { 
        const { error } = await supabase.from('animals').update(editingAnimalData).eq('id', id);
        if (error) toast({ title: "Error", description: "No se pudo guardar.", variant: "destructive" });
        else {
            setEditingAnimalId(null); 
            fetchData();
            toast({title: "Guardado", description: "Datos del animal actualizados."});
        }
    };
    const handleDeleteAnimal = async (id) => { 
        const { error } = await supabase.from('animals').delete().eq('id', id);
        if (error) toast({ title: "Error", description: "No se pudo eliminar.", variant: "destructive" });
        else {
            fetchData();
            toast({ title: "Animal eliminado", variant: 'destructive' });
        }
    };
    const handleAnimalInputChange = (e) => { const { name, value } = e.target; setEditingAnimalData(prev => ({...prev, [name]: value})); };

    const handleSaveProfile = async () => { 
        const { error } = await supabase.from('profiles').update(editingProfileData).eq('id', user.id);
        if (error) toast({ title: "Error", description: "No se pudo actualizar el perfil.", variant: "destructive" });
        else {
            setIsEditingProfile(false); 
            toast({ title: "Perfil actualizado." });
        }
    };
    const handleProfileInputChange = (e) => { const { name, value } = e.target; setEditingProfileData(prev => ({...prev, [name]: value})); };
    
    const handlePromote = async (animalId) => {
        const stripeUrl = "https://buy.stripe.com/6oU6oIbJq6Hl05QdLO6EU00";
        window.open(stripeUrl, '_blank');
        toast({
            title: "Redirigiendo a Stripe...",
            description: "Completa el pago para promocionar a tu animal. La promoción se activará al confirmar el pago (simulación).",
        });
        await supabase.from('promotions').insert({ animal_id: animalId, shelter_id: user.id });
        fetchData();
    };
    
    if (authLoading || !profile) return <div className="h-screen flex items-center justify-center">Cargando panel...</div>;

    return (
        <>
            <Helmet>
                <title>Panel de Refugio - Huella Digital</title>
                <meta name="description" content="Gestiona tus animales, chats, y donaciones desde un solo lugar." />
            </Helmet>
            <BulkUploadDialog open={bulkUploadOpen} setOpen={setBulkUploadOpen} onUpload={fetchData} />
            <div className="min-h-screen bg-orange-50/30">
                <Header />
                <main className="container mx-auto px-4 py-10">
                    <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                        <h1 className="text-4xl font-bold text-gray-800">{t('shelterPanel.title', { name: profile.full_name })}</h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        <div className="bg-white p-6 rounded-2xl border shadow-sm">
                            <p className="text-gray-500 text-sm">{t('shelterPanel.activeAnimals')}</p>
                            <p className="text-3xl font-bold text-gray-800">{stats.activeAnimals}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border shadow-sm">
                            <p className="text-gray-500 text-sm">{t('shelterPanel.promotions')}</p>
                            <p className="text-3xl font-bold text-gray-800">{`${stats.promotions} (+${earnedFreePromotions} gratis)`}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border shadow-sm">
                            <p className="text-gray-500 text-sm">{t('shelterPanel.messages')}</p>
                            <p className="text-3xl font-bold text-gray-800">{stats.messages}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border shadow-sm">
                            <p className="text-gray-500 text-sm">{t('shelterPanel.requests')}</p>
                            <p className="text-3xl font-bold text-gray-800">{stats.requests}</p>
                        </div>
                    </div>

                    <Tabs defaultValue="animals">
                        <TabsList className="mb-6">
                            <TabsTrigger value="animals"><PawPrint className="w-4 h-4 mr-2"/>{t('shelterPanel.myAnimals')}</TabsTrigger>
                            <TabsTrigger value="chats"><MessageCircle className="w-4 h-4 mr-2"/>{t('shelterPanel.chats')}</TabsTrigger>
                            <TabsTrigger value="stories"><BookHeart className="w-4 h-4 mr-2"/>{t('shelterPanel.stories')}</TabsTrigger>
                            <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-2"/>{t('shelterPanel.settings')}</TabsTrigger>
                        </TabsList>
                        <TabsContent value="animals">
                           <div className="bg-white p-6 rounded-2xl border shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">{t('shelterPanel.myAnimals')}</h2>
                                    <div className="flex gap-2">
                                        <Button onClick={() => setBulkUploadOpen(true)} size="sm" variant="outline"><UploadCloud className="w-4 h-4 mr-2" />{t('shelterPanel.bulkUpload')}</Button>
                                        <Button onClick={handleAddAnimal} size="sm" className="bg-orange-500 hover:bg-orange-600"><Plus className="w-4 h-4 mr-2" />{t('shelterPanel.add')}</Button>
                                    </div>
                                </div>
                                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                                    {animals.map(animal => (
                                        <div key={animal.id} className="p-3 rounded-lg hover:bg-gray-50/80 transition-colors">
                                            {editingAnimalId === animal.id ? (
                                                <div className="space-y-4 p-2 border-t">
                                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div><Label>Nombre</Label><Input name="name" value={editingAnimalData.name} onChange={handleAnimalInputChange} placeholder="Nombre del animal" /></div>
                                                        <div><Label>Estado</Label><Input name="status" value={editingAnimalData.status} onChange={handleAnimalInputChange} placeholder="Ej: Disponible" /></div>
                                                    </div>
                                                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        <div><Label>Edad</Label><Input name="age" value={editingAnimalData.age} onChange={handleAnimalInputChange} placeholder="Ej: 3 años" /></div>
                                                        <div><Label>Tamaño</Label><Input name="size" value={editingAnimalData.size} onChange={handleAnimalInputChange} placeholder="Ej: Mediano" /></div>
                                                        <div><Label>Energía</Label><Input name="energy" value={editingAnimalData.energy} onChange={handleAnimalInputChange} placeholder="Ej: Media" /></div>
                                                    </div>
                                                    <div><Label>Descripción</Label><textarea name="description" value={editingAnimalData.description} onChange={handleAnimalInputChange} rows="3" className="w-full flex rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Cuenta la historia del animal..."></textarea></div>
                                                    <div className="flex gap-2"><Button variant="ghost" size="sm" onClick={() => handleSaveAnimal(animal.id)} className="w-full hover:bg-green-100 text-green-600"><Save className="w-4 h-4 mr-2" />Guardar</Button><Button variant="ghost" size="sm" onClick={() => setEditingAnimalId(null)} className="w-full hover:bg-red-100 text-red-600"><X className="w-4 h-4 mr-2"/>Cancelar</Button></div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-4">
                                                    <img alt={animal.name} className="w-12 h-12 object-cover rounded-md bg-gray-200" src="https://images.unsplash.com/photo-1631988611012-bdf91b8696d1" />
                                                    <div className="flex-grow">
                                                        <p className="font-semibold text-gray-800 flex items-center gap-2">{animal.name} {animal.is_urgent && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Urgente</span>}</p>
                                                        <p className={`text-xs font-medium ${animal.status === 'Disponible' ? 'text-green-600' : 'text-yellow-700'}`}>{animal.status}</p>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Button variant="ghost" size="sm" onClick={() => handlePromote(animal.id)} className="text-yellow-600 hover:bg-yellow-100 hover:text-yellow-700"><Star className="w-4 h-4 mr-1"/>Promocionar (1€)</Button>
                                                        <Button variant="ghost" size="icon" onClick={() => handleEditAnimal(animal)} className="h-8 w-8 hover:bg-gray-100 rounded-full"><Edit className="w-4 h-4 text-gray-500" /></Button>
                                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteAnimal(animal.id)} className="h-8 w-8 hover:bg-red-100 rounded-full"><Trash2 className="w-4 h-4 text-gray-500 hover:text-red-600" /></Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="chats">
                            <div className="bg-white rounded-2xl border shadow-sm h-[600px] grid grid-cols-3">
                                <div className="col-span-1 border-r">
                                    <div className="p-4 border-b"><h2 className="text-xl font-bold">Conversaciones</h2></div>
                                    <div className="overflow-y-auto h-[520px]">
                                        {shelterChats.map(chat => (
                                            <div key={chat.id} onClick={() => setActiveChat(chat)} className={`p-4 cursor-pointer hover:bg-orange-50 ${activeChat?.id === chat.id ? 'bg-orange-100' : ''}`}>
                                                <p className="font-semibold">{chat.adopter.full_name}</p>
                                                <p className="text-sm text-gray-500 truncate">Interesado en: {chat.animal.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-span-2 flex flex-col">
                                    {activeChat ? (
                                        <div className="flex-grow flex items-center justify-center text-gray-500">Funcionalidad de chat en desarrollo.</div>
                                    ) : (
                                        <div className="flex-grow flex items-center justify-center text-gray-500">Selecciona una conversación</div>
                                    )}
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="stories">
                             <div className="bg-white p-6 rounded-2xl border shadow-sm">
                                <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-gray-800">Historias de éxito</h2><Button size="sm" variant="outline"><BookHeart className="w-4 h-4 mr-2" />Crear</Button></div>
                                <div className="text-center text-gray-500 py-8">Funcionalidad en desarrollo.</div>
                            </div>
                        </TabsContent>
                        <TabsContent value="settings">
                            <div className="bg-white p-6 rounded-2xl border shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Ajustes del Perfil</h2>
                                {isEditingProfile ? (
                                    <div className="space-y-6 max-w-xl">
                                        <div><Label htmlFor="profile-name">Nombre del Refugio</Label><Input id="profile-name" name="full_name" value={editingProfileData.full_name} onChange={handleProfileInputChange} /></div>
                                        <div><Label htmlFor="profile-description">Descripción</Label><textarea id="profile-description" name="description" value={editingProfileData.description} onChange={handleProfileInputChange} rows="4" className="w-full flex rounded-md border border-input bg-background px-3 py-2 text-sm" /></div>
                                        <hr/>
                                        <div><Label htmlFor="profile-amazon">URL Lista de deseos Amazon</Label><Input id="profile-amazon" name="amazon_wishlist_url" value={editingProfileData.amazon_wishlist_url} onChange={handleProfileInputChange} placeholder="https://www.amazon.es/hz/wishlist/ls/..." /></div>
                                        <div className="flex gap-2"><Button onClick={handleSaveProfile} className="bg-green-600 hover:bg-green-700"><Save className="w-4 h-4 mr-2"/>Guardar Cambios</Button><Button onClick={() => setIsEditingProfile(false)} variant="ghost"><X className="w-4 h-4 mr-2"/>Cancelar</Button></div>
                                    </div>
                                ) : (
                                    <div className="space-y-4 max-w-xl">
                                        <div><h3 className="text-lg font-bold text-gray-800">{profile.full_name}</h3><p className="text-sm text-gray-600">{profile.description}</p></div>
                                        {profile.amazon_wishlist_url && (
                                            <div className="pt-2"><Label>Lista de Amazon</Label><a href={profile.amazon_wishlist_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-sky-600 hover:underline"><LinkIcon className="w-4 h-4"/>{profile.amazon_wishlist_url.substring(0, 40)}...</a></div>
                                        )}
                                        <Button onClick={() => setIsEditingProfile(true)} size="sm" variant="outline" className="mt-4"><Edit className="w-4 h-4 mr-2" />Editar Perfil</Button>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default ShelterPanelPage;
