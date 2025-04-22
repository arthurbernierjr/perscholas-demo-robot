import { useEffect, useState, useContext } from "react";

//COMPONENTS
import Card from "../../common/components/Cards/Card";
import Footer from "../../common/largeComponents/Footer";
import TextInput from "../../common/components/Inputs/TextInput";
import TextAreaInput from "../../common/components/Inputs/TextAreaInput";
import Button from "../../common/components/Buttons/Button";
import { Toast, fireToast } from "../../common/components/Toast/ToastAlert";
import updateUserStoreInfo from "../api/updateUserStoreInfo";
import { AuthContext } from "../../common/utils/Context/authContext";
import loadUser from "../../common/utils/Context/loadUser";
import SelectInput from "../../common/components/Inputs/SelectInput";

const languages = [
  { name: "English", value: "English" },
  { name: "French", value: "French" },
  { name: "German", value: "German" },
  { name: "Danish", value: "Danish" },
  { name: "Dutch", value: "Dutch" },
  { name: "Finnish", value: "Finnish" },
  { name: "Italian", value: "Italian" },
  { name: "Polish", value: "Polish" },
  { name: "Portuguese", value: "Portuguese" },
  { name: "Slovenian", value: "Slovenian" },
  { name: "Spanish", value: "Spanish" },
];

const SingleProductDescription = () => {
  const { login, loadingHandler, user } = useContext(AuthContext);

  const [storeName, setStoreName] = useState("");
  const [aboutStore, setAboutStore] = useState("");
  const [language, setLanguage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    await updateUserStoreInfo({ storeName, aboutStore, language });

    fireToast.success("Updated");

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    (async () => {
      loadUser(login, loadingHandler);

      if (user.stores.length) {
        setStoreName(user.stores[0].storeName);
        setAboutStore(user.stores[0].aboutStore);
      }

      if (user.language) {
        setLanguage(user.language);
      }
    })();
  }, [login, loadingHandler]);

  return (
    <div>
      <div className="mx-4 overall-tools">
        <Toast />
        <div className=" mb-4 max-w-xl mx-auto ">
          <Card title="Settings">
            <div className="mx-auto px-2 py-5 rounded">
              <SelectInput
                title="Select Language"
                optionArr={languages}
                onChange={(e) => {
                  setLanguage(e.target.value);
                }}
                value={language}
              />
              <TextInput
                label="Store Name"
                onChange={(e) => {
                  setStoreName(e.target.value);
                }}
                value={storeName}
                placeholder="Automatic Digital Watch"
              />
              <TextAreaInput
                label="About Your Store"
                onChange={(e) => {
                  setAboutStore(e.target.value);
                }}
                value={aboutStore}
                placeholder="A mens fashion brand that sells high quality watches. These watches are made in Switzerland and go through advanced quality testing."
              />

              <div className="mt-4 w-full">
                <Button
                  bgColor="bg-blue-500"
                  bgHoverColor="bg-green-400"
                  textColor="white"
                  extraStyle=""
                  onClick={(e) => handleSubmit(e)}
                >
                  Update Settings
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Footer bgColor="bg-white" />
    </div>
  );
};

export default SingleProductDescription;
