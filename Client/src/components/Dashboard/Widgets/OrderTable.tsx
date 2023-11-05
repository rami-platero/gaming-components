import { Order } from "../../../types/order";
import styles from "./orderTable.module.scss";
import config from "../../../config/config";

const OrderTable = ({ order }: { order: Order }) => {
  return (
    <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total price</th>
          </tr>
        </thead>
        <tbody>
          {order?.orderItems?.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <div>
                    <img src={`${config.CDN_URL}/${item.product.images[0].thumbnail}`} />
                    {item.product.name}
                  </div>
                </td>
                <td>x{item.quantity}</td>
                <td>${item.unit_price.toLocaleString("en-US")}.00</td>
                <td>${item.total_price.toLocaleString("en-US")}.00</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
