import React from "react";
import Ink from "react-ink";

require("./IconButton.less");

class IconButton extends React.Component {
    render(){
        return (
            <div { ...this.props } id="icon-button" onClick={() => this.props.onClick()}>
                <Ink/>
                { this.props.children }
            </div>
        )
    }
}

IconButton.defaultProps = {
    onClick: () => {}
};

export default IconButton;