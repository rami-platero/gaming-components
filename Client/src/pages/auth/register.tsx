import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.scss";
import GoogleLoginButton from "../../components/google-login-button/google-login-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, signUpSchema } from "../../Schemas/SignUpSchema";
import { setCredentials } from "../../redux/features/user/userSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useSignUpMutation } from "../../redux/services/userApi";
import { authContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Register = () => {
  const { authenticate } = useContext(authContext);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handlePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  const notify = (message: string) => {
    toast.error(message, {
      theme: "colored",
      position: "top-center",
      autoClose: false,
    });
  };

  const [signUp, { isLoading }] = useSignUpMutation();

  const onSubmit = async (data: SignUpSchema) => {
    try {
      const res = await signUp(data).unwrap();
      dispatch(setCredentials(res));
      authenticate();
      navigate("/");
    } catch (error: any) {
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
      if (errors.data && !errors.data.message) return;
      if (errors.data.message) {
        return notify(errors.data.message);
      } else {
        return notify("Internal Server Error.");
      }
    }
  };

  return (
    <main className={styles.auth}>
      <ToastContainer />
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
            type={passwordVisibility? "text": "password"}
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
          Get started
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
