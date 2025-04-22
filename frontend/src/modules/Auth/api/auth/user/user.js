import authAxios from "../../../../common/api/axios";

export const updateUser = async (email, timezone) => {
  try {
    const axios = authAxios();
    const res = await axios({
      method: "PATCH",
      url: "users/updateUser",
      data: {
        email,
        timezone,
      },
    });
    if (res.data.status === "success") {
      console.log("success");
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (userID) => {
  try {
    const axios = authAxios();
    const res = await axios({
      method: "POST",
      url: "auth/deleteUser",
      data: {
        userID,
      },
    });
    if (res.data.status === "success") {
      return "success";
    }
  } catch (err) {
    console.log(err);
  }
};
