
import { Product, Category } from '@/types/product';

export const categories: Category[] = [
  {
    id: "cat1",
    name: "Electronics",
    description: "The latest in tech innovation",
    imageUrl: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat2",
    name: "Home & Living",
    description: "Premium home essentials",
    imageUrl: "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat3",
    name: "Accessories",
    description: "Complete your look",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium materials for all-day comfort.",
    price: 349.99,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "cat1",
    rating: 4.8,
    stock: 15
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    description: "Stay connected with our latest smartwatch. Track your fitness, monitor your heart rate, and receive notifications right on your wrist.",
    price: 429.99,
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "cat1",
    rating: 4.7,
    stock: 8
  },
  {
    id: "3",
    name: "Minimalist Table Lamp",
    description: "Add a touch of elegance to your home with our minimalist table lamp. Features a dimming function and warm, ambient lighting.",
    price: 129.99,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "cat2",
    rating: 4.5,
    stock: 12
  },
  {
    id: "4",
    name: "Ceramic Plant Pot",
    description: "Handcrafted ceramic pot perfect for indoor plants. Each piece is unique with a modern, minimalist design.",
    price: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "cat2",
    rating: 4.6,
    stock: 20
  },
  {
    id: "5",
    name: "Leather Watch Strap",
    description: "Premium handcrafted leather watch strap. Made from full-grain Italian leather that ages beautifully over time.",
    price: 79.99,
    imageUrl: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "cat3",
    rating: 4.9,
    stock: 7
  },
  {
    id: "6",
    name: "Wireless Charging Pad",
    description: "Sleek, minimalist charging pad compatible with all Qi-enabled devices. Features fast charging and a non-slip surface.",
    price: 59.99,
    imageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "cat1",
    rating: 4.4,
    stock: 25
  },
  {
    id: "7",
    name: "Minimalist Wall Clock",
    description: "Simple, elegant wall clock with a silent sweep mechanism. Perfect for the modern home or office.",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "cat2",
    rating: 4.7,
    stock: 10
  },
  {
    id: "8",
    name: "Premium Sunglasses",
    description: "Polarized sunglasses with UV protection and a lightweight, durable frame. Stylish design for everyday wear.",
    price: 159.99,
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "cat3",
    rating: 4.8,
    stock: 9
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
  return products.slice(0, 4);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery)
  );
};
