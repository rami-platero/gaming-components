import { useNavigate } from "react-router-dom";
import { selectCartTotal } from "../../redux/features/cart/cartSlice";
import { useAppSelector } from "../../redux/hooks";
import styles from "./cartSummary.module.scss";
import { useCreateCheckoutSessionMutation } from "../../redux/services/paymentApi";
import Loader from '../../assets/Loader.svg'

const CartSummary = () => {
  const total = useAppSelector(selectCartTotal)
  const navigate = useNavigate()
  const handleContinue = () => {
    navigate("/products")
  }

  const [checkout, {isLoading}] = useCreateCheckoutSessionMutation()

  const handleCheckout = async () => {
      checkout(null)
  }

  return (
    <div className={styles.summary}>
      <div className={styles.summary__subtotal}>
        <h4>Subtotal</h4>
        <h5>${total.toLocaleString('en-US')}.00</h5>
      </div>
      <hr />
      <div className={styles.summary__total}>
        <h3>Total</h3>
        <h3>${total.toLocaleString('en-US')}.00</h3>
      </div>
      <button onClick={handleCheckout} disabled={isLoading}>{!isLoading? "Checkout": <img src={Loader} />}</button>
      <button onClick={handleContinue}>Continue Shopping</button>
    </div>
  );
};

export default CartSummary;
