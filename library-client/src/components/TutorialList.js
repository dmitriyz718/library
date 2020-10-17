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
    id
  }
}
`
class TutorialList extends Component {
    displayTutorials() {
    let tutorials = this.props.data;
    if (tutorials.loading) {
      return (<div>Loading Tutorials</div>);
    } else {
      return tutorials.allTutorials.map(tutorial => {
        return (
          <a href={tutorial.link} target="_blank" rel="noopener noreferrer"><li key={tutorial.id}>{tutorial.name}</li></a>
        )
      })
    }
  }
  render() {
    return (
      <div>
        <h2>Tutorials</h2>
        <ul id="language-list">
          {this.displayTutorials()}
        </ul>
      </div>
    );
  }
}

export default graphql(getAllTutorials)(TutorialList);
