import React, { Component } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { closeAUTH, showLogin, register } from "../../actions/authActions";
import { connect } from "react-redux";
import chest from "../../api/chest";
class Register extends Component {
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
      var body = { ...this.state };
      console.log(body);
      register(body)
        .then((res) => {
          this.loginClick();
          chest.get("alert").success("Амжилттай бүртгэгдлээ");
        })
        .catch((err) => {
          chest.get("alert").error(err.message);
        });
    }
    event.preventDefault();
    event.stopPropagation();
  };

  loginClick = () => {
    this.props.closeHandle();
    this.props.showLogin();
  };

  render() {
    return (
      <Modal show={this.props.registerModal} onHide={this.props.closeHandle}>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Form.Row>
              <Form.Group as={Col} controlId="name">
                <Form.Label>Нэр</Form.Label>
                <Form.Control
                  required
                  type="username"
                  placeholder="Enter full name"
                  onChange={this.handleChange("name")}
                />
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="email">
              <Form.Label>Нэвтрэх нэр</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                onChange={this.handleChange("email")}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Нууц үг</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter Password"
                onChange={this.handleChange("password")}
              />
            </Form.Group>

            <Button variant="primary" type="submit" block>
              Бүртгүүлэх
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" block onClick={this.loginClick}>
              Нэвтрэх
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = ({ auth: { registerModal } }) => ({
  registerModal,
});
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    closeHandle: () => dispatch(closeAUTH()),
    showLogin: () => dispatch(showLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
