import { useGetProductsQuery } from "../../redux/services/productsApi";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputSearch, setInputSearch] = useState("");

  const search = searchParams.get("search") || "";
  const filter = searchParams.get("filter") || "";
  const page = searchParams.get("page") || "1";

  useEffect(() => {
    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);
      newSearchParams.set("page", page);
      return newSearchParams;
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputSearch) {
      setSearchParams((prevSearchParams) => {
        const newSearchParams = new URLSearchParams(prevSearchParams);
        newSearchParams.set("search", inputSearch);
        return newSearchParams;
      });
    }
  };

  const handleFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);
      newSearchParams.set("filter", e.currentTarget.value);
      return newSearchParams;
    });
  };

  const { data: products, isError } = useGetProductsQuery({
    search,
    filter,
    page,
  });

  return (
    <div>
      <h1>Products</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search a product..."
          onChange={handleInputChange}
          value={inputSearch}
        />
        <button type="submit">Search</button>
      </form>

      <button value="name_asc" onClick={handleFilter}>
        Product name A-Z
      </button>
      <button value="name_desc" onClick={handleFilter}>
        Product name Z-A
      </button>
      <button value="price_desc" onClick={handleFilter}>
        Price High to Low
      </button>
      <button value="price_asc" onClick={handleFilter}>
        Price Low to High
      </button>

      {products &&
        products.map((product) => {
          return (
            <>
              <h3 key={product.id}>{product.name}</h3>;<p>{product.price}</p>
            </>
          );
        })}
      {isError && <p>Error: Couldn't fetch data</p>}
    </div>
  );
};

export default Products;
