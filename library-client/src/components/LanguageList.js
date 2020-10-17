import React, { Component } from "react";
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getLanguagesQuery = gql`
{
  allLanguages {
    name
    id
  }
}
`
const getAllTutorials = gql`
{
  allTutorials {
    name
    genre
    link
    whichlanguage {
      name
    }
    id
  }
}
`
class LanguageList extends Component {
  render() {
    return (
      <div>
        <ul id="language-list">
          <li>Languages</li>
        </ul>
      </div>
    );
  }
}

export default graphql(getLanguagesQuery)(LanguageList);
