import { useState } from "react";

import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";

const SidebarExpandable = ({ title, Icon, children }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="my-6 transition ease-in duration-600 ">
      <div>
        <div
          className="w-full flex flex-row grow mr-6 px-1  text-sm  text-gray-700  flex items-center pr-0  py-1 my-2  transition-colors duration-200 justify-start hover:text-blue-500 hover:border-blue-600  border-gray-800  "
          onClick={() => setExpanded(!expanded)}
        >
          <div className="mr-2 ">
            <Icon size={20} />
          </div>

          {title}
          <div className="ml-2 ">
            {expanded ? <AiFillCaretDown /> : <AiFillCaretRight />}
          </div>
        </div>
      </div>
      <div
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
      >
        <div className={`py-1 ${!expanded && "hidden"}`} role="none">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SidebarExpandable;
