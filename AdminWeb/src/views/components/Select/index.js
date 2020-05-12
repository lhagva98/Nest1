import React from "react";
import classNames from "classnames";
import UnfoldMoreHorizontalIcon from "react-material-icon-svg/dist/UnfoldMoreHorizontalIcon";

require("./Select.less");

class Select extends React.Component {
    render(){
        const { disabled } = this.props;
        return (
            <div id="select">
                <select
                    { ...this.props }
                    className={
                        classNames(
                            this.props.className,{
                                disabled: disabled
                            }
                        )
                    }
                    onChange={(e) => {
                        this.props.onChange(e.target.value)
                    }}
                >
                    { this.props.children }
                </select>
                <div className="arrow">
                    <UnfoldMoreHorizontalIcon fill="#444"/>
                </div>
            </div>
        );
    }
}

Select.defaultProps = {
    className: ""
};

export default Select;