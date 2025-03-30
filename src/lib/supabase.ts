
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment variables or use defaults
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Check if we have valid (non-placeholder) credentials
const hasValidCredentials = 
  supabaseUrl !== 'https://placeholder-url.supabase.co' && 
  supabaseAnonKey !== 'placeholder-key';

if (!hasValidCredentials) {
  console.warn('Supabase credentials not found. Using mock authentication fallback.');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export flag for components to know if they should use fallback auth
export const shouldUseMockAuth = !hasValidCredentials;
