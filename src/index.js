import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const initialState = [
  [false, false, false, false, false, false],
  [false, false, true, false, false, false],
  [false, false, false, true, false, false],
  [false, true, true, true, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
];

ReactDOM.render(
  <React.StrictMode>
    <App initialState={initialState} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
