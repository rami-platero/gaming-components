import { SetURLSearchParams } from "react-router-dom";
import styles from "./sortBy.module.scss";
import {useState,useRef,useEffect} from 'react'
import { BiChevronDown } from "react-icons/bi";

type Params = {
    setSearchParams: SetURLSearchParams;
  };

const SortBy = ({ setSearchParams }: Params) => {
    const [isActive, setIsActive] = useState<boolean>(false);
  const [currentOption, setCurrentOption] = useState<string>("")
  const filterRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node) ) {
        setIsActive(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSortByToggle = ()=>{
    setIsActive(prev=> !prev)
  }

  const handleFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);
      newSearchParams.set("filter", e.currentTarget.value);
      return newSearchParams;
    });
    handleSortByToggle()
    setCurrentOption(e.currentTarget.innerText)
  };

  return (
    <div className={styles.sortBy} ref={filterRef}>
      <div
        onClick={handleSortByToggle}
        className={styles.sortBy__toggle}
      >
        {currentOption || "Sort by"} <BiChevronDown />
      </div>
      {isActive && (
        <ul className={styles.sortBy__active}>
          <li>
            <button value="name_asc" onClick={handleFilter}>
              Product name A-Z
            </button>
          </li>
          <li>
            <button value="name_desc" onClick={handleFilter}>
              Product name Z-A
            </button>
          </li>
          <li>
            <button value="price_desc" onClick={handleFilter}>
              Price High to Low
            </button>
          </li>
          <li>
            <button value="price_asc" onClick={handleFilter}>
              Price Low to High
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default SortBy;
