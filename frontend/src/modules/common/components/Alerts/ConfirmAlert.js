import { Link } from "react-router-dom";

const ConfirmAlert = ({
  onCancel,
  title,
  description,
  Icon,
  successURL,
  buttonText,
}) => {
  return (
    <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700 w-88 m-auto">
      <div className="w-full h-full text-center">
        <div className="flex h-full flex-col justify-between">
          <div className="m-auto mt-6 text-gray-700">
            <Icon size={50} />
          </div>
          <p className="text-gray-800 dark:text-gray-200 text-xl font-bold mt-4">
            {title}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-xs py-2 px-6">
            {description}
          </p>
          <div className="flex items-center justify-between gap-4 w-full mt-8">
            <Link
              to={successURL}
              className="py-2 px-4  bg-red-500 hover:bg-red-600 focus:ring-red-500 focus:ring-offset-red-200 text-gray-900 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              <button type="button">{buttonText}</button>
            </Link>
            <button
              type="button"
              className="py-2 px-4  bg-white hover:bg-white focus:ring-black focus:ring-offset-black text-black w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAlert;
