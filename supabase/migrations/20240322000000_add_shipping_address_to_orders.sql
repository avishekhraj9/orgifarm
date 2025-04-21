-- Add shipping address columns to orders table
ALTER TABLE orders
ADD COLUMN name TEXT,
ADD COLUMN address_street TEXT,
ADD COLUMN address_city TEXT,
ADD COLUMN address_state TEXT,
ADD COLUMN address_postal_code TEXT,
ADD COLUMN address_country TEXT;

-- Add comments
COMMENT ON COLUMN orders.name IS 'Full name of the shipping recipient';
COMMENT ON COLUMN orders.address_street IS 'Street address for shipping';
COMMENT ON COLUMN orders.address_city IS 'City for shipping address';
COMMENT ON COLUMN orders.address_state IS 'State/province for shipping address';
COMMENT ON COLUMN orders.address_postal_code IS 'Postal code for shipping address';
COMMENT ON COLUMN orders.address_country IS 'Country for shipping address'; 