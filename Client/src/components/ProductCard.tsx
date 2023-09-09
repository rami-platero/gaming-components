import styles from "./productCard.module.scss";
import RTXExampleIMG from "../assets/rtx3070.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TProduct } from "../types/products";
import { useNavigate } from "react-router-dom";

type Props = {
  product: TProduct;
};

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();

  const handleClickProduct = () => {
    navigate(`/products/${product.category}/${product.slug}`);
  };

  return (
    <div className={styles.product} onClick={handleClickProduct}>
      <div className={styles.product__imgContainer}>
        <img src={RTXExampleIMG} alt="" />
      </div>
      <div className={styles.product__info}>
        <div className={styles.product__info__upper}>
          <h2>{product.name}</h2>
          <h3 className={styles.product__info__upper__category}>
            {product.category}
          </h3>
        </div>
        <div className={styles.product__info__lower}>
          <h3>$ {product.price}.00</h3>
          <div className={styles.product__info__lower__actions}>
            <button>
              <AiOutlineShoppingCart /> Add to cart
            </button>
            <button>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
