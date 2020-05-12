import * as React from "react";
import * as authActions from "../../../../../api/actions/authActions";
import chest from "../../../../../api/chest";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import InputLabel from "../../../../components/InputLabel";

interface AdminLoginState {
  email: string;
  password: string;
  loading: boolean;
}

class AdminLogin extends React.Component<any, AdminLoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
    };
  }
  submit() {
    if (this.state.email === "") {
      return chest.get("alert").warning("Та Имэйл хаягаа оруулна уу!");
    }
    if (this.state.password === "") {
      return chest.get("alert").warning("Та нууц үгээ оруулна уу!");
    }
    this.setState({
      loading: true,
    });
    authActions
      .AdminLogin({
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        chest.get("emitter").emit("on-login", res);
      })
      .catch((err) => {
        console.error(err);
        chest.get("alert").warning(err.message);
        this.setState({
          loading: false,
        });
      });
  }
  render() {
    const { email, password } = this.state;
    return (
      <div style={styles.container}>
        <div style={styles.subCont}>
          <InputLabel>Имэйл хаяг</InputLabel>
          <Input
            disabled={this.state.loading}
            type="text"
            value={email}
            onChange={(value) => {
              this.setState({
                email: value,
              });
            }}
          />
          <div className="ui gap-20" />
          <InputLabel>Нууц үг</InputLabel>
          <Input
            disabled={this.state.loading}
            type="password"
            value={password}
            onChange={(value: string) => {
              this.setState({
                password: value,
              });
            }}
          />
          <div className="ui gap-20" />
          <Button loading={this.state.loading} onClick={this.submit.bind(this)}>
            Нэвтрэх
          </Button>
        </div>
      </div>
    );
  }
}

const styles: React.CSSProperties | any = {
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subCont: {
    width: 360,
    borderRadius: 20,
    padding: 40,
    backgroundColor: "#fff",
  },
};

export default AdminLogin;
