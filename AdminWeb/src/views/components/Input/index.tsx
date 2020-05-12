import React from "react";
import classNames from "classnames";

require("./Input.less");

interface InputProps {
    type?: string,
    min?: number,
    max?: number,
    value?: string | any,
    placeholder?: string,
    className?: string,
    onChange?: (value: any) => void,
    multiLine?: boolean,
    disabled?: boolean,
}

interface InputState {

}

class Input extends React.Component<InputProps,InputState> {
    input: any;
    static defaultProps: InputProps = {
        className: "",
        onChange: () => {},
        multiLine: false,
        disabled: false,
    };
    select(){
        this.input.select();
    }
    render(){
        const { multiLine, ...rest } = this.props;
        const { disabled } = rest;
        return (
            multiLine ? (
                <textarea
                    { ...rest }
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
                />
            ) : (
                <input
                    ref={(ref) => this.input = ref}
                    { ...this.props }
                    className={
                        `${this.props.className} ${ disabled ? "disabled" : "" }`
                    }
                    onChange={(e) => {
                        this.props.onChange(e.target.value)
                    }}
                />
            )
        );
    }
}

export default Input;