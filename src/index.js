import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App, MarketingApp } from "./routes";
import { store } from "./reducers/store";
import { Provider } from "react-redux";
let parseData = window.location.host.split(".");

if (
  (parseData?.length === 3 && parseData[0] === "www") ||
  parseData?.length <= 2
) {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
} else {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <MarketingApp />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
