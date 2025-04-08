
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
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }]);
    
    if (error) {
      if (error.code === '23505') {
        return { success: true, message: 'You are already subscribed to our newsletter!' };
      }
      throw error;
    }
    
    return { success: true, message: 'Thank you for subscribing to our newsletter!' };
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
