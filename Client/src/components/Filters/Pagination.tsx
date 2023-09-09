import styles from "./pagination.module.scss";
import useProductQuery from "../../hooks/useProductQuery";
import { useEffect } from "react";

type Props = {
  pages_amount: number;
};

const Pagination = ({ pages_amount }: Props) => {
  const pages = [];
  const { setQuery, queryValue } = useProductQuery("page");

  useEffect(() => {
    if (queryValue) {
      setQuery(queryValue);
    } else {
      setQuery("1");
    }
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setQuery(e.currentTarget.value);
  };

  for (let i = 0; i < pages_amount; i++) {
    pages.push(
      <button
        className={
          parseInt(queryValue!) === i + 1 ? styles.pagination__current : ""
        }
        key={i}
        value={i + 1}
        onClick={handleClick}
      >
        {i + 1}
      </button>
    );
  }

  return <section className={styles.pagination}>{pages}</section>;
};

export default Pagination;
