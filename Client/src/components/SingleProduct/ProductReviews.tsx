/* import { useGetProductCommentsQuery } from "../../redux/services/productsApi"; */
/* import { TProduct } from "../../types/products"; */
import Rating from '../Rating';
import styles from './productReviews.module.scss'

type Params = {
  reviews?: {

  } | null,
  rating: {
    avg: number,
    amount: number
  }
};

const ProductReviews = ({ reviews, rating }: Params) => {
  
  return <div className={styles.reviews}>
    <h2 className={styles.reviews__title}>Reviews</h2>
    <Rating rating={rating}/>
    <hr />
    {!reviews? <div className={styles.reviews__noReviews}>
      <h2 className={styles.reviews__noReviews__title}>No reviews have been added.</h2>
      <h4 className={styles.reviews__noReviews__message}>Be the first one to review this product.</h4>
      <button>Add review</button>
    </div> :<>
    </>}
  </div>;
};

export default ProductReviews
