const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models');
db.sequelize.sync();

// simple route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the Task Tracker server application." });
});

require("./routes/task.routes")(app);

// Acquire & validate the port; if a port isn't set, use 3000
const validatePort = unvalidatedPort => {
  const validatedPort = parseInt(unvalidatedPort, 10);
  if (isNaN(validatedPort)) return validatedPort;
  if (validatedPort >= 0) return validatedPort;
  return false;
};
const validPort = validatePort(process.env.PORT || '3000');

// Listen for requests on the specified port
app.listen(validPort, () => console.log(`Listening on port ${validPort}...`));