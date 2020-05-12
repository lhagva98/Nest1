import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar, Nav, NavDropdown, Image, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { showLogin, showRegister, logout } from "../../actions/authActions";
class NavBar extends Component {
  render() {
    const { isLogin, userData } = this.props;
    return (
      <>
        <Navbar bg="ligth" expand="sm">
          <Navbar.Brand href="/">
            <Image
              style={{ height: "60px" }}
              src={require("../../asset/images/banner.png")}
            />
            Quiz tester
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {isLogin ? (
                <>
                  <NavDropdown
                    title={userData.name}
                    id="nav-dropdown"
                    alignRight
                  >
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={this.props.logout}>
                      Гарах
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link
                    href=""
                    onClick={() => {
                      this.props.showLogin();
                    }}
                  >
                    Нэвтрэх
                  </Nav.Link>
                  <Nav.Link
                    href=""
                    onClick={() => {
                      this.props.showRegister();
                    }}
                  >
                    Бүртгүүлэх
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Row
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        ></Row>

        <Navbar
          style={{ justifyContent: "space-between" }}
          bg="dark"
          variant="dark"
          expand="sm"
        >
          <Nav className="mx-auto">
            <NavLink className="nav-link" to={"/"}>
              {"Тестийн жагсаалт"}
            </NavLink>
            {isLogin && (
              <NavLink className="nav-link" to={"/myHistory"}>
                {"Онооны самбар"}
              </NavLink>
            )}
          </Nav>
        </Navbar>
      </>
    );
  }
}

const mapStateToProps = ({ auth: { isLogin, userData } }) => ({
  isLogin,
  userData,
});
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    showLogin: () => dispatch(showLogin()),
    showRegister: () => dispatch(showRegister()),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
