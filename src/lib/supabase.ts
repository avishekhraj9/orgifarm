
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { supabase as supabaseClient } from '@/integrations/supabase/client';

// Export the supabase client directly for use in components
export const supabase = supabaseClient;

// Log Supabase initialization for debugging
console.log('Supabase client initialized from lib/supabase.ts');

// Export flag for components to know if they should use fallback auth
export const shouldUseMockAuth = false;

// Re-export Profile type for use in components
export type { Profile } from '@/types/profile';

// Helper function to handle profile data with proper types
export const getTypedProfile = <T>(data: any): T => {
  return data as unknown as T;
};
