import { Link } from "react-router-dom";

export const IconLink = ({ Icon, to, size }) => {
  return (
    <Link className="flex hover:text-pink-500 justify-center" to={to}>
      <Icon size={size} />
    </Link>
  );
};

export const IconLinkNewTab = ({ Icon, to, size }) => {
  return (
    <Link
      className="flex hover:text-pink-500 justify-center"
      to={to}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon size={size} />
    </Link>
  );
};
