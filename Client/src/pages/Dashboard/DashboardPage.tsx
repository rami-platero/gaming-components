import { Outlet, useParams } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar";
import NotFound from "../NotFound/NotFoundPage";
import styles from "./dashboardPage.module.scss";
import Orders from "../../components/Dashboard/Orders";
import { AiFillSetting } from "react-icons/ai";
import { FaFileInvoice, FaRegComments } from "react-icons/fa";
import { BsFillHouseDoorFill } from "react-icons/bs";
import Order from "../Order/OrderPage";
import Settings from "../../components/Dashboard/Settings";
import Dashboard from "../../components/Dashboard/Dashboard";

export enum DashboardOptions {
  dashboard = "Dashboard",
  settings = "Settings",
  orders = "Orders",
  comments = "Comments",
}

export const mainDashboardRoutes = [
  {
    path: "/dashboard",
    name: DashboardOptions.dashboard,
    component: <Dashboard />,
    icon: <BsFillHouseDoorFill />,
  },
  {
    path: "/dashboard/settings",
    name: DashboardOptions.settings,
    component: <Settings />,
    icon: <AiFillSetting />,
  },
  {
    path: "/dashboard/orders",
    name: DashboardOptions.orders,
    component: <Orders />,
    icon: <FaFileInvoice />,
  },
  {
    path: "/dashboard/comments",
    name: DashboardOptions.comments,
    component: <></>,
    icon: <FaRegComments />,
  },
];

export const childrenDashboardRoutes = [
  {
    path: "/dashboard/orders/:id",
    name: DashboardOptions.orders,
    component: <Order />,
  },
];

export const dashboardRoutes = [
  ...mainDashboardRoutes,
  ...childrenDashboardRoutes,
];

export const DashboardLayout = () => {
  const { params } = useParams();

  return !params || params in DashboardOptions ? (
    <main className={styles.dashboard}>
      <div className={styles.dashboard__container}>
        <Sidebar />
        <hr />
        <Outlet />
      </div>
    </main>
  ) : (
    <NotFound />
  );
};
