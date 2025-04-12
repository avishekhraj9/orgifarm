
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Package, Image, Video, IndianRupee } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { addToCart } = useCart();
  const isMobile = useIsMobile();

  const hasAdditionalMedia = (product.additionalImages?.length > 0 || product.videoUrl);

  return (
    <div 
      className={cn(
        "product-card bg-white dark:bg-card rounded-xl overflow-hidden border border-border shadow-sm h-full flex flex-col",
        isMobile && "product-card-mobile",
        className
      )}
    >
      <Link to={`/product/${product.id}`} className="block overflow-hidden aspect-square relative">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 ease-apple hover:scale-105"
        />
        {hasAdditionalMedia && (
          <div className="absolute bottom-2 right-2 flex gap-1">
            {product.additionalImages?.length > 0 && (
              <span className="bg-black/70 text-white rounded-full p-1">
                <Image className="h-3 w-3" />
              </span>
            )}
            {product.videoUrl && (
              <span className="bg-black/70 text-white rounded-full p-1">
                <Video className="h-3 w-3" />
              </span>
            )}
          </div>
        )}
      </Link>
      <div className={cn("p-5 flex flex-col flex-grow", isMobile && "p-3")}>
        <Link to={`/product/${product.id}`} className="block">
          <h3 className={cn("font-medium hover:text-primary dark:text-white transition-colors", isMobile ? "text-sm mb-0.5 line-clamp-1" : "text-lg mb-1 truncate")}>{product.name}</h3>
        </Link>
        <div className={cn("flex items-center", isMobile ? "mb-1.5" : "mb-3")}>
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(product.rating) ? (
                  <svg className={cn(isMobile ? "w-3 h-3" : "w-4 h-4", "fill-current")} viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                ) : (
                  <svg className={cn(isMobile ? "w-3 h-3" : "w-4 h-4", "fill-current text-gray-300 dark:text-gray-600")} viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                )}
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">({product.rating})</span>
        </div>
        <p className={cn("font-semibold dark:text-white flex items-center", isMobile ? "text-sm mb-1.5" : "text-lg mb-3")}>
          <IndianRupee className={cn(isMobile ? "h-3 w-3 mr-1" : "h-4 w-4 mr-1")} />
          {product.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
        </p>
        <div className={cn("flex items-center text-xs mb-2", product.stock > 10 ? "text-green-600" : product.stock > 0 ? "text-amber-500" : "text-red-500")}>
          <Package className={cn(isMobile ? "h-3 w-3 mr-1" : "h-4 w-4 mr-2")} /> 
          {product.stock > 10 ? (
            <span>In Stock</span>
          ) : product.stock > 0 ? (
            <span>Low Stock: {product.stock} left</span>
          ) : (
            <span>Out of Stock</span>
          )}
        </div>
        <p className={cn("text-muted-foreground dark:text-gray-300 line-clamp-2 flex-grow", isMobile ? "text-xs mb-2" : "text-sm mb-4")}>
          {product.description}
        </p>
        <div className="mt-auto">
          <Button 
            onClick={() => addToCart(product)}
            className="w-full group"
            size={isMobile ? "sm" : "default"}
            disabled={product.stock === 0}
          >
            <ShoppingCart className={cn("group-hover:animate-pulse", isMobile ? "h-3 w-3 mr-1" : "h-4 w-4 mr-2")} /> 
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
