import { useNavigate } from "react-router-dom";
import { selectCartTotal } from "../../redux/features/cart/cartSlice";
import { useAppSelector } from "../../redux/hooks";
import styles from "./cartSummary.module.scss";
import { useCreateCheckoutSessionMutation } from "../../redux/services/paymentApi";
import Loader from "../../assets/WhiteLoader.svg";
import { isErrorWithStatus } from "../../utils/checkErrors";
import useToast from "../../hooks/useToast";

const CartSummary = () => {
  const total = useAppSelector(selectCartTotal);
  const navigate = useNavigate();
  const handleContinue = () => {
    navigate("/products");
  };
  const { notifyError } = useToast();

  const [checkout, { isLoading }] = useCreateCheckoutSessionMutation();

  const handleCheckout = async () => {
    try {
      await checkout(null).unwrap();
    } catch (error) {
      if (isErrorWithStatus(error) && error.originalStatus === 401) {
        notifyError("You must login to continue with the checkout.");
      }
    }
  };

  return (
    <div className={styles.summary}>
      <div className={styles.summary__subtotal}>
        <h4>Subtotal</h4>
        <h5>${total.toLocaleString("en-US")}.00</h5>
      </div>
      <hr />
      <div className={styles.summary__total}>
        <h3>Total</h3>
        <h3>${total.toLocaleString("en-US")}.00</h3>
      </div>
      <button onClick={handleCheckout} disabled={isLoading}>
        {!isLoading ? "Checkout" : <img src={Loader} />}
      </button>
      <button onClick={handleContinue}>Continue Shopping</button>
    </div>
  );
};

export default CartSummary;
