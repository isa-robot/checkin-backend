import app from "./app";
const listEndpoints = require('express-list-endpoints');

app.listen(process.env.PORT);

const endpointsList = (() => {
  let endpoints = listEndpoints(app);
  console.table(endpoints)
})()
