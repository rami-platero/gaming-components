import { useNavigate, useParams } from "react-router-dom";
import styles from "./categories.module.scss";

const categories = [
  { key: "GPUs", name: "Graphics Cards" },
  { key: "CPUs", name: "Processors (CPUs)" },
  { key: "RAM", name: "Memory (RAM)" },
  { key: "Storage_SSD", name: "Solid State Drives (SSDs)" },
  { key: "Storage_HDD", name: "Hard Disk Drives (HDDs)" },
  { key: "Motherboards", name: "Motherboards" },
  { key: "PSU", name: "Power Supplies (PSUs)" },
  { key: "Case", name: "Cases (Chassis)" },
  { key: "Cooling_CPU", name: "CPU Cooling" },
  { key: "Cooling_Case", name: "Case Cooling" },
  { key: "Networking", name: "Networking" },
  { key: "Accessories", name: "Accessories" },
  { key: "Monitors", name: "Monitors" },
  { key: "Keyboards", name: "Keyboards" },{ key: "Mouse", name: "Mouse" }
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategory = (category: string) => {
    navigate(`/products/${category}`);
  };

  const { category } = useParams();

  return (
    <div className={styles.categories}>
      <h3>Categories</h3>
      <div className={styles.categories__wrapper}>
        {categories.map((cate) => {
          return (
            <div className={styles.categories__wrapper__item} key={cate.key}>
              <label
                htmlFor={cate.key}
                className={
                  category === cate.key
                    ? styles.categories__wrapper__item__current
                    : ""
                }
              >
                {cate.name}
              </label>
              <input
                type="radio"
                name="category"
                id={cate.key}
                onChange={() => {
                  handleCategory(cate.key);
                }}
                checked={cate.key == category}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
