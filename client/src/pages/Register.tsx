import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/auth";
import { useUserForm } from "../utils/hooks";
import { REGISTER_USER } from "../graphql/mutations";
import { Button, TextField } from "@mui/material";
import { FaEye, FaEyeSlash, FaWpforms } from "react-icons/fa";

const Register = () => {
  const context = useAuthContext();

  const [errors, setErrors] = useState<any>({});
  const [passwordIsShowing, setPasswordIsShowing] = useState<boolean>(false);

  const navigate = useNavigate();
  const passwordInputType = passwordIsShowing ? "text" : "password";

  const { onChange, onSubmit, values } = useUserForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
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

  const toggleShowPassword = () => {
    console.log("clicked");
    if (passwordIsShowing === true) {
      setPasswordIsShowing(false);
    } else {
      setPasswordIsShowing(true);
    }
  };

  // const handleSubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   registerUser();
  //   setValues({ username: "", email: "", password: "", confirmPassword: "" });
  // };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="register-page">
      <div className="register-form-container">
        {!loading && (
          <>
            <form className="register-form" onSubmit={onSubmit}>
              <h2 className="h2">Sign up to...</h2>
              <div className="register-form__inputs-wrapper">
                <input
                  placeholder="Username*"
                  type="text"
                  name="username"
                  className="input-field"
                  value={values.username}
                  onChange={onChange}
                />

                <input
                  placeholder="Email*"
                  type="text"
                  name="email"
                  className="input-field"
                  value={values.email}
                  onChange={onChange}
                />

                <input
                  placeholder="Password*"
                  type={passwordInputType}
                  name="password"
                  className="input-field"
                  value={values.password}
                  onChange={onChange}
                />

                <input
                  placeholder="Confirm Password*"
                  type={passwordInputType}
                  name="confirmPassword"
                  className="input-field"
                  value={values.confirmPassword}
                  onChange={onChange}
                />
                <div className="show-password__toggle__wrapper">
                  <div onClick={toggleShowPassword}>
                    {passwordIsShowing ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>

                <button className="register-submit-btn" type="submit">
                  <span>Sign up</span>
                  <FaWpforms />
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

export default Register;
