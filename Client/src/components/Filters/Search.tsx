import styles from "./search.module.scss";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import useProductQuery from "../../hooks/useProductQuery";

const Search = () => {
  const [inputSearch, setInputSearch] = useState<string>("");
  const { setQuery, removeQuery,queryValue:search } = useProductQuery("search", {
    resetPage: true,
  });

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
