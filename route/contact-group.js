'use strict';
const express = require('express');
const contactGroupController = require('./../controller/contact-group');
module.exports = (function () {
  var router = express.Router();

  router.get('/:id', contactGroupController.getContactGroupById)
    .put('/:id', contactGroupController.updateContactGroupById)
    .delete('/:id', contactGroupController.deleteContactGroupById);

  router.post('/', contactGroupController.createContactGroup)
    .get('/', contactGroupController.getAllContactGroup);

  return router;

})();