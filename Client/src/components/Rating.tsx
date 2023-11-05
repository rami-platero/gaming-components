import styles from "./rating.module.scss";
import RatingStars from "./UI/RatingStars";

type Props = {
  rating: {
    avg: number;
    amount: number;
  };
};

const Rating = ({ rating }: Props) => {
  const handleScroll = () => {};

  return (
    <div className={styles.rating}>
      <div className={styles.rating__stars} onClick={handleScroll}>
        <RatingStars rating={rating.avg} />
      </div>
      <p>
        {rating.avg} ({rating.amount} reviews)
      </p>
    </div>
  );
};

export default Rating;
