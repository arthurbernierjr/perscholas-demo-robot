import { useState } from "react";
//COMPONENTS
import Card from "../../common/components/Cards/Card";
import Footer from "../../common/largeComponents/Footer";
import TextArea from "../../common/components/Inputs/TextAreaInput";
import Button from "../../common/components/Buttons/Button";
import Spinner from "../../common/components/Spinner/Spinner";
import createAboutUs from "../api/createAboutUs";
import { Toast, fireToast } from "../../common/components/Toast/ToastAlert";
import { HiDuplicate } from "react-icons/hi";

const ProductNameGenerator = () => {
  const [whyCreated, setWhyCreated] = useState("");
  const [uniqueReason, setUniqueReason] = useState("");
  const [aboutUs, setAboutUs] = useState("");

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const { newAboutUs } = await createAboutUs({
      whyCreated,
      uniqueReason,
    });

    setAboutUs(newAboutUs);
    setLoading(false);

    return fireToast.success("Product Name Created");
  };

  const handleClear = (event) => {
    event.preventDefault();
    setWhyCreated("");
    setUniqueReason("");

    return fireToast.success("Cleared");
  };

  if (loading) {
    return <Spinner text="Creating your Product Name..." />;
  }
  return (
    <div>
      <div className="mx-4 overall-tools">
        <Toast />
        <div className=" mb-4 ">
          <Card
            title="About Us"
            explanation="Generate an about us page for your store."
          >
            <div className="md:w-4/4 mx-auto max-w-2xl py-5 rounded">
              <TextArea
                label="Why was your store created?"
                onChange={(e) => {
                  setWhyCreated(e.target.value);
                }}
                value={whyCreated}
                placeholder=""
              />
              <TextArea
                label="Why is your store unique?"
                onChange={(e) => {
                  setUniqueReason(e.target.value);
                }}
                value={uniqueReason}
                placeholder=""
              />
              <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 gap-2">
                <Button
                  bgColor="bg-white"
                  bgHoverColor="bg-gray-400"
                  textColor="black"
                  extraStyle="border border-gray-800"
                  onClick={(e) => handleClear(e)}
                >
                  Clear
                </Button>
                <Button
                  bgColor="bg-blue-500"
                  bgHoverColor="bg-gray-400"
                  textColor="white"
                  extraStyle=""
                  onClick={(e) => handleSubmit(e)}
                >
                  Generate
                </Button>
              </div>
            </div>
            <div className="mt-10 max-w-2xl mx-auto ">
              <div className="inline-flex items-center justify-between w-full">
                <div className="text-xl font-semibold">Generated Page</div>
                <div
                  className="mr-1  text-center hover:text-gray-400  "
                  onClick={() => {
                    navigator.clipboard.writeText(aboutUs.trim());
                    fireToast.success("Copied!");
                  }}
                >
                  <HiDuplicate size={22} />
                </div>
              </div>
              <TextArea
                value={aboutUs.trim()}
                onChange={(e) => {
                  setAboutUs(e.target.value);
                }}
                rows={20}
              />
            </div>
          </Card>
        </div>
      </div>
      <Footer bgColor="bg-white" />
    </div>
  );
};

export default ProductNameGenerator;
