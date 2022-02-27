import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import {setContext} from "@apollo/client/link/context"
import ContextProvider from "./utils/ContextProvider";

import "./index.css";

const cache = new InMemoryCache();

const httpLink = new createHttpLink({
  uri: "http://localhost:4000",

})

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem("jwt-token-agenda") || ""
  return {
    headers : {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }
})

export const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
});



ReactDOM.render(
  <ApolloProvider client={client}>
    <ContextProvider>
      <App />
    </ContextProvider>
  </ApolloProvider>,

  document.getElementById("root")
);
