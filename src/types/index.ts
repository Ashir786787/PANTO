export interface Product {
  id: number;
  name: string;
  category: "Sofa" | "Chair" | "Table" | "Cabinet";
  price: number;
  rating: number;
  image: string;
  stock: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  photo: string;
  avatar: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
