const graphql = require("graphql");
const Tutorial = require("../models/Tutorial");
const Language = require("../models/Language");
require("dotenv").config();
const _ = require("lodash");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const TrainingType = new GraphQLObjectType({
  name: "TrainingType",
  fields: () => ({
    /* we use functions to wrap this into so that it only executes when called on and we do not get errors when code reads top to bottom */
    // videos tutorials and training
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    link: { type: GraphQLString },
    languageId: { type: GraphQLString },
    whichLanguage: {
      type: LanguageType,
      resolve(parent, args) {
        return Language.findById(parent.languageId);
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
    tutorials: {
      type: new GraphQLList(TrainingType),
      resolve(parent, args) {
        return Tutorial.find({ languageId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // query for a single training
    languageTraining: {
      type: TrainingType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db

        return Tutorial.findById(args.id);
      },
    },
    // query for which language
    whichLanguage: {
      type: LanguageType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Language.findById(args.id);
      },
    },
    // all tutorials
    allTutorials: {
      type: new GraphQLList(TrainingType),
      resolve(parent, args) {
        return Tutorial.find({});
      },
    },
    // all languages
    allLanguages: {
      type: new GraphQLList(LanguageType),
      resolve(parent, args) {
        return Language.find({});
      },
    },
  },
});
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addLanguage: {
      type: LanguageType,
      args: { name: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parent, args) {
        const language = new Language({
          name: args.name,
        });
        return language.save();
      },
    },
    addTutorial: {
      type: TrainingType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLString },
        link: { type: new GraphQLNonNull(GraphQLString) },
        languageId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const tutorial = new Tutorial({
          name: args.name,
          genre: args.genre,
          link: args.link,
          languageId: args.languageId,
        });
        return tutorial.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
