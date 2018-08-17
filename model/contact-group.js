const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const ContactGroupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  contacts: [{
    type: Schema.ObjectId,
    ref: 'Contact'
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
mongoose.model('ContactGroup', ContactGroupSchema);