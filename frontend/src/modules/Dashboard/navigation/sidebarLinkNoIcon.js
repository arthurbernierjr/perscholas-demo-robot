import { Link, useLocation } from "react-router-dom";

const selected = `w-full font-light text-blue-500 flex items-center py-2 px-1  transition-colors duration-200 justify-start order-l-2 ml-2 border-blue-500 `;
const notSelected =
  "w-full text-gray-800  flex items-center  pr-0  py-4  px-1  transition-colors duration-200 justify-start hover:text-blue-500 ml-2  border-gray-500 font-light";

const SidebarLinkNoIcon = ({ to, text }) => {
  const { pathname } = useLocation();

  return (
    <Link className={to === pathname ? selected : notSelected} to={to} replace>
      <span className="mx-2 text-sm font-normal">{text}</span>
    </Link>
  );
};

export default SidebarLinkNoIcon;
