import { useState } from "react";
//COMPONENTS
import Card from "../../common/components/Cards/Card";
import Footer from "../../common/largeComponents/Footer";
import TextInput from "../../common/components/Inputs/TextInput";
import TextArea from "../../common/components/Inputs/TextAreaInput";
import Button from "../../common/components/Buttons/Button";
import Spinner from "../../common/components/Spinner/Spinner";
import createProductName from "../api/createProductName";
import { Toast, fireToast } from "../../common/components/Toast/ToastAlert";
import { HiDuplicate } from "react-icons/hi";

const ProductNameGenerator = () => {
  const [niche, setNiche] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [newProductName, setNewProductName] = useState("");

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const { newProductName } = await createProductName({
      niche,
      productDetails,
    });

    setNewProductName(newProductName);
    setLoading(false);

    return fireToast.success("Product Name Created");
  };

  const handleClear = (event) => {
    event.preventDefault();
    setNiche("");
    setProductDetails("");

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
          <Card title="Product Name" explanation="Create a product name.">
            <div className="md:w-4/4 mx-auto max-w-2xl py-5 rounded">
              <TextInput
                label="Niche"
                onChange={(e) => {
                  setNiche(e.target.value);
                }}
                value={niche}
                placeholder="Watches"
              />

              <TextInput
                label="Product Details"
                onChange={(e) => {
                  setProductDetails(e.target.value);
                }}
                value={productDetails}
                placeholder="Stainless steel watch case. 5 metres water resistance. Quartz movement. "
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
                <div className="text-xl font-semibold">
                  {" "}
                  Generated Product Name
                </div>
                <div
                  className="mr-1  text-center hover:text-gray-400  "
                  onClick={() => {
                    navigator.clipboard.writeText(newProductName.trim());
                    fireToast.success("Copied!");
                  }}
                >
                  <HiDuplicate size={22} />
                </div>
              </div>

              <TextArea
                value={newProductName.trim()}
                onChange={(e) => {
                  setNewProductName(e.target.value);
                }}
                rows={3}
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
