-- Create products table
CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    category TEXT,
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add indexes
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_name ON products(name);

-- Add comments
COMMENT ON TABLE products IS 'Stores product information';
COMMENT ON COLUMN products.name IS 'Name of the product';
COMMENT ON COLUMN products.description IS 'Description of the product';
COMMENT ON COLUMN products.price IS 'Price of the product';
COMMENT ON COLUMN products.image_url IS 'URL of the product image';
COMMENT ON COLUMN products.category IS 'Category of the product';
COMMENT ON COLUMN products.stock IS 'Current stock level'; 