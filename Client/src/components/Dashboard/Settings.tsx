import styles from "./settings.module.scss";
import Avatar from "../../assets/default_pfp.png";
import { AiOutlineUpload } from "react-icons/ai";
import { useAppSelector } from "../../redux/hooks";

const Settings = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className={styles.profile}>
      <h1>Account Settings</h1>
      <p className={styles.profile__description}>
        Here, you can manage and update your personal information, such as your
        username, email address, and profile picture.
      </p>

      <div className={styles.profile__cards}>
        <div className={styles.profile__cards__userInfo}>
          <div className={styles.profile__cards__userInfo__header}>
            <h3>General information</h3>
            <p>
              Here, you can manage and update your personal information, such as
              your username, email address, and profile picture.
            </p>
          </div>

          <div className={styles.profile__cards__userInfo__avatar}>
            <h3>Your Avatar</h3>
            <div className={styles.profile__cards__userInfo__avatar__wrapper}>
              <img src={Avatar} alt="avatar" />
              <div
                className={
                  styles.profile__cards__userInfo__avatar__wrapper__upload
                }
              >
                <button>
                  <AiOutlineUpload /> Upload a new photo
                </button>
                <p>
                  Supported file formats: jpg, png, svg.
                  <br />
                  Max file size of 5MB
                </p>
              </div>
            </div>
          </div>

          <div className={styles.profile__cards__userInfo__email}>
            <label htmlFor="">Email address</label>
            <input type="text" readOnly defaultValue={user?.email} />
          </div>

          <div className={styles.profile__cards__userInfo__names}>
            <div>
              <label htmlFor="">Username</label>
              <input type="text" readOnly defaultValue={user?.username} />
            </div>
            {/*  <div>
              <label htmlFor="">First Name</label>
              <input type="text" readOnly defaultValue={"John"} />
            </div>
            <div>
              <label htmlFor="">Last Name</label>
              <input type="text" readOnly />
            </div> */}
          </div>
        </div>

        <div className={styles.profile__cards__changePassword}>
          <h3>Change password</h3>
          <p>
            Your online security is our priority. Here you can change your
            password in just a few steps.
          </p>
          <button>Change password</button>
        </div>

        <div className={styles.profile__cards__removeAccount}>
          <h3>Remove account</h3>
          <p>
            Your online security is our priority. Here you can change your
            password in just a few steps.
          </p>
          <button>Remove account</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
