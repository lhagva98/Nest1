import React from "react";
import classNames from "classnames";
import Ink from "react-ink";
import colors from "../../../styles/colors";
import Spinner from "../Spinner";

require("./Button.less");

interface ButtonProps {
    className: string,
    parentClass: string,
    small: boolean,
    disabled: boolean,
    loading: boolean,
    icon: boolean,
    backgroundColor: string,
    textColor: string,
    onClick: () => void,
    badge: number
}

interface ButtonState {
    inHouseLoading: boolean
}

class Button extends React.Component<ButtonProps,ButtonState> {
    static defaultProps: ButtonProps = {
        className: "",
        parentClass: "",
        small: false,
        disabled: false,
        loading: false,
        icon: false,
        backgroundColor: colors.primary,
        textColor: "#fff",
        onClick: () => {},
        badge: 0
    };
    constructor(props: ButtonProps){
        super(props);
        this.state = {
            inHouseLoading: false
        }
    }
    toggleLoading(): void {
        this.setState({
            inHouseLoading: true
        })
    }
    render(){
        const { parentClass, small, className, disabled, loading, badge } = this.props;
        return (
            <div id="button" className={parentClass}>
                <div
                    className={
                        classNames(
                            "self no-select",
                            className,
                            {
                                "disabled": disabled,
                                "no-padding": loading || this.state.inHouseLoading,
                                "small": small,
                                "icon": this.props.icon
                            }
                        )
                    }
                    style={defaultStyles(this.props)}
                    onClick={ disabled ? () => {} : () => this.props.onClick() }
                >
                    {
                        loading || this.state.inHouseLoading ? (
                            <div>
                                <Spinner/>
                            </div>
                        ) : this.props.children
                    }
                    <Ink/>
                    {
                        badge > 0 ? (
                            <div style={badgeStyle(this.props)}>
                                { badge }
                            </div>
                        ) : null
                    }
                </div>
            </div>
        );
    }
}

const defaultStyles = (props: ButtonProps) : React.CSSProperties => {
    return {
        backgroundColor: props.backgroundColor,
        color: props.textColor,
        pointerEvents: props.disabled ? "none" : "auto"
    }
};

const badgeStyle = (props: ButtonProps) : React.CSSProperties => {
    return {
        position: "absolute",
        display: "flex",
        top: -5,
        right: -5,
        paddingTop: props.icon ? 1 : 2,
        backgroundColor: props.textColor,
        color: props.backgroundColor,
        minWidth: props.icon ? 19 : 23,
        height: props.icon ? 19 : 23,
        fontSize: props.icon ? 11 : 13,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        border: "2px solid" + (props.backgroundColor === "#fff" ? "transparent" : props.backgroundColor),
        transition: "0.2s all linear"
    }
};

export default Button;