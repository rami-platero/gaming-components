import styles from "./settingsPage.module.scss";
import { useAppSelector } from "../../redux/hooks";
import AvatarSettings from "../../components/Dashboard/Widgets/AvatarSettings";
import { useSetAtom } from "jotai";
import { Modal, uiAtom } from "../../components/Modals";

const SettingsPage = () => {
  const user = useAppSelector((state) => state.auth.user);

  const setAtom = useSetAtom(uiAtom);

  const handleChangePassword = () => {
    setAtom((prev) => ({ ...prev, modal: Modal.CHANGE_PASSWORD }));
  };

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

          <AvatarSettings avatar={user?.avatar} />

          <div className={styles.profile__cards__userInfo__email}>
            <label htmlFor="">Email address</label>
            <input type="text" readOnly defaultValue={user?.email} />
          </div>

          <div className={styles.profile__cards__userInfo__names}>
            <div>
              <label htmlFor="">Username</label>
              <input type="text" readOnly defaultValue={user?.username} />
            </div>
          </div>
        </div>

        <div className={styles.profile__cards__changePassword}>
          <h3>Change password</h3>
          <p>
            Your online security is our priority. Here you can change your
            password in just a few steps.
          </p>
          <button onClick={handleChangePassword}>Change password</button>
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

export default SettingsPage;
