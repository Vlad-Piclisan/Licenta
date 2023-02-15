import { FC, useContext } from "react";
import { Navigate } from "react-router-dom";
import { CartContext } from "../../hooks/useCart";

export const CartGuard: FC = ({ children }) => {
    const { cart } = useContext(CartContext);
    if (cart.length===0) {
      return <Navigate to="/Cart" />;
    }
    return <>{children}</>;
  };

  