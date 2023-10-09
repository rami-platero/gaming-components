import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import styles from "./rating.module.scss";

type Props = {
  rating: {
    avg: number;
    amount: number;
  };
};

const Rating = ({rating }: Props) => {
  const ratingArray = Array.from({ length: 5 }, (_, i) => i);

  const handleScroll = () => {

  }

  return (
    <div className={styles.rating}>
      <div className={styles.rating__stars} onClick={handleScroll}>
        {ratingArray.map((element) => {
          // display filled stars if I have already reviewed the product
          if (rating.avg >= element + 1) {
            return (
                <AiFillStar key={element}/>
            );
          }
          return (
              <AiOutlineStar key={element}/>
          );
        })}
      </div>
      <p>{rating.avg} ({rating.amount} reviews)</p>
    </div>
  );
};

export default Rating;
