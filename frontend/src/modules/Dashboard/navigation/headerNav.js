import { HiMenu } from "react-icons/hi";
import { useState } from "react";
import { Link } from "react-router-dom";

const HeaderNav = ({ sidebarClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <header className="w-full h-10 flex items-center justify-between my-2">
      <div className="block  ml-8">
        <button
          className="flex p-2 items-center rounded-full bg-white shadow text-gray-900 border border-gray-900 text-md"
          onClick={sidebarClick}
        >
          <HiMenu size={25} />
        </button>
      </div>
    </header>
  );
};

export default HeaderNav;
