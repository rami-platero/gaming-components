import CategoriesSection from "../../components/HomePage/CategoriesSection";
import FeaturedSeriesSection from "../../components/HomePage/FeaturedSeriesSection";
import Features from "../../components/HomePage/Features";
import Hero from "../../components/HomePage/Hero";
import styles from './homePage.module.scss';

const HomePage = () => {

  return (
    <main className={styles.homePage}>
      <Hero/>
      {/* <Wallpapers/> */}
      <div className={styles.homePage__divider}></div>
      {/* <ProductsSection/> */}
      <FeaturedSeriesSection/>
      <div className={styles.homePage__divider}></div>
      <CategoriesSection/>
      <div className={styles.homePage__divider}></div>
      <Features/>
    </main>
  );
};

export default HomePage;
