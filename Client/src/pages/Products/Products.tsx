import { useGetProductsQuery } from "../../redux/services/productsApi";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "./products.module.scss";
import ProductItem from "./ProductItem";
import Search from "./Filters/Search";
import SortBy from "./Filters/SortBy";
import Pagination from "./Filters/Pagination";
import { IoMdClose } from "react-icons/io";
import {ToastContainer} from 'react-toastify'
import useToast from "../../hooks/useToast";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const filter = searchParams.get("filter") || "";
  const page = searchParams.get("page") || "1";

  const {notifyError} = useToast()

  const removeCurrentSearch = () => {
    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);
      newSearchParams.delete("search");
      return newSearchParams;
    });
  };

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

  useEffect(()=>{
    isError && notifyError("Internal Server Error.")
  },[isError])

  return (
    <>
      <ToastContainer limit={1}/>
      <main className={styles.products}>
      <div className={styles.products__filters}>
        <h2>Filters</h2>
        <div className={styles.products__filters__wrapper}></div>
      </div>
      <div className={styles.products__content}>
        <h1>Products</h1>

        {/* Filters */}
        <section className={styles.products__content__mainFilters}>
          <Search setSearchParams={setSearchParams} />
          <SortBy setSearchParams={setSearchParams} filter={filter} />
        </section>

        {search && (
          <div className={styles.products__content__currentFilter}>
            <p>{search}</p>
            <button>
              <IoMdClose onClick={removeCurrentSearch} />
            </button>
          </div>
        )}

        {/* Products */}
        <section className={styles.products__content__wrapper}>
          {data?.products?.length ? (
            data.products.map((product) => {
              return <ProductItem key={product.id} product={product} />;
            })
          ) : (
            <h2>No data</h2>
          )}
        </section>

        {/* Pagination */}
        {!!data?.pages_amount && data?.pages_amount > 1 && (
          <Pagination
            pages_amount={data.pages_amount}
            setSearchParams={setSearchParams}
            currentPage={page}
          />
        )}
      </div>
    </main>
    </>
   
  );
};

export default Products;
