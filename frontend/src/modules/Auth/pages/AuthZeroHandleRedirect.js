import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
import Spinner from "../../common/components/Spinner/Spinner";
import { useAuth0 } from "@auth0/auth0-react";
//UTIL
import loadUser from "../../common/utils/Context/loadUser";
import { loginOrRegisterAuthZero } from "../api/auth";
import { AuthContext } from "../../common/utils/Context/authContext";
import ReactGA from "react-ga4";

const HandleAuth0Redirect = () => {
  const auth0 = useAuth0();

  const { login, loadingHandler, user } = useContext(AuthContext);

  const handleSubmit = async () => {
    if (auth0 && auth0.isAuthenticated && auth0.user) {
      const { status, message, token, user } = await loginOrRegisterAuthZero(
        auth0.user.email
      );

      if (status === "success") {
        login(token, user);
      } else {
        console.log(message);
      }
    }
  };

  useEffect(() => {
    (async () => {
      await handleSubmit();
      loadUser(login, loadingHandler);
      ReactGA.event({
        category: "event",
        action: "signup",
      });
    })();
  }, [login, loadingHandler, auth0]);

  // 5 free descriptions
  if (
    user &&
    user.userID &&
    user.stores.length &&
    user.stores[0].storeName &&
    user.isSubscribed
  ) {
    return <Navigate to="/dashboard/dashboard" />;
  } else if (user && user.userID && user.isSubscribed) {
    return <Navigate to="/dashboard/welcomeSettings" />;
  } else if (user && user.userID && !user.isSubscribed) {
    return <Navigate to="/auth/choosePlan" />;
  }

  return (
    <div className="flex flex-col w-full px-4 py-8 min-h-screen  bg-white sm:px-6 md:px-8 lg:px-10">
      <Spinner text="Loading your account..." />
    </div>
  );
};

export default HandleAuth0Redirect;
