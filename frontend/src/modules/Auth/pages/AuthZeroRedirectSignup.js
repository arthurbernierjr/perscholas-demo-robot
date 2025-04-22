import { useContext, useEffect } from "react";
import { Navigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
//COMPONENTS

//UTIL
import loadUser from "../../common/utils/Context/loadUser";
import { AuthContext } from "../../common/utils/Context/authContext";

const Register = () => {
  const { loginWithRedirect, user } = useAuth0();
  const { login, loadingHandler } = useContext(AuthContext);

  useEffect(() => {
    loadUser(login, loadingHandler);
  }, [login, loadingHandler]);

  if (user && user.userID) {
    return <Navigate to="/dashboard/singleProductDescription" />;
  } else {
    loginWithRedirect({ screen_hint: "signup" });
  }
};

export default Register;
