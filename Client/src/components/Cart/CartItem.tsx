import styles from "./cartItem.module.scss";
import TestImage from "../../assets/rtx3070.png";
import {
  addQuantity,
  removeQuantity,
} from "../../redux/features/cart/cartSlice";
import { useAppDispatch } from "../../redux/hooks";
import { TCartItem } from "../../types/cart";
import useDebounce from "../../hooks/useDebounce";
import useOnUpdate from "../../hooks/useOnUpdate";
import {
  useRemoveItemMutation,
  useUpdateQuantityMutation,
} from "../../redux/services/cartApi";
import { FiTrash2 } from "react-icons/fi";
import useToast from "../../hooks/useToast";

type Params = {
  item: TCartItem;
};

const CartItem = ({ item }: Params) => {
  const dispatch = useAppDispatch();

  const debouncedQuantity = useDebounce(item.quantity, 600);
  const [update] = useUpdateQuantityMutation();
  const [remove] = useRemoveItemMutation();

  const {notifyError} = useToast()

  const updateQuantity = async () => {
    try {
      await update({ id: item.product.id, quantity: debouncedQuantity }).unwrap()
    } catch (error) {
      notifyError("Internal server error")
    }
  }

  useOnUpdate(() => {
    updateQuantity()
  }, [debouncedQuantity]);

  const handleAdd = () => {
    if (item.quantity < item.product.stock) {
      dispatch(addQuantity(item.product.id));
    }
  };

  const handleSubtract = () => {
    if (item.quantity > 1) {
      dispatch(removeQuantity(item.product.id));
    }
  };

  const handleRemove = async () => {
    try {
      await remove(item.product.id).unwrap()
    } catch (error) {
      notifyError("Internal server error")
    }
  };

  return (
    <div className={styles.item}>
      {/* Loader */}
      {/* Details */}
      <div className={styles.item__details}>
        <img src={TestImage} />
        <div className={styles.item__details__wrapper}>
          <h3 className={styles.item__details__wrapper__name}>
            {item.product.name}
          </h3>
          <h3 className={styles.item__details__wrapper__brand}>
            Brand: <span>{item.product.brand}</span>
          </h3>
          <h4 className={styles.item__details__wrapper__id}>
            ID Number: #{item.product.id}
          </h4>
        </div>
      </div>
      <div className={styles.item__quantity}>
        <button onClick={handleSubtract}>-</button>
        <h4>{item.quantity}</h4>
        <button onClick={handleAdd}>+</button>
      </div>
      <h3 className={styles.item__totalPrice}>
        $ {Number(item.product.price * item.quantity).toLocaleString("en-US")}
        .00
      </h3>
      <button className={styles.item__remove} onClick={handleRemove}>
        <FiTrash2 />
      </button>
    </div>
  );
};

export default CartItem;
