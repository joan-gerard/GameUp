import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";

import { useAuthContext } from "../context/auth";
import { useUserForm } from "../utils/hooks";
import { LOGIN_USER } from "../graphql/mutations";
import "./styles/login.css";
import { toggleShowPassword } from "../utils/helpers";
import "../App.css";

const Login = () => {
  const context = useAuthContext();
  const [errors, setErrors] = useState<any>({});
  const [passwordIsShowing, setPasswordIsShowing] = useState<boolean>(false);
  const navigate = useNavigate();
  const passwordInputType = passwordIsShowing ? "text" : "password";

  const { onChange, onSubmit, values } = useUserForm(loginUserCb, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      context.login(result.data.login);
      navigate("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function loginUserCb() {
    loginUser();
  }

  const toggleShowPassword = () => {
    console.log('clicked')
    if (passwordIsShowing === true) {
      setPasswordIsShowing(false);
    } else {
      setPasswordIsShowing(true);
    }
  };

  console.log(passwordIsShowing)

  if (loading) return <p>Loading...</p>;

  // starts here
  return (
    <div className="login-page">
      <div className="login-form-container">
        {!loading && (
          <>
            <form className="login-form" onSubmit={onSubmit}>
              <h2 className="h2">Welcome back...</h2>
              <div className="login-form__inputs-wrapper">
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="username"
                    name="username"
                    className="input-field"
                    // value={values.username}
                    onChange={onChange}
                  />
                </div>
                <div className="input-wrapper">
                  <input
                    type={passwordInputType}
                    placeholder="password"
                    name="password"
                    className="input-field"
                    // value={values.password}
                    onChange={onChange}
                  />
                </div>

                <div className="show-password__toggle__wrapper">
                  <div onClick={toggleShowPassword}>
                    {passwordIsShowing ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>

                <button className="login-submit-btn" type="submit">
                  <span>Log In</span>
                  <FaSignInAlt />
                  {/* <ion-icon name="paper-plane" aria-hidden="true"></ion-icon> */}
                </button>
              </div>
            </form>
            {Object.keys(errors).length > 0 && (
              <div>
                {Object.values(errors).map((value: any, i) => (
                  <p key={i} className="error-msg">
                    * {value}
                  </p>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
