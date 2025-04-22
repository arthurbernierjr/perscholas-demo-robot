import { useContext } from "react";
import { AuthContext } from "../Context/authContext";

const useGetUser = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return user;
  }

  return { user: {} };
};

export default useGetUser;
