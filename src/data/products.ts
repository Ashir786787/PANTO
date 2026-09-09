import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: 1,
    name: "Sabastian Armchair",
    category: "Chair",
    price: 129,
    rating: 5,
    image: "/images/product-chair.jpg",
    stock: 12,
  },
  {
    id: 2,
    name: "Rattan Chair",
    category: "Chair",
    price: 149,
    rating: 5,
    image: "/images/product-chair.jpg",
    stock: 8,
  },
  {
    id: 3,
    name: "Ardley Chair",
    category: "Chair",
    price: 119,
    rating: 4,
    image: "/images/product-chair.jpg",
    stock: 15,
  },
  {
    id: 4,
    name: "Nyomi Chair",
    category: "Chair",
    price: 139,
    rating: 5,
    image: "/images/product-chair.jpg",
    stock: 10,
  },
];

export const productCategories = ["All", "Sofa", "Chair", "Table", "Cabinet"] as const;
