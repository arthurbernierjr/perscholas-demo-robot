import { Link } from "react-router-dom";

const Layout = ({ Component }) => {
  return (
    <main className=" font-sans bg-white relative overflow-auto h-screen">
      <header className="h-24 sm:h-32 flex items-center z-50 w-full mt-5">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/">
            <div className="uppercase text-gray-200 dark:text-gray-200 font-black text-3xl flex items-center h-24 mr-4 ">
              <img
                className="h-24 mx-auto"
                src="/logo.png"
                alt="Copywriting Robot"
              />
            </div>
          </Link>
          <div className="flex items-center">
            <nav className="font-sen text-gray-200 dark:text-gray-200 justify-end flex flex-row gap-4">
              <a
                href="https://copywritingrobot.com/auth/login"
                className="py-2 px-2   border border-gray-900 hover:bg-gray-900 hover:text-white focus:ring-gray-900 focus:ring-offset-gray-900 text-gray-900 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Login
              </a>
            </nav>
          </div>
        </div>
      </header>
      <div className="flex relative z-20 items-center">
        <div className="container mx-auto px-4 flex flex-col justify-between items-center relative max-w-7xl">
          <Component />
        </div>
      </div>
    </main>
  );
};

export default Layout;
