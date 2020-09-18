const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
let languageData = [
  { name: "Javascript", genre: "web development", id: "1" },
  { name: "Python", genre: "front and backend", id: "2" },
  { name: "C", genre: "backend", id: "3" },
];

const LanguageType = new GraphQLObjectType({
  name: "Language",
  fields: () => ({
    // language types
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // root query types
    language: {
      type: LanguageType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db
        return _.find(languageData, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
// mongodb+srv://dmitriy:MongoTest1!@taskmaster.mamfs.mongodb.net/languagelibrary?retryWrites=true&w=majority
