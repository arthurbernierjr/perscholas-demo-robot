import authAxios from "./axios";
const axios = authAxios();

const createSocialMediaCaption = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_URL}/api/v1/createSocialMediaCaption`,
      data,
    });

    if (res && res.data && res.data.data) {
      return res.data.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export default createSocialMediaCaption;
