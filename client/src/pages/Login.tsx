import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useAuthContext } from "../context/auth";
import { useUserForm } from "../utils/hooks";
import { LOGIN_USER } from "../graphql/mutations";
import "./styles/login.css";
import { toggleShowPassword } from "../utils/helpers";

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

  // const toggleShowPassword = () => {
  //   if (passwordIsShowing === true) {
  //     setPasswordIsShowing(false);
  //   } else {
  //     setPasswordIsShowing(true);
  //   }
  // };

  if (loading) return <p>Loading...</p>;

  // starts here
  return (
    <div className="login-page">
      {!loading && (
        <div className="login-form">
          <form onSubmit={onSubmit}>
            <h2>Welcome back...</h2>
            <div className="login-form__input">
              {/* <TextField
                id="outlined-basic"
                label="Username*"
                variant="outlined"
                size="small"
                type="text"
                name="username"
                value={values.username}
                onChange={onChange}
              /> */}
              {/* <TextField
                id="outlined-basic"
                label="Password*"
                variant="outlined"
                size="small"
                type={passwordInputType}
                name="password"
                value={values.password}
                onChange={onChange}
              /> */}
              <input
                type="text"
                placeholder="username"
                name="username"
                // value={values.username}
                onChange={onChange}
              />
              <input
                type="password"
                placeholder="password"
                name="password"
                // value={values.password}
                onChange={onChange}
              />
              <div className="show-password__btn-div">
                <div
                  onClick={() =>
                    toggleShowPassword(passwordIsShowing, setPasswordIsShowing)
                  }
                >
                  {passwordIsShowing ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>

              <button type="submit">Log in</button>
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
        </div>
      )}
    </div>
  );
};

export default Login;
