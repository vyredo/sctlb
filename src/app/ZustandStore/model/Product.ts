export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  imageSequence: string[];
}
