import { useState, useCallback, useEffect } from "react";

let logoutTimer;

const AuthHook = () => {
  const [token, setToken] = useState(false);
  const [tokenExpiration, setTokenExpiration] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const loginHandler = useCallback((token, user, expirationDate) => {
    setToken(token);
    setUser(user);
    //Token Expiration creation
    const tokenExpiresIn =
      expirationDate ||
      new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7);
    setTokenExpiration(tokenExpiresIn);
    //Store user data in local storage

    localStorage.setItem(
      "userData",
      JSON.stringify({
        token,
        user,
        expiration: tokenExpiresIn.toISOString(),
      })
    );
  }, []);

  const loadingHandler = useCallback(() => {
    setLoading(false);
  }, []);

  const logoutHandler = useCallback(() => {
    setToken(null);
    setTokenExpiration(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpiration) {
      const remainingTime = tokenExpiration.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logoutHandler, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logoutHandler, tokenExpiration]);

  return { token, loginHandler, logoutHandler, user, loading, loadingHandler };
};

export default AuthHook;
