import { userContext } from "../../context/UserContext";
import { useContext } from "react";

const HomePage = () => {
  const { user } = useContext(userContext);

  const login = () => {
    window.open("http://localhost:4000/auth/google", "_self");
  };
  return (
    <div>
      <button onClick={login}>Log In with Google</button>
      {user && <h2>Logged in as {user.username}</h2>}
    </div>
  );
};

export default HomePage;
