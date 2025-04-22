import { useState } from "react";
//COMPONENTS
import Card from "../../common/components/Cards/Card";
import Footer from "../../common/largeComponents/Footer";
import TextInput from "../../common/components/Inputs/TextInput";
import TextArea from "../../common/components/Inputs/TextAreaInput";
import Button from "../../common/components/Buttons/Button";
import Spinner from "../../common/components/Spinner/Spinner";
import Select from "../../common/components/Inputs/SelectInput";
import createAdCopy from "../api/createAdCopy";
import { Toast, fireToast } from "../../common/components/Toast/ToastAlert";
import { HiDuplicate } from "react-icons/hi";

const platformArr = [
  { name: "TikTok", value: "TikTok" },
  { name: "Instagram", value: "Instagram" },
  { name: "Facebook", value: "Facebook" },
  { name: "Snapchat", value: "Snapchat" },
  { name: "Pinterest", value: "Pinterest" },
  { name: "Amazon", value: "Amazon" },
  { name: "Twitter", value: "Twitter" },
  { name: "Google Ads", value: "Google Ads" },
];

const SingleProductDescription = () => {
  const [productName, setProductName] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [audienceNiche, setAudienceNiche] = useState("");
  const [platform, setPlatform] = useState("TikTok");
  const [newAdCopy, setNewAdCopy] = useState("");

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const { newAdCopy } = await createAdCopy({
      productName,
      problem,
      solution,
      productDetails,
      audienceNiche,
      platform,
    });

    setNewAdCopy(newAdCopy);
    setLoading(false);

    return fireToast.success("Ad Copy Created");
  };

  const handleClear = (event) => {
    event.preventDefault();
    setProblem("");
    setSolution("");
    setProductName("");
    setProductDetails("");
    setAudienceNiche("");
    setPlatform("TikTok");

    return fireToast.success("Cleared");
  };

  if (loading) {
    return <Spinner text="Creating your ad copy..." />;
  }
  return (
    <div>
      <div className="mx-4 overall-tools">
        <Toast />
        <div className=" mb-4 ">
          <Card
            title="Ad Copy"
            explanation="Create ad copy for any platform with AI."
          >
            <div className="md:w-4/4 mx-auto max-w-2xl py-5 rounded">
              <Select
                title="Platform"
                optionArr={platformArr}
                onChange={(e) => {
                  setPlatform(e.target.value);
                }}
                value={platform}
              />
              <TextInput
                label="Problem"
                onChange={(e) => {
                  setProblem(e.target.value);
                }}
                value={problem}
                placeholder="Hard to find affordable watches"
              />
              <TextInput
                label="Solution"
                onChange={(e) => {
                  setSolution(e.target.value);
                }}
                value={solution}
                placeholder="We cut out the middlemen"
              />
              <TextInput
                label="Product Name"
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
                value={productName}
                placeholder="Automatic Digital Watch"
              />
              <TextInput
                label="Product Details"
                onChange={(e) => {
                  setProductDetails(e.target.value);
                }}
                value={productDetails}
                placeholder="Stainless steel watch case. 5 metres water resistance. Quartz movement. "
              />
              <TextInput
                label="Audience Niche"
                onChange={(e) => {
                  setAudienceNiche(e.target.value);
                }}
                value={audienceNiche}
                placeholder="Men interest in fashion"
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
                  Create Ad Copy
                </Button>
              </div>
            </div>
            <div className="mt-10 max-w-2xl mx-auto ">
              <div className="inline-flex items-center justify-between w-full">
                <div className="text-xl font-semibold">Generated Ad Copy</div>
                <div
                  className="mr-1  text-center hover:text-gray-400  "
                  onClick={() => {
                    navigator.clipboard.writeText(newAdCopy.trim());
                    fireToast.success("Copied!");
                  }}
                >
                  <HiDuplicate size={22} />
                </div>
              </div>

              <TextArea
                value={newAdCopy.trim()}
                onChange={(e) => {
                  setNewAdCopy(e.target.value);
                }}
                rows={5}
              />
            </div>
          </Card>
        </div>
      </div>
      <Footer bgColor="bg-white" />
    </div>
  );
};

export default SingleProductDescription;
