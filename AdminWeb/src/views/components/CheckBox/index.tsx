import * as React from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import colors from "../../../styles/colors";

require("./CheckBox.less");

interface Props {
  disabled: boolean;
  active: boolean;
  onClick?: (value: boolean) => void;
}

class CheckBox extends React.Component<Props, any> {
  static defaultProps = {
    onClick: () => {},
    disabled: false,
  };
  render() {
    const { active, disabled } = this.props;
    return (
      <div
        id="check-box"
        onClick={disabled ? () => {} : () => this.props.onClick(!active)}
        style={{
          opacity: disabled ? 0.4 : 1,
        }}
      >
        {active ? (
          <MdCheckBox fill={colors.primary} />
        ) : (
          <MdCheckBoxOutlineBlank fill={colors.primary} />
        )}
      </div>
    );
  }
}

export default CheckBox;
