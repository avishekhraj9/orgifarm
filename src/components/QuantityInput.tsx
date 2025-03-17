
import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuantityInputProps {
  quantity: number;
  onChange: (quantity: number) => void;
  max?: number;
  className?: string;
}

const QuantityInput: React.FC<QuantityInputProps> = ({ 
  quantity, 
  onChange, 
  max = 99,
  className
}) => {
  const increment = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 1;
    onChange(Math.max(1, Math.min(max, value)));
  };

  return (
    <div className={cn("flex items-center border border-input rounded-md h-10", className)}>
      <Button 
        type="button"
        variant="ghost" 
        size="icon" 
        className="h-full rounded-none rounded-l-md border-r border-input"
        onClick={decrement}
        disabled={quantity <= 1}
      >
        <Minus className="h-3 w-3" />
      </Button>
      
      <input
        type="number"
        min={1}
        max={max}
        value={quantity}
        onChange={handleInputChange}
        className="h-full w-12 text-center focus:outline-none bg-transparent"
      />
      
      <Button 
        type="button"
        variant="ghost" 
        size="icon" 
        className="h-full rounded-none rounded-r-md border-l border-input"
        onClick={increment}
        disabled={quantity >= max}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default QuantityInput;
