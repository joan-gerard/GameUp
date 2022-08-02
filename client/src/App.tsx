import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import "./App.css";
import { AuthProvider } from "./context/auth";
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
