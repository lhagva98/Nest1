import React from "react";
import { BarLoader } from "react-spinners";
import colors from "../../../styles/colors";

class Loader extends React.Component {
    static defaultProps = {
        padding: 40
    };
    render(){
        return (
            <div className="ui flex j-cr ai-c">
                <div style={{ padding: this.props.padding }}>
                    <BarLoader
                        color={colors.primary}
                    />
                </div>
            </div>
        )
    }
}

export default Loader;