import styles from "./categoriesSection.module.scss";
import Motherboard from "../../assets/vectors/motherboard.png";
import CPU from "../../assets/vectors/cpu.png";
import Ram from "../../assets/vectors/ram.png";
import GPU from "../../assets/vectors/gpu.png";
import Fans from "../../assets/vectors/fans.png";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Motherboards",
    link: "Motherboards",
    image: Motherboard
  },
  {
    name: "Graphics Cards",
    link: "GPUs",
    image: GPU
  },
  {
    name: "Ram Memory",
    link: "Ram",
    image: Ram
  },
  {
    name: "Processors",
    link: "CPUs",
    image: CPU
  },
  {
    name: "Fans",
    link: "Fans",
    image: Fans
  },
];

const CategoriesSection = () => {
  return (
    <section className={styles.categories}>
      <h2>Categories</h2>
      <p>
      Our precise categorization ensures that you can swiftly identify the hardware and accessories that best suit your gaming preferences.
      </p>
      <div className={styles.categories__wrapper}>
        {categories.map((category) => {
          return (
            <div className={styles.categories__wrapper__item} key={category.name}>
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
              <Link to={`/products/${category.link}`}>Visit</Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoriesSection;
