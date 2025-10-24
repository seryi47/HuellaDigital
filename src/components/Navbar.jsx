
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Menu, X, Search, BookOpen, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Inicio', icon: Heart },
    { path: '/buscar', label: 'Buscar', icon: Search },
    { path: '/educacion', label: 'Educación', icon: BookOpen },
    { path: '/panel-refugio', label: 'Panel Refugio', icon: LayoutDashboard },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 bg-primary rounded-full flex items-center justify-center"
            >
              <Heart className="w-6 h-6 text-primary-foreground fill-current" />
            </motion.div>
            <span className="text-xl font-bold text-primary">HuellaComún</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.path} to={link.path}>
                  <Button
                    variant={isActive(link.path) ? 'default' : 'ghost'}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <Link to="/login">
              <Button variant="ghost">Iniciar Sesión</Button>
            </Link>
            <Link to="/registro">
              <Button>Registrarse</Button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 space-y-2"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant={isActive(link.path) ? 'default' : 'ghost'}
                    className="w-full justify-start flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Button>
                </Link>
              );
            })}
            <div className="pt-2 space-y-2">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="/registro" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Registrarse</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
