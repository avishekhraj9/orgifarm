
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from the client.ts file
import { supabase as supabaseClient } from '@/integrations/supabase/client';

// Export the supabase client directly
export const supabase = supabaseClient;

// Export flag for components to know if they should use fallback auth
export const shouldUseMockAuth = false;
