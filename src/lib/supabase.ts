
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment variables or use defaults
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Authentication will not work properly.');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
