// External dependencies 
const express = require('express');
const app = express();
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

// Models 
require('./model/index');

// Internal dependencies
const constant = require('./constant/constant');
const db = require('./connection/db');
const route = require('./route/index');

// Middleware accessing all the incoming request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use('/contact', route.contact);
app.use('/contact-group', route.contactGroup);
// Start server
const server = app.listen(constant.applicationPort, () => {
  console.log("Server started at Port : ", constant.applicationPort)
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


//  Connection creation
db.createConnection(constant.dbUrl, constant.dbName, constant.dbPort)
  .then(connection => {
    // This code not needed bt just for acknowledging the database connectivity
    console.log("Connection established successfully ...");
  }, (err) => {
    console.log("Error connecting database ... ", err);
  });

module.exports = server
