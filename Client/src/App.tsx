import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Profile from "./pages/Profile/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Profile />} path="/profile" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
