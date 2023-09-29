import styles from "./orders.module.scss";
import OrdersTable from "./Widgets/OrdersTable";

const Orders = () => {
  return (
    <div className={styles.orders}>
      <h1>Orders</h1>
      <p>Manage and view a detailed list of your orders history.</p>
      <OrdersTable />
    </div>
  );
};

export default Orders;
