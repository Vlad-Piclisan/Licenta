import { FC, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../hooks/useAuth";

export const AuthGuard: FC = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/" />;
    }
    return <>{children}</>;
  };