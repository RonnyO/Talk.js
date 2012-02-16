var DB = require('../include/mongoose');

var ObjectId = DB.Mongoose.Schema.ObjectId;

var Post = new DB.Schema({
  owner     : { type: ObjectId, ref: 'User' },
  title     : String,
  content   : { type: String, required: true },
  count     : Number,
  order     : String,
  created_at: { type: Date, 'default': Date.now },
  updated_at: { type: Date, 'default': Date.now }
});

module.exports = DB.Mongoose.model('Post', Post);