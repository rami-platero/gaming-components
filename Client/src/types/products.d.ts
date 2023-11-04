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

export type Specs = {
  [key: string]: {
    name: string,
    value: string
  }
}

export type TProduct = {
  id: number;
  name: string;
  slug: string;
  category: Category;
  description: string;
  price: number;
  stock: number;
  brand: string
  images: ProductImage[];
  stripe_price: string;
  rating: {
    avg: number,
    amount: number
  }
  createdAt: Date;
  updatedAt: Date;
  specifications: Specs | null
};

export enum Rating {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
}

export type TPriceRange = {
  min: number;
  max: number;
};

export type TFilters = {
  priceRange: TPriceRange;
  brands: string[];
  rating: Rating;
};

export type TCurrentFilters = {
  search: string;
  filter: string;
  page: string;
  priceRange: {
    max: string,
    min: string
  }
  brands: string;
  no_stock: string
}

export type TProducts = {
  products: TProduct[];
  pages_amount: number;
  filters?: TFilters;
  currentFilters: TCurrentFilters;
};

export enum SortByFilters {
  name_asc = "name_asc",
  name_desc = "name_desc",
  price_asc = "price_asc",
  price_desc = "price_desc",
}