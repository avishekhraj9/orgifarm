
-- Create a function to add a newsletter subscriber
CREATE OR REPLACE FUNCTION public.add_newsletter_subscriber(subscriber_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_id UUID;
BEGIN
  -- Check if email already exists
  IF EXISTS (SELECT 1 FROM public.newsletter_subscribers WHERE email = subscriber_email) THEN
    RETURN TRUE; -- Already subscribed
  END IF;
  
  -- Insert new subscriber
  INSERT INTO public.newsletter_subscribers (email)
  VALUES (subscriber_email)
  RETURNING id INTO new_id;
  
  RETURN new_id IS NOT NULL;
EXCEPTION
  WHEN unique_violation THEN
    RETURN TRUE; -- Handle race condition
  WHEN OTHERS THEN
    RAISE;
END;
$$;
