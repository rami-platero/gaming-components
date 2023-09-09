import styles from "./sortBy.module.scss";
import { useState, useRef, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import useProductQuery from "../../hooks/useProductQuery";

const filters = [
  {
    name: "Product name A-Z",
    value: "name_asc",
  },
  {
    name: "Product name Z-A",
    value: "name_desc",
  },
  {
    name: "Price Low to High",
    value: "price_asc",
  },
  {
    name: "Price High to Low",
    value: "price_desc",
  },
];

const SortBy = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentOption, setCurrentOption] = useState<string>("");
  const filterRef = useRef<HTMLDivElement | null>(null);
  const { setQuery,queryValue: filter } = useProductQuery("filter");

  useEffect(() => {
    if (filter) {
      filters.forEach((fil) => {
        if (fil.value === filter) {
          return setCurrentOption(fil.name);
        }
      });
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSortByToggle = () => {
    setIsActive((prev) => !prev);
  };

  const handleFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setQuery(e.currentTarget.value);
    handleSortByToggle();
    setCurrentOption(e.currentTarget.innerText);
  };

  return (
    <div className={styles.sortBy} ref={filterRef}>
      <div onClick={handleSortByToggle} className={styles.sortBy__toggle}>
        {currentOption || "Sort by"} <BiChevronDown />
      </div>
      {isActive && (
        <ul className={styles.sortBy__active}>
          {filters.map((filter) => {
            return (
              <li key={filter.value}>
                <button value={filter.value} onClick={handleFilter}>
                  {filter.name}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SortBy;
