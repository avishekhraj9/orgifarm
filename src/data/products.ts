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
    imageUrl: "/img/cow_ghee.png"},
  // {
  //   id: "cat3",
  //   name: "Jams",
  //   description: "Homemade preserves and fruit jams",
  //   imageUrl: "/img/litchi_honey.jpg"
  // },
  {
    id: "cat4",
    name: "Honey",
    description: "Pure organic natural honey varieties",
    imageUrl: "/img/himalyan_multi_floral_honey.jpg"
  }
];

export const products: Product[] = [
  {
    id: "1",
    name: "Diced Mango Pickle",
    description: "Traditional handcrafted mango pickle made with organic raw mangoes, premium spices, and cold-pressed mustard oil. A perfect blend of tangy and spicy flavors.",
    price: 225,
    imageUrl: "/img/diced_mango_prickle.jpg",
    additionalImages: ["/img/diced_mango_pickle.jpg", "/img/mango_pickle_ingredients.jpg"],
    
    category: "cat1",
    rating: 4.8,
    stock: 25
  },
  {
    id: "2",
    name: "Spicy Lemon Pickle",
    description: "Tangy and zesty lemon pickle prepared with organic lemons and traditional spices. Perfect accompaniment for Indian meals and snacks.",
    price: 215,
    imageUrl: "/img/spicy_lemon_pickle.jpg",
    additionalImages: ["/img/lemon_pickle_jar.jpg", "/img/lemon_pickle_serving.jpg"],
   
    category: "cat1",
    rating: 4.7,
    stock: 18
  },
  {
    id: "3",
    name: "Chilly Pickle",
    description: "Spicy and flavorful chilly pickle made with fresh green chilies, aromatic spices, and pure mustard oil. Adds a fiery kick to any meal.",
    price: 149,
    imageUrl: "/img/green_chilli_pickle.jpg",
    additionalImages: ["/img/green_chilli_pickle1.jpg", "/img/green_chilli_pickle.jpg"],
    
    category: "cat1",
    rating: 4.5,
    stock: 22
  },
  {
    id: "4",
    name: "Cow Ghee",
    description: "Pure cow ghee made from the milk of grass-fed cows. Rich in nutrients and flavor, perfect for cooking and enhancing the taste of your dishes.",
    price: 750,
    imageUrl: "img/cow_ghee.png",
    additionalImages: ["/img/cow_ghee.png", "/img/cow_ghee.png"],
    category: "cat2",
    rating: 4.9,
    stock: 15
  },
  {
    id: "9",
    name: "Himalayan Multi Floral Honey",
    description: "Pure and natural honey harvested from the pristine Himalayan mountains. This multi-floral honey offers complex flavors and rich nutritional benefits from diverse wildflowers.",
    price: 899,
    imageUrl: "/img/himalyan_multi_floral_honey.jpg",
    additionalImages: ["/img/Himalayan Multifloral Honey (2).png", "/img/Himalayan Multifloral Honey (3).png"],
    category: "cat4",
    rating: 4.9,
    stock: 20
  },
  {
    id: "10",
    name: "Litchi Honey",
    description: "Exquisite monofloral honey produced from litchi blossoms. Features a delicate floral aroma with distinctive fruity notes and a smooth, light amber color.",
    price: 750,
    imageUrl: "/img/litchi_honey.jpg",
    additionalImages: ["/img/Litch Honey (2).png", "/img/Litch Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 15
  },
  {
    id: "11",
    name: "Berry Honey",
    description: "Premium honey collected from bees that predominantly pollinate berry flowers. Offers a unique berry-infused sweetness with subtle tartness and a rich amber hue.",
    price: 825,
    imageUrl: "/img/Berry_honey.jpg",
    additionalImages: ["/img/Berry Honey (2).png", "/img/Berry Honey (3).png"],
    category: "cat4",
    rating: 4.7,
    stock: 18
  },
  {
    id: "12",
    name: "Boiled Gooseberry Pickle",
    description: "Traditional Indian pickle made with boiled gooseberries, spices, and mustard oil. A tangy and spicy condiment that pairs well with rice and roti.",
    price: 185,
    imageUrl: "/img/boiled_gooseberry_pickle.png",
    additionalImages: ["/img/boiled_gooseberry_pickle.png", "/img/boiled_gooseberry_pickle.png"],
    category: "cat1",
    rating: 4.6,
    stock: 22
  },
  {
    id: "13",
    name: "Aswagandha Honey",
    description: "Unique honey infused with ashwagandha, known for its adaptogenic properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/ashwagandh_honey.jpg",
    additionalImages: ["/img/Ashwagandha Honey (2).png", "/img/Ashwagandha Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "14",
    name: "Crushed Mango Pickle",
    description: "Sweet and tangy Indian pickle made with crushed mango, spices, and mustard oil. A delightful condiment that adds flavor to any meal.",
    price: 225,
    imageUrl: "/img/crushed_mango_pickle.jpg",
    additionalImages: ["/img/crushed_mango_pickle.jpg", "/img/crushed_mango_pickle.jpg"],
    category: "cat1",
    rating: 4.7,
    stock: 16
  },
  {
    id: "15",
    name: "Ginger Garlic Pickle",
    description: "Spicy and aromatic ginger garlic pickle made with fresh ginger, garlic, and traditional spices. A perfect accompaniment for Indian meals.",
    price: 225,
    imageUrl: "/img/ginger_garlic_pickle.jpg",
    additionalImages: ["/img/Ginger Honey (2).png", "/img/Ginger Honey (3).png"],
    category: "cat1",
    rating: 4.5,
    stock: 20
  },
  {
    id: "16",
    name: "Green Chilli Pickle",
    description: "Spicy and tangy green chilli pickle made with fresh green chilies, spices, and mustard oil. Adds a fiery kick to your meals.",
    price: 185,
    imageUrl: "/img/green_chilli_pickle.jpg",
    additionalImages: ["/img/green_chilli_pickle1.jpg", "/img/green_chilli_pickle.jpg"],
    category: "cat1",
    rating: 4.6,
    stock: 18
  },
  {
    id: "17",
    name: "Jackfruit Pickle",
    description: "Tangy and zesty jackfruit pickle made with raw jackfruit, spices, and mustard oil. A unique and flavorful condiment for Indian meals.",
    price: 225,
    imageUrl: "/img/jackfruit_pickle.jpg",
    additionalImages: ["/img/jackfruit_pickle.jpg", "/img/jackfruit_pickle.jpg"],
    category: "cat1",
    rating: 4.7,
    stock: 22
  },
  {
    id: "18",
    name: "Red Chilli Pickle",
    description: "Spicy and tangy red chilli pickle made with dried red chilies, spices, and mustard oil. A perfect condiment for adding heat to your meals.",
    price: 185,
    imageUrl: "/img/red_chilli_pickle.jpg",
    additionalImages: ["/img/red_chilli_pickle_2.jpg", "/img/red_chilli_pickle.jpg"],
    category: "cat1",
    rating: 4.5,
    stock: 15
  },
  {
    id: "19",
    name: "Ajwain Honey",
    description: "Unique honey infused with ajwain, known for its digestive properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/ajwain_honey.png",
    additionalImages: ["img/Ajwain Honey (2).png", "/img/Ajwain Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "20",
    name: "Amla Honey",
    description: "Unique honey infused with amla, known for its antioxidant properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/amla_honey.png",
    additionalImages: ["/img/Amla Honey (2).png", "/img/Amla Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "21",
    name: "Babool Honey",
    description: "Unique honey infused with babool, known for its anti-inflammatory properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/babool_honey.png",
    additionalImages: ["/img/Babool Honey (2).png", "/img/Babool Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "22",
    name: "Black Forest Honey",
    description: "Unique honey infused with black forest, known for its antioxidant properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/black_forest_honey.png",
    additionalImages: ["/img/Black Forest Honey (2).png", "/img/Black Forest Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "23",
    name: "Brankut Honey",
    description: "Unique honey infused with brankut, known for its anti-inflammatory properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/brankut_honey.png",
    additionalImages: ["/img/Brankut Honey (2).png", "/img/Brankut Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  { 
    id: "24",
    name: "Chococlate Honey",
    description: "Unique honey infused with chococlate, known for its antioxidant properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/chocolate_honey.png",
    additionalImages: ["/img/Chocolate Honey (2).png", "/img/Chocolate Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "25",
    name: "Cinnamon Honey",
    description: "Unique honey infused with cinnamon, known for its anti-inflammatory properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/cinnamon_honey.png",
    additionalImages: ["/img/Cinnamon Honey (2).png", "/img/Cinnamon Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "26",
    name: "Clove Honey",
    description: "Unique honey infused with clove, known for its antioxidant properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/clover_honey.png",
    additionalImages: ["/img/Clover Honey (2).png", "/img/Clover Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "27",
    name: "Coffee Honey",
    description: "Unique honey infused with coffee, known for its antioxidant properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/coffee_honey.png",
    additionalImages: ["/img/Coffee Honey (2).png", "/img/Coffee Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "28",
    name: "Coriander Honey",
    description: "Unique honey infused with coriander, known for its antioxidant properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/coriander_honey.png",
    additionalImages: ["/img/Coriander Honey (2).png", "/img/Coriander Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "29",
    name: "Eucalyptus Honey",
    description: "Unique honey infused with eucalyptus, known for its anti-inflammatory properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/eucalptus_honey.png",
    additionalImages: ["/img/Eucalyptus Honey (2).png", "/img/Eucalyptus Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "30",
    name: "Ginger Honey",
    description: "Unique honey infused with ginger, known for its antioxidant properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/ginger_honey.png",
    additionalImages: ["/img/Ginger Honey (2).png", "/img/Ginger Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "31",
    name: "Karanj Honey",
    description: "Unique honey infused with karanj, known for its anti-inflammatory properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/karanj_honey.png",
    additionalImages: ["/img/Karanj Honey (2).png", "/img/Karanj Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "32",
    name: "Lemon Honey",
    description: "Unique honey infused with lemon, known for its antioxidant properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/lemon_honey.png",
    additionalImages: ["/img/Lemon Honey (2).png", "/img/Lemon Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "33",
    name: "Keekar Honey",
    description: "Unique honey infused with keekar, known for its anti-inflammatory properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/keekar_honey.png",
    additionalImages: ["/img/Keekar Honey (2).png", "/img/Keekar Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "34",
    name: "Lichi Honey",
    description: "Unique honey infused with lichi, known for its antioxidant properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/lichi_honey.png",
    additionalImages: ["/img/Litch Honey (2).png", "/img/Litch Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "35",
    name: "Mangrove Honey",
    description: "Unique honey infused with mangrove, known for its anti-inflammatory properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/mangrove_honey.png",
    additionalImages: ["/img/mangrove_honey.png", "/img/mangrove_honey.png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "36",
    name:"Moringa Honey",
    description: "Unique honey infused with moringa, known for its antioxidant properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/moringa_honey.png",
    additionalImages: ["/img/Moringa Honey.png", "/img/Moringa Honey.png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "37",
    name: "Mustard Honey",
    description: "Unique honey infused with mustard, known for its anti-inflammatory properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/mustard_honey.png",
    additionalImages: ["/img/Mustard Honey (2).png", "/img/Mustard Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "38",
    name: "Mustard Lime Pickle",
    description: "Tangy and spicy mustard lime pickle made with fresh limes, mustard seeds, and spices. A perfect condiment for Indian meals.",
    price: 185,
    imageUrl: "/img/mustard_lime_pickle.jpg",
    additionalImages: ["/img/mustard_lime_pickle.jpg", "/img/mustard_lime_pickle.jpg"],
    category: "cat1",
    rating: 4.6,
    stock: 18
  },
  {
    id: "39",
    name: "Red Honey",
    description: "Unique honey infused with red flowers, known for its antioxidant properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/red_honey.png",
    additionalImages: ["/img/Red Honey (2).png", "/img/Red Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "40",
    name: "Saunf Honey",
    description: "Unique honey infused with saunf, known for its digestive properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/saunf_honey.png",
    additionalImages: ["/img/Saunf Honey (2).png", "/img/Saunf Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "41",
    name: "Shisham Honey",
    description: "Unique honey infused with shisham, known for its anti-inflammatory properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/shisham_honey.png",
    additionalImages: ["/img/Shisham Honey (2).png", "/img/Shisham Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "42",
    name: "Sunflower Honey",
    description: "Unique honey infused with sunflower, known for its antioxidant properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/sunflower_honey.png",
    additionalImages: ["/img/Sunflower Honey (2).png", "/img/Sunflower Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "43",
    name: "Tulsi Honey",
    description: "Unique honey infused with tulsi, known for its medicinal properties. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/tulsi_honey.png",
    additionalImages: ["/img/Tulsi Honey (3).png", "/img/Tulsi Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "44",
    name: "Vanilla Honey",
    description: "Unique honey infused with vanilla, known for its sweet and creamy flavor. Offers a rich, earthy flavor with potential health benefits.",
    price: 675,
    imageUrl: "/img/vanilla_honey.png",
    additionalImages: ["/img/Vanilla Honey (2).png", "/img/Vanilla Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
  },
  {
    id: "45",
    name: "Wild Berry Honey",
    description : "Unique honey infused with wild berry, known for its tangy and sweet flavor.",
    price: 675,
    imageUrl: "/img/wild_berry_honey.png",
    additionalImages: ["/img/Wild Berry Honey (2).png", "/img/Wild Berry Honey (3).png"],
    category: "cat4",
    rating: 4.8,
    stock: 12
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
