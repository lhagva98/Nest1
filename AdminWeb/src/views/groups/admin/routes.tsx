import * as React from "react";
import {
  Route,
  Switch,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import { connect } from "react-redux";
// import SingleDriver from "./singles/SingleDriver";
import CreateDriver from "./pages/CreateCard";
import CategoryList from "./pages/CategoryList";

interface Props extends RouteComponentProps<any> {}

class AdminRoutes extends React.Component<Props, any> {
  render() {
    const { match } = this.props;
    console.log(match);
    return (
      <Switch>
        <Route
          exact={true}
          path={`${match.path}create-card/:id`}
          component={CreateDriver}
        />
        {/* <Route
          exact={true}
          path={`${match.path}editCategory/:id`}
          component={CreateDriver}
        /> */}
        <Route path={`${match.path}`} component={CategoryList} />
      </Switch>
    );
  }
}

export default withRouter(connect()(AdminRoutes));
