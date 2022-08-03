import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { FaPlusSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/auth";
import { useUserForm } from "../utils/hooks";
import { LOGIN_USER, REGISTER_USER } from "../graphql/mutations";

const Login = () => {
  const context = useAuthContext();
  console.log("context", context);

  const [errors, setErrors] = useState<any>({});

  const navigate = useNavigate();

  const { onChange, onSubmit, values } = useUserForm(loginUserCb, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      console.log(result);
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
            Password:
            <input
              type="password"
              name="password"
              value={values.password}
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

export default Login;
