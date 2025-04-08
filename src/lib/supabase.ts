
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

// Newsletter subscription helper
export const subscribeToNewsletter = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('Attempting to subscribe email:', email);
    
    // Call the Edge Function instead of direct DB access
    const { data, error } = await supabase.functions.invoke('add-newsletter-subscriber', {
      body: { email },
    });
    
    // Log the complete response for debugging
    console.log('Subscription response:', { data, error });
    
    if (error) {
      console.error('Subscription error:', error);
      return { success: false, message: 'Failed to subscribe. Please try again later.' };
    }
    
    // Return the response from the edge function
    return data as { success: boolean; message: string };
    
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return { success: false, message: 'Failed to subscribe. Please try again later.' };
  }
};

// Blog notification helper
export const sendBlogNotification = async (blogId: string, blogTitle: string, blogSlug: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch('https://gioyluxjweuicdlcknyv.supabase.co/functions/v1/send-blog-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ blogId, blogTitle, blogSlug }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to send blog notification');
    }
    
    return { success: true, message: data.message || 'Blog notification sent successfully' };
  } catch (error) {
    console.error('Error sending blog notification:', error);
    return { success: false, message: 'Failed to send blog notification. Please try again later.' };
  }
};
