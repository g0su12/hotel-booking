import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "antd/dist/antd.css";
import reportWebVitals from "./reportWebVitals";

import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

const store = createStore(rootReducer, composeWithDevTools());

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
console.log = console.warn = console.error = () => {};

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
