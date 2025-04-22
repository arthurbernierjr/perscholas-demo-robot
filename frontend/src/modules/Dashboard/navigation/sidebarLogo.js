import { Link } from "react-router-dom";

const SidebarLogo = ({ size }) => {
  return (
    <div className={`flex  items-center justify-center pb-0 pt-6 pr-6 pl-6`}>
      <Link to="/dashboard/home">
        <img className="h-28" alt="Logo" src="/logo.png"></img>
      </Link>
    </div>
  );
};

export default SidebarLogo;
