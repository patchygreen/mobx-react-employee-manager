import React from "react";
import { render } from "react-dom";
import App from './App';
import DevTools from "mobx-react-devtools";

import './index.css'

render(
  <div>
    <DevTools />
    <App />
  </div>,
  document.getElementById("root")
);


