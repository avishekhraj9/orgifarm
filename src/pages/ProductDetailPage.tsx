
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart, ShoppingCart, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '@/components/ProductCard';
import PageLayout from '@/components/PageLayout';
import QuantityInput from '@/components/QuantityInput';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(id ? getProductById(id) : null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  
  // Fetch product and similar products
  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct);
      
      if (foundProduct) {
        // Get similar products (same category, excluding current)
        const similar = products
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setSimilarProducts(similar);
      } else {
        navigate('/products', { replace: true });
      }
    }
  }, [id, navigate]);
  
  if (!product) {
    return null; // Will redirect in useEffect
  }
  
  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Simulate a slight delay for the animation
    setTimeout(() => {
      addToCart(product, quantity);
      setIsAdding(false);
    }, 500);
  };
  
  const handleWishlist = () => {
    toast.success('Added to wishlist', {
      description: `${product.name} has been added to your wishlist`,
    });
  };
  
  return (
    <PageLayout>
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="mb-4" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <nav className="flex text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Product Image */}
        <div className="bg-white rounded-xl overflow-hidden border border-border shadow-sm">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-auto object-cover"
          />
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold mb-3">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4"
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.rating} stars)</span>
            </div>
            <p className="text-2xl font-bold">₹{(product.price * 75).toFixed(2)}</p>
          </div>
          
          <div className="border-t border-b py-6 border-border">
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Quantity</span>
              <QuantityInput 
                quantity={quantity} 
                onChange={setQuantity} 
                max={product.stock}
              />
            </div>
            
            <div className={`flex items-center ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {product.stock > 0 ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  <span>{product.stock} in stock</span>
                </>
              ) : (
                <>
                  <AlertCircle className="mr-2 h-4 w-4" />
                  <span>Out of stock</span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="flex-1 group"
              disabled={product.stock === 0 || isAdding}
              onClick={handleAddToCart}
            >
              {isAdding ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </div>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4 group-hover:animate-pulse" /> 
                  Add to Cart
                </>
              )}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="flex-1 sm:flex-none" 
              onClick={handleWishlist}
            >
              <Heart className="mr-2 h-4 w-4" /> Wishlist
            </Button>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="mb-16">
        <Tabs defaultValue="details">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-6 p-6 border rounded-md">
            <h3 className="text-lg font-medium mb-4">Product Details</h3>
            <div className="space-y-4">
              <p>
                Experience the perfect blend of form and function with our {product.name}.
                Crafted with premium materials and attention to detail, this product
                is designed to enhance your everyday life while maintaining a minimalist aesthetic.
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <div>
                  <span className="font-medium">Category:</span> {
                    categories.find(c => c.id === product.category)?.name || 'General'
                  }
                </div>
                <div>
                  <span className="font-medium">Rating:</span> {product.rating}/5
                </div>
                <div>
                  <span className="font-medium">Stock:</span> {product.stock} units
                </div>
                <div>
                  <span className="font-medium">SKU:</span> {product.id}-{product.name.substring(0, 3).toUpperCase()}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="mt-6 p-6 border rounded-md">
            <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
            <div className="space-y-4">
              <p>
                We offer free standard shipping on all orders over $50. Orders typically ship within
                1-2 business days and arrive within 3-5 business days depending on your location.
              </p>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  <div>
                    <span className="font-medium">Standard Shipping:</span> 3-5 business days
                  </div>
                  <div>
                    <span className="font-medium">Express Shipping:</span> 1-2 business days
                  </div>
                  <div>
                    <span className="font-medium">Free Shipping:</span> Orders over $50
                  </div>
                  <div>
                    <span className="font-medium">International:</span> 7-14 business days
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6 p-6 border rounded-md">
            <h3 className="text-lg font-medium mb-4">Customer Reviews</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <div className="text-4xl font-bold">{product.rating}</div>
                  <div className="text-xl">/5</div>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5"
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">Based on 24 reviews</div>
              </div>
              
              <div className="space-y-4">
                {/* Sample reviews */}
                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4"
                          fill={i < 5 ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="font-medium">Alex M.</span>
                    <span className="text-sm text-muted-foreground ml-2">3 weeks ago</span>
                  </div>
                  <p>Absolutely love this product! The minimalist design fits perfectly with my home decor, and the quality is outstanding.</p>
                </div>
                
                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4"
                          fill={i < 4 ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="font-medium">Jessica T.</span>
                    <span className="text-sm text-muted-foreground ml-2">1 month ago</span>
                  </div>
                  <p>Great product overall. The design is beautiful and it works exactly as described. Would definitely recommend.</p>
                </div>
              </div>
              
              <Button className="w-full">Write a Review</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </PageLayout>
  );
};

// Adding this at the top level to prevent reference errors
const categories = [
  { id: "cat1", name: "Electronics" },
  { id: "cat2", name: "Home & Living" },
  { id: "cat3", name: "Accessories" }
];

export default ProductDetailPage;
