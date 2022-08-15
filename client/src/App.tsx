import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";

import "./App.css";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";

// const cache = new InMemoryCache({
//   typePolicies: {
//     Query: {
//       fields: {
//           clients: {
//             merge(_existing, incoming) {
//               return incoming;
//             },
//           },
//       },
//     },
//   },
// });
const httpLink = createHttpLink({
  uri: "http://localhost:5000",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("jwtToken");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // @ts-ignore
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
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

// test
