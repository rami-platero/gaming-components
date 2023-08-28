import { useGetProductsQuery } from "../../redux/services/productsApi";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "./products.module.scss";
import ProductItem from "./ProductItem";
import Search from "./Filters/Search";
import SortBy from "./Filters/SortBy";
import Pagination from "./Filters/Pagination";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const filter = searchParams.get("filter") || "";
  const page = searchParams.get("page") || "1";

  useEffect(() => {
    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);
      newSearchParams.set("page", page);
      return newSearchParams;
    });
  }, []);

  const { data, isError } = useGetProductsQuery({
    search,
    filter,
    page,
  });

  return (
    <main className={styles.products}>
      <div className={styles.products__filters}>
        <h2>Filters</h2>
        <div className={styles.products__filters__wrapper}></div>
      </div>
      <div className={styles.products__content}>
        <h1>Products</h1>

        {/* Filters */}
        <div className={styles.products__content__mainFilters}>
          <Search setSearchParams={setSearchParams} />
          <SortBy setSearchParams={setSearchParams} filter={filter} />
        </div>

        {/* Products */}
        <div className={styles.products__content__wrapper}>
          {data &&
            data.products.map((product) => {
              return <ProductItem key={product.id} product={product} />;
            })}
          {isError && <p>Error: Couldn't fetch data</p>}
        </div>

        {/* Pagination */}
        {data?.pages_amount && data.pages_amount>1 && (
          <Pagination
            pages_amount={data.pages_amount}
            setSearchParams={setSearchParams}
            currentPage={page}
          />
        )}
      </div>
    </main>
  );
};

export default Products;
