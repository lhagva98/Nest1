import * as React from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import Ink from "react-ink";

import Button from "../../../../components/Button";
import colors from "../../../../../styles/colors";
import { ReducerProps } from "../../../../../api/reducer";
import { MainReducerNS } from "../../../../../api/reducers/main";
import { MdList, MdAddCircle } from "react-icons/md";

require("./AdminSideMenu.less");

interface Props extends RouteComponentProps {
  user: MainReducerNS.user;
}

class AdmintSideMenu extends React.Component<Props, any> {
  logOut() {
    Cookies.remove("token");
    this.props.history.push("/");
    location.reload();
  }
  render() {
    const { user } = this.props;
    return (
      <div id="admin-side-menu" className="ui flex column flow-auto">
        <div className="info">
          <div className="admin">Test Maker WEB</div>
          <div className="email">{user.email}</div>
        </div>
        <div className="menu-cont">
          {/* <MenuButton
            name="Хэрэглэгчийн жагсаалт"
            href="/"
            icon={<MdMyLocation fill="#fff" />}
          /> */}
          <MenuButton name="Quiz List" href="/" icon={<MdList fill="#fff" />} />
          {/* <MenuButton
            name="Карт нэмэх"
            href="/create-card"
            icon={<MdAddCircle fill="#fff" />}
          /> */}
        </div>
        <div className="ui flex-full" />
        {/* <div className="menu-cont">
          <MenuButton
            name="Тохиргоо"
            href="/settings"
            icon={<MdSettings fill="#fff" />}
          />
        </div> */}
        <hr className="light" style={{ margin: 0 }} />
        <div style={{ margin: 10 }}>
          <Button backgroundColor={colors.red} onClick={this.logOut.bind(this)}>
            Гарах
          </Button>
        </div>
      </div>
    );
  }
}

export function MenuButton(props: any) {
  return (
    <NavLink className="menu-btn no-select" to={props.href} exact={true}>
      {props.icon}
      <div className="sub-cont">
        <span className="label">{props.name}</span>
      </div>
      <Ink />
    </NavLink>
  );
}

function mapStateToProps(state: ReducerProps): Props | any {
  return {
    user: state.main.user,
  };
}

export default withRouter(connect(mapStateToProps)(AdmintSideMenu));
