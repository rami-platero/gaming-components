import styles from "./productCardSkeleton.module.scss";

const ProductCardSkeleton = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      {array.map((index) => {
        return (
          <div key={index} className={styles.skeleton}>
            <div className={styles.skeleton__imgContainer}></div>
            <div className={styles.skeleton__info}>
              <div className={styles.skeleton__info__upper}>
                <h2></h2>
                <h3 className={styles.skeleton__info__upper__category}></h3>
              </div>
              <div className={styles.skeleton__info__lower}>
                <h3></h3>
                <div className={styles.skeleton__info__lower__actions}>
                  <button></button>
                  <button></button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCardSkeleton;
