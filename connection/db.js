
const mongoose = require('mongoose');
const database = {
  'createConnection': function(dbUrl, dbName, dbPort) {
    return mongoose.connect(`${dbUrl}:${dbPort}/${dbName}`, { useNewUrlParser: true });
  }
}
module.exports = database;