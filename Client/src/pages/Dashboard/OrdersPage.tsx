import { useGetOrdersQuery } from "../../redux/services/ordersApi";
import OrdersTableSkeleton from "../../components/Skeleton/Dashboard/OrdersTableSkeleton";
import styles from "./ordersPage.module.scss";
import OrdersTable from "../../components/Dashboard/Widgets/OrdersTable";

const OrdersPage = () => {
  const { data: orders, isFetching } = useGetOrdersQuery(null);

  return (
    <div className={styles.orders}>
      <h1>Orders</h1>
      <p>Manage and view a detailed list of your orders history.</p>
      {!isFetching && orders && orders.length ? (
        <OrdersTable orders={orders} />
      ) : null}
      {isFetching ? <OrdersTableSkeleton rows={5} columns={5} /> : null}
      {!isFetching && (!orders || !orders?.length) ? (
        <div>
          <h2>No orders have been placed yet.</h2>
        </div>
      ) : null}
    </div>
  );
};

export default OrdersPage;
