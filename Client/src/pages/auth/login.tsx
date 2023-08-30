import GoogleLoginButton from "../../components/google-login-button/google-login-button";
import styles from "./auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginSchema, loginSchema } from "../../Schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCredentials } from "../../redux/features/user/userSlice";
import { useAppDispatch } from "../../redux/hooks";
import { authContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { useLoginMutation } from "../../redux/services/userApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import useToast from "../../hooks/useToast";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authenticate } = useContext(authContext);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handlePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  const {notifyError} = useToast()

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials(res));
      authenticate();
      navigate("/");
    } catch (error: any) {
      if(error.status === "FETCH_ERROR"){
        return notifyError("Oops! Something went wrong while fetching data. Please check your network connection and try again.");
      }
      const errors = error;
      if (errors.data.email) {
        setError("email", {
          message: errors.data.email,
        });
      }
      if (errors.data.password) {
        setError("password", {
          message: errors.data.password,
        });
      }
      // return if it's a validation error
      if (errors.data && !errors.data.message) return;
      
      if (errors.data.message) {
        return notifyError(errors.data.message);
      } else {
        return notifyError("Internal Server Error.");
      }
    }
  };

  return (
    <main className={styles.auth}>
      <ToastContainer limit={1}/>
      <h1>Log in to Gaming Components</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.auth__form}>
        <div className={styles.auth__form__inputBox}>
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            className={`${errors.email && styles.auth__form__inputBox__error}`}
            type="text"
            placeholder="Enter your email..."
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className={styles.auth__form__inputBox}>
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            className={`${
              errors.password && styles.auth__form__inputBox__error
            }`}
            type={passwordVisibility? "text": "password"}
            placeholder=""
          />
          {passwordVisibility ? (
            <AiOutlineEye onClick={handlePasswordVisibility} />
          ) : (
            <AiOutlineEyeInvisible onClick={handlePasswordVisibility} />
          )}
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button disabled={isSubmitting || isLoading} type="submit">
          Log in
        </button>
        <div className={styles.auth__form__textDivider}>or</div>
        <GoogleLoginButton />
      </form>
      <h3>
        Don't have an account? <Link to={"/register"}>Sign up</Link>
      </h3>
    </main>
  );
};

export default Login;
