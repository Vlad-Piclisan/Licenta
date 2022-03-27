import { useContext } from "react";
import { AuthContext } from "../../hooks/useAuth";

const Main = () => {
  const { user } = useContext(AuthContext);
  return <div>Welcome {user?.email} to MAIN</div>;
};

export default Main;
