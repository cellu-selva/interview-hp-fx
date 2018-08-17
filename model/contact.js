const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const ContactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  emails: [ {
    emails: {
      type: String,
      required: true,
      match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email']
    },
    tag: {
      type: String,
      enum: ['office', 'work']
    }
  }],
  phone: [{
    phone_number: {
      type: String,
      required: true,
      match: [/^$|^\d{10}$/, 'Please enter a valid phone no']
    },
    tag: {
      type: String,
      enum: ['office', 'work']
    }
  }],
  created_at: {
    type: Date,
    default: new Date()
  },
  modified_at: {
    type: Date,
    default: new Date()
  },
  is_deleted: {
    type: Boolean,
    default: false
  }
});

ContactSchema.index({
  name: "text",
  emails: "text",
  phones: "text",  
});

mongoose.model('Contact', ContactSchema);
