require("dotenv").config();
const express = require("express");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./db");
const userRouter = require("./routes/user-router");
const rolRouter = require("./routes/rol-router");

const app = express();

const apiPort = process.env.PORT;
const route = process.env.URL_LOCAL;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors()
);
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/public", express.static(`${__dirname}/uploads`));

app.use("/api", rolRouter);
app.use("/api", userRouter);

// https
//   .createServer(
//     {
//       key: fs.readFileSync("muto_cert.key"),
//       cert: fs.readFileSync("muto_cert.crt"),
//     },
//     app
//   )
//   .listen(apiPort, function () {
//     console.log(`Server running: ${route}:${apiPort}`);
//   });
app.listen(apiPort, () => console.log(`Server running: ${route}:${apiPort}`))
