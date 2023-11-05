import { useParams } from "react-router-dom";
import useToast from "../../hooks/useToast";
import { useRemoveReviewMutation } from "../../redux/services/reviewsApi";
import styles from "./deleteReviewModal.module.scss";
import Loader from "../../assets/Loader.svg";
import { Review } from "../../types/reviews";
import { useSetAtom } from "jotai";
import { INITIAL_ATOM, uiAtom } from "../Modals";
import { useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";

type Params = {
  review: Review;
};

const DeleteReviewModal = ({ review }: Params) => {
  const { notifyTemporalSuccess } = useToast();
  const { slug } = useParams();
  const closeModal = useSetAtom(uiAtom);
  const ref = useRef<HTMLDivElement>(null);

  const [deleteReview, { isLoading }] = useRemoveReviewMutation();

  const handleClose = () => {
    if(!isLoading){
      closeModal(INITIAL_ATOM);
    }
  };

  const handleDeleteReview = async () => {
    try {
      await deleteReview({
        id: review.id,
        product_id: review.product_id,
        oldRating: review.rating,
        slug: slug || "",
      });
      notifyTemporalSuccess("Review deleted");
      handleClose()
    } catch (error) {}
  };

  useClickOutside(ref, handleClose);

  return (
    <div className={styles.removeModal}>
      <div className={styles.removeModal__wrapper} ref={ref}>
        <h3>Delete Review</h3>
        <h5 className={styles.removeModal__wrapper__question}>
          Are you sure that you want to delete your review?
        </h5>
        <h6 className={styles.removeModal__wrapper__warning}>
          Warning: This action is not reversible
        </h6>
        <div className={styles.removeModal__wrapper__buttons}>
          <button
            onClick={handleDeleteReview}
            disabled={isLoading}
            className={styles.removeModal__wrapper__buttons__delete}
          >
            {!isLoading ? "Delete my review" : <img src={Loader} />}
          </button>
          <button
            disabled={isLoading}
            onClick={handleClose}
            className={styles.removeModal__wrapper__buttons__cancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteReviewModal;
