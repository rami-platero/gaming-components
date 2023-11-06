import { Link } from "react-router-dom";
import styles from "./auth.module.scss";
import RegisterForm from "../../components/RegisterForm";

const RegisterPage = () => {

  return (
    <main className={styles.auth}>
      <h1>Get started</h1>
      <RegisterForm/>
      <h3>
        Already have an account? <Link to={"/login"}>Log in</Link>
      </h3>
    </main>
  );
};

export default RegisterPage;
