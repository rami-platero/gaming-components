import { useSearchParams } from "react-router-dom";

type Options = {
  resetPage: boolean;
};

const useProductQuery = (name: string, options?: Options) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryValue = searchParams.get(name);

  const setQuery = (value: string) => {
    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);
      newSearchParams.set(name, value);
      options && newSearchParams.set("page", "1");
      return newSearchParams;
    });
  };

  const removeQuery = () => {
    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);
      newSearchParams.delete(name);
      options && newSearchParams.set("page", "1");
      return newSearchParams;
    });
  };

  return { setQuery, removeQuery, queryValue };
};

export default useProductQuery;
