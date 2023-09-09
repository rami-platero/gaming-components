import styles from "./products.module.scss";
import ProductCard from "../../components/ProductCard";
import Search from "../../components/Filters/Search";
import SortBy from "../../components/Filters/SortBy";
import Pagination from "../../components/Filters/Pagination";
import { ToastContainer } from "react-toastify";
import Filters from "../../components/Filters";
import { useAppSelector } from "../../redux/hooks";
import { useContext } from "react";
import { productsContext } from "../../context/ProductsContext";
import Breadcrumb from "../../components/Breadcrumb";
import ProductCardSkeleton from "../../components/Skeleton/ProductCardSkeleton";

const Products = () => {
  const data = useAppSelector((state) => state.products);
  const { isLoading } = useContext(productsContext);

  return (
    <>
      <ToastContainer limit={1} />
      <main className={styles.products}>
        <Breadcrumb />
        <div className={styles.products__container}>
          {/* Main Filters */}
          <Filters />

          <div className={styles.products__container__content}>
            <h1>Products</h1>

            {/* Top Filters */}
            <section
              className={styles.products__container__content__mainFilters}
            >
              <Search />
              <SortBy />
            </section>

            {/* Products */}
            <section className={styles.products__container__content__wrapper}>
              {!!isLoading && <ProductCardSkeleton/>}
              {!!data?.products?.length &&
                data?.products.map((product) => {
                  return <ProductCard key={product.id} product={product} />;
                })}
              {!isLoading && !data?.products?.length && (
                <div
                  className={
                    styles.products__container__content__wrapper__notFound
                  }
                >
                  <div>0 results found</div>
                  <h3>Couldn't find any products. Try another search.</h3>
                </div>
              )}
            </section>

            {/* Pagination */}
            {!!data?.pages_amount && data?.pages_amount > 1 && (
              <Pagination pages_amount={data?.pages_amount} />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Products;
