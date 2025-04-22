import { useEffect, useState, useContext } from "react";

//COMPONENTS
import TextInput from "../../common/components/Inputs/TextInput";
import TextAreaInput from "../../common/components/Inputs/TextAreaInput";
import Button from "../../common/components/Buttons/Button";
import { Navigate } from "react-router";
import updateUserStoreInfo from "../api/updateUserStoreInfo";
import { Toast, fireToast } from "../../common/components/Toast/ToastAlert";
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

const SetupStoreNameIntro = () => {
  const { login, loadingHandler, user } = useContext(AuthContext);

  const [storeName, setStoreName] = useState("");
  const [aboutStore, setAboutStore] = useState("");
  const [storeUpdated, setStoreUpdated] = useState(false);
  const [language, setLanguage] = useState("English");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (storeName && language) {
        await updateUserStoreInfo({ storeName, aboutStore, language });

        setStoreUpdated(true);
      } else {
        fireToast.error("Please fill in your brand name.");
      }
    } catch (err) {
      console.log(err);
    }
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

  if (storeUpdated) {
    return <Navigate to="/dashboard/dashboard?showTour" />;
  }

  return (
    <div>
      <Toast />
      <div className="overall-tools bg-white h-screen w-full">
        <div className=" mb-4 max-w-xl mx-auto pt-10 ">
          <div className="uppercase text-gray-200 dark:text-gray-200 font-black text-3xl flex items-center h-24 mr-4 ">
            <img
              className="h-36 mx-auto"
              src="/logo.png"
              alt="Copywriting Robot"
            />
          </div>
          <div className="text-center mt-10 text-2xl max-w-xl px-10 font-bold text-gray-900mx-4">
            Thanks for signing up! 👋
          </div>
          <div className="text-center mt-2 text-lg max-w-xl px-10  text-gray-900mx-4">
            Lets get your account setup.
          </div>
          <div className="mx-10 px-6 my-5 py-5 rounded-xl border border-2 shadow-xl ">
            <div className="grid grid-cols-1 gap-2">
              <SelectInput
                title="Language"
                optionArr={languages}
                onChange={(e) => {
                  setLanguage(e.target.value);
                }}
                value={language}
              />
              <TextInput
                label="Store name"
                onChange={(e) => {
                  setStoreName(e.target.value);
                }}
                value={storeName}
                placeholder=""
              />
              <TextAreaInput
                label="About your store"
                onChange={(e) => {
                  setAboutStore(e.target.value);
                }}
                value={aboutStore}
                placeholder=""
              />
            </div>

            <div className="mt-4 w-full">
              <Button
                bgColor="bg-blue-500"
                bgHoverColor="bg-green-400"
                textColor="white"
                extraStyle="text-xl"
                onClick={(e) => handleSubmit(e)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupStoreNameIntro;
