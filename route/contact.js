'use strict';
const express = require('express');
const contactController = require('./../controller/contact');
module.exports = (function () {
  var router = express.Router();

  router.get('/:id', contactController.getContactById )
        .put('/:id', contactController.updateContactById)
        .delete('/:id', contactController.deleteContactById);

  router.post('/', contactController.createContact)
        .get('/', contactController.getAllContact);

  router.get('/search/:searchContent', contactController.search);
  return router;

})();