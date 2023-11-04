import styles from "./featuredSeriesSection.module.scss";
import AMD from "../../assets/vectors/amd 6000.png";
import NVIDIA from "../../assets/vectors/rtx 4000.png";
import { Link } from "react-router-dom";

const FeaturedSeriesSection = () => {
  return (
    <section className={styles.featured}>
      <h2>Featured Series</h2>
      <p className={styles.featured__description}>
        Step into the future of gaming with our featured series, the RTX 40
        Series by NVIDIA and the AMD 6000 Series. These cutting-edge graphics
        cards are the beating heart of gaming excellence, redefining
        performance, realism, and immersion for avid gamers and tech enthusiasts
        alike.
      </p>
      <div className={styles.featured__cards}>
        <div className={styles.featured__cards__card}>
          <div className={styles.featured__cards__card__wrapper}>
            <h3>AMD Radeon 6000 Series</h3>
            <div
              className={styles.featured__cards__card__wrapper__overlay}
            ></div>
            <img src={AMD} alt="" />
          </div>
          <div className={styles.featured__cards__card__info}>
            <h3>About the AMD 6000 series</h3>
            <p className={styles.featured__cards__card__info__description}>
              The AMD Radeon™ RX 6000 Series graphics cards represent the
              forefront of engineering and design to deliver ultra-high frame
              rates. Powerful compute units with hardware raytracing
              acceleration, blistering-fast AMD Infinity Cache™, and large
              amounts of GDDR6 memory enable the ultimate gaming experience.
            </p>
            <div>
              <Link to="/">Visit</Link>
            </div>
          </div>
        </div>
        <div className={styles.featured__cards__card}>
          <div className={styles.featured__cards__card__wrapper}>
            <h3>Geforce RTX 40 Series</h3>
            <div
              className={styles.featured__cards__card__wrapper__overlay}
            ></div>
            <img src={NVIDIA} alt="" />
          </div>
          <div className={styles.featured__cards__card__info}>
            <h3>About the GeForce 40 series</h3>
            <p className={styles.featured__cards__card__info__description}>
              NVIDIA® GeForce RTX™ 40 Series GPUs are beyond fast for gamers and
              creators. They're powered by the ultra-efficient NVIDIA Ada
              Lovelace architecture which delivers a quantum leap in both
              performance and AI-powered graphics.
            </p>
            <div>
              <Link to="/">Visit</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSeriesSection
