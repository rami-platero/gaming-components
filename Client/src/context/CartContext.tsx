import { createContext, useEffect } from "react";
import { useLazyGetCartQuery } from "../redux/services/cartApi";

export const cartContext = createContext({});

export const CartContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [getCart] = useLazyGetCartQuery();

  const getCartData = async () => {
    await getCart(null).unwrap();
  };

  useEffect(() => {
    getCartData();
  }, []);

  return <cartContext.Provider value={{}}>{children}</cartContext.Provider>;
};
