
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Instagram, Twitter, Facebook, MessageSquare as MessageSquareWarning, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/components/ui/use-toast';
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
} from "@/components/ui/alert-dialog"
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const ReportDialog = () => {
    const { toast } = useToast();
    const handleSubmit = (e) => {
        e.preventDefault();
        toast({
            title: "Denuncia enviada",
            description: "Gracias por tu colaboración. Hemos recibido tu reporte y lo revisaremos a la brevedad. Para que esto funcione en producción, se necesita conectar Supabase."
        });
    };
    
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-500 transition-colors">
                    <MessageSquareWarning className="w-4 h-4" />
                    Canal de denuncias
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <form onSubmit={handleSubmit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Canal de Denuncias Anónimas</AlertDialogTitle>
                        <AlertDialogDescription>
                            Si has observado alguna irregularidad, fraude o maltrato, por favor, descríbelo a continuación. Tu reporte es confidencial y será enviado a un equipo de moderación.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                            <Label htmlFor="report-subject" className="text-right">Asunto</Label>
                            <Input id="report-subject" placeholder="Ej: Posible fraude de refugio" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                            <Label htmlFor="report-description" className="text-right">Descripción</Label>
                            <textarea id="report-description" placeholder="Describe detalladamente lo sucedido..." className="col-span-3 min-h-[100px] flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required />
                        </div>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction type="submit" className="bg-red-600 hover:bg-red-700">Enviar denuncia</AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language;

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <Select onValueChange={changeLanguage} defaultValue={currentLang}>
            <SelectTrigger className="w-[180px]">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Idioma" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="en">English</SelectItem>
            </SelectContent>
        </Select>
    );
};

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-white border-t border-gray-200/80">
      <div className="container mx-auto px-4 pt-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-lg">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">
                Huella Digital
              </span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-gray-800 font-semibold mb-4">{t('footer.navigation')}</h3>
            <nav className="space-y-2">
              <Link to="/" className="block text-sm text-gray-600 hover:text-orange-500 transition-colors">{t('footer.home')}</Link>
              <Link to="/buscar" className="block text-sm text-gray-600 hover:text-orange-500 transition-colors">{t('footer.search')}</Link>
              <Link to="/educacion" className="block text-sm text-gray-600 hover:text-orange-500 transition-colors">{t('footer.education')}</Link>
              <Link to="/donar" className="block text-sm text-gray-600 hover:text-orange-500 transition-colors">{t('footer.donate')}</Link>
            </nav>
          </div>

          <div className="md-col-span-1">
            <h3 className="text-gray-800 font-semibold mb-4">{t('footer.legal')}</h3>
            <nav className="space-y-2">
              <Link to="/terminos" className="block text-sm text-gray-600 hover:text-orange-500 transition-colors">{t('footer.terms')}</Link>
              <Link to="/privacidad" className="block text-sm text-gray-600 hover:text-orange-500 transition-colors">{t('footer.privacy')}</Link>
              <Link to="/cookies" className="block text-sm text-gray-600 hover:text-orange-500 transition-colors">{t('footer.cookies')}</Link>
              <div className="pt-2"><ReportDialog /></div>
            </nav>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-gray-800 font-semibold mb-4">{t('footer.contact')}</h3>
            <div className="space-y-3">
              <a href="mailto:info@huelladigital.org" className="block text-sm text-gray-600 hover:text-orange-500 transition-colors">info@huelladigital.org</a>
              <a href="mailto:soporte@huelladigital.org" className="block text-sm text-gray-600 hover:text-orange-500 transition-colors">soporte@huelladigital.org</a>
              <div className="flex items-center gap-4 pt-2">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 transition-colors"><Twitter className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 py-8 border-t flex justify-between items-center">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Huella Digital. Todos los derechos reservados.</p>
            <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
