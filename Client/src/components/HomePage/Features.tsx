import OrderImage from '../../assets/order.png'
import styles from './features.module.scss'

const Features = () => {
  return (
    <section className={styles.features}>
        <h2>Keep track of your orders</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta illum, blanditiis unde optio perferendis fugit nulla, veniam tempora inventore autem, mollitia ducimus officiis adipisci in asperiores consectetur ipsa magnam distinctio.</p>
        <img src={OrderImage} alt="order" />
    </section>
  )
}

export default Features