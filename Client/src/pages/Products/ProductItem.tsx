import { Product } from "../../types";
import styles from "./productItem.module.scss";
import RTXExampleIMG from "../../assets/rtx3070.png";
import {AiOutlineShoppingCart} from 'react-icons/ai'


type Props = {
  product: Product;
};

const ProductItem = ({ product }: Props) => {
  return (
    <div className={styles.product}>
      <div className={styles.product__imgContainer}>
        <img src={RTXExampleIMG} alt="" />
      </div>
      <div className={styles.product__info}>
      <h2>{product.name}</h2>
      <h3 className={styles.product__info__category}>{product.category}</h3>
      <h3>${product.price}.00</h3>
      <div className={styles.product__info__actions}>
        <button><AiOutlineShoppingCart/> Add to cart</button>
        <button>Buy</button>
      </div>
      </div>
    </div>
  );
};

export default ProductItem;
