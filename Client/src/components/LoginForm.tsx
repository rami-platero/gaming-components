import styles from "../pages/auth/auth.module.scss";
import GoogleLoginButton from "../components/GoogleLoginButton/google-login-button";
import { useForm } from "react-hook-form";
import { type LoginSchema, loginSchema } from "../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCredentials } from "../redux/features/user/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import useToast from "../hooks/useToast";
import { useLoginMutation } from "../redux/services/authApiSlice";
import Loader from "../assets/Loader.svg";

const LoginForm = () => {
  const dispatch = useAppDispatch();
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

  const { notifyError } = useToast();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials(res));
      window.location.reload();
    } catch (error: any) {
      if (error.status === "FETCH_ERROR") {
        return notifyError(
          "Oops! Something went wrong while fetching data. Please check your network connection and try again."
        );
      }
      const errors = error;
      if (errors?.data?.email) {
        setError("email", {
          message: errors.data.email,
        });
      }
      if (errors?.data?.password) {
        setError("password", {
          message: errors.data.password,
        });
      }
      // return if it's a validation error
      if (errors?.data && !errors?.data?.message) return;

      if (errors?.data?.message) {
        return notifyError(errors?.data?.message);
      } else {
        return notifyError("Internal Server Error.");
      }
    }
  };

  return (
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
          className={`${errors.password && styles.auth__form__inputBox__error}`}
          type={passwordVisibility ? "text" : "password"}
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
        {isLoading ? <img src={Loader} /> : "Log in"}
      </button>
      <div className={styles.auth__form__textDivider}>or</div>
      <GoogleLoginButton />
    </form>
  );
};

export default LoginForm;
