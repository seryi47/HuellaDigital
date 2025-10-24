import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import useAuthStore from '@/store/authStore';

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: 'Error', description: 'Por favor, introduce tu correo y contraseña.', variant: 'destructive' });
      return;
    }
    
    // Admin check
    if(email === 'admin@huellla-comun.com' && password === 'admin123') {
        const adminUser = { email: 'admin@huellla-comun.com', name: 'Admin', role: 'admin' };
        login(adminUser);
        toast({ title: '¡Bienvenido, Admin!', description: 'Has iniciado sesión como administrador.' });
        navigate('/panel-refugio');
        return;
    }

    // Mock user login
    const user = { email, name: email.split('@')[0], role: 'adopter' };
    login(user);

    toast({ title: '¡Bienvenido/a de vuelta!', description: 'Has iniciado sesión correctamente.' });
    navigate('/');
  };
  
  const handleGoogleSignIn = () => {
    toast({
        title: "🚧 ¡Conecta Supabase primero!",
        description: "Para usar el inicio de sesión con Google, necesitas configurar la integración con Supabase. ¡Es muy fácil!",
        variant: "destructive",
    });
  };

  const handleForgotPassword = () => {
    toast({
      title: '🚧 Esta función aún no está implementada',
      description: 'Pronto podrás recuperar tu contraseña. 🚀',
    });
  };

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión - HuellaComún</title>
        <meta name="description" content="Inicia sesión en tu cuenta de HuellaComún para continuar tu viaje de adopción." />
      </Helmet>
      <div className="min-h-screen bg-orange-50/50 flex flex-col justify-center items-center p-4">
        <Link to="/" className="flex items-center gap-2 mb-8 group">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-lg group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="text-xl font-bold text-gray-800">HuellaComún</span>
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Bienvenido de vuelta</h1>
            <p className="text-gray-500">Inicia sesión para continuar</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input id="email" type="email" placeholder="tu@email.com" className="pl-9" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input id="password" type="password" placeholder="········" className="pl-9" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" />
                <Label htmlFor="remember-me" className="text-sm font-normal">Recordarme</Label>
              </div>
              <a href="#" onClick={handleForgotPassword} className="text-sm text-orange-600 hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">Iniciar sesión</Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">O continúa con</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={handleGoogleSignIn}>
              <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M48 24C48 22.125 47.85 20.325 47.55 18.6H24.45V28.65H37.8C37.275 31.875 35.55 34.575 32.925 36.3V42.6H40.8C45.3 38.475 48 31.875 48 24Z" fill="#4285F4"></path><path fillRule="evenodd" clipRule="evenodd" d="M24.45 48C30.9 48 36.375 45.825 40.8 42.6L32.925 36.3C30.75 37.8 27.9 38.7 24.45 38.7C18.225 38.7 13.05 34.725 11.25 29.4H3.15V35.85C7.65 43.125 15.45 48 24.45 48Z" fill="#34A853"></path><path fillRule="evenodd" clipRule="evenodd" d="M11.25 29.4C10.875 28.275 10.65 27.075 10.65 25.8C10.65 24.525 10.875 23.325 11.25 22.2L3.15 15.75C1.125 19.125 0 22.875 0 25.8C0 28.725 1.125 32.475 3.15 35.85L11.25 29.4Z" fill="#FBBC05"></path><path fillRule="evenodd" clipRule="evenodd" d="M24.45 9.9C27.45 9.9 30.15 10.95 32.4 13.05L40.95 4.5C36.375 0.9 30.9 0 24.45 0C15.45 0 7.65 4.875 3.15 15.75L11.25 22.2C13.05 16.875 18.225 9.9 24.45 9.9Z" fill="#EA4335"></path></svg>
              Google
            </Button>
            <Button variant="outline" disabled>Facebook</Button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
          <Link to="/registro" className="font-medium text-orange-600 hover:underline">
            Regístrate aquí
          </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;