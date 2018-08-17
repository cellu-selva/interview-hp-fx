const mongoose = require('mongoose');
Contact = mongoose.model('Contact');

module.exports = {
  getAllContact: function (req, res, next) {
    Contact.find({}).exec((err, response) => {
      if (err) {
        console.log('Error getting all contact ');
        return res.status(400).json({
          message: 'Error fetching all contact',
          err: err
        });
      }
      return res.status(200).json(response);
    });
  },
  getContactById: function(req, res, next) {
    Contact.findById({
      _id: req.params.id
    }).exec((err, response) => {
      if(err) {
        console.log('Error getting contact :: id :: ', req.params.id);
        return res.status(400).json({
          message: 'Error fetching contact :: id :: ' + req.params.id,
          err: err
        });
      }
      return res.status(200).json(response);
    });
  },
  updateContactById: function (req, res, next) {
    const reqBody = req.body;
    reqBody.modified_at = new Date();
    const contact = new Contact();
    contact.init(reqBody, {}, function (err) {
      contact.save((err, response) => {
        if (err) {
          console.log('Error saving contact');
          return res.status(400).json({
            message: 'Error saving contact ',
            err: err
          });
        }
        return res.status(200).json(response);
      })
    });
  },
  deleteContactById: function (req, res, next) {
    Contact.update({
      _id: req.params.id
    }, {
      is_deleted: true
    }, {
      multi: false
    }).exec((err, response) => {
      if (err) {
        console.log('Error deleting contact :: id :: ', req.body._id);
        return res.status(400).json({
          message: 'Error deleting contact :: id :: ' + req.body._id,
          err: err
        });
      }
      return res.status(200).json(response);
    });
  },
  createContact: function (req, res, next) {
    const contact = new Contact(req.body);
    contact.save((err, response) => {
      if(err) {
        console.log('Error creating contact');
        return res.status(400).json({
          message: 'Error creating contact ',
          err: err
        });
      }
      return res.status(200).json(response);
    });
  }
}