import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Profile from "./pages/Profile/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Products from "./pages/Products/Products";
import Navigation from "./components/Navigation/Navigation";

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<Products />} path="/products" />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Profile />} path="/profile" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
