import PricingCards from "../../Homepage/components/pricingCards";
import FAQ from "../../Homepage/components/FAQ";

const ChoosePlan = () => {
  // Define links - replace with your actual Stripe links or logic
  const starterLink = process.env.REACT_APP_STRIPE_STARTER_LINK || "#"; // Use env vars or defaults
  const standardLink = process.env.REACT_APP_STRIPE_STANDARD_LINK || "#";
  const businessLink = process.env.REACT_APP_STRIPE_BUSINESS_LINK || "#";
  // Link for continuing without payment (e.g., to settings or dashboard in demo/free tier)
  const continueLink = "/dashboard/welcomeSettings"; // Or "/dashboard/dashboard"

  return (
    <div className="font-sans bg-white relative overflow-auto h-screen">
      <div className="flex flex-col items-center px-4 sm:px-10 py-10">
        <div className="my-auto align-middle mt-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-10 mb-4">
            Welcome to Per Scholas Demo Robot!
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Choose a plan below or continue to set up your store.
          </p>

          {process.env.NODE_ENV === 'production' || process.env.REACT_APP_SHOW_PRICING === 'true' ? (
             <>
                <div className="text-center text-2xl font-bold text-gray-800 mb-8">
                  AI Copywriting Without The <span className="text-red-500">$500</span> Yearly Fees.
                </div>
                <PricingCards
                  starterLink={starterLink}
                  standardLink={standardLink}
                  businessLink={businessLink}
                  showFree={false}
                />
             </>
          ) : (
            <div className="flex justify-center mt-8">
                <a
                    href={continueLink}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
                >
                    Continue to Setup
                </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChoosePlan;
