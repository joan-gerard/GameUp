import { useEffect } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import { AuthProvider, useAuthContext } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        //   clients: {
        //     merge(_existing, incoming) {
        //       return incoming;
        //     },
        //   },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache,
});


function App() {

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <div className="app-container">
          <AuthRoute />
        </div>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
