import { Link } from "react-router-dom";
import Footer from "../../common/largeComponents/Footer";

const Layout = ({ Component }) => {
  return (
    <div className=" h-screen bg-white flex font-sans flex-col items-center justify-center pt-10 pb-20 pr-6 pl-6 overflow-auto">
      <Link to="/" className="mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Per Scholas Demo Robot</h1>
      </Link>
      <div className="w-full max-w-md">
        <Component />
      </div>
      <Footer bgColor="bg-white" isFixed={false} />
    </div>
  );
};

export default Layout;
