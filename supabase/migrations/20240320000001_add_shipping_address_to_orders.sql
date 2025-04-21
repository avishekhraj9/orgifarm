-- Add shipping address columns to orders table
ALTER TABLE orders
ADD COLUMN shipping_name text,
ADD COLUMN shipping_street text,
ADD COLUMN shipping_city text,
ADD COLUMN shipping_state text,
ADD COLUMN shipping_postal_code text,
ADD COLUMN shipping_country text;

-- Add comment to explain the columns
COMMENT ON COLUMN orders.shipping_name IS 'Full name of the shipping recipient';
COMMENT ON COLUMN orders.shipping_street IS 'Street address for shipping';
COMMENT ON COLUMN orders.shipping_city IS 'City for shipping address';
COMMENT ON COLUMN orders.shipping_state IS 'State/Province for shipping address';
COMMENT ON COLUMN orders.shipping_postal_code IS 'Postal/ZIP code for shipping address';
COMMENT ON COLUMN orders.shipping_country IS 'Country for shipping address'; 