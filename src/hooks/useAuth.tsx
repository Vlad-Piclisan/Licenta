import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { createContext, useEffect, useState, FC, useContext } from "react";
import { Navigate } from "react-router-dom";
import { SignUpPayload, UserInfo } from "../models/Users";
import { getUserByUid } from "../services/users";

export const AuthContext = createContext<ReturnType<typeof useAuth>>(null!);

export const useAuth = () => {
  const [user, setUser] = useState<User | null>();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, async (user) => {
      const data = await getUserByUid(user?.uid!);
      setUserInfo(data);
      setUser(user);
    });
    return unsub;
  }, []);
  return { user,userInfo };
};

export const AuthContextProvider: FC = ({ children }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
