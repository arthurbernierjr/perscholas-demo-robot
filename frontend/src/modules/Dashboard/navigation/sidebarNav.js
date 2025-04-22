import { useContext, useEffect, useState } from "react";
import SidebarLogo from "./sidebarLogo";
import SidebarLink from "./sidebarLink";
import SidebarLinkNoIcon from "./sidebarLinkNoIcon";
import { AuthContext } from "../../common/utils/Context/authContext";
import loadUser from "../../common/utils/Context/loadUser";

import {
  BsFillPersonFill,
  BsGearFill,
  BsFillBasketFill,
  BsFillFilterSquareFill,
  BsFillChatSquareDotsFill,
  BsPencilFill,
} from "react-icons/bs";

import SidebarExpandable from "./sideBarExpanded";

const DisplayOtherLinks = ({ userIsSubscribed }) => {
  if (userIsSubscribed) {
    return (
      <div>
        <SidebarExpandable title="Descriptions" Icon={BsFillChatSquareDotsFill}>
          <SidebarLinkNoIcon
            text="Single Description"
            to="/dashboard/singleProductDescription"
          />
          <SidebarLinkNoIcon
            text="Bulk Descriptions"
            to="/dashboard/BulkProductDescriptions"
          />
        </SidebarExpandable>
        <SidebarExpandable title="Social Media" Icon={BsFillPersonFill}>
          <div className="text-sm text-gray-700 font-bold"> </div>
          <SidebarLinkNoIcon
            Icon={BsFillPersonFill}
            text="Ad Copy "
            to="/dashboard/adcopy"
          />
          <SidebarLinkNoIcon
            Icon={BsFillBasketFill}
            text="Social Media Caption"
            to="/dashboard/socialMediaCaption"
          />
        </SidebarExpandable>
        <SidebarExpandable title="Other" Icon={BsPencilFill}>
          <SidebarLinkNoIcon text="Product Name" to="/dashboard/productName" />

          <SidebarLinkNoIcon text="About Us Page" to="/dashboard/aboutUs" />
        </SidebarExpandable>
        <SidebarLink
          Icon={BsGearFill}
          text="Store Settings"
          to="/dashboard/settings"
        />
      </div>
    );
  }

  return (
    <div>
      <SidebarLink
        Icon={BsFillChatSquareDotsFill}
        text="Single Description"
        to="/dashboard/singleProductDescription"
      />
      <SidebarLink Icon={BsGearFill} text="Settings" to="/dashboard/settings" />
    </div>
  );
};

const Sidebar = ({ sidebarSelected }) => {
  const { login, loadingHandler, user } = useContext(AuthContext);
  const [userIsSubscribed, setUserIsSubscribed] = useState(false);
  const [descriptionCount, setDescriptionCount] = useState(0);

  useEffect(() => {
    (async () => {
      loadUser(login, loadingHandler);

      if (user.isSubscribed) {
        setUserIsSubscribed(true);
      }

      if (user.descriptionCount) {
        setDescriptionCount(user.descriptionCount);
      }
    })();
  }, [login, loadingHandler]);

  return (
    <div
      className={` h-screen rounded-md text-lg  relative w-60 transition ease-in duration-400 ${
        !sidebarSelected ? "hidden" : null
      }`}
    >
      <div className=" h-full bg-white  border-r-2 border-right-gray-300   text-gray-900 overflow-auto ">
        <div className=" md:mt-20 mt-10 ">
          <div>
            <div className="transition ease-in duration-400">
              <SidebarLogo />
            </div>
            <nav className="px-2 items-center ml-4 ">
              <div className="mt-10">
                <SidebarLink
                  Icon={BsFillFilterSquareFill}
                  text="Dashboard"
                  to="/dashboard/dashboard"
                />

                <DisplayOtherLinks userIsSubscribed={userIsSubscribed} />
                <div className="text-sm bg-gray-100 rounded text-center px-2 py-2 font-bold w-32">
                  Credits: {descriptionCount}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
