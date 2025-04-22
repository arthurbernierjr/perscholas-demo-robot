import React, { createContext } from "react";
import authHook from "../hooks/authHooks";

export const AuthContext = createContext({
  auth: false,
  user: {},
  login: () => {},
  logout: () => {},
  setUserId: () => {},
  token: null,
  loading: true,
  loadingHandler: () => {},
});

const AuthProvider = (props) => {
  const { token, loginHandler, logoutHandler, user, loading, loadingHandler } =
    authHook();

  return (
    <AuthContext.Provider
      value={{
        auth: !!token,
        token: token,
        login: loginHandler,
        logout: logoutHandler,
        user: user,
        loading,
        loadingHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
