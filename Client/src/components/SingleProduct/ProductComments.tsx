import { useGetProductCommentsQuery } from "../../redux/services/productsApi";
import { TProduct } from "../../types/products";

type Params = {
  product: TProduct;
};

const ProductComments = ({ product }: Params) => {
  const { data } = useGetProductCommentsQuery(product.slug);

  return <div>
    {JSON.stringify(data)}
  </div>;
};

export default ProductComments;
