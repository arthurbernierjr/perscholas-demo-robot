import { Link } from "react-router-dom";

const IconCard = ({ title, Icon, link, tourIdentifier, isSubscribed }) => {
  const textColor = isSubscribed ? "" : "text-gray-400";
  return (
    <Link to={link}>
      <div
        className={`w-full px-4 pt-4 pb-2 my-2 border-2 rounded-xl shadow-sm hover:bg-gray-200 hover:text-gray-900 ${tourIdentifier}`}
      >
        <div className={`flex flex-row justify-center mb-4 ${textColor}`}>
          <Icon size={40} />
        </div>
        <div className="flex flex-row justify-center">
          <div>{title}</div>
        </div>
      </div>
    </Link>
  );
};

export default IconCard;
