import styles from "./productInfo.module.scss";
import { TProduct } from "../../types/products";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";
import Rating from "../Rating";
import { formatPrice } from "../../utils/format";
import config from "../../config/config";

type Params = {
  product: TProduct;
};

const ProductInfo = ({ product }: Params) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleImage = (index: number) => {
    setCurrentImage(index);
  };

  const formattedPrice = formatPrice(product.price);

  return (
    <div className={styles.info}>
      <div className={styles.info__media}>
        <div className={styles.info__media__container}>
          {product.images && product.images.map((image) => {
            return (
              <img
                key={image.xl}
                src={`${config.CDN_URL}/${image.xl}`}
                style={{translate: `${(-100*currentImage)}%`}}
              />
            );
          })}
        </div>
        <div className={styles.info__media__images}>
          {product.images ? (
            <>
              {product.images.map((image, index) => {
                return (
                  <img
                    onClick={() => {
                      handleImage(index);
                    }}
                    className={`${
                      currentImage === index &&
                      styles.info__media__images__current
                    }`}
                    key={image.thumbnail}
                    src={`${config.CDN_URL}/${image.xl}`}
                  />
                );
              })}
            </>
          ) : null}
        </div>
      </div>
      <div className={styles.info__data}>
        <h5 className={styles.info__data__stock}>
          {product.stock > 0 ? `${product.stock} Available` : "Out of stock"}
        </h5>
        <Rating rating={product.rating} />
        <h1 className={styles.info__data__name}>{product.name}</h1>
        <h2 className={styles.info__data__category}>{product.category}</h2>
        <h3 className={styles.info__data__price}>$ {formattedPrice}</h3>
        <div className={styles.info__data__description}>
          {product.description}
        </div>
        <div className={styles.info__data__actions}>
          <button>
            <AiOutlineShoppingCart /> Add to cart
          </button>
          <button>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
