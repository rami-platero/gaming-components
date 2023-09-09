import styles from "./google-login-button.module.scss";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
  const login = () => {
    window.open("http://localhost:4000/auth/google", "_self");
  };

  return (
    <button className={styles.googleLoginBtn} onClick={login}>
      <FcGoogle />
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
