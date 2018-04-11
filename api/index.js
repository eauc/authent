"use strict";

const express = require("express");
const app = express();

app.use(express.static("public"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const routes = require("./routes");
app.use("/api", routes);

const auth = require("./auth");
app.use(auth.init);

const {db} = require("./db");
db.sync().done(() => {
  console.log("DB initialized !");

  const port = Number(process.env.PORT || 3000);
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
