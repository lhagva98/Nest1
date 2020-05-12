import React from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import AdminGroup from "./groups/admin";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={AdminGroup} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

// @ts-ignore
export default withRouter(Routes);
