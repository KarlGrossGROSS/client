import React, {useState} from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import {useNavigate} from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = (props) => {
  return (
    <div className="login field">
      <label className="login label">{props.label}</label>
      <input
        className="login input"
        placeholder="enter here.."
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

const Login = () => {

  const navigate = useNavigate();
  const [username, getUsername] = useState<string>(null);
  const [password, getPassword] = useState<string>(null);
  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({ username, password });
      const response = await api.post("/login", requestBody);
      console.log(response.data.token, response.data.userid)
      // Throw an error if the user hasn't signed up
      // Get the returned user and update a new object.
      const user = new User(response.data);
      // Store the token into the local storage.
      localStorage.setItem("token", user.token);


      // Login successfully worked --> navigate to the route /game in the GameRouter
      navigate("/game");
    } catch (error) {
      alert(
        `Something went wrong during the login stage: \n${handleError(error)}`
      );
    }
  };
  const gotoregistration = () => {
    navigate("/registration")
  };

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
          <FormField
            label="Username"
            value={username}
            onChange={(un: string) => getUsername(un)}
          />
          <FormField
            label="Password"
            value={password}
            onChange={(pw: string) => getPassword(pw)}
          />
          <div className="login button-container">
            <Button
              disabled={!username || !password}
              width="50%"
              onClick={() => doLogin()}
            >
              Sign in
            </Button>
            <Button onClick={() => gotoregistration()} >
                Sign up
            </Button>

          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default Login;
