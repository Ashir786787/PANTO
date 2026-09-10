export type ProductCategory = "Chair" | "Beds" | "Sofa" | "Lamp";

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  rating: number;
  image: string;
  tier?: "sample" | "premium";
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  photo: string;
  avatar: string;
  avatarBoost?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
