import styles from './filtersSkeleton.module.scss'

const FiltersSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeleton__backBtn}></div>
      <div className={styles.skeleton__priceRange}>
        <h3></h3>
        <div></div>
        <h4></h4>
        <h4></h4>
      </div>
      <div className={styles.skeleton__checkbox}>
        <h3></h3>
        <h4></h4>
        <h3></h3>
      </div>
      <div className={styles.skeleton__checkbox}>
        <h3></h3>
        <h4></h4>
        <h3></h3>
      </div>
      <div className={styles.skeleton__checkbox}>
        <h3></h3>
        <h4></h4>
        <h3></h3>
      </div>
      <div className={styles.skeleton__checkbox}>
        <h5></h5>
        <h4></h4>
        <h3></h3>
      </div>
      <div className={styles.skeleton__checkbox}>
        <h3></h3>
        <h4></h4>
        <h3></h3>
      </div>
    </div>
  );
};

export default FiltersSkeleton;
