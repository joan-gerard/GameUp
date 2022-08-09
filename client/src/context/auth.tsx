import React, { createContext, useContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

type JWT = {
  id: string
  exp: number;
  username: string,
  email: string
  // whatever else is in the JWT.
}

type UserState = {
  user: null | JWT;
};

type AuthContextType = UserState & {
  login: (userData: any) => void,
  logout: () => void,
  deleteUser: () => void,
}

const initialState: UserState = { user: null };

if (localStorage.getItem("jwtToken")) {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    const decodedToken = jwtDecode<JWT>(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("jwtToken");
    } else {
      initialState.user = decodedToken;
    }
  }
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: (userData: any) => {},
  logout: () => {},
  deleteUser: () => {},
});

function authReducer(state: any, action: any) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "DELETE_USER":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props: any) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData: any) {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "LOGOUT",
    });
  }
  function deleteUser() {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "DELETE_USER",
    });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout, deleteUser }}
      {...props}
    />
  );
}

const useAuthContext = () => useContext(AuthContext)

export { useAuthContext, AuthProvider };
