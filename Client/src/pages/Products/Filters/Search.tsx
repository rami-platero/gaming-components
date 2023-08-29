import { SetURLSearchParams } from "react-router-dom";
import styles from "./search.module.scss";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

type Params = {
  setSearchParams: SetURLSearchParams;
};

const Search = ({ setSearchParams }: Params) => {
  const [inputSearch, setInputSearch] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputSearch) {
      setSearchParams((prevSearchParams) => {
        const newSearchParams = new URLSearchParams(prevSearchParams);
        newSearchParams.set("search", inputSearch);
        newSearchParams.set("page", "1");
        return newSearchParams;
      });
    }
  };

  const handleReset = ()=>{
    setInputSearch("")
  }

  return (
    <form onSubmit={handleSubmit} className={styles.search}>
      <div className={styles.search__searchInput}>
        <AiOutlineSearch />
        <input
          type="text"
          placeholder="Search a product..."
          onChange={handleInputChange}
          value={inputSearch}
          spellCheck={false}
        />
        {inputSearch && <IoMdClose onClick={handleReset}/>}
      </div>
    </form>
  );
};

export default Search;
