var DB = require('../include/mongoose');

var Email = DB.Mongoose.SchemaTypes.Email;

var User = new DB.Schema({
  first_name  : { type: String, required: true, index: { unique: false } },
  last_name   : { type: String, required: true, index: { unique: false } },
  email       : { type: Email, required: true, index: { unique: false } }
});

module.exports = DB.Mongoose.model('User', User);