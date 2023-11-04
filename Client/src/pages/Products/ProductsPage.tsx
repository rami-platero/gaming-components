import styles from "./productsPage.module.scss";
import ProductCard from "../../components/ProductCard";
import Search from "../../components/Filters/Search";
import SortBy from "../../components/Filters/SortBy";
import Pagination from "../../components/Filters/Pagination";
import Filters from "../../components/Filters/Filters";
import { useAppSelector } from "../../redux/hooks";
import Breadcrumb from "../../components/UI/Breadcrumb";
import ProductCardSkeleton from "../../components/Skeleton/ProductCardSkeleton";
import { useContext, useState, useMemo, useRef } from "react";
import { productsContext } from "../../context/ProductsContext";
import SpinnerLoader from "../../components/UI/SpinnerLoader";
import FiltersToggleButton from "../../components/Filters/FiltersToggleButton";
import FiltersSkeleton from "../../components/Skeleton/FiltersSkeleton";
import useClickOutside from "../../hooks/useClickOutside";
import { useParams } from "react-router-dom";
import useScroll from "../../hooks/useScroll";

const ProductsPage = () => {
  const data = useAppSelector((state) => state.products);
  const { isLazyFetching } = useContext(productsContext);
  const isLoading = useAppSelector((state) => state.products.isFetching);
  const filtersRef = useRef<HTMLDivElement>(null);
  const { scrollRef, scrollToElement } = useScroll();

  useClickOutside(filtersRef, () => {
    closeFilters();
  });

  const products = useMemo(() => {
    return data.products;
  }, [data.products]);

  const [filtering, setFiltering] = useState(false);
  const openFilters = () => {
    setFiltering(true);
  };

  const closeFilters = () => {
    setFiltering(false);
  };

  const { category } = useParams();

  return (
    <>
      <main className={styles.products}>
        <Breadcrumb />
        <div className={styles.products__container}>
          {/* Main Filters */}
          <div
            className={`${styles.products__container__filters} ${
              !filtering && styles.inactiveFilters
            }`}
            ref={filtersRef}
          >
            <h2>Filters</h2>
            {!!isLoading && <FiltersSkeleton />}
            {!!isLazyFetching && !isLoading && !!category && <SpinnerLoader />}
            {!isLoading && <Filters closeFilters={closeFilters} />}
          </div>
          <div className={styles.products__container__products}>
            <h1>Products</h1>

            {/* Top Filters */}
            <section
              className={styles.products__container__products__mainFilters}
            >
              <Search />
              <SortBy />
              <FiltersToggleButton openFilters={openFilters} />
            </section>

            {/* Products */}
            <section
              className={styles.products__container__products__wrapper}
              ref={scrollRef}
            >
              {isLazyFetching && !isLoading ? <SpinnerLoader /> : null}
              {!!isLoading && <ProductCardSkeleton />}
              {!isLoading &&
                !!products?.length &&
                products.map((product) => {
                  return <ProductCard key={product.id} product={product} />;
                })}
              {!isLoading && !products?.length && (
                <div
                  className={
                    styles.products__container__products__wrapper__notFound
                  }
                >
                  <div>0 results found</div>
                  <h3>Couldn't find any products. Try another search.</h3>
                </div>
              )}
            </section>

            {/* Pagination */}
            {!!data?.pages_amount && data?.pages_amount > 1 && (
              <Pagination
                pages_amount={data?.pages_amount}
                scrollToProducts={scrollToElement}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductsPage;
