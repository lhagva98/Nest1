import * as React from "react";

require("./Spinner.less");

interface Props {
    color: string
}

const spinnerElement: any[] = [];

for (let i = 0; i < 12; i++){
    spinnerElement.push({});
}

export default class Spinner extends React.Component<Props,{}> {
    static defaultProps: Props = {
        color: "#fff"
    };
    render(){
        return (
            <div className="lds-css ng-scope">
                <div
                    className="lds-spinner"
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                >
                    {
                        spinnerElement.map((item,i) =>
                            <div
                                key={`spinner-div-${i}`}
                                style={{
                                    backgroundColor: this.props.color
                                }}
                            />
                        )
                    }
                </div>
            </div>
        )
    }
}