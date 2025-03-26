
import { Product, Category } from '@/types/product';

export const categories: Category[] = [
  {
    id: "cat1",
    name: "Pickles",
    description: "Traditional handcrafted Indian pickles",
    imageUrl: "/img/diced_mango_prickle.jpg"
  },
  {
    id: "cat2",
    name: "Ghee",
    description: "Pure organic traditional ghee",
    imageUrl: "https://images.unsplash.com/photo-1631633123000-d24861360a33?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cat3",
    name: "Jams",
    description: "Homemade preserves and fruit jams",
    imageUrl: "https://images.unsplash.com/photo-1597314040916-84b439aebac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

export const products: Product[] = [
  {
    id: "1",
    name: "Mango Pickle",
    description: "Traditional handcrafted mango pickle made with organic raw mangoes, premium spices, and cold-pressed mustard oil. A perfect blend of tangy and spicy flavors.",
    price: 299.99,
    imageUrl: "/img/diced_mango_prickle.jpg",
    category: "cat1",
    rating: 4.8,
    stock: 25
  },
  {
    id: "2",
    name: "Lemon Pickle",
    description: "Tangy and zesty lemon pickle prepared with organic lemons and traditional spices. Perfect accompaniment for Indian meals and snacks.",
    price: 249.99,
    imageUrl: "https://images.unsplash.com/photo-1564193945699-23d43b8d505b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "cat1",
    rating: 4.7,
    stock: 18
  },
  {
    id: "3",
    name: "Chilly Pickle",
    description: "Spicy and flavorful chilly pickle made with fresh green chilies, aromatic spices, and pure mustard oil. Adds a fiery kick to any meal.",
    price: 199.99,
    imageUrl: "/img/greem_chilli_pickle.jpg",
    category: "cat1",
    rating: 4.5,
    stock: 22
  },
  {
    id: "4",
    name: "Pure Cow Ghee",
    description: "Traditional A2 cow ghee made using the ancient bilona method. Rich in aroma and essential nutrients with a golden hue and nutty flavor.",
    price: 749.99,
    imageUrl: "https://images.unsplash.com/photo-1631633123000-d24861360a33?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "cat2",
    rating: 4.9,
    stock: 15
  },
  {
    id: "5",
    name: "Buffalo Ghee",
    description: "Premium buffalo ghee with rich texture and authentic flavor. Made through slow cooking process to retain all natural nutrients and aroma.",
    price: 699.99,
    imageUrl: "https://images.unsplash.com/photo-1631633144046-d37f18d36618?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "cat2",
    rating: 4.7,
    stock: 12
  },
  {
    id: "6",
    name: "Mixed Fruit Jam",
    description: "Delicious homemade jam with a blend of seasonal fruits. No artificial preservatives or colors, just pure fruit goodness in every spoon.",
    price: 349.99,
    imageUrl: "https://images.unsplash.com/photo-1597314040916-84b439aebac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "cat3",
    rating: 4.6,
    stock: 20
  },
  {
    id: "7",
    name: "Strawberry Jam",
    description: "Sweet and luscious strawberry jam made with handpicked organic strawberries. Perfect for breakfast spreads and dessert toppings.",
    price: 399.99,
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "cat3",
    rating: 4.8,
    stock: 16
  },
  {
    id: "8",
    name: "Orange Marmalade",
    description: "Tangy and sweet orange marmalade with bits of orange zest. Handcrafted in small batches to ensure finest quality and flavor.",
    price: 379.99,
    imageUrl: "https://images.unsplash.com/photo-1591994843349-f415893b3a6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "cat3",
    rating: 4.7,
    stock: 14
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
