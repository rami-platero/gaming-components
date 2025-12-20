import styles from "./footer.module.scss";
import { Link } from "react-router-dom";
import {AiFillFacebook} from 'react-icons/ai'
import {AiFillYoutube} from 'react-icons/ai'
import {AiFillLinkedin} from 'react-icons/ai'
import {AiOutlineGooglePlus} from 'react-icons/ai'
import {AiOutlineMail} from 'react-icons/ai'

const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.footer__content__col}>
          <h3>Gaming Components</h3>
          <p>
            We provide you with the latest gaming components that blend innovation, performance, and style. Our commitment to staying up-to-date with the latest advancements ensures that your gaming setup is always at its best.
          </p>
        </div>
        <div className={styles.footer__content__col}>
          <h3>Sitemap</h3>
          <div className={styles.footer__content__col__links}>
            <Link to="/">Home</Link>
            <Link to="/contact">Contact us</Link>
            <Link to="/about">About us</Link>
            {/* <Link to="/register">Get Started</Link> */}
          </div>
        </div>
        <div className={styles.footer__content__col}>
          <h3>Products</h3>
          <div className={styles.footer__content__col__links}>
            <Link to="/products/GPUs">GPUs</Link>
            <Link to="/products/CPUs">Processors</Link>
            <Link to="/products/Motherboards">Motherboards</Link>
            <Link to="/products/Monitors">Monitors</Link>
          </div>
        </div>
        <div className={styles.footer__content__col}>
          <h3>Help</h3>
          <div className={styles.footer__content__col__links}>
            <Link to="/">Support</Link>
            <Link to="/">Terms and Use</Link>
            <Link to="/">Privacy Policy</Link>
          </div>
        </div>
        <div className={styles.footer__content__col}>
          <h3>Contact</h3>
          <a href="mailto:gamingcomponents@gmail.com" className={styles.footer__content__col__mail}>
            <AiOutlineMail/>
            <p>Mail us at</p>
            <p>gamingcomponents@gmail.com</p>
          </a>
          <div className={styles.footer__content__col__socials}>
            <AiFillFacebook/>
            <AiFillLinkedin/>
            <AiFillYoutube/>
            <AiOutlineGooglePlus/>
          </div>
        </div>
      </div>
      <div className={styles.footer__rights}>
        © {currentYear} Gaming Components. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
