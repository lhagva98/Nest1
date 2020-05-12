import React from "react";
import classNames from "classnames";
import Ink from "react-ink";

require("./SegmentedTab.less");

export default class SegmentedTab extends React.Component {
    static defaultProps = {
        onTabChange: () => {}
    };
    render(){
        const { tabs, value } = this.props;
        return (
            <div id="segmented-tab">
                <div className="s-tab-cont">
                    {
                        tabs.map((map,i) =>
                            <div
                                className={
                                    classNames(
                                        "s-tab-item",{
                                            active: value === i
                                        }
                                    )
                                }
                                key={"segmented-tab-" + map.id}
                                onClick={() => {
                                    this.props.onTabChange(i)
                                }}
                            >
                                { map.name }
                                <Ink/>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}