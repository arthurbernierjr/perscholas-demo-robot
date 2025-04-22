import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router";

import { AuthContext } from "../common/utils/Context/authContext";
import loadUser from "../common/utils/Context/loadUser";
import Spinner from "../common/components/Spinner/Spinner";

//Layout
import DashboardLayout from "./layout/Dashboard";
//Pages
import SingleProductDescription from "./pages/singleProductDescription";
import BulkProductDescriptions from "./pages/bulkProductDescriptions";
import AdCopy from "./pages/adCopy";
import ProductName from "./pages/productName";
import SocialMediaCaption from "./pages/socialMedia";
import AboutUs from "./pages/aboutUs";
import Settings from "./pages/settings";
import WelcomeSettings from "./pages/WelcomeSettings";
import Dashboard from "./pages/Dashboard";
import SingleDescriptionHistory from "./pages/singleDescriptionHistory";

const DashboardRoutes = () => {
  const { login, loading, loadingHandler, user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      await loadUser(login, loadingHandler);
    })();
  }, [login, loadingHandler]);

  if (loading === true) {
    return <Spinner />;
  }

  if (!user || (user && !user.userID)) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Routes>
      <Route
        path="dashboard"
        element={<DashboardLayout Component={Dashboard} />}
      />
      <Route
        path="singleProductDescription"
        element={<DashboardLayout Component={SingleProductDescription} />}
      />
      <Route
        path="singleDescriptionHistory"
        element={<DashboardLayout Component={SingleDescriptionHistory} />}
      />
      <Route path="adcopy" element={<DashboardLayout Component={AdCopy} />} />
      <Route
        path="productName"
        element={<DashboardLayout Component={ProductName} />}
      />
      <Route
        path="socialMediaCaption"
        element={<DashboardLayout Component={SocialMediaCaption} />}
      />
      <Route path="aboutUs" element={<DashboardLayout Component={AboutUs} />} />
      <Route
        path="bulkProductDescriptions"
        element={<DashboardLayout Component={BulkProductDescriptions} />}
      />
      <Route
        path="settings"
        element={<DashboardLayout Component={Settings} />}
      />
      <Route path="welcomeSettings" element={<WelcomeSettings />} />} />
    </Routes>
  );
};

export default DashboardRoutes;
