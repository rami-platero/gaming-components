import { TProduct } from "../../types/products";

type Params = {
    product: TProduct;
  };

const ProductSpecs = ({product}:Params) => {
  console.log(product);
  return (
    <div>
        
    </div>
  )
}

export default ProductSpecs