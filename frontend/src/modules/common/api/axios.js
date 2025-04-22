import axios from "axios";

// Testing URL
const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/`;

const authAxios = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    return axios.create({
      baseURL: url,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    });
  } else {
    return axios.create({
      baseURL: url,
    });
  }
};

export default authAxios;
