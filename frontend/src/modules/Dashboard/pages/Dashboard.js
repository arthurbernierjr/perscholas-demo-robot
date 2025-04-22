import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
//COMPONENTS
import Card from "../../common/components/Cards/Card";
import TourGuide from "../components/TourGuide/TourGuide";
import IconCard from "../components/IconCard";
import { AuthContext } from "../../common/utils/Context/authContext";
import loadUser from "../../common/utils/Context/loadUser";
//ICONS
import {
  BsFillChatLeftQuoteFill,
  BsFillChatSquareDotsFill,
  BsFillChatRightTextFill,
  BsFillPersonPlusFill,
  BsPencilFill,
  BsFillBookFill,
} from "react-icons/bs";
import { dashboardSteps } from "../components/TourGuide/components";

const DisplayIcons = ({ isSubscribed, showTour }) => {
  if (isSubscribed) {
    return (
      <div className="grid xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-2 mb-4 ">
        <IconCard
          link="/dashboard/singleProductDescription"
          title="Single Description"
          Icon={BsFillChatSquareDotsFill}
          tourIdentifier="singleDescription"
          isSubscribed={true}
        />
        <IconCard
          link="/dashboard/BulkProductDescriptions"
          title="Bulk Descriptions"
          Icon={BsFillChatRightTextFill}
          isSubscribed={true}
        />
        <IconCard
          link="/dashboard/adcopy"
          title="Ad Copy"
          Icon={BsFillPersonPlusFill}
          tourIdentifier="dashboard"
          isSubscribed={true}
        />
        <IconCard
          link="/dashboard/socialMediaCaption"
          title="Social Media Captions"
          Icon={BsFillChatLeftQuoteFill}
          tourIdentifier="dashboard"
          isSubscribed={true}
        />
        <IconCard
          link="/dashboard/productName"
          title="Product Names"
          Icon={BsPencilFill}
          isSubscribed={true}
        />
        <IconCard
          link="/dashboard/aboutUs"
          title="About Us Page"
          Icon={BsFillBookFill}
          isSubscribed={true}
        />
      </div>
    );
  }
  return (
    <div className="grid xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-2 mb-4 ">
      <IconCard
        link={
          showTour
            ? "/dashboard/singleProductDescription?showTour"
            : "/dashboard/singleProductDescription"
        }
        title="Single Description"
        Icon={BsFillChatSquareDotsFill}
        tourIdentifier="singleDescription"
        isSubscribed={true}
      />

      <IconCard
        link=""
        title="Bulk Descriptions"
        Icon={BsFillChatRightTextFill}
        isSubscribed={false}
      />
      <IconCard
        link=""
        title="Ad Copy"
        Icon={BsFillPersonPlusFill}
        tourIdentifier="dashboard"
        isSubscribed={false}
      />
      <IconCard
        link=""
        title="Social Media Captions"
        Icon={BsFillChatLeftQuoteFill}
        tourIdentifier="dashboard"
        isSubscribed={false}
      />
      <IconCard
        link=""
        title="Product Names"
        Icon={BsPencilFill}
        isSubscribed={false}
      />
      <IconCard
        link=""
        title="About Us page"
        Icon={BsFillBookFill}
        isSubscribed={false}
      />
    </div>
  );
};

const HomeDashboard = () => {
  const [showTour, setShowTour] = useState(false);
  const { login, loadingHandler, user } = useContext(AuthContext);
  const [userIsSubscribed, setUserIsSubscribed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      loadUser(login, loadingHandler);

      if (user.isSubscribed) {
        setUserIsSubscribed(true);
      }

      if (location.search.includes("showTour")) {
        setShowTour(true);
      }
    })();
  }, []);

  return (
    <div>
      <Card title="What would you like to generate?">
        <TourGuide
          showTour={showTour}
          setShowTour={setShowTour}
          steps={dashboardSteps}
        />
        <div className="mx-4 overall-tools">
          {!userIsSubscribed && (
            <div className="bg-gray-200 rounded-xl text-center py-2">
              <Link to="/auth/choosePlan">
                Upgrade to access the remaining features.
              </Link>
            </div>
          )}
          <div className="mb-2"> </div>

          <DisplayIcons isSubscribed={userIsSubscribed} showTour={showTour} />
        </div>
      </Card>
    </div>
  );
};

export default HomeDashboard;
