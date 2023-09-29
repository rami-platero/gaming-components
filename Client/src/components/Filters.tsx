import Categories from "./Filters/Categories";
import styles from "./filters.module.scss";
import PriceRange from "./Filters/PriceRange";
import { useParams } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Brands from "./Filters/Brands";
import { useEffect, useState, memo } from "react";
import Availability from "./Filters/Availability";
import { useAppSelector } from "../redux/hooks";
import { AiOutlineClose } from "react-icons/ai";

type Params = {
  closeFilters: () => void;
};

const Filters = ({ closeFilters }: Params) => {
  const { category } = useParams();
  const [isFiltering, setisFiltering] = useState<boolean>(false);

  const filters = useAppSelector((state) => state.products.filters);

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
      <button className={styles.closeButton} onClick={closeFilters}>
        <AiOutlineClose />
      </button>
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
            {!!filters.brands.length && (
              <>
                <hr />
                <Brands />
              </>
            )}
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
