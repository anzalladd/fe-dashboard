import React, { ReactElement, useState } from "react";
import Button from "../../components/atom/button";
import TextField from "../../components/atom/text-field";
import CommonService from "../../service/CommonService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { useNavigate } from "react-router";

const Login: React.FunctionComponent = (): ReactElement => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitForm = async () => {
    const payload = {
      email,
      password,
    };
    if (!password.length && !email.length) {
      toast("Email and password field required");
      return;
    }
    if (!password.length) {
      toast("Password field required");
      return;
    }
    if (!email.length) {
      toast("Email field required");
      return;
    }
    try {
      const response = await CommonService.login(payload);
      window.localStorage.setItem("token", response.data.data.token);
      navigate("/dashboard");
    } catch (e: any) {
      toast(e.response.data.message);
      return;
    }
  };

  return (
    <div className="login">
      <ToastContainer />
      <div className="login__form">
        <h1>Login Page</h1>
        <TextField
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button title="Login" onClick={onSubmitForm} />
      </div>
      <div className="login__image"></div>
    </div>
  );
};

export default Login;
