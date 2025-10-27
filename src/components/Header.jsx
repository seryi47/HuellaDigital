
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Menu, X, Search, BookOpen, LayoutGrid, User, LogOut, DollarSign, Shield, Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import useAuthStore from '@/store/authStore';

const Header = () => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useAuthStore();

  const navItems = [
    { name: t('header.home'), path: '/', icon: Heart },
    { name: t('header.search'), path: '/buscar', icon: Search },
    { name: t('header.education'), path: '/educacion', icon: BookOpen },
    { name: t('header.donate'), path: '/donar', icon: DollarSign }
  ];

  if (user?.role === 'shelter') {
    navItems.push({ name: t('header.shelterPanel'), path: '/panel-refugio', icon: LayoutGrid });
  }
  
  if (user?.role === 'admin') {
    navItems.push({ name: t('header.adminPanel'), path: '/panel-admin', icon: Shield });
  }

  const handleLogout = () => {
    logout();
    toast({ title: '¡Hasta pronto!', description: 'Has cerrado sesión correctamente.' });
    navigate('/');
  };

  const handleNotifications = () => {
    toast({
        title: "🔔 Tienes nuevos mensajes",
        description: "En el panel de refugio podrás ver tus conversaciones pendientes.",
    });
    if (user?.role === 'shelter') {
        navigate('/panel-refugio');
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/80">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-lg group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">
              Huella Digital
            </span>
          </Link>

          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center gap-2 bg-gray-100/80 p-1 rounded-full">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const isDonateButton = item.name === t('header.donate');
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? isDonateButton ? 'text-green-600' : 'text-orange-600'
                        : isDonateButton ? 'text-green-700 hover:text-green-800' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {isActive && <motion.div layoutId="active-nav-item" className={`absolute inset-0 ${isDonateButton ? 'bg-green-100' : 'bg-white'} shadow-sm rounded-md z-0`} />}
                    <item.icon className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                {user.role === 'shelter' && (
                    <Button variant="ghost" size="icon" onClick={handleNotifications} className="rounded-full h-9 w-9 relative">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500" />
                    </Button>
                )}
                <span className="text-sm font-medium text-gray-700">{t('header.greeting', { name: user.name })}</span>
                 <Button variant="ghost" size="icon" onClick={handleLogout} className="rounded-full h-9 w-9">
                   <LogOut className="w-5 h-5 text-gray-600" />
                 </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/iniciar-sesion')}>
                  {t('header.login')}
                </Button>
                <Button size="sm" onClick={() => navigate('/registrarse')} className="bg-orange-500 hover:bg-orange-600">
                  {t('header.register')}
                </Button>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-2 pb-4 border-t border-gray-200 pt-4"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                const isDonateButton = item.name === t('header.donate');
                return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 text-base font-medium transition-colors hover:text-orange-600 ${
                    location.pathname === item.path
                      ? isDonateButton ? 'text-green-600' : 'text-orange-600'
                      : 'text-gray-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              )})}
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                {user ? (
                   <>
                    {user.role === 'shelter' && (
                        <Button onClick={handleNotifications} className="w-full justify-start text-base" variant="ghost">
                            <Bell className="w-5 h-5 mr-3" /> {t('header.notifications')}
                            <span className="ml-auto block h-2 w-2 rounded-full bg-red-500" />
                        </Button>
                    )}
                   <Button onClick={handleLogout} className="w-full justify-start text-base" variant="ghost">
                     <LogOut className="w-5 h-5 mr-3" /> {t('header.logout')}
                   </Button>
                   </>
                ) : (
                  <>
                  <Button variant="ghost" onClick={() => {navigate('/iniciar-sesion'); setMobileMenuOpen(false);}} className="w-full justify-start text-base">
                    <User className="w-5 h-5 mr-3" /> {t('header.login')}
                  </Button>
                  <Button onClick={() => {navigate('/registrarse'); setMobileMenuOpen(false);}} className="w-full bg-orange-500 hover:bg-orange-600 text-base">
                    {t('header.register')}
                  </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;
