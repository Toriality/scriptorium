import { ToastContainer as ReactToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastContainer = () => (
  <ReactToastContainer
    position="bottom-right"
    autoClose={3000}
    newestOnTop
    closeOnClick
    pauseOnFocusLoss
    pauseOnHover
    draggable
    theme="colored"
    transition={Flip}
  />
);
