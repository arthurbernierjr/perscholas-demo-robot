import { useContext, useEffect } from "react";
import { Navigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
//UTIL
import loadUser from "../../common/utils/Context/loadUser";
import { AuthContext } from "../../common/utils/Context/authContext";
import Spinner from "../../common/components/Spinner/Spinner";

const Register = () => {
  const { loginWithRedirect } = useAuth0();
  const { login, loading, loadingHandler, user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      await loadUser(login, loadingHandler);
    })();
  }, [login, loadingHandler]);

  if (loading === true) {
    return <Spinner />;
  }

  if (user && user.userID && user.isSubscribed) {
    return <Navigate to="/dashboard/dashboard" />;
  } else {
    loginWithRedirect();
  }
};

export default Register;
