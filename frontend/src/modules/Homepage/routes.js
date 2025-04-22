import { Route } from "react-router-dom";
import HomepageLayout from "./layout/homepageLayout";

import Homepage from "./pages/homepage";

const HomepageRoutes = () => {
  return (
    <>
      <Route exact path="/">
        <HomepageLayout Component={Homepage} />
      </Route>
    </>
  );
};

export default HomepageRoutes;
