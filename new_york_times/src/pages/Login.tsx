import React from "react";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
interface ILoginProps {
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleLogin: () => void;
  handleSignUp: () => void;
  hasAccount: boolean;
  sethasAccount: React.Dispatch<React.SetStateAction<boolean>>;
  emailError: string;
  passwordError: string;
  user: firebase.User | null;
}

function Login(props: ILoginProps) {
  return (
    <div className="container-login100">
      {props.user ? (
        <Redirect to="/" />
      ) : (
        <div className="wrap-login100">
          <span className="login100-form-title p-b-26">Welcome</span>

          <div
            className="wrap-input100 validate-input"
            data-validate="Valid email is: a@b.c"
          >
            <input
              className="input100"
              type="text"
              name="email"
              autoFocus
              required
              value={props.email}
              onChange={(e) => {
                props.setEmail(e.target.value);
              }}
            />
            <span className="focus-input100" data-placeholder="Email"></span>
          </div>
          <p className="errorMsg">{props.emailError}</p>

          <div
            className="wrap-input100 validate-input"
            data-validate="Enter password"
          >
            <input
              className="input100"
              type="password"
              name="pass"
              autoFocus
              required
              value={props.password}
              onChange={(e) => {
                props.setPassword(e.target.value);
              }}
            />
            <span className="focus-input100" data-placeholder="Password"></span>
          </div>
          <p className="errorMsg">{props.passwordError}</p>

          {props.hasAccount ? (
            <div>
              <button className="gradient-button" onClick={props.handleLogin}>
                Sign in
              </button>
              <div className="text-center p-t-115">
                <span className="txt1">Don’t have an account?</span>
                <span
                  className="txt2"
                  onClick={() => props.sethasAccount(!props.hasAccount)}
                >
                  Sign Up
                </span>
              </div>
            </div>
          ) : (
            <div>
              <button className="gradient-button" onClick={props.handleSignUp}>
                Sign up
              </button>
              <div className="text-center p-t-115">
                <span className="txt1">Have an account?</span>
                <span
                  className="txt2"
                  onClick={() => props.sethasAccount(!props.hasAccount)}
                >
                  Sign In
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Login;
