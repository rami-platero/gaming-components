import { useMemo } from "react";
import { useAppSelector } from "../../redux/hooks";
import styles from "./cartPage.module.scss";
import EmptyCart from "../../components/Cart/EmptyCart";
import CartItem from "../../components/Cart/CartItem";
import CartSummary from "../../components/Cart/CartSummary";

const CartPage = () => {
  const cart = useAppSelector((state) => state.cart);

  const cartItems = useMemo(() => {
    return cart;
  }, [cart]);

  return (
    <main className={styles.cart}>
      <h1>My cart</h1>
      <hr />
      {!cartItems.length && <EmptyCart />}
      {!!cartItems.length && (
        <div className={styles.cart__container}>
          <div className={styles.cart__container__wrapper}>
            {cartItems.map((item) => {
              if(!item.loading){
                return <CartItem key={item.product.id} item={item} />;
              }
            })}
          </div>
          {/* Summary */}
          <CartSummary />
        </div>
      )}
    </main>
  );
};

export default CartPage
