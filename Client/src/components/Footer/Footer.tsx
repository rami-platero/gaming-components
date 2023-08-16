import styles from "./footer.module.scss";
import { Link } from "react-router-dom";
import {AiFillFacebook} from 'react-icons/ai'
import {AiFillYoutube} from 'react-icons/ai'
import {AiFillLinkedin} from 'react-icons/ai'
import {AiOutlineGooglePlus} from 'react-icons/ai'
import {AiOutlineMail} from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.footer__content__col}>
          <h3>Gaming Components</h3>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos saepe pariatur deleniti labore fugit consequatur obcaecati voluptatem quas explicabo facilis ut et doloremque quidem ad dolorem atque illo, odio dicta.
          </p>
        </div>
        <div className={styles.footer__content__col}>
          <h3>Sitemap</h3>
          <hr />
          <div className={styles.footer__content__col__links}>
            <Link to="/">Home</Link>
            <Link to="/contact">Contact us</Link>
            <Link to="/about">About us</Link>
            <Link to="/register">Get Started</Link>
          </div>
        </div>
        <div className={styles.footer__content__col}>
          <h3>Products</h3>
          <hr />
          <div className={styles.footer__content__col__links}>
            <Link to="/">GPUs</Link>
            <Link to="/">Processors</Link>
            <Link to="/">Motherboards</Link>
            <Link to="/">Monitors</Link>
          </div>
        </div>
        <div className={styles.footer__content__col}>
          <h3>Help</h3>
          <hr />
          <div className={styles.footer__content__col__links}>
            <Link to="/">Support</Link>
            <Link to="/">Terms and Use</Link>
            <Link to="/">Privacy Policy</Link>
          </div>
        </div>
        <div className={styles.footer__content__col}>
          <h3>Contact</h3>
          <hr />
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
        © 2023 Gaming Components. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
