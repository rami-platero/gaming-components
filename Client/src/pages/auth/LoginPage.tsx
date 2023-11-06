import LoginForm from "../../components/LoginForm";
import styles from "./auth.module.scss";
import { Link } from "react-router-dom";


const LoginPage = () => {
  

  return (
    <main className={styles.auth}>
      <h1>Log in to Gaming Components</h1>
      <LoginForm/>
      <h3>
        Don't have an account? <Link to={"/register"}>Sign up</Link>
      </h3>
    </main>
  );
};

export default LoginPage;
