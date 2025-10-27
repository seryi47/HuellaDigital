
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialShelters = [
    { id: 1, name: "Refugio Patitas Felices", location: "Madrid", description: "Dedicados a rescatar y rehabilitar animales abandonados desde 2010.", image: "A clean and friendly dog shelter entrance", amazonWishlistUrl: "https://www.amazon.es/hz/wishlist/ls/EXAMPLE1", contactPreference: "app", whatsappNumber: "", freePromotions: 0 },
    { id: 2, name: "Amigos Peludos BCN", location: "Barcelona", description: "Especializados en casos urgentes y animales con necesidades especiales.", image: "Volunteers playing with dogs in a sunny yard", amazonWishlistUrl: "", contactPreference: "whatsapp", whatsappNumber: "34611223344", freePromotions: 1 },
    { id: 3, name: "Corazón Canino Valencia", location: "Valencia", description: "Un pequeño refugio familiar con mucho amor para dar.", image: "Several happy dogs of different breeds together", amazonWishlistUrl: "https://www.amazon.es/hz/wishlist/ls/EXAMPLE3", contactPreference: "app", whatsappNumber: "", freePromotions: 1 },
    { id: 4, name: "Esperanza Animal Sevilla", location: "Sevilla", description: "Luchamos por una segunda oportunidad para todos los animales.", image: "A person petting a grateful rescue dog", amazonWishlistUrl: "", contactPreference: "app", whatsappNumber: "", freePromotions: 1 },
];

const generateLotsOfAnimals = (shelterId) => {
    const animals = [];
    const names = ["Toby", "Rocky", "Bella", "Nala", "Simba", "Thor", "Kira", "Leo", "Mia", "Zoe", "Bruno", "Lola", "Jack", "Chloe", "Duke"];
    const sizes = ["Pequeño", "Mediano", "Grande"];
    const energies = ["Baja", "Media", "Alta"];

    for (let i = 0; i < 25; i++) {
        const name = names[Math.floor(Math.random() * names.length)];
        const age = Math.floor(Math.random() * 12) + 1;
        animals.push({
            id: Date.now() + i,
            shelterId,
            name: `${name} ${i+1}`,
            age: `${age} años`,
            size: sizes[Math.floor(Math.random() * sizes.length)],
            energy: energies[Math.floor(Math.random() * energies.length)],
            description: `Un animal adorable y juguetón en busca de un hogar lleno de amor. Le encanta pasear y recibir mimos.`,
            status: "Disponible",
            isUrgent: age > 7,
            image: 'A new animal waiting for a picture'
        });
    }
    return animals;
};


const initialDogs = [
    { id: 1, shelterId: 1, name: "Luna", age: '3 años', size: 'Mediano', energy: 'Media', description: 'Luna es una perrita extremadamente cariñosa y leal...', status: "Disponible", isUrgent: false, image: 'Sweet medium-sized dog with gentle eyes' },
    { id: 2, shelterId: 1, name: "Max", age: '5 años', size: 'Grande', energy: 'Alta', description: 'Max es un pastor alemán lleno de vida y energía...', status: "En proceso", isUrgent: false, image: 'Senior large dog with kind expression' },
    { id: 3, shelterId: 2, name: "Coco", age: '8 años', size: 'Pequeño', energy: 'Baja', description: 'Coco es un perrito senior adorable...', status: "Disponible", isUrgent: true, image: 'Small energetic terrier mix' },
    ...generateLotsOfAnimals(2)
];

const initialStories = [
    { id: 1, shelterId: 1, title: 'El nuevo comienzo de Rocky', description: 'Tras un año con nosotros, Rocky encontró una familia maravillosa que ama el senderismo tanto como él. Su nueva vida está llena de aventuras en la montaña y siestas al sol. ¡No podríamos estar más felices por él!', image: 'Happy dog hiking in the mountains with its owner'},
    { id: 2, shelterId: 2, title: 'La segunda juventud de Bella', description: 'Bella llegó con 8 años, pero su espíritu juguetón enamoró a su nueva familia al instante. Ahora disfruta de un jardín enorme y del cariño de dos niños que la adoran. La edad es solo un número.', image: 'Content senior dog sleeping peacefully on a comfy couch at home'},
    { id: 3, shelterId: 3, title: 'De la calle al sofá', description: 'Nala fue rescatada con mucho miedo y desconfianza. Con paciencia y amor, se ha convertido en la gata más mimosa del mundo. Hoy es la reina de la casa y no se separa de su familia.', image: 'A fluffy cat lounging on a velvet sofa'},
];

const initialResources = [
    { id: 1, shelterId: 1, title: 'Guía de adopción responsable', description: 'Todo lo que necesitas saber antes de adoptar: preparación, costos y compromiso.' },
    { id: 2, shelterId: 1, title: 'Preparando tu hogar', description: 'Consejos para hacer tu casa segura y acogedora para tu nuevo compañero.' },
    { id: 3, shelterId: 1, title: 'Los primeros 30 días', description: 'Cómo facilitar la adaptación de tu animal a su nuevo entorno y familia.' },
    { id: 4, shelterId: 2, title: 'Entendiendo el lenguaje canino', description: 'Aprende a interpretar las señales de tu perro para una mejor comunicación.' },
    { id: 5, shelterId: 2, title: 'Salud y nutrición básica', description: 'Principios fundamentales para mantener a tu animal sano, feliz y bien alimentado.' },
    { id: 6, shelterId: 3, title: 'Manejo de animales con miedos', description: 'Técnicas y consejos para ayudar a animales tímidos o con ansiedad a ganar confianza.' },
];

