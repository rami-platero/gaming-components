import { useSetAtom } from "jotai";
import styles from "./changePassword.module.scss";
import { INITIAL_ATOM, uiAtom } from "../Modals";
import useClickOutside from "../../hooks/useClickOutside";
import { useRef, useState } from "react";
import { useChangePasswordMutation } from "../../redux/services/authApiSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangePasswordSchema,
  changePasswordSchema,
} from "../../schemas/authSchema";
import Loader from "../../assets/WhiteLoader.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { isErrorWithCustomField } from "../../utils/checkErrors";
import useToast from "../../hooks/useToast";

type Visibility = {
  oldPassword: boolean;
  newPassword: boolean;
  repeatPassword: boolean;
};

const ChangePassword = () => {
  const setAtom = useSetAtom(uiAtom);
  const { notifyTemporalSuccess } = useToast();

  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [visibility, setVisibility] = useState<Visibility>({
    oldPassword: false,
    newPassword: false,
    repeatPassword: false,
  });

  const handleVisibility = (name: keyof Visibility) => {
    setVisibility((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleClose = () => {
    if (!isLoading || isSubmitting) {
      setAtom(INITIAL_ATOM);
    }
  };

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordSchema) => {
    try {
      await changePassword(data).unwrap();
      notifyTemporalSuccess("Password changed!");
      handleClose();
    } catch (error: unknown) {
      if (isErrorWithCustomField(error, "oldPassword")) {
        setError("oldPassword", {
          message: error.data.oldPassword,
        });
      }
      if (isErrorWithCustomField(error, "newPassword")) {
        setError("newPassword", {
          message: error.data.newPassword,
        });
      }
      if (isErrorWithCustomField(error, "newPassword")) {
        setError("newPassword", {
          message: error.data.newPassword,
        });
      }
    }
  };

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, handleClose);

  return (
    <div className={styles.changePassword}>
      <div className={styles.changePassword__container} ref={ref}>
        <h3 className={styles.changePassword__container__title}>
          Change password
        </h3>
        <p className={styles.changePassword__container__description}>
          Here you will be able to change your password. Fill the following
          inputs to change it.
        </p>
        <span className={styles.changePassword__container__warning}>
          Warning: You won't be able to change your password in 90 days.
        </span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.changePassword__container__form}
        >
          <div className={styles.changePassword__container__form__inputBox}>
            <label htmlFor="">Old password</label>
            <div>
              <input
                {...register("oldPassword")}
                type={visibility.oldPassword ? "text" : "password"}
                placeholder="Password..."
                className={
                  errors.oldPassword &&
                  styles.changePassword__container__form__inputBox__error
                }
              />
              {visibility.oldPassword ? (
                <AiOutlineEye onClick={() => handleVisibility("oldPassword")} />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={() => handleVisibility("oldPassword")}
                />
              )}
            </div>
            {errors.oldPassword?.message ? (
              <span
                className={
                  styles.changePassword__container__form__inputBox__errorMessage
                }
              >
                {errors.oldPassword.message}
              </span>
            ) : null}
          </div>
          <div className={styles.changePassword__container__form__inputBox}>
            <label htmlFor="">New password</label>
            <div>
              <input
                {...register("newPassword")}
                type={visibility.newPassword ? "text" : "password"}
                placeholder="Password..."
                className={
                  errors.newPassword &&
                  styles.changePassword__container__form__inputBox__error
                }
              />
              {visibility.newPassword ? (
                <AiOutlineEye onClick={() => handleVisibility("newPassword")} />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={() => handleVisibility("newPassword")}
                />
              )}
            </div>
            {errors.newPassword?.message ? (
              <span
                className={
                  styles.changePassword__container__form__inputBox__errorMessage
                }
              >
                {errors.newPassword.message}
              </span>
            ) : null}
          </div>
          <div className={styles.changePassword__container__form__inputBox}>
            <label htmlFor="">Repeat new password</label>
            <div>
              <input
                {...register("repeatPassword")}
                type={visibility.repeatPassword ? "text" : "password"}
                placeholder="Password..."
                className={
                  errors.repeatPassword &&
                  styles.changePassword__container__form__inputBox__error
                }
              />
              {visibility.repeatPassword ? (
                <AiOutlineEye
                  onClick={() => handleVisibility("repeatPassword")}
                />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={() => handleVisibility("repeatPassword")}
                />
              )}
            </div>
            {errors.repeatPassword?.message ? (
              <span
                className={
                  styles.changePassword__container__form__inputBox__errorMessage
                }
              >
                {errors.repeatPassword.message}
              </span>
            ) : null}
          </div>
          <button type="submit" disabled={isLoading || isSubmitting}>
            {!isLoading || !isSubmitting ? (
              "Change password"
            ) : (
              <img src={Loader} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
