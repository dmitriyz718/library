const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const app = express();
const PORT = 4000 || process.env.PORT;
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
