import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import "./App.css";

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
      <div>
        <h1>Hi gamers!</h1>
      </div>
    </ApolloProvider>
  );
}

export default App;
