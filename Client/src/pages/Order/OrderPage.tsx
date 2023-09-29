import styles from "./orderPage.module.scss";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useGetOrderQuery } from "../../redux/services/ordersApi";
import OrderTable from "../../components/Dashboard/Widgets/OrderTable";

const OrderPage = () => {
  const { id } = useParams();
  const { data: order } = useGetOrderQuery(id || "");

  const date = order && new Date(order?.createdAt).toLocaleDateString("en-UK");

  return (
    <div className={styles.order}>
      <Link to={"/dashboard/orders"}>
        <BsArrowLeftShort /> Back to orders
      </Link>
      <h1>Order Number #{order?.id}</h1>
      <div className={styles.order__container}>
        <OrderTable order={order!} />

        <div className={styles.order__container__summary}>
          <h2>Order summary</h2>
          <div>
            <h4>Order created</h4>
            <h4>{date}</h4>
          </div>
          <div>
            <h4>Subtotal</h4>
            <h4>${order?.subtotal.toLocaleString("en-US")}.00</h4>
          </div>
          <div>
            <h4>Total</h4>
            <h4>${order?.total.toLocaleString("en-US")}.00</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
