import styles from "./productCard.module.scss";
import RTXExampleIMG from "../assets/rtx3070.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TProduct } from "../types/products";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { isProductInCart } from "../redux/features/cart/cartSlice";
import useToast from "../hooks/useToast";
import { useAddItemToCartMutation } from "../redux/services/cartApi";
import config from "../config/config";
import { formatPrice } from "../utils/format";

type Props = {
  product: TProduct;
};

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();
  const [addItemToCart] = useAddItemToCartMutation();

  const { notifyError } = useToast();

  const formattedPrice = formatPrice(product.price)

  const isInCart = useAppSelector(isProductInCart(product.id));

  const handleClickProduct = () => {
    navigate(`/products/${product.category}/${product.slug}`);
  };

  const handleAddItem = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (product.stock >= 1) {
      addItemToCart(product);
    } else {
      notifyError("This product is out of stock!");
    }
  };

  return (
    <div className={styles.product} onClick={handleClickProduct}>
      <div className={styles.product__imgContainer}>
        {!product.images ? (
          <img src={RTXExampleIMG} alt="" />
        ) : (
          <img src={`${config.CDN_URL}/${product.images[0].xl}`} />
        )}
      </div>
      <div className={styles.product__info}>
        <div className={styles.product__info__upper}>
          <h2>{product.name}</h2>
          <h3 className={styles.product__info__upper__category}>
            {product.category}
          </h3>
        </div>
        <div className={styles.product__info__lower}>
          <h3>$ {formattedPrice}</h3>
          <div className={styles.product__info__lower__actions}>
            <button onClick={handleAddItem} disabled={isInCart}>
              <AiOutlineShoppingCart /> {!isInCart ? "Add to cart" : "In cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
