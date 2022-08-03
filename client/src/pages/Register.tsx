import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { FaPlusSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/auth";
import { useUserForm } from "../utils/hooks";
import { REGISTER_USER } from "../graphql/mutations";

const Register: React.FC<RegisterProps> = () => {
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
    <>
      {!loading && (
        <form onSubmit={onSubmit} className="column">
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={values.username}
              onChange={onChange}
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={values.email}
              onChange={onChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={onChange}
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={onChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      )}
      {Object.keys(errors).length > 0 && (
        <div>
          <ul>
            {Object.values(errors).map((value: any, i) => (
              <li key={i}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Register;
