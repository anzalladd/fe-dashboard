import React, { ReactElement } from "react";
import './input.css'

const TextField: React.FunctionComponent<JSX.IntrinsicElements["input"]> = (props): ReactElement => {
    return (
        <input {...props} className="input" />
    );
  };
  
  export default TextField;