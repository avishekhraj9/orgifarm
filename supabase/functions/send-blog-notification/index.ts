
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "https://gioyluxjweuicdlcknyv.supabase.co";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get request data
    const { blogId, blogTitle, blogSlug } = await req.json();

    if (!blogId || !blogTitle || !blogSlug) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Processing notification for blog: ${blogTitle} (${blogId})`);

    // Check if notification already exists
    const { data: existingNotification } = await supabase
      .from("blog_notifications")
      .select("*")
      .eq("blog_id", blogId)
      .eq("notification_sent", true)
      .maybeSingle();

    if (existingNotification) {
      console.log(`Notification already sent for blog: ${blogTitle}`);
      return new Response(
        JSON.stringify({ message: "Notification already sent" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get all newsletter subscribers
    const { data: subscribers, error: subscribersError } = await supabase
      .from("newsletter_subscribers")
      .select("email");

    if (subscribersError) {
      console.error("Error fetching subscribers:", subscribersError);
      throw subscribersError;
    }

    if (!subscribers || subscribers.length === 0) {
      console.log("No subscribers found");
      return new Response(
        JSON.stringify({ message: "No subscribers found" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Found ${subscribers.length} subscribers to notify`);

    // In a production environment, you would integrate with an email service
    // like Resend, SendGrid, or a similar service to send actual emails.
    // For this example, we'll just log the emails that would be sent.
    
    for (const subscriber of subscribers) {
      console.log(`Would send email to: ${subscriber.email} about new blog: ${blogTitle}`);
      // In production:
      // await emailService.send({
      //   to: subscriber.email,
      //   subject: `New Blog Post: ${blogTitle}`,
      //   html: `<p>Check out our latest blog post: <a href="https://yourdomain.com/blog/${blogSlug}">${blogTitle}</a></p>`
      // });
    }

    // Create or update the notification record
    const { error: notificationError } = await supabase
      .from("blog_notifications")
      .upsert([
        {
          blog_id: blogId,
          blog_title: blogTitle,
          notification_sent: true,
        }
      ]);

    if (notificationError) {
      console.error("Error updating notification status:", notificationError);
      throw notificationError;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Notification processed for ${subscribers.length} subscribers` 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in send-blog-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
