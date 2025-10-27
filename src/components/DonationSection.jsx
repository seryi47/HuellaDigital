
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, DollarSign, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const DonationSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleAmazonClick = () => {
    toast({
      title: "Redirigiendo a Amazon...",
      description: "En una aplicación real, esto te llevaría a una lista de deseos de Amazon. 🚀",
    });
    // window.open('https://www.amazon.es/hz/wishlist/ls/YOUR_LIST_ID', '_blank');
  };

  const donationOptions = [
    {
      icon: DollarSign,
      title: 'Donación económica',
      description: 'Ayuda directamente a los refugios con una donación única o recurrente.',
      color: 'from-green-500 to-green-600',
      action: () => handleNavigation('/donar'),
    },
    {
      icon: Gift,
      title: 'Lista de deseos',
      description: 'Compra comida o material de nuestra lista de Amazon y se enviará al refugio.',
      color: 'from-sky-500 to-sky-600',
      action: handleAmazonClick,
    },
    {
      icon: Heart,
      title: 'Apadrina un animal',
      description: 'Patrocina mensualmente a un animal y recibe actualizaciones sobre su progreso.',
      color: 'from-orange-500 to-orange-600',
      action: () => handleNavigation('/donar'),
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿No puedes adoptar? ¡También puedes ayudar!
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hay muchas formas de marcar la diferencia. Cada contribución cuenta para darles una vida mejor.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {donationOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 group cursor-pointer"
                onClick={option.action}
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${option.color} mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {option.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {option.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Tu ayuda cambia vidas
          </h3>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Los refugios dependen de la generosidad de personas como tú. Cada euro, cada bolsa de comida, cada minuto de tu tiempo marca la diferencia.
          </p>
          <Button
            size="lg"
            onClick={() => handleNavigation('/donar')}
            className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-lg"
          >
            <Heart className="w-5 h-5 mr-2" />
            Quiero ayudar ahora
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default DonationSection;
