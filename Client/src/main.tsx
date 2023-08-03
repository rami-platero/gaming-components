import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserContextProvider } from "./context/UserContext.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </Provider>
);
