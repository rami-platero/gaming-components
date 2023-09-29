import { useNavigate } from "react-router-dom";
import { useGetOrdersQuery } from "../../../redux/services/ordersApi";
import styles from "./ordersTable.module.scss";

const OrdersTable = () => {
  const { data: orders } = useGetOrdersQuery(null);

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Products (amount)</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => {
            const date = new Date(order.createdAt).toLocaleDateString("en-UK");
            return (
              <tr
                className={styles.row}
                key={order.id}
                onClick={() => {
                  navigate(`/dashboard/orders/${order.id}`);
                }}
              >
                <td>
                  <div className={styles.orderID}>#{order.id}</div>
                </td>
                <td>
                  <div className={styles.date}>{date}</div>
                </td>
                <td>
                  <div className={styles.itemsAmount}>
                    {order.orderItems.length}
                  </div>
                </td>
                <td>
                  <div className={styles.total}>
                    ${order.total.toLocaleString("en-US")}.00
                  </div>
                </td>
                <td>
                  <div className={styles.status}>{order.payment_status}</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
