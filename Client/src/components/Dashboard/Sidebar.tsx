import { Link } from "react-router-dom";
import styles from "./sidebar.module.scss";
import { mainDashboardRoutes } from "../../pages/Dashboard/DashboardPage";

export enum DashboardOptions {
  dashboard = "Dashboard",
  settings = "Settings",
  orders = "Orders",
  comments = "Comments",
}

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul>
        {mainDashboardRoutes.map((option) => {
          return (
            <li key={option.path}>
              <Link
                to={option.path}
                className={
                  window.location.pathname.split("/").splice(0, 3).join("/") ===
                  option.path.split("/").splice(0, 3).join("/")
                    ? styles.sidebar__current
                    : ""
                }
              >
                {option.icon} {option.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
