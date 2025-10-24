
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary-foreground fill-current" />
              </div>
              <span className="text-xl font-bold text-primary">HuellaComún</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Conectando corazones con patitas. Adopción responsable para un mundo mejor.
            </p>
          </div>

          <div>
            <span className="font-semibold text-foreground block mb-4">Navegación</span>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Inicio
              </Link>
              <Link to="/buscar" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Buscar Perros
              </Link>
              <Link to="/educacion" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Educación
              </Link>
              <Link to="/panel-refugio" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Panel Refugio
              </Link>
            </div>
          </div>

          <div>
            <span className="font-semibold text-foreground block mb-4">Recursos</span>
            <div className="space-y-2">
              <Link to="/educacion" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Guía de Adopción
              </Link>
              <Link to="/educacion" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Cuidados Básicos
              </Link>
              <Link to="/educacion" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Historias de Éxito
              </Link>
            </div>
          </div>

          <div>
            <span className="font-semibold text-foreground block mb-4">Contacto</span>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>info@huellacomun.org</span>
              </div>
              <div className="flex space-x-3 pt-2">
                <a href="#" className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Facebook className="w-4 h-4 text-primary" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Instagram className="w-4 h-4 text-primary" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Twitter className="w-4 h-4 text-primary" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 HuellaComún. Todos los derechos reservados. Hecho con amor por el bienestar animal.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
