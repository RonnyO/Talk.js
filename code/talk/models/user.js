var DB = require('../include/mongoose');

var Email = DB.Mongoose.SchemaTypes.Email;

var User = new DB.Schema({
  first_name  : { type: String, required: true, index: { unique: true } },
  last_name   : { type: String, required: true, index: { unique: true } },
  email       : { type: Email, required: true, index: { unique: true } }
});

module.exports = DB.Mongoose.model('User', User);