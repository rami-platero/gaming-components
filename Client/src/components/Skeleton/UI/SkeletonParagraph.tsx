import styles from "./paragraph.module.scss";

const array = [5, 4, 7, 2, 5, 3, 6,5,3];

const SkeletonParagraph = () => {
  return (
    <div className={styles.paragraph}>
      {array.map((key) => {
        return <div key={key} className={styles.paragraph__words} style={{width: `${key*12}px`}}></div>;
      })}
    </div>
  );
};

export default SkeletonParagraph;
