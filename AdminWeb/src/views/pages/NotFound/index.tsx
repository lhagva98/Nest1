import React from "react";

class NotFound extends React.Component {
    componentDidMount(): void {

    }
    render(){
        return (
            <div className="ui flex j-cr ai-c">
                <div style={{ padding: "120px" }}>
                    <span style={{ fontSize: "128px", color: "#ccc" }}>
                        404
                    </span>
                </div>
            </div>
        )
    }
}

export default NotFound