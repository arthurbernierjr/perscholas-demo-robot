import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export { toast as fireToast } from "react-toastify";

export const Toast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover={false}
    />
  );
};
