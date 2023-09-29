import { Link } from "react-router-dom";
import styles from "./cartNavItem.module.scss";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useAppSelector } from "../../redux/hooks";

const CartNavItem = () => {
  const items_amount = useAppSelector((state) => state.cart.length);
  return (
    <Link to={"/cart"} className={styles.cart}>
      <AiOutlineShoppingCart />
      {items_amount > 0 && <span>{items_amount}</span>}
    </Link>
  );
};

export default CartNavItem;
