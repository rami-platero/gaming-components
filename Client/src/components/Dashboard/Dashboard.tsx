import { Link } from "react-router-dom";
import OrdersTable from "./Widgets/OrdersTable";
import styles from "./dashboard.module.scss";
import Avatar from "../../assets/default_pfp.png";
import { BsCartX } from "react-icons/bs";
import Image from "../../assets/rtx3070.png";
import { useAppSelector } from "../../redux/hooks";
import { useGetOrdersQuery } from "../../redux/services/ordersApi";
import OrdersTableSkeleton from "../Skeleton/Dashboard/OrdersTableSkeleton";
import ImageWithLoader from '../Image'
import config from "../../config/config";

const Dashboard = () => {
  const user = useAppSelector((state) => state.auth.user);
  const cart = useAppSelector((state) => state.cart);
  const { data: orders, isFetching } = useGetOrdersQuery(null);

  return (
    <div className={styles.dashboard}>
      <h1>Hi, {user?.username}</h1>
      <h2>Welcome to the dashboard.</h2>

      <div className={styles.dashboard__widgets}>
        <div className={styles.dashboard__widgets__orders}>
          <div className={styles.header}>
            <h3>Your latest orders</h3>
            <Link to={"/dashboard/orders"}>View all</Link>
          </div>
          <div className={styles.dashboard__widgets__orders__wrapper}>
            {isFetching && <OrdersTableSkeleton length={2} />}
            {!isFetching && !!orders && <OrdersTable orders={orders} />}
          </div>
        </div>

        <div className={styles.dashboard__widgets__profile}>
          <div className={styles.header}>
            <h3>Your profile</h3>
            <Link to={"/dashboard/settings"}>Account settings</Link>
          </div>
          <div className={styles.dashboard__widgets__profile__wrapper}>
            <div className={styles.dashboard__widgets__profile__wrapper__imgContainer}>
            {user?.avatar ? <ImageWithLoader src={`${config.API_BASE_URL}/avatar/${user.avatar}`}/> : <img src={Avatar} />}
            </div>
            <h3>{user?.username}</h3>
            <h4>{user?.email}</h4>
          </div>
        </div>

        <div className={styles.dashboard__widgets__featured}>
          <div className={`${styles.header} ${styles.golden}`}>
            <h3>Featured product</h3>
          </div>
          <div className={styles.dashboard__widgets__featured__wrapper}>
            <div>
              <img src={Image} />
              <div>
                <h3>ZOTAC RTX 2080 Ti</h3>
                <h4>Graphics card</h4>
              </div>
              <h3>$1,500.00 USD</h3>
            </div>
            <button>More info</button>
          </div>
        </div>

        <div className={styles.dashboard__widgets__cart}>
          <div className={styles.header}>
            <h3>Your cart</h3>
            <Link to={"/cart"}>Go to your cart</Link>
          </div>
          {!cart.length ? (
            <div className={styles.dashboard__widgets__cart__wrapper}>
              <BsCartX />
              <h4>Your cart is empty!</h4>
              <h5>You haven't added any items to your cart yet.</h5>
              <Link to={"/products"}>Shop now!</Link>
            </div>
          ) : (
            <div className={styles.dashboard__widgets__cart__wrapper}>
              <h3>You have {cart.length} item in your cart</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
