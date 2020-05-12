import React from "react";
import Modal from "react-modal";
import Button from "../Button";
import colors from "../../../styles/colors";
import Input from "../Input";
import InputLabel from "../InputLabel";
interface Props {
  visible: boolean;
  back: () => void;
  title: string;
  loading: boolean;
  submit: (value: string) => void;
}
class CreateDialog extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      input: "",
    };
  }
  render() {
    const { visible, back, title, submit, loading } = this.props;
    return (
      <Modal isOpen={visible}>
        <InputLabel>{title}</InputLabel>
        <div className="ui flex flex-full column">
          <div className="card-title mb-20">
            <Input
              disabled={loading}
              value={this.state.input}
              onChange={(value) => {
                this.setState({
                  input: value,
                });
              }}
            />
          </div>
        </div>
        <div className="ui flex">
          <div className="ui flex flex-full ai-c" />
          <Button
            disabled={loading}
            backgroundColor={colors.orange}
            onClick={() => back()}
          >
            Буцах
          </Button>
          <div className="ui gap" />
          <Button
            disabled={loading}
            loading={loading}
            backgroundColor={colors.primary}
            onClick={() => submit(this.state.input)}
          >
            Бүртгэх
          </Button>
        </div>
      </Modal>
    );
  }
}

export default CreateDialog;
