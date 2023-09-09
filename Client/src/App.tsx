import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AuthRoutes from "./components/auth-routes";
import Layout from "./components/layout";
import HomePage from "./pages/HomePage/home-page";
import Products from "./pages/Products/Products";
import NotFound from "./pages/NotFound/not-found";
import ProtectedRoutes from "./components/protected-routes";
import Profile from "./pages/Profile/Profile";
import { Roles } from "./types.d";
import { ProductsContextProvider } from "./context/ProductsContext";
import ProductPage from "./pages/Product/ProductPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout */}
        <Route element={<Layout />}>
          <Route element={<HomePage />} path="/" />

          <Route
            element={
              <ProductsContextProvider>
                <Products />
              </ProductsContextProvider>
            }
            path="/products"
          />
          <Route
            element={
              <ProductsContextProvider>
                <Products />
              </ProductsContextProvider>
            }
            path="/products/:category"
          />
          <Route element={<ProductPage/>} path="/products/:category/:slug" />
          <Route element={<NotFound />} path="/*" />
          <Route element={<ProtectedRoutes allowedRoles={[Roles.user]} />}>
            <Route element={<Profile />} path="/profile" />
          </Route>

          {/* Auth Routes */}
          <Route element={<AuthRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>
        {/* Auth Routes */}

        {/* Admin Routes */}

        {/* Admin Routes */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
