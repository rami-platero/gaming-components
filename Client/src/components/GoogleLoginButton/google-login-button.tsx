import config from "../../config/config";
import styles from "./google-login-button.module.scss";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
  const login = () => {
    window.open(config.API_GOOGLE_URL, "_self");
  };

  return (
    <button className={styles.googleLoginBtn} onClick={login}>
      <FcGoogle />
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
