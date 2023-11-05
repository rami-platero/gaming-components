import { Outlet, useParams } from "react-router-dom";
import Sidebar from "./Dashboard/Sidebar";
import NotFound from "../pages/NotFound/NotFoundPage";
import styles from "./dashboardLayout.module.scss";
import { AiFillSetting } from "react-icons/ai";
import { FaFileInvoice, FaRegComments } from "react-icons/fa";
import { BsFillHouseDoorFill } from "react-icons/bs";
import Order from "../pages/Order/OrderPage";
import OrdersPage from "../pages/Dashboard/OrdersPage";
import SettingsPage from "../pages/Dashboard/SettingsPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";

export enum DashboardOptions {
  dashboard = "Dashboard",
  settings = "Settings",
  orders = "Orders",
  reviews = "Reviews",
}

export const mainDashboardRoutes = [
  {
    path: "/dashboard",
    name: DashboardOptions.dashboard,
    component: <DashboardPage />,
    icon: <BsFillHouseDoorFill />,
  },
  {
    path: "/dashboard/settings",
    name: DashboardOptions.settings,
    component: <SettingsPage />,
    icon: <AiFillSetting />,
  },
  {
    path: "/dashboard/orders",
    name: DashboardOptions.orders,
    component: <OrdersPage />,
    icon: <FaFileInvoice />,
  },
  {
    path: "/dashboard/reviews",
    name: DashboardOptions.reviews,
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
