import styles from "./ordersTableSkeleton.module.scss";
import { CSSProperties } from "react";

interface Props extends CSSProperties {
  rows: number;
  columns: number;
}

const OrdersTableSkeleton = ({ rows, columns, ...style }: Props) => {
  const rowsArray: number[] = [];
  for (let i = 0; i < rows; i++) {
    rowsArray.push(i);
  }
  const colsArray: number[] = [];
  for (let i = 0; i < columns; i++) {
    colsArray.push(i);
  }

  return (
    <div className={styles.container} style={style}>
      <div className={styles.container__header}>
        {colsArray.map((item) => {
          return <h3 key={item}></h3>;
        })}
      </div>
      <div className={styles.container__body}>
        {rowsArray?.map((item) => {
          return (
            <div className={styles.container__body__row} key={item}>
              {colsArray.map((item) => {
                return <div key={item}></div>;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersTableSkeleton;
