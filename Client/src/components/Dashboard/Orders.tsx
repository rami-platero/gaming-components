import { useGetOrdersQuery } from "../../redux/services/ordersApi";
import OrdersTableSkeleton from "../Skeleton/Dashboard/OrdersTableSkeleton";
import styles from "./orders.module.scss";
import OrdersTable from "./Widgets/OrdersTable";

const Orders = () => {
  const { data: orders, isFetching } = useGetOrdersQuery(null);

  return (
    <div className={styles.orders}>
      <h1>Orders</h1>
      <p>Manage and view a detailed list of your orders history.</p>
      {!isFetching && !!orders && <OrdersTable orders={orders} />}
      {isFetching && <OrdersTableSkeleton rows={5} columns={5}/>}
    </div>
  );
};

export default Orders;
