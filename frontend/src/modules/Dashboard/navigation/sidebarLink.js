import { Link, useLocation } from "react-router-dom";

const selected = `w-full flex flex-row grow mr-4  text-sm  px-1  py-1  my-6   transition-colors duration-200 justify-start text-blue-500 `;
const notSelected =
  "w-full   text-gray-700 flex items-center px-1  pr-0  py-1  my-6   transition-colors duration-200 justify-start hover:text-blue-500 hover:border-grey-500  border-gray-800";

const SidebarLink = ({ to, text, Icon }) => {
  const { pathname } = useLocation();

  return (
    <Link className={to === pathname ? selected : notSelected} to={to} replace>
      <div className="">
        <Icon size={20} />
      </div>
      <span className="mx-2 text-sm font-normal">{text}</span>
    </Link>
  );
};

export default SidebarLink;
