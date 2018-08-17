const mongoose = require('mongoose');
ContactGroup = mongoose.model('ContactGroup');

module.exports = {
  getAllContactGroup: function (req, res, next) {
    ContactGroup.find({}).populate('contacts').exec((err, results) => {
      if (err) {
        console.log('Error getting all contactGroup ');
        return res.status(400).json({
          message: 'Error fetching all contactGroup',
          err: err
        });
      }
      return res.status(200).json(results);
    });
  },
  getContactGroupById: function (req, res, next) {
    ContactGroup.findById({
      _id: req.params.id
    }).exec((err, results) => {
      if (err) {
        console.log('Error getting contactGroup :: id :: ', req.params.id);
        return res.status(400).json({
          message: 'Error fetching contactGroup :: id :: ' + req.params.id,
          err: err
        });
      }
      return res.status(200).json(results);
    });
  },
  updateContactGroupById: function (req, res, next) {
    const reqBody = req.body;
    reqBody.modified_at = new Date();
    const contactGroup = new ContactGroup();
    contactGroup.init(reqBody, {}, function (err) {
      contactGroup.save((err, results) => {
        if (err) {
          console.log('Error saving contactGroup');
          return res.status(400).json({
            message: 'Error saving contactGroup ',
            err: err
          });
        }
        return res.status(200).json(results);
      })
    });
  },
  deleteContactGroupById: function (req, res, next) {
    ContactGroup.update({
      _id: req.params.id
    }, {
        is_deleted: true
      }, {
        multi: false
      }).exec((err, results) => {
        if (err) {
          console.log('Error deleting contactGroup :: id :: ', req.body._id);
          return res.status(400).json({
            message: 'Error deleting contactGroup :: id :: ' + req.body._id,
            err: err
          });
        }
        return res.status(200).json(results);
      });
  },
  createContactGroup: function (req, res, next) {
    const contactGroup = new ContactGroup(req.body);
    contactGroup.save((err, results) => {
      if (err) {
        console.log('Error creating contactGroup');
        return res.status(400).json({
          message: 'Error creating contactGroup ',
          err: err
        });
      }
      return res.status(200).json(results);
    });
  }
}