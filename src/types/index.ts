
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  description: string;
  specifications: {
    engine: string;
    displacement: string;
    power: string;
    torque: string;
    fuelCapacity: string;
    weight: string;
    topSpeed: string;
    acceleration: string;
  };
  features: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
  discount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  shippingAddress: Address;
  paymentMethod: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface FilterState {
  brands: string[];
  priceRange: [number, number];
  categories: string[];
  inStock: boolean;
  sortBy: 'name' | 'price-low' | 'price-high' | 'rating' | 'newest';
}
