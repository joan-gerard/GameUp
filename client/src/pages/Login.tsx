import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { FaPlusSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/auth";
import { useUserForm } from "../utils/hooks";
import { LOGIN_USER, REGISTER_USER } from "../graphql/mutations";
import "./styles/login.css";
import { Box, Button, FormControl, TextField } from "@mui/material";

const Login = () => {
  const context = useAuthContext();

  const [errors, setErrors] = useState<any>({});

  const navigate = useNavigate();

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
  if (loading) return <p>Loading...</p>;

  // starts here
  return (
    <div className="background-img">
      {!loading && (
        <div className="login-form">
          <form onSubmit={onSubmit}>
            <h2>Welcome back...</h2>
            <div className="login-form__input">
              <TextField
                sx={{
                  marginBottom: 2,
                }}
                id="outlined-basic"
                label="Username*"
                variant="outlined"
                size="small"
                type="text"
                name="username"
                value={values.username}
                onChange={onChange}
              />
              <TextField
                sx={{
                  marginBottom: 2,
                }}
                id="outlined-basic"
                label="Password*"
                variant="outlined"
                size="small"
                type="password"
                name="password"
                value={values.password}
                onChange={onChange}
              />

              <Button variant="contained" color="success" type="submit">
                Log in
              </Button>
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
