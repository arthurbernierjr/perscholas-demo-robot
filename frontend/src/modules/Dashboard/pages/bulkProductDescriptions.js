import { useEffect, useState, useContext } from "react";
//COMPONENTS
import Card from "../../common/components/Cards/Card";
import Footer from "../../common/largeComponents/Footer";
import { CSVLink } from "react-csv";
import Button from "../../common/components/Buttons/Button";
import Spinner from "../../common/components/Spinner/Spinner";
import createBulkProductDescriptions from "../api/createBulkDescriptions";
import fetchBulkProductDescriptions from "../api/fetchBulkDescriptions";
import { Toast, fireToast } from "../../common/components/Toast/ToastAlert";
import { AuthContext } from "../../common/utils/Context/authContext";
import loadUser from "../../common/utils/Context/loadUser";

const csvFileToArray = (string) => {
  const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
  const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

  const bulkDataArr = csvRows.map((i) => {
    const values = i.split(",");
    const obj = csvHeader.reduce((object, header, index) => {
      if (values[index]) {
        object[header] = values[index].replace("\r", "");
      }
      return object;
    }, {});
    return obj;
  });

  return bulkDataArr;
};

const csvExampleData = [
  ["productName", "productDetails", "productCategory", "colors"],
  [
    "Example Row: Automatic watch",
    "Stainless steel",
    "Watches",
    "black, gold, silver",
  ],
];

const BulkProductDescriptions = () => {
  const { login, loadingHandler } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const [bulkDescriptions, setBulkDescriptions] = useState([[]]);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (file) {
      setLoading(true);
      fileReader.onload = async (event) => {
        const text = event.target.result;
        const bulkDataArr = csvFileToArray(text);

        fireToast.success(
          `Descriptions sent! Your report will be ready below in around ${
            bulkDataArr.length / 5 + 2
          } minutes. Please reload this webpage then.`
        );

        const res = await createBulkProductDescriptions(bulkDataArr);

        if (res.status === 200) {
          setLoading(false);
        } else {
          fireToast.error("There was an error. Please try again.");
        }
      };

      fileReader.readAsText(file);
    }
  };

  useEffect(() => {
    (async () => {
      loadUser(login, loadingHandler);

      const { bulkDescriptionsFromDatabase } =
        await fetchBulkProductDescriptions();
      setBulkDescriptions(bulkDescriptionsFromDatabase);
    })();
  }, [login, loadingHandler]);

  const bulkDescriptionCards = bulkDescriptions.map(
    ({ bulkDescriptions, storeName, date }) => {
      if (bulkDescriptions) {
        return (
          <div className="mt-6 text-center" key={date}>
            <div className="max-w-3xl mx-auto rounded bg-white p-4 shadow-lg border border-gray-400 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="ml-4">
                <div className="">
                  {storeName}: {date}
                </div>
              </div>
              <div className="my-auto md:mx-1 mx-auto">
                <CSVLink data={bulkDescriptions}>
                  <Button
                    bgColor="bg-gray-`00"
                    bgHoverColor="bg-gray-400"
                    textColor="blue-500"
                    extraStyle="max-w-xs border border-blue-500"
                  >
                    Download
                  </Button>
                </CSVLink>
              </div>
            </div>
          </div>
        );
      }

      return <div></div>;
    }
  );
  if (loading) {
    return <Spinner text="Creating your description..." />;
  }
  return (
    <div>
      <div className="mx-4 overall-tools">
        <Toast />
        <div className=" mb-4 ">
          <Card
            title="Bulk Product Descriptions"
            explanation="Create bulk descriptions using a CSV file."
          >
            <div className="md:w-4/4 mx-auto  px-5 max-w-2xl rounded">
              <div className="mb-6 border border-gray-300 px-6 py-4 rounded-xl">
                <div>
                  <div className="font-bold mb-2 text-xl">
                    Step 1: Download the template
                  </div>
                  <CSVLink
                    data={csvExampleData}
                    filename="Bulk CSV Template - Copywriting Robot"
                  >
                    <Button
                      bgColor="bg-white"
                      bgHoverColor="bg-gray-400"
                      textColor="gray"
                      extraStyle="border border-gray-600"
                    >
                      CSV Template
                    </Button>
                  </CSVLink>
                </div>
              </div>
              <div className="border border-gray-300 px-6 py-4 rounded-xl">
                <div className="text-xl bold mb-4 bold font-bold">
                  Step 2: Upload
                </div>
                <input
                  type={"file"}
                  id={"csvFileInput"}
                  accept={".csv"}
                  onChange={handleOnChange}
                />
                <div className="mt-4 w-full grid grid-cols-1 ">
                  <Button
                    bgColor="bg-blue-500"
                    bgHoverColor="bg-gray-400"
                    textColor="white"
                    extraStyle=""
                    onClick={(e) => handleSubmit(e)}
                  >
                    Upload Bulk Descriptions
                  </Button>
                </div>
              </div>
            </div>
            <hr className="w-48 h-1 mx-auto my-4 bg-white border-0 rounded md:my-10 dark:bg-gray-300"></hr>
            <div className="text-center text-2xl font-semibold">
              Bulk Description Downloads
            </div>
            {bulkDescriptionCards}
          </Card>
        </div>
      </div>
      <Footer bgColor="bg-white" />
    </div>
  );
};

export default BulkProductDescriptions;
