import { useEffect, useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
//COMPONENTS
import Card from "../../common/components/Cards/Card";
import TextInput from "../../common/components/Inputs/TextInput";
import TextArea from "../../common/components/Inputs/TextAreaInput";
import Button from "../../common/components/Buttons/Button";
import Spinner from "../../common/components/Spinner/Spinner";
import createSingleProductDescription from "../api/createSingleProductDescription";
import { Toast, fireToast } from "../../common/components/Toast/ToastAlert";
import { AuthContext } from "../../common/utils/Context/authContext";
import loadUser from "../../common/utils/Context/loadUser";
import { HiDuplicate } from "react-icons/hi";
import { firstDescriptionSteps } from "../components/TourGuide/components";
import TourGuide from "../components/TourGuide/TourGuide";
import Select from "../../common/components/Inputs/SelectInput";

const SingleProductDescription = () => {
  const { login, loadingHandler, user } = useContext(AuthContext);

  const [type, setType] = useState("simple");
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [colors, setColors] = useState("");
  const [includeBenefits, setIncludeBenefits] = useState(true);
  const [aiProductDescription, setAiProductDescription] = useState("");
  const [SEOTitle, setSEOTitle] = useState("");
  const [SEODescription, setSEODescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [generatedComplete, setGeneratedComplete] = useState(false);
  const [showTour, setShowTour] = useState(false);

  // GET STATE
  const location = useLocation();

  useEffect(() => {
    (async () => {
      loadUser(login, loadingHandler);

      if (user.descriptionCount) {
        setDescriptionCount(user.descriptionCount);
      }

      if (user.isSubscribed) {
        setIsSubscribed(true);
      }

      if (location.search.includes("showTour")) {
        setShowTour(true);
      }
    })();
  }, [login, loadingHandler]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (descriptionCount > 0) {
      setLoading(true);

      const { newProductDescription, newSEOTitle, newSEODescription } =
        await createSingleProductDescription({
          productName,
          productCategory,
          productDetails,
          colors,
          type,
          includeBenefits,
        });

      setAiProductDescription(newProductDescription);
      setSEOTitle(newSEOTitle);
      setSEODescription(newSEODescription);
      setLoading(false);

      const updatedCount = descriptionCount - 1;

      setDescriptionCount(updatedCount);
      setGeneratedComplete(true);

      return fireToast.success("Description Created");
    }
  };

  const handleClear = (event) => {
    event.preventDefault();
    setProductName("");
    setProductCategory("");
    setProductDetails("");
    setColors("");
    setGeneratedComplete(false);

    return fireToast.success("Cleared");
  };

  if (loading) {
    return <Spinner text="Creating your description..." />;
  }
  return (
    <div>
      <div className="mx-4 overall-tools">
        <Toast />
        <TourGuide
          showTour={showTour}
          setShowTour={setShowTour}
          steps={firstDescriptionSteps}
          showClose={true}
        />
        <div className=" mb-4 ">
          <Card
            title="Single Product Description"
            explanation="Create a description, SEO title, and SEO meta description."
          >
            <div className="max-w-5xl mx-auto">
              {!isSubscribed && descriptionCount <= 0 && (
                <a
                  href="https://copywritingrobot.com/auth/chooseplan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className={`px-4 py-2 ${
                      descriptionCount > 0 ? "bg-gray-200" : "bg-red-200"
                    } rounded-xl text-center`}
                  >
                    You have{" "}
                    <span className="font-bold">{descriptionCount}</span> free
                    description remaining. Click here to choose your plan.
                  </div>
                </a>
              )}
            </div>

            <div className="md:w-4/4 mx-auto  max-w-2xl py-5 rounded ">
              <div className="text-center text-gray-800 mb-5 mx-auto  ">
                {type === "simple" ? (
                  <div className="">
                    <span
                      className="font-bold border border-1 px-2 rounded py-1 bg-gray-100"
                      onClick={(e) => setType("simple")}
                    >
                      Simple
                    </span>
                    <span
                      className="px-2 py-1 "
                      onClick={(e) => setType("detailed")}
                    >
                      Detailed
                    </span>
                  </div>
                ) : (
                  <div className=" px-2 py-1/2  ">
                    <span
                      className="px-2 py-1 "
                      onClick={(e) => setType("simple")}
                    >
                      Simple
                    </span>

                    <span
                      className="font-bold border border-1 px-2 rounded py-1 bg-gray-100"
                      onClick={(e) => setType("detailed")}
                    >
                      Detailed
                    </span>
                  </div>
                )}
              </div>
              <div className="border  border-gray-200 border-2 px-6 py-4 rounded-xl">
                {type === "simple" && (
                  <div className="enter-details">
                    {" "}
                    <TextInput
                      label="Product Name"
                      onChange={(e) => {
                        setProductName(e.target.value);
                      }}
                      value={productName}
                      placeholder="Digital Watch"
                    />
                    <TextInput
                      label="Product Details"
                      onChange={(e) => {
                        setProductDetails(e.target.value);
                      }}
                      value={productDetails}
                      placeholder="Stainless steel watch case."
                    />
                    <Select
                      title="Benefit Bullet Points"
                      optionArr={[
                        { name: "Included", value: true },
                        { name: "Do Not Included", value: false },
                      ]}
                      onChange={(e) => {
                        setIncludeBenefits(e.target.value);
                      }}
                      value={includeBenefits}
                    />
                  </div>
                )}

                {type === "detailed" && (
                  <div>
                    {" "}
                    <TextInput
                      label="Product Name"
                      onChange={(e) => {
                        setProductName(e.target.value);
                      }}
                      value={productName}
                      placeholder="Digital Watch"
                    />
                    <TextInput
                      label="Category"
                      onChange={(e) => {
                        setProductCategory(e.target.value);
                      }}
                      value={productCategory}
                      placeholder="Watches"
                    />
                    <TextInput
                      label="Product Details"
                      onChange={(e) => {
                        setProductDetails(e.target.value);
                      }}
                      value={productDetails}
                      placeholder="Stainless steel watch case."
                    />
                    <TextInput
                      label="Colors"
                      onChange={(e) => {
                        setColors(e.target.value);
                      }}
                      value={colors}
                      placeholder="Black, brown"
                    />
                    <Select
                      title="Benefit Bullet Points"
                      optionArr={[
                        { name: "Included", value: true },
                        { name: "Do Not Included", value: false },
                      ]}
                      onChange={(e) => {
                        setIncludeBenefits(e.target.value);
                      }}
                      value={includeBenefits}
                    />
                  </div>
                )}

                <div className="mt-4 w-full grid grid-cols-1  gap-2">
                  <Button
                    bgColor="bg-blue-500"
                    bgHoverColor="bg-gray-400"
                    textColor="white"
                    extraStyle="generate-button"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Create Description
                  </Button>
                  {generatedComplete && (
                    <Button
                      bgColor="bg-white"
                      bgHoverColor="bg-gray-400"
                      textColor="black"
                      extraStyle="border border-gray-800"
                      onClick={(e) => handleClear(e)}
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {generatedComplete && (
              <div className="mt-5 max-w-2xl mx-auto">
                <hr className="w-48 h-1 mx-auto my-4 bg-white border-0 rounded md:my-10 dark:bg-gray-300"></hr>
                <div></div>
                <div className="inline-flex items-center justify-between w-full">
                  <div className="text-xl font-semibold">
                    Product Description
                  </div>
                  <div
                    className="mr-1 text-center hover:text-gray-400 "
                    onClick={() => {
                      navigator.clipboard.writeText(
                        aiProductDescription.trim()
                      );
                      fireToast.success("Copied!");
                    }}
                  >
                    <HiDuplicate size={22} />
                  </div>
                </div>
                <TextArea
                  value={aiProductDescription.trim()}
                  onChange={(e) => {
                    setAiProductDescription(e.target.value);
                  }}
                  rows={10}
                />
                <div className="inline-flex items-center justify-between w-full">
                  <div className="text-xl font-semibold">SEO Title</div>
                  <div
                    className="mr-1  text-center hover:text-gray-400  "
                    onClick={() => {
                      navigator.clipboard.writeText(SEOTitle.trim());
                      fireToast.success("Copied!");
                    }}
                  >
                    <HiDuplicate size={22} />
                  </div>
                </div>
                <TextArea
                  value={SEOTitle.trim()}
                  onChange={(e) => {
                    setSEOTitle(e.target.value);
                  }}
                  rows={1}
                />
                <div className="inline-flex items-center justify-between w-full">
                  <div className="text-xl font-semibold">Meta Description</div>
                  <div
                    className="mr-1  text-center hover:text-gray-400  "
                    onClick={() => {
                      navigator.clipboard.writeText(SEODescription.trim());
                      fireToast.success("Copied!");
                    }}
                  >
                    <HiDuplicate size={22} />
                  </div>
                </div>
                <TextArea
                  value={SEODescription.trim()}
                  onChange={(e) => {
                    setSEODescription(e.target.value);
                  }}
                  rows={10}
                />
              </div>
            )}
            <div className="mx-auto py-1 px-2 underline mt-5 text-center ">
              <Link to="/dashboard/singleDescriptionHistory">View History</Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDescription;
