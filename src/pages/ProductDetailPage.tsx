import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart, ShoppingCart, Check, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '@/components/ProductCard';
import PageLayout from '@/components/PageLayout';
import QuantityInput from '@/components/QuantityInput';
import { getProductById, products, categories } from '@/data/products';
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  
  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct);
      setCurrentImageIndex(0);
      setShowVideo(false);
      
      if (foundProduct) {
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
    return null;
  }

  const allImages = [product.imageUrl, ...(product.additionalImages || [])];
  
  const nextImage = () => {
    setShowVideo(false);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  };
  
  const prevImage = () => {
    setShowVideo(false);
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length);
  };
  
  const handleAddToCart = () => {
    setIsAdding(true);
    
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
        <div className="space-y-4">
          <div className="bg-white rounded-xl overflow-hidden border border-border shadow-sm relative aspect-square">
            {showVideo && product.videoUrl ? (
              <iframe 
                src={product.videoUrl} 
                className="w-full h-full"
                title={`${product.name} video`} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            ) : (
              <>
                <img 
                  src={allImages[currentImageIndex]} 
                  alt={`${product.name} - image ${currentImageIndex + 1}`} 
                  className="w-full h-full object-cover"
                />
                {allImages.length > 1 && (
                  <>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {allImages.map((image, index) => (
              <button
                key={`img-${index}`}
                className={`flex-shrink-0 border-2 rounded overflow-hidden w-16 h-16 transition-all ${
                  !showVideo && currentImageIndex === index ? 'border-primary' : 'border-transparent hover:border-gray-300'
                }`}
                onClick={() => {
                  setShowVideo(false);
                  setCurrentImageIndex(index);
                }}
              >
                <img 
                  src={image} 
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover" 
                />
              </button>
            ))}
            
            {product.videoUrl && (
              <button
                className={`flex-shrink-0 border-2 rounded overflow-hidden w-16 h-16 bg-gray-100 flex items-center justify-center transition-all ${
                  showVideo ? 'border-primary' : 'border-transparent hover:border-gray-300'
                }`}
                onClick={() => setShowVideo(true)}
              >
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            )}
          </div>
        </div>
        
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
            <p className="text-2xl font-bold">₹{product.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
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
                Experience authentic flavors with our {product.name}.
                Crafted with traditional recipes and premium ingredients, this product
                brings the taste of homemade goodness to your table.
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
                We offer free shipping on all orders over ₹500. Orders typically ship within
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
                    <span className="font-medium">Free Shipping:</span> Orders over ₹500
                  </div>
                  <div>
                    <span className="font-medium">International:</span> Currently unavailable
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
                    <span className="font-medium">Rahul M.</span>
                    <span className="text-sm text-muted-foreground ml-2">3 weeks ago</span>
                  </div>
                  <p>Absolutely love this product! The authentic taste reminds me of my grandmother's recipes. The quality is outstanding.</p>
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
                    <span className="font-medium">Anita T.</span>
                    <span className="text-sm text-muted-foreground ml-2">1 month ago</span>
                  </div>
                  <p>Great product overall. The taste is authentic and it works exactly as described. Would definitely recommend.</p>
                </div>
              </div>
              
              <Button className="w-full">Write a Review</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
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

export default ProductDetailPage;
