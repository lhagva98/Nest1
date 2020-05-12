import React, { Component } from "react";
import { Modal, Button, Form, Image, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import {
  closeAUTH,
  showRegister,
  login,
  setLoginData,
  loginGuest,
} from "../../actions/authActions";
import { setHistoryData } from "../../actions/quizActions";
import chest from "../../api/chest";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (type) => (event) => {
    let value = event;
    if (event.target) {
      value = event.target.value;
    }
    this.setState({ [type]: value });
  };

  handleSubmit = (event) => {
    this.setState({ modalShowErr: false });
    const form = event.currentTarget;

    if (form.checkValidity() === true) {
      login({
        email: this.state.username,
        password: this.state.password,
      })
        .then((res) => {
          this.props.closeHandle();
          this.props.dispatch(setLoginData(res.payload.user));
          this.props.dispatch(setHistoryData(res.payload.history));
          chest.get("alert").success("Амжилттай нэвтэрлээ");
          chest.set({ token: res.payload.token });
          Cookies.set("token", res.payload.token, {
            expires: 30,
            sameSite: "strict",
          });
        })
        .catch((err) => {
          chest.get("alert").error(err.message);
        });
    }
    event.preventDefault();
    event.stopPropagation();
  };

  joinClick = () => {
    this.props.showRegister();
  };

  render() {
    const { loginModal } = this.props;
    return (
      <Modal show={loginModal} onHide={() => this.props.closeHandle()}>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Row style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                src={require("../../asset/images/login.jpg")}
                width="30%"
              />
            </Row>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Нэвтрэх нэр</Form.Label>
              <Form.Control
                required
                type="username"
                placeholder="Enter email"
                onChange={this.handleChange("username")}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Нууц үг</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter Password"
                onChange={this.handleChange("password")}
              />
            </Form.Group>
            {this.state.modalShowErr && (
              <p style={{ color: "red" }}>{this.state.modalErrMsg}</p>
            )}
            <Button variant="primary" type="submit" block>
              Нэвтрэх
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <a
              onClick={() => this.props.loginGuest()}
              href="#"
              style={{
                textAlign: "center",
                width: "100%",
              }}
            >
              Зочин эрхээр нэвтрэх
            </a>
            <Button variant="light" block onClick={this.joinClick}>
              Бүртгүүлэх
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = ({ auth: { loginModal } }) => ({
  loginModal,
});
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    closeHandle: () => dispatch(closeAUTH()),
    showRegister: () => dispatch(showRegister()),
    loginGuest: () => dispatch(loginGuest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
