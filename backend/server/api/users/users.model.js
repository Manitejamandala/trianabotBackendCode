var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String,
  status: {
    type: String,
    default: 'Active'
  },
  createdDate: Date
})

module.exports = mongoose.model('User', UserSchema);
