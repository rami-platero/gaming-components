import { createContext, useEffect, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getProducts,
  resetProducts,
  setProducts,
} from "../redux/features/products/productsSlice";
import {
  useLazyGetProductsByCategoryQuery,
  useLazyGetProductsQuery,
} from "../redux/services/productsApi";
import useOnUpdate from "../hooks/useOnUpdate";
import { checkError } from "../utils/checkErrors";

type ContextValues = {
  isLazyFetching: boolean;
  fetchProducts: () => void;
};

export const productsContext = createContext<ContextValues>({
  isLazyFetching: true,
  fetchProducts: async () => {},
});

export const ProductsContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [searchParams, _setSearchParams] = useSearchParams();

  const { category } = useParams();
  const prevCategory = useRef(category);
  const search = searchParams.get("search") || "";
  const filter = searchParams.get("filter") || "";
  const page = searchParams.get("page") || "1";
  const brands = searchParams.get("brand") || "";
  const price_min = searchParams.get("price_min") || "";
  const price_max = searchParams.get("price_max") || "";
  const no_stock = searchParams.get("no_stock") || "";
  const currentSearchParams = {
    search,
    filter,
    page,
    category,
    brands,
    price_max,
    price_min,
    no_stock,
  };

  const products = useAppSelector((state) => state?.products?.products);
  const productsError = useAppSelector(
    (state) => state.products.error?.response
  );
  const currentFilters = useAppSelector(
    (state) => state.products.currentFilters
  );

  const dispatch = useAppDispatch();

  const queryHook = category
    ? useLazyGetProductsByCategoryQuery()
    : useLazyGetProductsQuery();
  const [fetchData, { error, data, isFetching }] = queryHook;

  // fetchProducts function
  const fetchProducts = async () => {
    const skip =
      (!products?.length &&
        !!currentFilters &&
        parseInt(price_max) < parseInt(currentFilters?.priceRange?.max) &&
        (brands !== currentFilters?.brands ||
          search === currentFilters.search)) ||
      (!products?.length &&
        !!currentFilters &&
        parseInt(price_min) > parseInt(currentFilters?.priceRange?.min) &&
        (brands !== currentFilters?.brands ||
          search === currentFilters.search) &&
        !products?.length &&
        currentFilters?.no_stock === "true" &&
        !no_stock);

    if (prevCategory.current === category && !skip) {
      await fetchData(currentSearchParams);
    }
  };

  // calls the fetchProducts function on change
  useOnUpdate(() => {
    fetchProducts();
  }, [page, brands]);

  // dispatch function after calling the fetchProducts function
  useEffect(() => {
    if (!isFetching && data) {
      dispatch(setProducts(data));
    }
  }, [data, isFetching]);

  // initial request
  useEffect(() => {
    prevCategory.current = category;
    dispatch(getProducts(currentSearchParams));
  }, [category]);

  // toastify errors
  useEffect(() => {
    if (checkError(error || productsError)) {
      dispatch(resetProducts(null));
    }
  }, [error, productsError]);

  return (
    <productsContext.Provider
      value={{
        isLazyFetching: isFetching,
        fetchProducts,
      }}
    >
      {children}
    </productsContext.Provider>
  );
};
