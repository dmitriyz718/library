import React, { Component } from "react";
import LanguageList from "./components/LanguageList";
class App extends Component {
  render() {
    return (
      <div id="main">
        <h1>Dev Library</h1>
        <LanguageList />
      </div>
    );
  }
}

export default App;
