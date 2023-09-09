import { createContext, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
} from "../redux/services/productsApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import useToast from "../hooks/useToast";
import { resetProducts, setProducts } from "../redux/features/products/productsSlice";

type ContextValues = {
  isLoading: boolean
};

export const productsContext = createContext<ContextValues>({
  isLoading: true
});

const checkError = (error: any) => {
  if (error && "status" in error) {
    return (
      error.status === 500 ||
      error.status === "TIMEOUT_ERROR" ||
      error.status === "FETCH_ERROR" ||
      error.status === "PARSING_ERROR" ||
      error.status === "CUSTOM_ERROR"
    );
  } else {
    return false;
  }
};

export const ProductsContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [searchParams, _setSearchParams] = useSearchParams();
  const { notifyError } = useToast();

  const search = searchParams.get("search") || "";
  const filter = searchParams.get("filter") || "";
  const page = searchParams.get("page") || "1";
  const brands = searchParams.get("brand") || "";
  const price_min = searchParams.get("price_min") || "";
  const price_max = searchParams.get("price_max") || "";
  const no_stock = searchParams.get("no_stock") || "";

  const products = useAppSelector((state) => state?.products?.products);
  const currentFilters = useAppSelector(
    (state) => state.products.currentFilters
  );

  const dispatch = useAppDispatch();

  const { category } = useParams();

  const queryHook = !category
    ? useGetProductsQuery
    : useGetProductsByCategoryQuery;

  const { data, isError, error, isFetching } = queryHook(
    {
      search,
      filter,
      page,
      category,
      brands,
      price_max,
      price_min,
      no_stock
    },
    {
      skip:
        // avoid making useless requests
        (!products?.length &&
         (!!currentFilters && parseInt(price_max) < parseInt(currentFilters?.priceRange?.max)) &&
          (brands !== currentFilters?.brands ||
            search === currentFilters.search)) ||
        (!products?.length &&
          (!!currentFilters && parseInt(price_min) > parseInt(currentFilters?.priceRange?.min)) &&
          (brands !== currentFilters?.brands ||
            search === currentFilters.search)),
    }
  );

  useEffect(() => {
    // keeps track of filters of last request
    const currentFilters = {
      search,
      filter,
      page,
      brands,
      priceRange: {
        max: price_max,
        min: price_min,
      },
    };
    dispatch(setProducts({ ...data, currentFilters }));
  }, [data]);

  useEffect(() => {
    if (checkError(error)) {
      notifyError("Internal Server Error");
      dispatch(resetProducts(null))
    }
  }, [isError, error]);

  return (
    <productsContext.Provider
      value={{
        isLoading: isFetching
      }}
    >
      {children}
    </productsContext.Provider>
  );
};
