import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { persistStore } from "redux-persist";
import { CartContextProvider } from "./context/CartContext.tsx";

export const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AuthContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </AuthContextProvider>
  </Provider>
);
