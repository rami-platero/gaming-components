import styles from "./ordersTableSkeleton.module.scss";

const OrdersTableSkeleton = ({length}: {length: number}) => {
  const array = [];
  for (let i = 0; i < length; i++) {
    array.push(i)
  }

  return (
    <div className={styles.container}>
        <div className={styles.container__header}>
          <h3></h3>
          <h3></h3>
          <h3></h3>
          <h3></h3>
          <h3></h3>
        </div>
        <div className={styles.container__body}>
          {array?.map((item) => {
            return (
              <div className={styles.container__body__row} key={item}>
                <div className={styles.orderID}></div>
                <div className={styles.date}></div>
                <div className={styles.itemsAmount}></div>
                <div className={styles.total}></div>
                <div className={styles.status}></div>
              </div>
            );
          })}
        </div>
    </div>
  );
};

export default OrdersTableSkeleton;
