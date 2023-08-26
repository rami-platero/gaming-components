import { useContext } from "react";
import styles from "./navigation.module.scss";
import { Link } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import DefaultPFP from "../../assets/default_pfp.png";

const Navigation = () => {
  const { isAuthenticated, logout } = useContext(authContext);
  return (
      <header className={`${styles.navigation}`}>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/products"}>Products</Link>
            </li>
            <li>
              <Link to={"/about"}>About us</Link>
            </li>
          </ul>
          <ul>
            <li>
              <AiOutlineShoppingCart />
            </li>
            {!isAuthenticated ? (
              <>
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
                <li>
                  <Link to={"/register"}>Get Started</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/dashboard"}>
                    <img src={DefaultPFP} alt="profile_picture" />
                  </Link>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
  );
};

export default Navigation;
