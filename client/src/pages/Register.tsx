import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/auth";
import { useUserForm } from "../utils/hooks";
import { REGISTER_USER } from "../graphql/mutations";
import { Button, TextField } from "@mui/material";

const Register = () => {
  const context = useAuthContext();
  console.log("context", context);

  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  const { onChange, onSubmit, values } = useUserForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
      context.login(result.data.register);

      navigate("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  // const handleSubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   registerUser();
  //   setValues({ username: "", email: "", password: "", confirmPassword: "" });
  // };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="background-img">
      {!loading && (
        <div className="login-form">
          <form onSubmit={onSubmit}>
            <h2>Sign up to...</h2>
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
                label="Email*"
                variant="outlined"
                size="small"
                type="text"
                name="email"
                value={values.email}
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

              <TextField
                sx={{
                  marginBottom: 2,
                }}
                id="outlined-basic"
                label="Confirm Password*"
                variant="outlined"
                size="small"
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={onChange}
              />

              <Button variant="contained" color="success" type="submit">
                Sign up
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

export default Register;
