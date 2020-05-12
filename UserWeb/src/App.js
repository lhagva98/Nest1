import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import RootView from "./route";
import store from "./store";
import unfetch from "unfetch";
import chest from "../src/api/chest";
chest.set({
  fetch: unfetch,
});
const history = require("history").createBrowserHistory();
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <RootView />
        </Router>
      </Provider>
    );
  }
}

export default App;
