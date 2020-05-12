import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import AdminRoutes from "./routes";
import AdminLogin from "./pages/AdminLogin";
import chest from "../../../api/chest";
import {
  setLoginData,
  getUserInfo,
  AdminLoginPayload,
} from "../../../api/actions/authActions";
import AdminSideMenu from "./components/AdminSideMenu";
import Spinner from "../../components/Spinner";
class AdminGroup extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: false,
      loading: false,
    };
  }
  componentDidMount(): void {
    const prevToken: string | undefined = Cookies.get("token");
    if (typeof prevToken === "string") {
      chest.set(
        {
          token: prevToken,
        },
        () => {
          this.setState({
            loading: true,
          });
          getUserInfo()
            .then((res) => {
              console.log(res);
              this.props.dispatch(setLoginData(res.payload));
              setTimeout(() => {
                this.setState({
                  loading: false,
                  user: true,
                });
              }, 200);
            })
            .catch((err) => {
              this.setState({
                loading: false,
              });
              chest.get("alert").error(err.message);
            });
        }
      );
    }
    chest.get("emitter").addListener("on-login", (res: AdminLoginPayload) => {
      this.props.dispatch(setLoginData(res.payload));
      chest.set({ token: res.payload.token });
      Cookies.set("token", res.payload.token, {
        expires: 30,
        sameSite: "strict",
      });
      this.setState({
        user: true,
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="ui flex flex-full j-cr ai-c">
          <Spinner color="#888" />
        </div>
      );
    }
    return this.state.user ? (
      <div className="ui flex flex-full flow-hide">
        {
          // @ts-ignore
          <AdminSideMenu />
        }
        <div id="main" className="ui flex flex-full column flow-auto">
          <AdminRoutes />
        </div>
      </div>
    ) : (
      <AdminLogin />
    );
  }
}

export default withRouter(connect()(AdminGroup));
