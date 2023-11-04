import styles from "./hero.module.scss";
import Isometric from "../../assets/isometric.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__content}>
        <h1>Gaming Components</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum,
          enim! Aliquid ut at modi ad tempore nostrum pariatur, libero expedita
          explicabo quisquam provident maiores voluptates molestiae officia
          quidem inventore culpa!
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
