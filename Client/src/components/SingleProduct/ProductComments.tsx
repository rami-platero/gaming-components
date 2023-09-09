import { useGetProductCommentsQuery } from "../../redux/services/productsApi";
import { TProduct } from "../../types/products";

type Params = {
  product: TProduct;
};

const ProductComments = ({ product }: Params) => {
  const { data } = useGetProductCommentsQuery(product.slug);

  return <div>
    
  </div>;
};

export default ProductComments;
