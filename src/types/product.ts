
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
  stock: number;
};

export type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  shippingAddress: Address;
  paymentMethod: string;
};

export type OrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
};

export type Address = {
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};
