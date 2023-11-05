import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AuthRoutes from "./components/auth-routes";
import Layout from "./components/GlobalLayout";
import { Roles } from "./types.d";
import { ProductsContextProvider } from "./context/ProductsContext";
import { DashboardLayout, dashboardRoutes } from "./components/DashboardLayout";

// pages
import ProductPage from "./pages/Product/ProductPage";
import HomePage from "./pages/HomePage/home-page";
import ProtectedRoutes from "./components/protected-routes";
import SuccessPage from "./pages/Payment/SuccessPage";
import CartPage from "./pages/Cart/CartPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import ProductsPage from "./pages/Products/ProductsPage";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Layout */}
        <Route element={<Layout />}>
          <Route element={<HomePage />} path="/" />

          <Route
            element={
              <ProductsContextProvider>
                <ProductsPage />
              </ProductsContextProvider>
            }
            path="/products"
          />
          <Route
            element={
              <ProductsContextProvider>
                <ProductsPage />
              </ProductsContextProvider>
            }
            path="/products/:category"
          />
          <Route element={<ProductPage />} path="/products/:category/:slug" />
          <Route element={<NotFoundPage />} path="/*" />
          <Route element={<CartPage />} path="/cart" />
          <Route element={<SuccessPage />} path="/success" />

          <Route element={<ProtectedRoutes allowedRoles={[Roles.user]} />}>
            <Route element={<DashboardLayout />}>
              {dashboardRoutes.map((route) => {
                return (
                  <Route
                    key={route.path}
                    element={route.component}
                    path={route.path}
                  />
                );
              })}
            </Route>
          </Route>

          {/* Auth Routes */}
          <Route element={<AuthRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
