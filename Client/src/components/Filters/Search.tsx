import styles from "./search.module.scss";
import { useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import useProductQuery from "../../hooks/useProductQuery";
import { productsContext } from "../../context/ProductsContext";
import useOnUpdate from "../../hooks/useOnUpdate";
import { useAppSelector } from "../../redux/hooks";

const Search = () => {
  const [inputSearch, setInputSearch] = useState<string>("");
  const {fetchProducts} = useContext(productsContext)
  const { setQuery, removeQuery,queryValue:search } = useProductQuery("search", {
    resetPage: true,
  });
  const currentSearch = useAppSelector((state)=>state.products.currentFilters?.search)

  useOnUpdate(()=>{
    if(search !== currentSearch){
      fetchProducts()
    }
  },[search])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputSearch) {
      setInputSearch("");
      setQuery(inputSearch);
    }
  };

  const handleReset = () => {
    setInputSearch("");
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit} className={styles.search__form}>
        <div className={styles.search__form__searchInput}>
          <AiOutlineSearch />
          <input
            type="text"
            placeholder="Search a product..."
            onChange={handleInputChange}
            value={inputSearch}
            spellCheck={false}
          />
          {inputSearch && <IoMdClose onClick={handleReset} />}
        </div>
      </form>
      {search && (
        <div className={styles.search__currentFilter}>
          <p>{search}</p>
          <button>
            <IoMdClose onClick={removeQuery} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
