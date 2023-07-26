import { userContext } from "../../context/UserContext";
import { useContext } from "react";
import {Link} from 'react-router-dom'

const HomePage = () => {
  const { user,logout } = useContext(userContext);

  const login = () => {
    window.open("http://localhost:4000/auth/google", "_self");
  };

  return (
    <div>
      <button onClick={login}>Log In with Google</button>
      {user && <h2>Logged in as {user.username}</h2>}
      {user && <button onClick={logout}>Log out</button>}
      <Link to={"/profile"}>Profile</Link>
    </div>
  );
};

export default HomePage;
