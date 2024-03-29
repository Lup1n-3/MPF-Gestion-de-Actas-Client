import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import "aos/dist/aos.css";
import AOS from "aos";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Flip } from "react-toastify";
import { Provider } from "react-redux";
import { Store } from "./redux/store";

AOS.init();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
      <Tooltip id="my-tooltip" delayShow={500} place="top" className="!z-50 !bg-principal" />
      <ToastContainer
        position="bottom-left"
        autoClose={1750}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
        limit={4}
      />
    </Provider>
  </React.StrictMode>
);
