import { Route, Routes } from "react-router-dom";

import Logout from "./pages/Logout";
import AuthZeroLogin from "./pages/AuthZeroRedirectLogin";
import AuthZeroSignup from "./pages/AuthZeroRedirectSignup";
import AuthZeroHandleRedirect from "./pages/AuthZeroHandleRedirect";
import UpdateBillingStatus from "./pages/UpdateBillingStatus";
import PrivacyPolicy from "../Auth/pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import ChoosePlan from "./pages/choosePlan";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<AuthZeroSignup />} />
      <Route path="login" element={<AuthZeroLogin />} />
      <Route path="logout" element={<Logout />} />
      <Route path="authZeroRedirect" element={<AuthZeroHandleRedirect />} />
      <Route path="updateBillingStatus" element={<UpdateBillingStatus />} />
      <Route exact path="privacypolicy" element={<PrivacyPolicy />} />
      <Route exact path="termsandconditions" element={<TermsAndConditions />} />
      <Route path="choosePlan" element={<ChoosePlan />} />
    </Routes>
  );
};

export default AuthRoutes;
