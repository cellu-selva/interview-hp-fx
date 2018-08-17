// External dependencies 
const express = require('express');
const app = express();
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

// Internal dependencies
const constant = require('./constant/constant');
const db = require('./connection/db');
const route = require('./route/index');

// Middleware accessing all the incoming request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Start server
app.listen(constant.applicationPort, () => {
  console.log("Server started at Port : ", constant.applicationPort)
});

//  Connection creation
db.createConnection(constant.dbUrl, constant.dbName, constant.dbPort)
  .then(connection => {
    // This code not needed bt just for acknowledging the database connectivity
    console.log("Connection established successfully ...");
  }, (err) => {
    console.log("Error connecting database ... ", err);
  });