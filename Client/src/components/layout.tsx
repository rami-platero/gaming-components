import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Navigation from "./Navigation/Navigation";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <>
      <ToastContainer limit={3} />
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
