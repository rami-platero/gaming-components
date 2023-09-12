import SkeletonParagraph from "../UI/SkeletonParagraph";
import styles from "./productInfoSkeleton.module.scss";

const images = [1,2,3,4];

const ProductInfoSkeleton = () => {
  return (
    <div className={styles.info}>
      <div className={styles.info__media}>
        <div className={styles.info__media__current}></div>

        <div className={styles.info__media__images}>
          {images.map((img) => {
            return <div key={img} className={styles.info__media__images__img}></div>;
          })}
        </div>
      </div>
      <div className={styles.info__data}>
        <h5 className={styles.info__data__stock}></h5>
        <h1 className={styles.info__data__name}></h1>
        <h2 className={styles.info__data__category}></h2>
        <h3 className={styles.info__data__price}></h3>
        <div className={styles.info__data__description}>
            <SkeletonParagraph/>
            <SkeletonParagraph/>
            <SkeletonParagraph/>
            <SkeletonParagraph/>
            <SkeletonParagraph/>
            <SkeletonParagraph/>
            <SkeletonParagraph/>
        </div>
        <div className={styles.info__data__actions}>
          <button></button>
          <button></button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoSkeleton;
