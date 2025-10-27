
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from "@/components/ui/use-toast";

const ChatPage = () => {
    const { animalId } = useParams();
    const navigate = useNavigate();
    const { user, profile } = useAuth();
    const { toast } = useToast();

    const [animal, setAnimal] = useState(null);
    const [shelter, setShelter] = useState(null);
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const getOrCreateChat = useCallback(async (animalData) => {
        if (!user || !animalData) return;

        let { data: existingChat, error: chatError } = await supabase
            .from('chats')
            .select('*')
            .eq('animal_id', animalData.id)
            .eq('adopter_id', user.id)
            .single();

        if (chatError && chatError.code !== 'PGRST116') {
            console.error('Error fetching chat:', chatError);
            return null;
        }

        if (existingChat) {
            return existingChat;
        } else {
            const { data: newChat, error: newChatError } = await supabase
                .from('chats')
                .insert({
                    animal_id: animalData.id,
                    adopter_id: user.id,
                    shelter_id: animalData.shelter_id,
                })
                .select()
                .single();
            
            if (newChatError) {
                console.error('Error creating chat:', newChatError);
                return null;
            }
            return newChat;
        }
    }, [user]);

    useEffect(() => {
        if (!user) {
            toast({ title: "Inicia sesión", description: "Debes iniciar sesión para chatear.", variant: "destructive" });
            navigate('/iniciar-sesion');
            return;
        }

        const fetchInitialData = async () => {
            setLoading(true);
            const { data: animalData, error: animalError } = await supabase
                .from('animals')
                .select('*, shelter:shelter_id(full_name, id)')
                .eq('id', animalId)
                .single();

            if (animalError || !animalData) {
                toast({ title: "Error", description: "No se pudo encontrar el animal.", variant: "destructive" });
                navigate('/buscar');
                return;
            }

            setAnimal(animalData);
            setShelter(animalData.shelter);
            
            const chatData = await getOrCreateChat(animalData);
            setChat(chatData);
            setLoading(false);
        };

        fetchInitialData();
    }, [animalId, user, navigate, toast, getOrCreateChat]);

    useEffect(() => {
        if (!chat) return;

        const fetchMessages = async () => {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .eq('chat_id', chat.id)
                .order('created_at', { ascending: true });

            if (error) console.error("Error fetching messages:", error);
            else setMessages(data);
        };
        fetchMessages();
        
        const messageSubscription = supabase
            .channel(`chat-${chat.id}`)
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `chat_id=eq.${chat.id}` }, 
                payload => {
                    setMessages(currentMessages => [...currentMessages, payload.new]);
                }
            )
            .subscribe();

        return () => supabase.removeChannel(messageSubscription);
    }, [chat]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '' || !user || !chat) return;
        
        const messagePayload = {
            chat_id: chat.id,
            sender_id: user.id,
            content: newMessage.trim(),
        };

        const { error } = await supabase.from('messages').insert(messagePayload);

        if (error) {
            toast({ title: "Error al enviar", description: "No se pudo enviar tu mensaje.", variant: "destructive" });
        } else {
            setNewMessage('');
        }
    };
    
    if (loading) {
        return <div className="h-screen flex items-center justify-center">Cargando chat...</div>;
    }
    
    if (!animal || !shelter) {
         return (
            <div className="h-screen flex flex-col items-center justify-center">
                <AlertCircle className="w-16 h-16 text-red-500 mb-4"/>
                <h1 className="text-2xl font-bold mb-2">Error al cargar el chat</h1>
                <p className="text-gray-600 mb-4">No pudimos encontrar los datos de este animal o refugio.</p>
                <Button onClick={() => navigate('/')}>Volver al inicio</Button>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Chat sobre {animal.name} - Huella Digital</title>
                <meta name="description" content={`Conversación con ${shelter.full_name} sobre ${animal.name}.`} />
            </Helmet>
            <div className="min-h-screen bg-gray-100 flex flex-col">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-2xl h-[70vh] bg-white rounded-2xl shadow-lg flex flex-col"
                    >
                        <div className="p-4 border-b flex items-center gap-4">
                            <Button variant="ghost" size="icon" onClick={() => navigate(`/animal/${animal.id}`)}><ArrowLeft/></Button>
                            <img alt={animal.name} className="w-12 h-12 object-cover rounded-full" src={animal.image_url || "https://images.unsplash.com/photo-1597092118522-7f441ec188f6"} />
                            <div>
                                <h2 className="font-bold text-lg">Chat sobre {animal.name}</h2>
                                <p className="text-sm text-gray-500">con {shelter.full_name}</p>
                            </div>
                        </div>

                        <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender_id === user.id ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`p-3 rounded-lg max-w-sm ${msg.sender_id === user.id ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}>
                                        {msg.content}
                                        <div className={`text-xs mt-1 text-right ${msg.sender_id === user.id ? 'text-orange-200' : 'text-gray-500'}`}>{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSendMessage} className="p-4 border-t flex items-center gap-2 bg-gray-50 rounded-b-2xl">
                            <Input 
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Escribe tu mensaje..."
                                className="h-12 text-base"
                            />
                            <Button type="submit" size="icon" className="h-12 w-12 flex-shrink-0 bg-orange-500 hover:bg-orange-600">
                                <Send className="w-6 h-6" />
                            </Button>
                        </form>
                    </motion.div>
                </main>
            </div>
        </>
    );
};

export default ChatPage;
