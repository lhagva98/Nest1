import React from "react";

require("./InputLabel.less");

export default class InputLabel extends React.Component {
    render(){
        return (
            <div className="input-label" {...this.props}>
                { this.props.children }
            </div>
        )
    }
}