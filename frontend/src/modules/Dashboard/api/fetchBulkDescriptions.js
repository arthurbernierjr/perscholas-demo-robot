import authAxios from "./axios";
const axios = authAxios();

const fetchBulkProductDescriptions = async (data) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_SERVER_URL}/api/v1/fetchBulkProductDescriptions`,
      data,
    });

    if (res && res.data && res.data.data) {
      return res.data.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export default fetchBulkProductDescriptions;
