// products

export enum Category {
  GPU = "Graphics Card",
  CPU = "CPU",
  Monitor = "Monitor",
}

export type ProductImage = {
  thumbnail: string;
  xl: string;
};

export type Product = {
  id: number;
  name: string;
  category: Category;
  description: string;
  price: number;
  stock: number;
  main_image: ProductImage;
  images: ProductImage[];
  createdAt: Date;
  updatedAt: Date;
};

export type Products = {
    products: Product[],
    pages_amount: number
}
