import React from "react";
import { connect } from "react-redux";
import Alert from "react-s-alert";
import { withRouter, BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import chest from "../api/chest";

class RootView extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  componentDidMount(): void {
    chest.set({
      alert: Alert,
    });
  }
  render() {
    return (
      <div className="ui flex flex-full j-cr">
        <div className="root-container ui flex flex-full">
          <BrowserRouter>
            <div className="ui flex flex-full">
              <div className="ui flex flex-full column flow-auto main-container">
                <Routes />
              </div>
            </div>
          </BrowserRouter>
        </div>
        <div id="modal-container" />
        <Alert
          stack={{
            limit: 6,
          }}
          offset={30}
          effect="bouncyflip"
          timeout={10000}
        />
      </div>
    );
  }
}

export default withRouter(connect()(RootView));
