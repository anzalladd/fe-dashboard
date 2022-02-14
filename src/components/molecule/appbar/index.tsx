import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/user-context";
import './appbar.css'

const Sidebar: React.FunctionComponent = (): ReactElement => {
    const { state } = useUser();
    const navigate = useNavigate();
    const logout = () => {
        window.localStorage.removeItem("token")
        navigate('/')
    } 
    return (
        <div className="appbar">
            <div>
            <p>Welcome { state.user.username }</p>
            <b onClick={() => logout()}><p className="logout">LOGOUT</p></b>
            </div>
        </div>
    );
  };
  
  export default Sidebar;
