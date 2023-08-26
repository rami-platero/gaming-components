import { authContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../../libs/axios";
import { useAppSelector } from "../../redux/hooks";

const HomePage = () => {
  const { logout, isAuthenticated } = useContext(authContext);

  const user = useAppSelector((state) => state.user);

  const login = () => {
    window.open("http://localhost:4000/auth/google", "_self");
  };

  const deleteComment = async () => {
    const res = await axios.delete("/api/comment/10");
    console.log(res);
  };

  return (
    <main>
      {!isAuthenticated && <button onClick={login}>Log In with Google</button>}
      {isAuthenticated && <h2>Logged in as {user?.username}</h2>}
      {isAuthenticated && <button onClick={logout}>Log out</button>}
      <Link to={"/profile"}>Profile</Link>
      {isAuthenticated && (
        <button onClick={deleteComment}>Delete Comment</button>
      )}
    </main>
  );
};

export default HomePage;
