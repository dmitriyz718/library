import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import LanguageList from "./components/LanguageList";

// apollo set up
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Dev Library</h1>
          <LanguageList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
