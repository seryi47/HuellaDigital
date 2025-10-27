
import { createClient } from '@supabase/supabase-js';

// --- ATENCIÓN ---
// ¡No edites este archivo directamente!
// Las variables SUPABASE_URL y SUPABASE_ANON_KEY se inyectarán automáticamente
// cuando completes la integración de Supabase desde el panel de Hostinger Horizons.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Si las variables no están, usamos un cliente 'dummy' para evitar errores.
// Esto te permite desarrollar la UI sin tener la integración completa.
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        signInWithPassword: () => Promise.resolve({ error: { message: 'Supabase no configurado.' } }),
        signInWithOAuth: () => Promise.resolve({ error: { message: 'Supabase no configurado.' } }),
        signUp: () => Promise.resolve({ error: { message: 'Supabase no configurado.' } }),
        signOut: () => Promise.resolve(),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      from: () => ({
        select: () => Promise.resolve({ data: [], error: { message: 'Supabase no configurado.' } }),
        insert: () => Promise.resolve({ error: { message: 'Supabase no configurado.' } }),
        update: () => Promise.resolve({ error: { message: 'Supabase no configurado.' } }),
        delete: () => Promise.resolve({ error: { message: 'Supabase no configurado.' } }),
      }),
      storage: {
          from: () => ({
              upload: () => Promise.resolve({ error: { message: 'Supabase no configurado.' } }),
              getPublicUrl: () => ({ data: { publicUrl: '' } }),
          })
      }
    };
