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
        return Language.findById({ languageID: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // root query for all tutorials, vids, etc
    languageTraining: {
      type: TrainingType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db

        return Tutorial.findById(args.id);
      },
    },
    // query for languages
    whichLanguage: {
      type: LanguageType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Language.findById(parent.id);
      },
    },
    allTutorials: {
      type: new GraphQLList(TrainingType),
      resolve(parent, args) {
        return Tutorial.find({});
      },
    },
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
      args: { name: { type: GraphQLString } },
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
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        link: { type: GraphQLString },
        languageId: { type: GraphQLString },
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
