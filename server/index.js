const express = require("express");
require("colors");
require("dotenv").config();
const cors = require("cors");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const port = process.env.PORT || 8000;

const { graphqlHTTP } = require("express-graphql");

const app = express();

// Connect to database
connectDB();

app.use(cors());

app.use("/health", (req, res) => res.json({ status: "up" }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, console.log(`Server running on port ${port}`));
