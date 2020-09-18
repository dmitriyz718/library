const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const LanguageType = new GraphQLObjectType({
  name: "Language",
  field: () => ({
    // language types
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  field: {
    // root query types
    language: {
      type: LanguageType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        // code to get data from db
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
