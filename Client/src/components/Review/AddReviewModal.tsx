import { useState, Fragment, forwardRef } from "react";
import styles from "./addReviewModal.module.scss";
import { AiFillStar, AiOutlineClose } from "react-icons/ai";
import { usePostReviewMutation } from "../../redux/services/reviewsApi";
import { useForm } from "react-hook-form";
import Loader from "../../assets/WhiteLoader.svg";
import useToast from "../../hooks/useToast";
import { isErrorWithMessage } from "../../utils/checkErrors";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReviewFormSchema, reviewFormSchema } from "../../schemas/reviewSchema";
import { useParams } from "react-router-dom";

type Params = {
  closeModal: () => void;
  id: number;
};

const AddReviewModal = forwardRef<HTMLDivElement, Params>(
  ({ closeModal, id }, ref) => {
    const [rating, setRating] = useState(0);
    const [hovering, setHovering] = useState<number>(-1);
    const [addReview, { isLoading }] = usePostReviewMutation();
    const { notifyTemporalSuccess, notifyError } = useToast();
    const {slug} = useParams()

    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<ReviewFormSchema>({
      resolver: zodResolver(reviewFormSchema),
    });

    const ratingArray = Array.from({ length: 5 }, (_, i) => {
      return i + 1 <= rating || i + 1 <= hovering ? (
        <AiFillStar
          className={`${styles.fillStar} ${
            hovering >= i + 1 && hovering !== -1 ? styles.fillStar__hovered : ""
          }`}
          onMouseOver={() => {
            setHovering(i + 1);
          }}
          onMouseOut={() => {
            setHovering(-1);
          }}
          onClick={() => {
            setRating(i + 1);
          }}
        />
      ) : (
        <AiFillStar
          className={`${styles.star}`}
          onClick={() => {
            setRating(i + 1);
          }}
          onMouseOver={() => {
            setHovering(i + 1);
          }}
          onMouseOut={() => {
            setHovering(-1);
          }}
        />
      );
    });

    const onSubmit = async (data: ReviewFormSchema) => {
      try {
        await addReview({
          id,
          review: {
            body: data.body,
            rating,
          },
          slug: slug || ""
        }).unwrap();
        notifyTemporalSuccess("Review added");
      } catch (error) {
        if (isErrorWithMessage(error)) {
          notifyError(error.data.message);
        }
      } finally {
        closeModal();
      }
    };

    return (
      <div className={styles.modalBackground}>
        <div
          className={styles.modal}
          ref={ref}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <button className={styles.modal__closeBtn} onClick={closeModal}>
            <AiOutlineClose />
          </button>
          <h2>Leave a review</h2>
          <form
            className={styles.modal__form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.modal__form__inputBox}>
              <label htmlFor="">How would you rate this product</label>
              <div className={styles.modal__form__inputBox__ratingStars}>
                {ratingArray.map((star, index) => {
                  return <Fragment key={index}>{star}</Fragment>;
                })}
              </div>
            </div>
            <div className={styles.modal__form__inputBox}>
              <label htmlFor="">Your review</label>
              <textarea
                className={`${styles.modal__form__inputBox__body} ${
                  errors.body ? styles.modal__form__inputBox__inputError : ""
                }`}
                {...register("body")}
                autoFocus
                spellCheck={false}
              ></textarea>
              {errors.body?.message ? <p className={styles.modal__form__inputBox__errorMessage}>{errors.body.message}</p> : null}
            </div>
            <button type="submit" disabled={isLoading || isSubmitting}>
              {isLoading ? <img src={Loader} /> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    );
  }
);

export default AddReviewModal;
