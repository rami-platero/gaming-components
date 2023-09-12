/* import { useGetProductCommentsQuery } from "../../redux/services/productsApi"; */
/* import { TProduct } from "../../types/products"; */
import styles from './productComments.module.scss'

/* type Params = {
  product: TProduct;
}; */

const ProductComments = (/* { product }: Params */) => {
  /* const { data } = useGetProductCommentsQuery(product.slug); */
  
  return <div className={styles.reviews}>
    <h2>Reviews</h2>
  </div>;
};

export default ProductComments;
