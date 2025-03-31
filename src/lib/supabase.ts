
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from the client.ts file
import { supabase as supabaseClient } from '@/integrations/supabase/client';

// Export the supabase client directly
export const supabase = supabaseClient;

// Export flag for components to know if they should use fallback auth
export const shouldUseMockAuth = false;

// Re-export Profile type for use in components
// Using 'export type' instead of just 'export' to fix the isolatedModules error
export type { Profile } from '@/types/profile';

// Helper function to handle profile data with proper types
export const getTypedProfile = <T>(data: any): T => {
  return data as unknown as T;
};
