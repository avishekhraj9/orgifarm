
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { addToCart } = useCart();

  return (
    <div 
      className={cn(
        "product-card bg-white rounded-xl overflow-hidden border border-border shadow-sm h-full flex flex-col",
        className
      )}
    >
      <Link to={`/product/${product.id}`} className="block overflow-hidden aspect-square">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 ease-apple hover:scale-105"
        />
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-medium mb-1 truncate hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(product.rating) ? (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 fill-current text-gray-300" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                )}
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.rating})</span>
        </div>
        <p className="text-lg font-semibold mb-3">₹{(product.price * 75).toFixed(2)}</p>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        <div className="mt-auto">
          <Button 
            onClick={() => addToCart(product)}
            className="w-full group"
          >
            <ShoppingCart className="mr-2 h-4 w-4 group-hover:animate-pulse" /> 
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
