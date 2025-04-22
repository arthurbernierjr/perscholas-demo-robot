import HomepageLayout from "../layout/homepageLayout";
import Footer from "../../common/largeComponents/Footer";

//COMPONENTS
import Card from "../../common/components/Cards/Card";

import {
  BsFillPersonFill,
  BsCardList,
  BsCart3,
  BsFillEmojiHeartEyesFill,
  BsFillCartFill,
  BsFillGeoAltFill,
} from "react-icons/bs";

import PricingCards from "../components/pricingCards";

import FAQ from "../components/FAQ";

const FeatureCard = ({ title, Icon, description }) => {
  return (
    <div class="flex items-start rounded-xl bg-white p-6 shadow-lg border-2">
      <div class="flex h-12 w-12 items-center justify-center rounded-full border border-gray-500 ">
        <Icon size={20} />
      </div>
      <div class="mx-auto my-auto">
        <h2 class="font-semibold text-xl ">{title}</h2>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="flex flex-col text-gray-900">
      <Card>
        <div className="max-w-full text-center">
          <div className="md:grid md:grid-cols-2 md:gap-4">
            <div className="grid grid-cols-1  my-0 md:my-auto">
              <div className="">
                <div className="md:text-5xl text-4xl font-bold mt-0 mx-auto max-w-6xl">
                  Generate Product Descriptions That Sell.
                </div>
                <div className="text-xl bold mt-4 mx-auto max-w-4xl">
                  Our streamlined AI tool makes it easy to write effective and
                  SEO optimized descriptions in 10+ Languages.
                </div>
                <div className="mx-auto my-10 h-16 text-center ">
                  <a
                    href="https://copywritingrobot.com/auth/register"
                    className="mt-6 py-2 md:px-6 px-10   border-2 border-blue-500 hover:border-blue-600 hover:bg-blue-600 bg-blue-500 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-xl sm:text-3xl font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    👉 Start Generating
                  </a>
                  <div className="mt-4 italic  text-gray-600">
                    7-day money back guarantee.
                  </div>
                </div>
              </div>
            </div>{" "}
            <img
              className=" md:max-w-sm border border-2 border-gray-400 shadow-xl rounded-xl  mx-auto"
              src="/testGIF.gif"
            />
          </div>
          <div className="max-w-screen-xl mx-auto mt-32">
            <h2 className="text-4xl font-bold tracking-wide  text-gray-900 flex justify-center mb-10">
              It's Like Having a Professional Copywriter on Demand
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-4 ">
            <div class="flex items-start rounded-xl bg-white p-4 shadow-lg  border-2">
              <div class="ml-4">
                <h2 class="font-semibold text-2xl ml-3 text-left">
                  <span class="bg-red-100 text-red-800  mr-2 px-2.5 py-0.5 rounded dark:bg-red-200">
                    Before
                  </span>
                </h2>
                <p class="mt-2 text-md text-gray-600 text-left p-4 rounded-xl ">
                  - Weight: 1098g <br /> - Material: camo high-strength nylon
                  waterproof fabric
                  <br /> - Inner compartment: three levels of storage space{" "}
                  <br /> - Expanded size: 40*32*25cm
                </p>
              </div>
            </div>
            <div class="flex items-start rounded-xl bg-white p-4 shadow-lg border-2">
              <div class="ml-4">
                <h2 class="font-semibold text-2xl ml-3 text-left">
                  {" "}
                  <span class="bg-green-100 text-green-800  mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 ">
                    After
                  </span>
                </h2>
                <p class="mt-2 text-md text-gray-600 text-left p-3 rounded-xl ">
                  Welcome to Camping Emporium! Make sure to take all the gear
                  you need with this outdoor camping and hiking bag. Its
                  lightweight at only 1098g, and made from long-lasting,
                  high-strength nylon waterproof fabric.
                  <br /> <br /> Its three levels of storage create enough space
                  for all your essentials, and its expanded size of 40*32*25cm
                  offers great capacity. Plus, it comes in camo, perfect for
                  blending into your surroundings.
                  <br /> <br />
                  Benefits: <br /> - Lightweight, with great capacity for all
                  your gear
                  <br /> - Durable waterproof material, designed for long-term
                  use
                  <br /> - Stylish camo design lets you blend in with your
                  surroundings
                  <br /> <br />
                  Take the next step on your outdoor adventure with this stylish
                  and reliable bag. Shop with Camping Emporium today and get
                  ready for your next big trek!
                </p>
              </div>
            </div>
          </div>
          <hr className="w-48 h-1 mx-auto bg-white border-0 rounded my-20 dark:bg-gray-300"></hr>
          <div class="flex flex-col text-gray-900 my-20 ">
            <h2 class="mb-4 text-4xl font-bold text-center">
              {" "}
              AI Generation Tools
            </h2>

            <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-3 ">
              <FeatureCard
                title="Single Descriptions"
                Icon={BsCardList}
                description="High quality and SEO optimized descriptions for one-off products."
              />
              <FeatureCard
                title="Bulk Descriptions"
                Icon={BsCart3}
                description="All your descriptions updated with one upload."
              />
              <FeatureCard
                title="Ad Copy"
                Icon={BsFillPersonFill}
                description="High converting copy for any platform."
              />
              <FeatureCard
                title="Social Media Captions"
                Icon={BsFillEmojiHeartEyesFill}
                description="Speed up your content creation process."
              />
              <FeatureCard
                title="Product Names"
                Icon={BsFillCartFill}
                description="Generate unique name ideas."
              />
              <FeatureCard
                title="About Us Pages"
                Icon={BsFillGeoAltFill}
                description="Create an engaging about us page to give your customers a story."
              />
            </div>
          </div>
          <hr className="w-48 h-1 mx-auto bg-white border-0 rounded my-20 dark:bg-gray-300"></hr>
          <div class="my-20 flex justify-center items-center  ">
            <div class="">
              <div class="text-center font-bold ">
                <div className="text-center text-4xl font-bold text-gray-900 ">
                  Languages Supported
                </div>
                <div className="px-10 py-2 rounded-xl shadow-xl mt-10 text-gray-800 text-lg  border-2">
                  <div className="grid gap-4 md:gap-10 grid-cols-4  mt-2 ">
                    <div className="">
                      <ul className="space-y-2">
                        <li>🇬🇧 English </li>
                        <li>🇺🇸 English </li>
                        <li>🇫🇷 French</li>
                      </ul>
                    </div>
                    <div className="">
                      <ul className="space-y-2">
                        <li>🇩🇪 German</li>
                        <li>🇩🇰 Danish</li>
                        <li>🇳🇱 Dutch</li>
                      </ul>
                    </div>

                    <div>
                      <ul className="space-y-2">
                        <li>🇫🇮 Finish</li>
                        <li>🇮🇹 Italian</li>
                        <li>🇵🇱 Polish </li>
                      </ul>
                    </div>
                    <div className="">
                      <ul className="space-y-2">
                        <li>🇵🇹 Portug.</li>
                        <li>🇸🇰 Slovenian</li>
                        <li>🇪🇸 Spanish</li>
                      </ul>
                    </div>
                  </div>
                  <div className="text-center mt-4"></div>
                </div>
              </div>
            </div>
          </div>
          <hr className="w-48 h-1 mx-auto bg-white border-0 rounded my-20 dark:bg-gray-300"></hr>

          <div className="my-20">
            <div className="text-center text-4xl font-bold text-gray-900 ">
              What Our Customers Say?
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto  border border-2 rounded-xl shadow-md py-2 px-4">
              <div className=" max-w-2xl   px-6 py-4 mt-4 align-middle flex flex-col justify-center items-center">
                <div className="">
                  I only have a few hundred products so I didn’t think I would
                  use it much.
                  <p className="mt-4">
                    However I was surprised on how easy it made writing new
                    descriptions.
                  </p>
                  <p className="mt-4 font-semibold">Sean - Etsy Merchant</p>
                  <img className="mb-4 mt-4 w-28 mx-auto" src="/5-star.png" />
                </div>
              </div>
              <div className=" text-gray-900 max-w-2xl  rounded-xl  mx-aut px-6 py-4 mt-4  ">
                <div>
                  I used to just leave the Aliexpress product descriptions
                  because I figured that if works there it should work on my
                  store.
                  <p className="mt-4">
                    But I didn’t realize how much more professional my store
                    looked after with proper product descriptions.
                  </p>
                  <p className="mt-4"></p>
                  <p className="mt-4 font-semibold">
                    Ainslee - Shopify Merchant
                  </p>
                  <img className="mb-4 mt-4 w-28 mx-auto" src="/5-star.png" />
                </div>
              </div>
              <div className=" text-gray-900 max-w-2xl   px-6 py-4 mt-4 align-middle flex flex-col justify-center items-center">
                <div className="">
                  I consider myself a decent copywriter.
                  <p className="mt-4">
                    This AI did a decent job though. Now it’s part of my product
                    uploading process.
                  </p>
                  <p className="mt-4 font-semibold">
                    Bernard - Amazon Dropshipper
                  </p>
                  <img className="mb-4 mt-4 w-28 mx-auto" src="/5-star.png" />
                </div>
              </div>
            </div>
          </div>

          <hr className="w-48 h-1 mx-auto bg-white border-0 rounded my-20 dark:bg-gray-300"></hr>
          <div className="border-1 shadow-xl rounded-xl p-10 max-w-8xl mx-auto bg-gray-800 text-white mt-10">
            <h2 className="text-3xl font-bold tracking-wide  flex justify-center mb-10">
              💰 60-Day Store Closing Guarantee
            </h2>
            <p className="max-w-3xl mx-auto">
              E-commerce can be a tough market especially if you have a new
              store. That's why our app is backed by this guarantee. If your
              store closes for any reason in the next 60 days we’ll issue you a
              full refund.
            </p>
          </div>
          <div class="mb-10 flex justify-center items-center  ">
            <div class="mt-10">
              <div className="text-center text-4xl font-bold text-gray-900 mt-10  ">
                AI Copywriting Without the{" "}
                <span className="text-red-500">$500</span> Yearly Fees.
              </div>
              <PricingCards
                freeLink="https://copywritingrobot.com/auth/register"
                starterLink="https://copywritingrobot.com/auth/register"
                standardLink="https://copywritingrobot.com/auth/register"
                businessLink="https://copywritingrobot.com/auth/register"
                showFree={false}
              />
            </div>
          </div>
          <hr className="w-48 h-1 mx-auto bg-white border-0 rounded my-20 dark:bg-gray-300"></hr>
          <FAQ />

          <div className="p-8 mt-6 border-2 border-blue-600 rounded-xl shadow-xl bg-blue-600 text-white">
            <div className="mb-6 font-bold text-2xl">
              Start using an AI copywriting today.
            </div>
            <a
              href="https://copywritingrobot.com/auth/register"
              className="mt-6 py-2 md:px-6 px-2  border-gray-200 hover:bg-gray-200 bg-white focus:ring-white-500 focus:ring-offset-white-200 text-gray-800 w-full transition ease-in duration-200 text-center text-2xl font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              👉 Signup
            </a>

            <div className="mt-4 italic text-gray-200">
              7-day money back guarantee
            </div>
          </div>
          <Footer />
        </div>
      </Card>
    </div>
  );
};

const Homepage = () => {
  return <HomepageLayout Component={Home} />;
};

export default Homepage;
