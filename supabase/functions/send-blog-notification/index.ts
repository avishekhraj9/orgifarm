
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const SUPABASE_URL = "https://gioyluxjweuicdlcknyv.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BlogNotificationRequest {
  blogId: string;
  blogTitle: string;
  blogSlug: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  
  try {
    const { blogId, blogTitle, blogSlug } = await req.json() as BlogNotificationRequest;
    
    // Store the notification in the database
    const { error: insertError } = await supabase
      .from('blog_notifications')
      .insert({
        blog_id: blogId,
        blog_title: blogTitle,
        notification_sent: false,
      })
      .select();
      
    if (insertError) {
      console.error("Error storing notification:", insertError);
      throw new Error("Failed to store blog notification");
    }
    
    // Get all subscribers
    const { data: subscribers, error: subscribersError } = await supabase
      .from('newsletter_subscribers')
      .select('email');
      
    if (subscribersError) {
      console.error("Error fetching subscribers:", subscribersError);
      throw new Error("Failed to fetch subscribers");
    }
    
    console.log(`Found ${subscribers.length} subscribers to notify about blog: ${blogTitle}`);
    
    // In a production environment, you would send actual emails here
    // For now, we'll just log the subscribers and update the notification status
    
    const blogUrl = `${req.headers.get("origin") || "https://yourwebsite.com"}/blog/${blogSlug}`;
    
    // Log what would be sent to each subscriber
    subscribers.forEach(subscriber => {
      console.log(`Would send email to ${subscriber.email} about new blog: "${blogTitle}" - ${blogUrl}`);
    });
    
    // Update notification as sent
    const { error: updateError } = await supabase
      .from('blog_notifications')
      .update({ notification_sent: true })
      .eq('blog_id', blogId);
      
    if (updateError) {
      console.error("Error updating notification status:", updateError);
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Notification for "${blogTitle}" sent to ${subscribers.length} subscribers` 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
    
  } catch (error) {
    console.error("Error in send-blog-notification function:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

serve(handler);
