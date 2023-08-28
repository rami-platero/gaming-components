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

//filters
//Sort by options
export enum SortByOptions {
  PRICE_ASC = "price_asc",
  PRICE_DESC = "price_desc",
  NAME_ASC = "name_asc",
  NAME_DESC = "name_desc",
}
