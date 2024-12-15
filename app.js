//import necessary modules
const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3001;

//body parser and json parser to communicate with front end
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// add also static files and directory publis

app.use(express.static(path.join(__dirname, "public")));

//register our routes here
const indexRouter = require("./routes/index");

app.use("/", indexRouter);

//listen port
app.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});

//export module
module.exports = app;
