import { Link } from "react-router-dom";

const Footer = ({ loading, isFixed }) => {
  if (loading) {
    return <div></div>;
  }

  return (
    <footer
      className={` bottom-0 right-0 pr-1 ${isFixed ? "absolute" : null} `}
    >
      <div className="mx-auto px-4 mt-10">
        <ul className="max-w-screen-full mx-auto text-sm font-light flex flex-wrap justify-end">
          <li className="my-2">
            <p className="text-gray-400 transition-colors duration-200">
              Copyright ©
            </p>
          </li>
          <li className="my-2">
            <Link
              className="text-gray-400 hover:text-gray-500  dark:hover:text-gray-900 transition-colors duration-200 ml-3"
              to="/auth/privacyPolicy"
            >
              Privacy Policy
            </Link>
          </li>
          <li className="my-2">
            <Link
              className="text-gray-400 hover:text-gray-500  dark:hover:text-gray-900 transition-colors duration-200 ml-3"
              to="/auth/termsandconditions"
            >
              Terms And Conditions
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
