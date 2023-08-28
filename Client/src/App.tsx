import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AuthRoutes from "./components/auth-routes";
import Layout from "./components/layout";
import HomePage from "./pages/home-page/home-page";
import Products from "./pages/Products/Products";
import NotFound from "./pages/not-found/not-found";
import ProtectedRoutes from "./components/protected-routes";
import Profile from "./pages/Profile/Profile";
import { Roles } from "./types.d";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout */}
        <Route element={<Layout />}>
          <Route element={<HomePage />} path="/" />
          <Route element={<Products />} path="/products" />
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
