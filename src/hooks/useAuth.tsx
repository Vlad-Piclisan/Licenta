import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { createContext, useEffect, useState, FC, useContext } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext<ReturnType<typeof useAuth>>(null!);

export const useAuth = () => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, []);
  return { user };
};

export const AuthGuard: FC = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export const AuthContextProvider: FC = ({ children }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
