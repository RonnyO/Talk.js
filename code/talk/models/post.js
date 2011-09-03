var DB = require('../include/mongoose');

var Date = DB.Mongoose.SchemaTypes.Date;
var ObjectId = DB.Mongoose.Schema.ObjectId;

var Post = new DB.Schema({
  owner     : ObjectId,
  title     : String,
  content   : { type: String, required: true },
  created_at: { type: Date, 'default': Date.now },
  updated_at: { type: Date, 'default': Date.now }
});

module.exports = DB.Mongoose.model('Post', Post);