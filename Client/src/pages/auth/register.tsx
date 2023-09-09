import { Link } from "react-router-dom";
import styles from "./auth.module.scss";
import GoogleLoginButton from "../../components/GoogleLoginButton/google-login-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SignUpSchema, signUpSchema } from "../../schemas/authSchema";
import { setCredentials } from "../../redux/features/user/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import useToast from "../../hooks/useToast";
import { useSignUpMutation } from "../../redux/services/authApiSlice";
import Loader from "../../assets/Loader.svg";

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const dispatch = useAppDispatch();

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handlePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  const { notifyError } = useToast();

  const [signUp, { isLoading }] = useSignUpMutation();

  const onSubmit = async (data: SignUpSchema) => {
    try {
      const res = await signUp(data).unwrap();
      dispatch(setCredentials(res));
      window.location.reload();
    } catch (error: any) {
      if (error.status === "FETCH_ERROR") {
        return notifyError(
          "Oops! Something went wrong while fetching data. Please check your network connection and try again."
        );
      }
      const errors = error;
      if (errors.data.username) {
        setError("username", {
          message: errors.data.username,
        });
      }
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
        return notifyError("Internal Server Error");
      }
    }
  };

  return (
    <main className={styles.auth}>
      <ToastContainer limit={1} />
      <h1>Get started</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.auth__form}>
        <div className={styles.auth__form__inputBox}>
          <label htmlFor="username">Username</label>
          <input
            {...register("username")}
            className={`${
              errors.username && styles.auth__form__inputBox__error
            }`}
            type="text"
            placeholder="Enter your username..."
            spellCheck={false}
            autoComplete="off"
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div className={styles.auth__form__inputBox}>
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            className={`${errors.email && styles.auth__form__inputBox__error}`}
            type="text"
            placeholder="Enter your email..."
            spellCheck={false}
            autoComplete="off"
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
            type={passwordVisibility ? "text" : "password"}
            placeholder=""
            autoComplete="off"
          />
          {passwordVisibility ? (
            <AiOutlineEye onClick={handlePasswordVisibility} />
          ) : (
            <AiOutlineEyeInvisible onClick={handlePasswordVisibility} />
          )}
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting || isLoading}>
          {isLoading ? <img src={Loader} /> : "Get Started"}
        </button>
        <div className={styles.auth__form__textDivider}>or</div>
        <GoogleLoginButton />
      </form>
      <h3>
        Already have an account? <Link to={"/login"}>Log in</Link>
      </h3>
    </main>
  );
};

export default Register;
