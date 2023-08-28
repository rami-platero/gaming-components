import { SetURLSearchParams } from "react-router-dom";
import styles from "./pagination.module.scss";

type Props = {
  pages_amount: number;
  setSearchParams: SetURLSearchParams;
  currentPage: string;
};

const Pagination = ({ pages_amount, setSearchParams, currentPage }: Props) => {
  const pages = [];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);
      newSearchParams.set("page", e.currentTarget.value);
      return newSearchParams;
    });
  };

  for (let i = 0; i < pages_amount; i++) {
    pages.push(
      <button
        className={
          parseInt(currentPage) === i+1 ? styles.pagination__current : ""
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
