import React, { Suspense } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import chest from "../src/api/chest";
import { userInfo, setLoginData } from "./actions/authActions";
import { setHistoryData } from "./actions/quizActions";
import { withRouter, Route, Switch } from "react-router-dom";
import Categories from "./pages/categories";
import MyHistory from "./pages/history";
import NavBar from "./components/navBar";
import Login from "./components/LoginForm";
import Register from "./components/RegisterForm";
import Loader from "./components/Loader";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
chest.set({
  alert: toast,
});
class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    const prevToken = Cookies.get("token");
    if (typeof prevToken === "string") {
      chest.set(
        {
          token: prevToken,
        },
        () => {
          userInfo()
            .then((res) => {
              console.log(res);
              this.props.dispatch(setLoginData(res.payload.user));
              this.props.dispatch(setHistoryData(res.payload.history));
              setTimeout(() => {
                this.setState({
                  loading: false,
                });
              }, 200);
            })
            .catch((err) => {
              this.setState({
                loading: false,
              });
              Cookies.remove("token");
              chest.get("alert").error(err.message);
            });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }
  render() {
    return (
      <>
        {this.state.loading && <Loader />}
        <div className="main-container">
          <NavBar />
          <Suspense fallback={<div>Ачааллаж байна...</div>}>
            <Switch>
              <Route exact path="/" component={Categories} />
              <Route path="/myHistory" component={MyHistory} />
            </Switch>
          </Suspense>
        </div>
        <Login />
        <Register />
        <ToastContainer autoClose={3000} position="bottom-right" />
      </>
    );
  }
}
const mapStateToProps = ({ auth: { isLogin } }) => ({ isLogin });
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Root));
