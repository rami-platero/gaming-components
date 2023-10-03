import styles from "./avatarSettings.module.scss";
import Avatar from "../assets/default_pfp.png";
import { AiOutlineUpload } from "react-icons/ai";
import { useUploadAvatarMutation } from "../redux/services/userApi";
import Loader from "../assets/Loader.svg";
import Image from "./Image";
import { useEffect } from "react";
import useToast from "../hooks/useToast";
import { ToastContainer } from "react-toastify";

type Props = {
  avatar?: string;
};

const AvatarSettings = ({ avatar }: Props) => {
  const [upload, { isLoading, isSuccess, error }] = useUploadAvatarMutation();
  const { notifySuccess, notifyError } = useToast();

  useEffect(() => {
    if (isSuccess) {
      notifySuccess("Your avatar has been updated!");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error && "data" in error) {
      notifyError((error.data as { message: string }).message);
    }
  }, [error]);

  const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
      upload(formData);
    }
  };
  return (
    <div className={styles.container}>
      <ToastContainer limit={1} />
      <h3>Your Avatar</h3>
      <div className={styles.container__wrapper}>
        <div className={styles.container__wrapper__imgContainer}>
          {isLoading ? (
            <div
              className={styles.container__wrapper__imgContainer__avatarLoader}
            ></div>
          ) : (
            <>
              {avatar ? (
                <Image src={avatar}/>
              ) : (
                <img src={Avatar} alt="avatar" />
              )}
            </>
          )}
        </div>
        <div className={styles.container__wrapper__upload}>
          <input
            type="file"
            id="upload"
            onChange={(e) => {
              uploadAvatar(e);
            }}
          />
          <label htmlFor="upload" className={`${isLoading && styles.loading}`}>
            {!isLoading ? (
              <>
                <AiOutlineUpload /> Upload a new photo
              </>
            ) : (
              <img src={Loader} className={styles.loader} />
            )}
          </label>
          <p>
            Supported file formats: jpg, png, svg.
            <br />
            Max file size of 5MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default AvatarSettings;
