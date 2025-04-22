import Header from "../navigation/headerNav";
import Sidebar from "../navigation/sidebarNav";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Layout = ({ Component }) => {
  const [sidebar, setSidebar] = useState(false);
  const location = useLocation();

  const handleClick = () => {
    const updated = !sidebar;
    setSidebar(updated);
  };

  useEffect(() => {
    if (window.innerWidth >= 760) {
      setSidebar(true);
    } else {
      setSidebar(false);
    }
  }, [location]);

  return (
    <main className="font-sans text-gray-900 bg-white h-screen overflow-hidden relative transition">
      <div className="flex items-start justify-between ">
        <Sidebar sidebarSelected={sidebar} />
        <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
          <Header sidebarClick={handleClick} />
          <div className="overflow-auto h-screen pb-24 pt-1 pr-1 pl-1 md:pt-0 md:pr-0 md:pl-0">
            <div className="flex flex-col flex-wrap  ">
              <Component />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Layout;
