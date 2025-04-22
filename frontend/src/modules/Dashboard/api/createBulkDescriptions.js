import authAxios from "./axios";
const axios = authAxios();

const createBulkProductDescriptions = async (data) => {
  try {
    return await axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_URL}/api/v1/createBulkProductDescriptions`,
      data,
    });
  } catch (err) {
    console.log(err);
  }
};

export default createBulkProductDescriptions;
