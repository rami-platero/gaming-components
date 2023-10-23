import { Fragment } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import styles from './ratingStars.module.scss'

const RatingStars = ({ rating }: { rating: number }) => {
  const ratingArray = Array.from({ length: 5 }, (_, i) => {
    return i+1 <= rating ? <AiFillStar /> : <AiOutlineStar />;
  });

  return (
    <div className={styles.ratingStars}>
      {ratingArray.map((star, index) => {
        return <Fragment key={index}>{star}</Fragment>;
      })}
    </div>
  );
};

export default RatingStars;
