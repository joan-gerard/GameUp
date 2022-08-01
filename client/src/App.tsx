import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./context/auth";

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
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
