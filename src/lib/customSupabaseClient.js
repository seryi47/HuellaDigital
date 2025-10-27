import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wgolssvotrpczxgqdbrp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indnb2xzc3ZvdHJwY3p4Z3FkYnJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NTEzODMsImV4cCI6MjA3NzEyNzM4M30.8SLfo9a7CfXXTJYsO9XsKHReUSABMF2A37gBfP5Pyqw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);