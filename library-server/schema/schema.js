const graphql = require("graphql");
const _ = require("lodash");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

// dummy data
let languageData = [
  { name: "Basics", genre: "classes", id: "1", languageID: "1" },
  { name: "Intermediate", genre: "front end", id: "2", languageID: "1" },
  { name: "Advanced", genre: "back end", id: "3", languageID: "2" },
  { name: "Beginner", genre: "classes", id: "4", languageID: "2" },
  { name: "Medium", genre: "front end", id: "5", languageID: "3" },
  { name: "Expert", genre: "back end", id: "6", languageID: "3" },
];
let languages = [
  { name: "Javascript", version: 121, id: "1" },
  { name: "C++", version: 13, id: "2" },
  { name: "React", version: 21, id: "3" },
];
const TrainingType = new GraphQLObjectType({
  name: "TrainingType",
  fields: () => ({
    // language types
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    whichlanguage: {
      type: LanguageType,
      resolve(parent, args) {
        return _.find(languages, { id: parent.languageID });
      },
    },
  }),
});
const LanguageType = new GraphQLObjectType({
  name: "LanguageType",
  fields: () => ({
    // language types
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    version: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // root query types
    languageTraining: {
      type: TrainingType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db
        return _.find(languageData, { id: args.id });
      },
    },
    whichLanguage: {
      type: LanguageType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(languages, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
