import styles from "./availability.module.scss";
import useProductQuery from "../../hooks/useProductQuery";

const Availability = () => {
  const { setQuery, queryValue, removeQuery } = useProductQuery("no_stock");

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setQuery(e.target.checked.toString());
    } else {
      removeQuery();
    }
  };

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
