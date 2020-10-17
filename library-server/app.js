const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const app = express();
const cors = require(`cors`);
require("dotenv").config();
const PORT = 4000 || process.env.PORT;

// cors
app.use(cors());

// db connection
const connectionString = process.env.MONGODB_URI;
const configOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose
  .connect(connectionString, configOptions)
  .then(() => console.log("MongoDB successfully connected..."))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));
app.use(
  "/graphql",
  graphqlHTTP({
    // gql configs
    schema,
    graphiql: true,
  })
);
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
