import Categories from "./Filters/Categories";
import styles from "./filters.module.scss";
import { type TFilters } from "../types/products";
import PriceRange from "./Filters/PriceRange";
import { useParams } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Brands from "./Filters/Brands";
import { useEffect, useState, memo } from "react";
import Availability from "./Filters/Availability";

type Params = {
  filters?: TFilters;
};

const Filters = ({ filters }: Params) => {
  const { category } = useParams();
  const [isFiltering, setisFiltering] = useState<boolean>(false);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      setisFiltering(true);
    }
  }, [filters]);

  const handleBackButton = () => {
    setisFiltering((prev) => !prev);
  };
  return (
    <div className={styles.filters}>
      <h2>Filters</h2>

      <div className={styles.filters__wrapper}>
        {category && isFiltering && (
          <button
            className={styles.filters__wrapper__backButton}
            onClick={handleBackButton}
          >
            <AiOutlineArrowLeft /> Back to categories
          </button>
        )}
        {category && !isFiltering && (
          <button
            className={styles.filters__wrapper__backButton}
            onClick={handleBackButton}
          >
            Filter products <AiOutlineArrowRight />
          </button>
        )}

        {!!filters && isFiltering ? (
          <>
            <PriceRange priceRange={filters?.priceRange} />
            <hr />
            <Brands />
            <hr />
            <Availability />
          </>
        ) : (
          <Categories />
        )}
      </div>
    </div>
  );
};

export default memo(Filters);
