import authAxios from "../../../common/api/axios";
const axios = authAxios();

export const loginOrRegisterAuthZero = async (email) => {
  try {
    const res = await axios({
      method: "POST",
      url: "auth/loginOrRegisterAuthZero",
      data: {
        email,
      },
    });
    if (res.data.status === "success") {
      return {
        status: "success",
        token: res.data.token,
        user: res.data.data.user,
      };
    }
  } catch (err) {
    console.log(err);
    if (err.response) {
      const errorMessage = err.response.data.message;
      return {
        status: "error",
        message: errorMessage,
      };
    } else {
      return {
        status: "error",
        message: "There was an error",
      };
    }
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "auth/logout",
    });
    if (res.data.status === "success") {
      return { status: "success" };
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const updateBillingStatus = async (planType) => {
  try {
    const res = await axios({
      method: "POST",
      url: "auth/updateBillingStatus",
      data: {
        planType,
      },
    });
    if (res.data.status === "success") {
      return "success";
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
};
