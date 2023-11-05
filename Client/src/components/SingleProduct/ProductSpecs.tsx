/* import { TProduct } from "../../types/products"; */
import { TProduct } from "../../types/products";
import SpecCard from "./SpecCard";
import styles from './productSpecs.module.scss'

type Params = {
    product: TProduct;
  };

const ProductSpecs = ({product}:Params) => {
  return (
    <div className={styles.specs}>
        <h2>Specifications</h2>
        <div className={styles.specs__wrapper}>
        {product.specifications !== null && Object.values(product.specifications).map((spec)=>{
          return <SpecCard key={spec.name} value={spec.value} name={spec.name}/>
        })}
        </div>
    </div>
  )
}

export default ProductSpecs