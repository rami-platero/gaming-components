import { forwardRef } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import useModal from "../../hooks/useModal";
import styles from "./reviewContextMenu.module.scss";
import { useRemoveReviewMutation } from "../../redux/services/reviewsApi";
import { Review } from "../../types/reviews";
import Loader from "../../assets/Loader.svg";
import useToast from "../../hooks/useToast";
import { useParams } from "react-router-dom";

type Params = {
  review: Review;
  closeContextMenu: () => void;
  handleEditing: () => void;
};

const ReviewContextMenu = forwardRef<HTMLDivElement, Params>(
  ({ review, closeContextMenu, handleEditing }, ref) => {
    const {
      ref: removeRef,
      isOpen: isDeleteModalOpen,
      openModal: openDeleteModal,
      closeModal,
    } = useModal();
    const { notifyTemporalSuccess } = useToast();
    const { slug } = useParams();

    const [deleteReview, { isLoading }] = useRemoveReviewMutation();

    const handleOpenDeleteModal = () => {
      openDeleteModal();
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
      } catch (error) {
      } finally {
        closeModal();
        closeContextMenu();
      }
    };

    const handleCloseModal = () => {
      closeModal();
      closeContextMenu();
    };

    return (
      <div ref={ref} className={styles.contextMenu}>
        {isDeleteModalOpen && (
          <div className={styles.contextMenu__removeModal}>
            <div
              ref={removeRef}
              className={styles.contextMenu__removeModal__wrapper}
            >
              <h3>Delete Review</h3>
              <h5
                className={styles.contextMenu__removeModal__wrapper__question}
              >
                Are you sure that you want to delete your review?
              </h5>
              <h6 className={styles.contextMenu__removeModal__wrapper__warning}>
                Warning: This action is not reversible
              </h6>
              <div
                className={styles.contextMenu__removeModal__wrapper__buttons}
              >
                <button
                  onClick={handleDeleteReview}
                  disabled={isLoading}
                  className={
                    styles.contextMenu__removeModal__wrapper__buttons__delete
                  }
                >
                  {!isLoading ? "Delete my review" : <img src={Loader} />}
                </button>
                <button
                  disabled={isLoading}
                  onClick={handleCloseModal}
                  className={
                    styles.contextMenu__removeModal__wrapper__buttons__cancel
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {!isDeleteModalOpen && (
          <>
            <button
              className={styles.contextMenu__actionBtn}
              onClick={handleOpenDeleteModal}
            >
              <BsFillTrashFill />
              Remove
            </button>
            <button
              className={styles.contextMenu__actionBtn}
              onClick={handleEditing}
            >
              <BsFillTrashFill />
              Edit
            </button>
          </>
        )}
      </div>
    );
  }
);

export default ReviewContextMenu;
