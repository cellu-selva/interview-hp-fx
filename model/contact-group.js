const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

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
ContactGroupSchema.plugin(idValidator);
ContactGroupSchema.index({ name: 1 }, { unique: true });
mongoose.model('ContactGroup', ContactGroupSchema);