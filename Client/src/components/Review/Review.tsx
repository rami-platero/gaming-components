import { memo, useState } from "react";
import { Review as TReview } from "../../types/reviews";
import RatingStars from "../UI/RatingStars";
import styles from "./review.module.scss";
import { BiDotsVerticalRounded } from "react-icons/bi";
import ReviewContextMenu from "./ReviewContextMenu";
import useModal from "../../hooks/useModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditReviewMutation } from "../../redux/services/reviewsApi";
import Loader from "../../assets/WhiteLoader.svg";
import useToast from "../../hooks/useToast";
import { ReviewFormSchema, reviewFormSchema } from "../../schemas/reviewSchema";
import { useAppSelector } from "../../redux/hooks";

const Review = ({ review }: { review: TReview }) => {
  const date = new Date(review.createdAt).toLocaleDateString("en-UK");
  const [isEditing, setIsEditing] = useState(false);
  const { notifyTemporalSuccess } = useToast();

  const handleEditing = () => {
    setIsEditing(true);
    closeModal();
  };

  const handleCancel = () => {
    setIsEditing(false);
    setValue("body", review.body);
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormSchema>({
    resolver: zodResolver(reviewFormSchema),
  });
  const currentBodyValue = watch("body");
  const [editReview, { isLoading }] = useEditReviewMutation();
  const user = useAppSelector((state) => state.auth?.user);

  const onSubmit = async (data: ReviewFormSchema) => {
    try {
      await editReview({ id: review.id, body: data.body }).unwrap();
      setIsEditing(false);
      notifyTemporalSuccess("Review edited");
    } catch (error) {}
  };

  const { ref, isOpen, openModal, closeModal } = useModal();

  return (
    <div className={styles.review}>
      <div className={styles.review__header}>
        <img
          src={user && user.id === review.user_id ? user.avatar : review.avatar}
          alt="avatar"
        />
        <h3>{review.username}</h3>
        <RatingStars rating={review.rating} />
        <h5 className={styles.review__header__date}>{date}</h5>
        {user && user.id === review.user_id ? (
          <button onClick={openModal} className={styles.review__header__btn}>
            <BiDotsVerticalRounded />
          </button>
        ) : null}
        {isOpen ? (
          <ReviewContextMenu
            handleEditing={handleEditing}
            ref={ref}
            review={review}
          />
        ) : null}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.review__editForm}
      >
        <input
          {...register("body")}
          className={`${styles.review__editForm__body} ${
            errors.body && isEditing ? styles.review__editForm__inputError : ""
          }`}
          spellCheck={false}
          type="text"
          defaultValue={review.body}
          readOnly={!isEditing}
        />
        {errors.body ? (
          <p className={styles.review__editForm__body__errorMessage}>
            {errors.body.message}
          </p>
        ) : null}
        {isEditing ? (
          <div className={styles.review__editForm__actions}>
            <button
              onClick={handleCancel}
              disabled={isSubmitting || isLoading}
              className={styles.review__editForm__actions__cancelBtn}
            >
              Cancel
            </button>
            <button
              className={styles.review__editForm__actions__submitBtn}
              type="submit"
              disabled={
                currentBodyValue === review.body || isSubmitting || isLoading
              }
            >
              {!isSubmitting && !isLoading ? "Save" : <img src={Loader} />}
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default memo(Review);
