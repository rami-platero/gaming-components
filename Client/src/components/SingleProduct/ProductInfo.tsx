import styles from "./productInfo.module.scss";
import RTXExampleIMG from "../../assets/rtx3070.png";
import { TProduct } from "../../types/products";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";

type Params = {
  product: TProduct;
};

const images = [
  {
    image: RTXExampleIMG,
  },
  {
    image: RTXExampleIMG,
  },
  {
    image: RTXExampleIMG,
  },
  {
    image: RTXExampleIMG,
  },
];

const ProductInfo = ({ product }: Params) => {
  const [currentImage, setCurrentImage] = useState(1);

  const handleImage = (index: number) => {
    setCurrentImage(index);
  };

  return (
    <div className={styles.info}>
      <div className={styles.info__media}>
        <img
          className={styles.info__media__current}
          src={RTXExampleIMG}
          alt={product.name}
        />
        <div className={styles.info__media__images}>
          {images.map((image, index) => {
            return (
              <img
                key={index}
                src={image.image}
                className={
                  index === currentImage
                    ? styles.info__media__images__current
                    : ""
                }
                onClick={()=>{
                    handleImage(index)
                }}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.info__data}>
        <h5 className={styles.info__data__stock}>{product.stock > 0? `${product.stock} Available`: "Out of stock"}</h5>
        <h1 className={styles.info__data__name}>{product.name}</h1>
        <h2 className={styles.info__data__category}>{product.category}</h2>
        <h3 className={styles.info__data__price}>$ {product.price}.00</h3>
        <div className={styles.info__data__description}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Exercitationem libero necessitatibus ea dolor ratione recusandae,
          optio ad maiores culpa totam iste natus? Ut placeat maxime iste nisi?
          Voluptatum, eaque nam. Provident blanditiis, repudiandae accusantium
          porro eveniet impedit. Facere nihil adipisci molestias saepe,
          explicabo, atque veniam recusandae eius libero eaque blanditiis eos.
          Ex accusamus excepturi incidunt, fugit ducimus esse facere deleniti?
          Quos velit vero doloremque assumenda voluptatem provident asperiores,
          in sint. Dolorem nihil nemo fugiat excepturi adipisci officiis
          voluptatum consequuntur ducimus a, consequatur, doloribus quas ipsum
          cupiditate fugit, eveniet soluta similique. Saepe nobis mollitia sit
          est necessitatibus itaque unde eveniet vitae reiciendis voluptatibus
          veritatis, inventore eos in, minima architecto distinctio dicta aut?
          Sed, suscipit. Iure nostrum sed, facilis officia dolor ipsum. Animi
          exercitationem vel vitae quod, soluta porro tempora modi assumenda
          architecto voluptas corrupti corporis cum quis quia consequuntur. At
          quaerat corporis dolor temporibus nam explicabo voluptates officiis
          consequuntur quod. Dolorem.
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
