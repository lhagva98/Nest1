import * as React from "react";
import * as ReactDOM from "react-dom";
import Modal from "react-modal";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import EventEmitter from "events";
import unfetch from "unfetch";
import { IconContext } from "react-icons";
import RootView from "./views/index";
import configureStore from "./api/middleware";
import chest from "./api/chest";

require("react-s-alert/dist/s-alert-default.css");
require("react-s-alert/dist/s-alert-css-effects/bouncyflip.css");
require("./styles/styles.less");

const rootElement = document.getElementById("root");
const modalContainer: HTMLElement = document.getElementById("modal-container");
const history = require("history").createBrowserHistory();

chest.set({
  fetch: unfetch,
  // @ts-ignore
  emitter: new EventEmitter(),
});

ReactDOM.render(
  <Provider store={configureStore({})}>
    <Router history={history}>
      <IconContext.Provider value={{ size: "24px" }}>
        <RootView />
      </IconContext.Provider>
    </Router>
  </Provider>,
  rootElement
);

Modal.setAppElement(modalContainer);
