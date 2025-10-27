
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Shield, Save, Users, BarChart2, AlertTriangle, CheckCircle, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminPanelPage = () => {
    const { toast } = useToast();
    const { profile } = useAuth();
    const navigate = useNavigate();

    const [shelters, setShelters] = useState([]);
    const [reports, setReports] = useState([]);
    const [stats, setStats] = useState({ shelters: 0, users: 0, animals: 0, pendingReports: 0 });

    const [seoTitle, setSeoTitle] = useState('Huella Digital - Adopta, Dona y Salva una Vida');
    const [seoDescription, setSeoDescription] = useState('Conecta con refugios, encuentra a tu compañero ideal y apoya a los animales necesitados.');
    const [seoKeywords, setSeoKeywords] = useState('adopción de animales, adoptar perro, adoptar gato, refugio de animales, donar a protectoras');

    const [editingShelterId, setEditingShelterId] = useState(null);
    const [editingShelterData, setEditingShelterData] = useState({});

    useEffect(() => {
        if (profile && profile.role !== 'admin') {
            toast({ title: "Acceso denegado", description: "Esta sección es solo para administradores.", variant: "destructive" });
            navigate('/');
        } else if (profile) {
            fetchAdminData();
        }
    }, [profile, navigate, toast]);

    const fetchAdminData = async () => {
        // Fetch shelters
        const { data: sheltersData, error: sheltersError } = await supabase.from('profiles').select('*').eq('role', 'shelter');
        if (sheltersError) console.error('Error fetching shelters:', sheltersError);
        else setShelters(sheltersData);

        // Fetch reports
        const { data: reportsData, error: reportsError } = await supabase.from('reports').select('*').order('created_at', { ascending: false });
        if (reportsError) console.error('Error fetching reports:', reportsError);
        else setReports(reportsData);

        // Fetch stats
        const { count: shelterCount } = await supabase.from('profiles').select('id', { count: 'exact' }).eq('role', 'shelter');
        const { count: userCount } = await supabase.from('profiles').select('id', { count: 'exact' });
        const { count: animalCount } = await supabase.from('animals').select('id', { count: 'exact' });
        const { count: reportCount } = await supabase.from('reports').select('id', { count: 'exact' }).eq('status', 'Pendiente');
        setStats({ shelters: shelterCount, users: userCount, animals: animalCount, pendingReports: reportCount });
    };

    const handleSaveSeo = () => {
        toast({
            title: "SEO Actualizado",
            description: "Los cambios de SEO se han guardado (simulación).",
        });
    };

    const handleEditShelter = (shelter) => {
        setEditingShelterId(shelter.id);
        setEditingShelterData(shelter);
    };

    const handleSaveShelter = async (id) => {
        const { error } = await supabase.from('profiles').update(editingShelterData).eq('id', id);
        if (error) {
            toast({ title: "Error", description: "No se pudo actualizar el refugio.", variant: "destructive" });
        } else {
            toast({ title: "Refugio actualizado" });
            setEditingShelterId(null);
            fetchAdminData();
        }
    };

    const handleShelterInputChange = (e) => {
        const { name, value } = e.target;
        setEditingShelterData(prev => ({...prev, [name]: value}));
    };
    
    const handleResolveReport = async (id) => {
        const { error } = await supabase.from('reports').update({ status: 'Resuelta' }).eq('id', id);
        if (error) {
            toast({ title: "Error", description: "No se pudo actualizar la denuncia.", variant: "destructive" });
        } else {
            toast({ title: 'Denuncia marcada como resuelta.'});
            fetchAdminData();
        }
    };

    if (!profile || profile.role !== 'admin') return <div className="h-screen flex items-center justify-center">Cargando...</div>;

    return (
        <>
            <Helmet>
                <title>Panel de Administrador - Huella Digital</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="min-h-screen bg-gray-100">
                <Header />
                <main className="container mx-auto px-4 py-10">
                    <div className="flex items-center gap-4 mb-8">
                        <Shield className="w-10 h-10 text-orange-600" />
                        <h1 className="text-4xl font-bold text-gray-800">Panel de Administrador</h1>
                    </div>

                    <Tabs defaultValue="overview">
                        <TabsList className="mb-4">
                            <TabsTrigger value="overview">Visión General</TabsTrigger>
                            <TabsTrigger value="shelters">Gestionar Refugios</TabsTrigger>
                            <TabsTrigger value="reports">Revisar Denuncias</TabsTrigger>
                            <TabsTrigger value="seo">Ajustes de SEO</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview">
                            <div className="bg-white p-6 rounded-2xl border">
                                <h2 className="text-2xl font-bold mb-4">Estadísticas Rápidas</h2>
                                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                                    <div><p className="text-3xl font-bold">{stats.shelters}</p><p className="text-sm text-gray-500">Refugios Activos</p></div>
                                    <div><p className="text-3xl font-bold">{stats.users}</p><p className="text-sm text-gray-500">Usuarios Registrados</p></div>
                                    <div><p className="text-3xl font-bold">{stats.animals}</p><p className="text-sm text-gray-500">Animales en Adopción</p></div>
                                    <div><p className="text-3xl font-bold text-red-500">{stats.pendingReports}</p><p className="text-sm text-gray-500">Denuncias Pendientes</p></div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="shelters">
                            <div className="bg-white p-6 rounded-2xl border">
                                <h2 className="text-2xl font-bold mb-4">Gestionar Refugios</h2>
                                <div className="space-y-2">
                                {shelters.map(shelter => (
                                    <div key={shelter.id} className="p-3 rounded-lg hover:bg-gray-50/80">
                                    {editingShelterId === shelter.id ? (
                                        <div className="space-y-3 p-2 border-t">
                                            <Input name="full_name" value={editingShelterData.full_name} onChange={handleShelterInputChange} placeholder="Nombre"/>
                                            <Input name="amazon_wishlist_url" value={editingShelterData.amazon_wishlist_url} onChange={handleShelterInputChange} placeholder="URL de Amazon"/>
                                            <div className="flex gap-2">
                                                <Button size="sm" onClick={() => handleSaveShelter(shelter.id)}><Save className="w-4 h-4 mr-2"/>Guardar</Button>
                                                <Button size="sm" variant="ghost" onClick={() => setEditingShelterId(null)}>Cancelar</Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-4">
                                            <div className="flex-grow"><p className="font-semibold">{shelter.full_name}</p><p className="text-sm text-gray-500">{shelter.location || 'Sin ubicación'}</p></div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => handleEditShelter(shelter)}><Edit className="w-4 h-4 text-gray-500"/></Button>
                                                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4"/></Button>
                                            </div>
                                        </div>
                                    )}
                                    </div>
                                ))}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="reports">
                            <div className="bg-white p-6 rounded-2xl border">
                                <h2 className="text-2xl font-bold mb-4">Denuncias de Usuarios</h2>
                                <div className="space-y-4">
                                    {reports.map(report => (
                                        <div key={report.id} className="border p-4 rounded-lg">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-bold">{report.subject}</p>
                                                    <p className="text-sm text-gray-500">{report.description}</p>
                                                    <p className={`text-xs font-bold mt-2 ${report.status === 'Pendiente' ? 'text-red-500' : 'text-green-600'}`}>{report.status} - {new Date(report.created_at).toLocaleDateString()}</p>
                                                </div>
                                                {report.status === 'Pendiente' && (
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                             <Button size="sm" variant="outline"><CheckCircle className="w-4 h-4 mr-2"/>Resolver</Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader><AlertDialogTitle>¿Marcar como resuelta?</AlertDialogTitle><AlertDialogDescription>Esta acción no se puede deshacer. Asegúrate de haber investigado el caso.</AlertDialogDescription></AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleResolveReport(report.id)}>Confirmar</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="seo">
                            <div className="bg-white p-6 rounded-2xl border">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de SEO Global</h2>
                                <div className="space-y-4">
                                    <div><Label htmlFor="seo-title" className="font-semibold">Título Principal</Label><Input id="seo-title" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} /></div>
                                    <div><Label htmlFor="seo-description" className="font-semibold">Meta Descripción</Label><Textarea id="seo-description" value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} /></div>
                                    <div><Label htmlFor="seo-keywords" className="font-semibold">Palabras Clave</Label><Input id="seo-keywords" value={seoKeywords} onChange={(e) => setSeoKeywords(e.target.value)} /></div>
                                    <div className="flex justify-end"><Button onClick={handleSaveSeo} className="bg-green-600 hover:bg-green-700"><Save className="w-4 h-4 mr-2" />Guardar Cambios SEO</Button></div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default AdminPanelPage;
