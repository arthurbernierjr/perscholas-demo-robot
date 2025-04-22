import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../../common/components/Spinner/Spinner";
import { fireToast, Toast } from "../../common/components/Toast";
import ReactGA from "react-ga4";

import { updateBillingStatus } from "../api/auth";

const UpdateBillingStatus = () => {
  const [finishedAccountUpdate, setFinishedAccountUpdate] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();

  useEffect(() => {
    (async () => {
      ReactGA.event({
        category: "event",
        action: "purchaseStripe",
      });

      const { search } = location;
      const status = await updateBillingStatus(search);

      if (status === "success") {
        setFinishedAccountUpdate(true);
      } else {
        setError(true);
      }
    })();
  }, []);

  if (finishedAccountUpdate) {
    return <Navigate to={{ pathname: "/dashboard/welcomeSettings" }} />;
  }

  if (error) {
    fireToast.error("There was an error with your billing. Please try again");
  }

  return (
    <>
      <Toast /> <Spinner text="Updating your account..." />
    </>
  );
};

export default UpdateBillingStatus;
