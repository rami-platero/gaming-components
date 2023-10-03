import styles from "./navigation.module.scss";
import { Link } from "react-router-dom";
import DefaultAvatar from "../../assets/default_pfp.png";
import { useLogOutMutation } from "../../redux/services/authApiSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { handleLoading, logOut } from "../../redux/features/user/authSlice";
import NavSkeleton from "../Skeleton/NavSkeleton";
import CartNavItem from "./CartNavItem";
import Image from "../Image";

const Navigation = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isLoading = useAppSelector((state) => state.auth.loading);
  const avatar = useAppSelector((state) => state.auth.user?.avatar);

  const [logout] = useLogOutMutation();

  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    try {
      dispatch(handleLoading(true));
      await logout(null).unwrap();
      window.location.reload();
      dispatch(logOut(null));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(handleLoading(false));
    }
  };

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
          {isLoading ? (
            <NavSkeleton />
          ) : !isLoading && !isAuthenticated ? (
            <>
              <li>
                <CartNavItem />
              </li>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
              <li>
                <Link to={"/register"}>Get Started</Link>
              </li>
            </>
          ) : !isLoading && !!isAuthenticated ? (
            <>
              <li>
                <CartNavItem />
              </li>
              <li>
                <Link to={"/dashboard"} className={styles.avatar}>
                  {avatar ? (
                    <Image src={avatar}/>
                  ) : (
                    <img src={DefaultAvatar} alt="profile_picture" />
                  )}
                </Link>
              </li>
              <li>
                <button onClick={handleLogOut}>Logout</button>
              </li>
            </>
          ) : null}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
