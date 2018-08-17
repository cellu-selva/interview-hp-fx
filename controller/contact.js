const mongoose = require('mongoose');
Contact = mongoose.model('Contact');

module.exports = {
  getAllContact: function (req, res) {
    // will list the deleted contacts also i did it intentionally
    Contact.find({}).exec((err, results) => {
      if (err) {
        console.log('Error getting all contact ');
        return res.status(400).json({
          message: 'Error fetching all contact',
          err: err
        });
      }
      return res.status(200).json(results);
    });
  },
  getContactById: function(req, res) {
    // will list the deleted contacts also i did it intentionally
    Contact.findById({
      _id: req.params.id
    }).exec((err, results) => {
      if(err) {
        console.log('Error getting contact :: id :: ', req.params.id);
        return res.status(400).json({
          message: 'Error fetching contact :: id :: ' + req.params.id,
          err: err
        });
      }
      return res.status(200).json(results);
    });
  },
  updateContactById: function (req, res) {
    const reqBody = req.body;
    reqBody.modified_at = new Date();
    const contact = new Contact();
    contact.init(reqBody, {}, function (err) {
      contact.save((err, results) => {
        if (err) {
          console.log('Error saving contact');
          return res.status(400).json({
            message: 'Error saving contact ',
            err: err
          });
        }
        return res.status(200).json(results);
      })
    });
  },
  deleteContactById: function (req, res) {
    Contact.update({
      _id: req.params.id
    }, {
      is_deleted: true
    }, {
      multi: false
    }).exec((err, results) => {
      if (err) {
        console.log('Error deleting contact :: id :: ', req.body._id);
        return res.status(400).json({
          message: 'Error deleting contact :: id :: ' + req.body._id,
          err: err
        });
      }
      return res.status(200).json(results);
    });
  },
  createContact: function (req, res) {
    const contact = new Contact(req.body);
    contact.save((err, results) => {
      if(err) {
        console.log('Error creating contact');
        return res.status(400).json({
          message: 'Error creating contact ',
          err: err
        });
      }
      return res.status(200).json(results);
    });
  },
  search: function(req, res) {
    console.log(req.params.searchContent);
    const regexSearch = new RegExp(req.params.searchContent,"i");
    Contact.find({ $text: { $search: req.params.searchContent } })
      .exec(function (err, results) {
        if (err) {
          console.log('Error searching for :: content :: ', req.params.searchContent);
          return res.status(400).json({
            message: 'Error searching for :: content :: '+ req.params.searchContent,
            err: err
          });
        }
        return res.status(200).json(results);
      });
  }
}