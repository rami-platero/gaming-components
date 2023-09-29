import { Link } from "react-router-dom"
import styles from './emptyCart.module.scss'

const EmptyCart = () => {
  return (
    <div className={styles.emptyCart}>
        <h2>Your cart is empty</h2>
        <p>No items in your cart yet. We invite you to explore our wide range of products across various categories!</p>
        <Link to={"/products"}>
            Explore Products
        </Link>
    </div>
  )
}

export default EmptyCart