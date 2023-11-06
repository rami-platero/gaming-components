import OrderImage from '../../assets/order.png'
import styles from './features.module.scss'

const Features = () => {
  return (
    <section className={styles.features}>
        <h2>Keep track of your orders</h2>
        <p>Our user-friendly dashboard empowers you to have complete control and visibility over your purchases, from order placement to delivery and beyond.</p>
        <img src={OrderImage} alt="order" />
    </section>
  )
}

export default Features