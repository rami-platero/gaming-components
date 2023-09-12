import Categories from "./Filters/Categories";
import styles from "./filters.module.scss";
import PriceRange from "./Filters/PriceRange";
import { useParams } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Brands from "./Filters/Brands";
import { useEffect, useState, memo, useRef } from "react";
import Availability from "./Filters/Availability";
import { useAppSelector } from "../redux/hooks";
import {AiOutlineClose} from 'react-icons/ai'
import useClickOutside from "../hooks/useClickOutside";

type Params = {
  filtering: boolean;
  closeFilters: ()=>void
};

const Filters = ({ filtering, closeFilters }: Params) => {
  const { category } = useParams();
  const [isFiltering, setisFiltering] = useState<boolean>(false);
  const filtersRef = useRef<HTMLDivElement>(null)

  const filters = useAppSelector((state) => state.products.filters);

  useClickOutside(filtersRef,()=>{
    closeFilters()
  })

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      setisFiltering(true);
    }
  }, [filters]);

  const handleBackButton = () => {
    setisFiltering((prev) => !prev);
  };

  return (
    <div
      className={`${styles.filters} ${
        !filtering && styles.inactiveFilters
      }`}
      ref={filtersRef}
    >
      <button className={styles.filters__closeButton} onClick={closeFilters}>
        <AiOutlineClose/>
      </button>
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