const initialPromotions = [
    { id: 1, animalId: 2, shelterId: 1, date: new Date() }
];

const initialReports = [
    { id: 1, subject: 'Refugio sospechoso', description: 'El refugio "Amigos Peludos BCN" parece tener más animales de los que declara y las condiciones no parecen óptimas.', status: 'Pendiente', date: '2025-10-26' },
    { id: 2, subject: 'Intento de estafa', description: 'Un usuario me contactó por privado pidiendo dinero para la adopción de "Luna".', status: 'Pendiente', date: '2025-10-25' },
];

const initialChats = [
    { id: 1, shelterId: 1, animalId: 1, animalName: "Luna", adopterName: "Carlos", messages: [
        { text: "Hola, estoy muy interesado en Luna. ¿Podrían contarme más sobre ella?", sender: 'adopter', time: '10:30' },
        { text: "¡Hola Carlos! Luna es un amor, muy tranquila. ¿Qué te gustaría saber?", sender: 'shelter', time: '10:35' },
    ]},
    { id: 2, shelterId: 2, animalId: 3, animalName: "Coco", adopterName: "Ana", messages: [
        { text: "Buenos días, vi el perfil de Coco y me enamoré. ¿Se lleva bien con otros perros?", sender: 'adopter', time: '11:15' },
    ]},
];

const useDataStore = create(
  persist(
    (set, get) => ({
      shelters: initialShelters,
      dogs: initialDogs,
      stories: initialStories,
      resources: initialResources,
      promotions: initialPromotions,
      reports: initialReports,
      chats: initialChats,
      
      updateShelterProfile: (shelterId, profileData) =>
        set((state) => ({
          shelters: state.shelters.map((s) =>
            s.id === shelterId ? { ...s, ...profileData } : s
          ),
        })),
        
      useFreePromotion: (shelterId) => set((state) => ({
          shelters: state.shelters.map((s) =>
              s.id === shelterId ? { ...s, freePromotions: Math.max(0, s.freePromotions - 1) } : s
          ),
      })),

      getDogsByShelter: (shelterId) => get().dogs.filter(dog => dog.shelterId === shelterId).sort((a,b) => a.id - b.id),
      addDog: (shelterId) => {
        const age = Math.floor(Math.random() * 12) + 1;
        const newDog = { id: Date.now(), shelterId, name: "Nuevo Animal", age: `${age} años`, size: 'Mediano', energy: 'Media', description: 'Describe aquí al animal...', status: "Disponible", isUrgent: age > 7, image: 'A new animal waiting for a picture' };
        set(state => ({ dogs: [newDog, ...state.dogs] }));
        return newDog.id;
      },
      updateDog: (dogId, dogData) => set(state => ({ dogs: state.dogs.map(d => d.id === dogId ? dogData : d) })),
      deleteDog: (dogId) => set(state => ({ dogs: state.dogs.filter(d => d.id !== dogId) })),

      getStoriesByShelter: (shelterId) => get().stories.filter(s => s.shelterId === shelterId),
      addStory: (shelterId) => {
        const newStory = { id: Date.now(), shelterId, title: "Nueva Historia de Éxito", description: "Describe la maravillosa historia de adopción.", image: 'A beautiful adoption story photo'};
        set(state => ({ stories: [newStory, ...state.stories] }));
        return newStory.id;
      },
      updateStory: (storyId, storyData) => set(state => ({ stories: state.stories.map(s => s.id === storyId ? storyData : s) })),
      deleteStory: (storyId) => set(state => ({ stories: state.stories.filter(s => s.id !== storyId) })),
      
      addPromotion: (animalId, shelterId) => {
          const newPromotion = { id: Date.now(), animalId, shelterId, date: new Date() };
          set(state => ({ promotions: [...state.promotions, newPromotion]}));
      },
      
      updateReportStatus: (reportId, status) => set(state => ({ reports: state.reports.map(r => r.id === reportId ? { ...r, status } : r) })),

      getChatsByShelter: (shelterId) => get().chats.filter(c => c.shelterId === shelterId),
      getChatByAnimalAndAdopter: (animalId, adopterName) => get().chats.find(c => c.animalId === animalId && c.adopterName === adopterName),
      addMessage: (chatId, message) => set(state => ({
          chats: state.chats.map(c => c.id === chatId ? {...c, messages: [...c.messages, message]} : c)
      })),
      createChat: (animalId, animalName, shelterId, adopterName) => {
          const newChat = { id: Date.now(), shelterId, animalId, animalName, adopterName, messages: [] };
          set(state => ({ chats: [newChat, ...state.chats] }));
          return newChat;
      }
    }),
    {
      name: 'huelladigital-data-storage',
    }
  )
);

export default useDataStore;
