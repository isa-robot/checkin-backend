import app from "./app";
const listEndpoints = require('express-list-endpoints');

app.listen(process.env.PORT);

import getMailerConfig from "@nodemailer/services/getMailerConfig";

const endpointsList = (() => {
  let endpoints = listEndpoints(app);
  console.table(endpoints)
})()
