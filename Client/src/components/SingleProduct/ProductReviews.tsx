import { memo } from "react";
import Rating from "../Rating";
import styles from "./productReviews.module.scss";
import Review from "../Review/Review";
import useReviews from "../../hooks/useReviews";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import Loader from "../../assets/WhiteLoader.svg";
import { useSetAtom } from "jotai";
import { Modal, uiAtom } from "../Modals";

type Params = {
  id: number;
  rating: {
    avg: number;
    amount: number;
  };
};

const ProductReviews = ({ id, rating }: Params) => {
  const { isLoading, reviews, hasNextPage, setOffset } = useReviews({ id });

  const setUI = useSetAtom(uiAtom) 

  const handleOpenReviewModal = () => {
    setUI((prev) => ({
      ...prev,
      modal: Modal.ADD_REVIEW,
      id
    }))
  }

  const ref = useInfiniteScroll(
    () => {
      setOffset((prev) => prev + 5);
    },
    hasNextPage || true,
    [reviews]
  );

  return (
    <div className={styles.reviews}>
      <h2 className={styles.reviews__title}>Reviews</h2>
      <Rating rating={rating} />
      <hr />
      {!reviews?.length && !isLoading && (
        <div className={styles.reviews__noReviews}>
          <h2 className={styles.reviews__noReviews__title}>
            No reviews have been added.
          </h2>
          <h4 className={styles.reviews__noReviews__message}>
            Be the first one to review this product.
          </h4>
          <button className={styles.addReview} onClick={handleOpenReviewModal}>
            Add review
          </button>
        </div>
      )}
      {!!reviews?.length && (
        <div className={styles.reviews__wrapper}>
          <button className={styles.addReview} onClick={handleOpenReviewModal}>
            Add review
          </button>
          {reviews?.map((review) => {
            return <Review review={review} key={review.id} />;
          })}
        </div>
      )}
      {hasNextPage && (
        <img className={styles.reviews__loader} src={Loader} ref={ref} />
      )}
    </div>
  );
};

export default memo(ProductReviews);
