import { Product } from "../entities/Product";

enum Filters {
  name_asc = "name_asc",
  name_desc = "name_desc",
  price_asc = "price_asc",
  price_desc = "price_desc",
}

export const sortProducts = (products: Product[], filter: Filters) => {
  switch (filter) {
    case Filters.name_asc:
      products.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      break;
    case Filters.name_desc:
      products.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
      break;
    case Filters.price_desc:
      products.sort((a, b) => {
        return b.price - a.price;
      });
      break;
    case Filters.price_asc:
      products.sort((a, b) => {
        return a.price - b.price;
      });
      break;
    default:
      break;
  }
  return products;
};

export const filterProductsByBrand = (products: Product[], brand: string) => {
  const brandArray = brand.split("-");

  return products.filter((product) => {
    return brandArray.some((br) => {
      return br === product.brand;
    });
  });
};

export const filterProductsByName = (products: Product[], search: string) => {
  return products.filter((product) => {
    return product.name.toLowerCase().includes(search.toLowerCase());
  });
};

export const filterProductsByPage = (products: Product[], page: string) => {
  const postsPerPage = 16;
  return products.slice(
    (parseInt(page) - 1) * postsPerPage,
    postsPerPage * parseInt(page)
  );
};
