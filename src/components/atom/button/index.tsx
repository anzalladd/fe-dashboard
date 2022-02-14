import React, { ReactElement } from "react";
import './button.css'

export type AnchorProps = JSX.IntrinsicElements["button"] & {
    readonly title?: string;
};

const Button: React.FunctionComponent<AnchorProps> = ({ title = 'Login', ...props }): ReactElement => {
    return (
        <button className="button" {...props}>{ title }</button>
    );
  };
  
  export default Button;