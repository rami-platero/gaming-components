import useProductQuery from "../../hooks/useProductQuery";
import { useAppSelector } from "../../redux/hooks";
import styles from "./brands.module.scss";

const Brands = () => {
  const {
    setQuery,
    removeQuery,
    queryValue: queries,
  } = useProductQuery("brand");

  const brands = useAppSelector((state) => state?.products?.filters?.brands);

  const currentQueries: string[] = queries?.split("-") || [];

  const handleBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      queries && setQuery(`${queries}-${e.target.value}`);
      !queries && setQuery(e.target.value);
    } else {
      if (currentQueries.length === 1) {
        return removeQuery();
      }
      currentQueries &&
        setQuery(
          `${currentQueries
            .filter((q) => {
              return q !== e.target.value;
            })
            .join("-")}`
        );
    }
  };
  return (
    <div className={styles.brands}>
      <h3>Brands</h3>
      {brands?.map((brand) => {
        return (
          <div className={styles.brands__item} key={brand}>
            <input
              type="checkbox"
              id={brand}
              value={brand}
              onChange={handleBrand}
              checked={currentQueries?.includes(brand)}
            />
            <label htmlFor={brand}>{brand}</label>
          </div>
        );
      })}
    </div>
  );
};

export default Brands;
