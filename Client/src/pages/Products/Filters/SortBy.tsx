import { SetURLSearchParams } from "react-router-dom";
import styles from "./sortBy.module.scss";
import { useState, useRef, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";

type Params = {
  setSearchParams: SetURLSearchParams;
  filter: string
};

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

const SortBy = ({ setSearchParams, filter:currentFilter }: Params) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentOption, setCurrentOption] = useState<string>("");
  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(()=>{
    if(currentFilter){
      filters.forEach((filter)=>{
        if(filter.value===currentFilter){
          return setCurrentOption(filter.name)
        }
      })
    }
  },[])

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
    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);
      newSearchParams.set("filter", e.currentTarget.value);
      return newSearchParams;
    });
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
              <li>
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
