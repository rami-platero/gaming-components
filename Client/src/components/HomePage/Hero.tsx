import styles from "./hero.module.scss";
import Isometric from "../../assets/isometric.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__content}>
        <h1>Gaming Components</h1>
        <p>
        Welcome to Gaming Components, we provide you with the latest gaming components that blend innovation, performance, and style. Our commitment to staying up-to-date with the latest advancements ensures that your gaming setup is always at its best.
        </p>
        <Link to={"/products"}>Start Shopping</Link>
      </div>
      <div className={styles.hero__imgContainer}>
        <img src={Isometric} alt="" />
      </div>
    </section>
  );
};

export default Hero;
