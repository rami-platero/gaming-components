import styles from "./availability.module.scss";
import useProductQuery from "../../hooks/useProductQuery";
import useOnUpdate from "../../hooks/useOnUpdate";
import { productsContext } from "../../context/ProductsContext";
import { useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { filterProductsByStock } from "../../redux/features/products/productsSlice";

const Availability = () => {
  const { setQuery, queryValue, removeQuery } = useProductQuery("no_stock");

  const pages = useAppSelector((state) => state.products.pages_amount);
  const { fetchProducts } = useContext(productsContext);
  const dispatch = useAppDispatch();

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setQuery(e.target.checked.toString());
    } else {
      removeQuery();
    }
  };

  useOnUpdate(() => {
    if (!queryValue) {
      if (pages === 0 || 1) {
        dispatch(filterProductsByStock(null));
      } else if (pages > 1) {
        fetchProducts();
      }
    } else {
      fetchProducts();
    }
  }, [queryValue]);

  return (
    <div className={styles.availability}>
      <h3>Availability</h3>
      <div className={styles.availability__inputBox}>
        <input
          type="checkbox"
          name=""
          id="availability"
          checked={queryValue === "true"}
          onChange={handleQuery}
        />
        <label htmlFor="availability">Include out of stock</label>
      </div>
    </div>
  );
};

export default Availability;
