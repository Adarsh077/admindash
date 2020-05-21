/* Clears the terminal */
process.stdout.write("\033c");

/* Loads the properties of .env file into process.env */
require("dotenv").config();

const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { PORT, DB_CONNECTION_STRING } = process.env;

mongoose
  .connect(DB_CONNECTION_STRING, {
    dbName: "admindash",
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((_) => console.log("Connection to MongoDB eshtablished!"))
  .catch((err) => console.log(err));

const app = require("express")();

app.use(cors());
app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", require("./routes"));

/* Errors */
app.use((err, req, res, next) => console.log(err) || res.send(err));

app.listen(PORT || 8000, (err) =>
  console.log(err ? err : `Server running on port ${PORT || 8000}...`)
);
