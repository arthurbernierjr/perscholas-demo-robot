import { useEffect, useContext, useState } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../../common/utils/Context/authContext";
import { useAuth0 } from "@auth0/auth0-react";

const Logout = () => {
  const auth0 = useAuth0();
  const { logout } = useContext(AuthContext);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    logout();
    auth0.logout();
    setIsLoggedOut(true);
  }, [logout]);

  if (isLoggedOut) {
    return <Navigate to="/" />;
  }

  return <div></div>;
};

export default Logout;
