import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./successPage.module.scss";
import { useLayoutEffect, useState } from "react";
import { useClearCartMutation } from "../../redux/services/cartApi";
import { useLazyGetOrderIDQuery } from "../../redux/services/paymentApi";
import SkeletonTextLine from "../../components/Skeleton/UI/SkeletonTextLine";

const SuccessPage = () => {
  const [searchParams, _setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<number | null>(null);

  const [clearCartMutate] = useClearCartMutation();

  const clearCart = async () => {
    await clearCartMutate(null).unwrap();
  };

  const [getOrderID, { isFetching }] = useLazyGetOrderIDQuery();

  const handleOrderID = async (session_id: string) => {
    const orderID = await getOrderID(session_id).unwrap();
    setOrder(orderID.id);
  };

  useLayoutEffect(() => {
    const session_id = searchParams.get("session_id");
    if (!session_id) {
      navigate("/");
    } else {
      clearCart();
      handleOrderID(session_id);
    }
  }, []);

  const handleShoppingButton = () => {
    navigate("/products");
  };

  return (
    <main className={styles.success}>
      <div className={styles.success__circle}>
        <div className={styles.success__circle__check}></div>
      </div>
      <h1>Payment Successful!</h1>
      <p className={styles.success__message}>
        Thank you for your purchase! Your payment has been successfully
        processed, and your order is now complete.
      </p>
      {!isFetching ? (
        <p className={styles.success__orderID}>Order ID Number: #{order}</p>
      ) : (
        <SkeletonTextLine />
      )}
      <button
        className={styles.success__shoppingButton}
        onClick={handleShoppingButton}
      >
        Continue Shopping
      </button>
    </main>
  );
};

export default SuccessPage;
