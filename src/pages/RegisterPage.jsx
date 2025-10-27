
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, User, Home, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { signUp, signInWithGoogle } = useAuth();
  
  const [activeTab, setActiveTab] = useState(location.state?.defaultTab || 'adopter');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (location.state?.defaultTab) {
      setActiveTab(location.state.defaultTab);
    }
  }, [location.state]);

  const [adopterData, setAdopterData] = useState({ name: '', email: '', password: '' });
  const [shelterData, setShelterData] = useState({ name: '', email: '', password: '' });

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'adopter') {
      setAdopterData(prev => ({ ...prev, [name]: value }));
    } else {
      setShelterData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };
  
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const isAdopter = activeTab === 'adopter';
    const userData = isAdopter ? adopterData : shelterData;
    const role = isAdopter ? 'adopter' : 'shelter';

    if (!userData.email || !userData.password || !userData.name) {
      toast({ title: 'Error', description: 'Por favor, completa todos los campos.', variant: 'destructive' });
      setLoading(false);
      return;
    }

    if (!validatePassword(userData.password)) {
      toast({ title: 'Contraseña no válida', description: 'La contraseña debe tener al menos 8 caracteres.', variant: 'destructive' });
      setLoading(false);
      return;
    }
    
    const { error } = await signUp(userData.email, userData.password, {
      data: {
        full_name: userData.name,
        role: role,
      }
    });

    if (!error) {
        toast({
            title: "¡Registro casi completo!",
            description: "Te hemos enviado un correo de confirmación. ¡Revisa tu bandeja de entrada!",
            duration: 9000
        });
        navigate('/iniciar-sesion');
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  return (
    <>
      <Helmet>
        <title>Únete a Huella Digital</title>
        <meta name="description" content="Regístrate como adoptante o refugio y comienza tu viaje hacia la adopción responsable." />
      </Helmet>
      <div className="min-h-screen bg-orange-50/50 flex flex-col justify-center items-center p-4">
        <Link to="/" className="flex items-center gap-2 mb-8 group">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-lg group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="text-xl font-bold text-gray-800">Huella Digital</span>
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Únete a Huella Digital</h1>
            <p className="text-gray-500">Comienza tu viaje hacia la adopción responsable</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="adopter">Adoptante</TabsTrigger>
              <TabsTrigger value="shelter">Refugio</TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={handleRegister}>
            {activeTab === 'adopter' ? (
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="adopter-name">Nombre completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="adopter-name" name="name" type="text" placeholder="Tu nombre" className="pl-9" value={adopterData.name} onChange={(e) => handleInputChange(e, 'adopter')} disabled={loading} />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="adopter-email">Correo electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="adopter-email" name="email" type="email" placeholder="tu@email.com" className="pl-9" value={adopterData.email} onChange={(e) => handleInputChange(e, 'adopter')} disabled={loading} />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="adopter-password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="adopter-password" name="password" type="password" placeholder="Mínimo 8 caracteres" className="pl-9" value={adopterData.password} onChange={(e) => handleInputChange(e, 'adopter')} disabled={loading} />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={loading}>
                  {loading ? 'Creando...' : 'Crear cuenta'}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="shelter-name">Nombre del refugio</Label>
                   <div className="relative">
                    <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="shelter-name" name="name" type="text" placeholder="Nombre de tu refugio" className="pl-9" value={shelterData.name} onChange={(e) => handleInputChange(e, 'shelter')} disabled={loading} />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="shelter-email">Correo de contacto</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="shelter-email" name="email" type="email" placeholder="contacto@refugio.com" className="pl-9" value={shelterData.email} onChange={(e) => handleInputChange(e, 'shelter')} disabled={loading} />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="shelter-password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="shelter-password" name="password" type="password" placeholder="Mínimo 8 caracteres" className="pl-9" value={shelterData.password} onChange={(e) => handleInputChange(e, 'shelter')} disabled={loading} />
                  </div>
                </div>
                 <div className="p-3 bg-yellow-100/60 border border-yellow-200/80 rounded-md text-center text-sm text-yellow-800">
                    Tras el registro, recibirás un email para verificar tu cuenta.
                 </div>
                 <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={loading}>
                   {loading ? 'Registrando...' : 'Registrar refugio'}
                 </Button>
              </div>
            )}
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">O continúa con</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button variant="outline" onClick={handleGoogleSignIn}>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M48 24C48 22.125 47.85 20.325 47.55 18.6H24.45V28.65H37.8C37.275 31.875 35.55 34.575 32.925 36.3V42.6H40.8C45.3 38.475 48 31.875 48 24Z" fill="#4285F4"></path><path fillRule="evenodd" clipRule="evenodd" d="M24.45 48C30.9 48 36.375 45.825 40.8 42.6L32.925 36.3C30.75 37.8 27.9 38.7 24.45 38.7C18.225 38.7 13.05 34.725 11.25 29.4H3.15V35.85C7.65 43.125 15.45 48 24.45 48Z" fill="#34A853"></path><path fillRule="evenodd" clipRule="evenodd"d="M11.25 29.4C10.875 28.275 10.65 27.075 10.65 25.8C10.65 24.525 10.875 23.325 11.25 22.2L3.15 15.75C1.125 19.125 0 22.875 0 25.8C0 28.725 1.125 32.475 3.15 35.85L11.25 29.4Z" fill="#FBBC05"></path><path fillRule="evenodd" clipRule="evenodd" d="M24.45 9.9C27.45 9.9 30.15 10.95 32.4 13.05L40.95 4.5C36.375 0.9 30.9 0 24.45 0C15.45 0 7.65 4.875 3.15 15.75L11.25 22.2C13.05 16.875 18.225 9.9 24.45 9.9Z" fill="#EA4335"></path></svg>
                Google
              </Button>
              <Button variant="outline" disabled>Facebook</Button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link to="/iniciar-sesion" className="font-medium text-orange-600 hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default RegisterPage;
