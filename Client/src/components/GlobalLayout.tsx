import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Navigation from "./Navigation/Navigation";
import { ToastContainer } from "react-toastify";
import Modals from "./Modals";

const Layout = () => {
  return (
    <>
      <ToastContainer limit={3} />
      <Modals />
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
