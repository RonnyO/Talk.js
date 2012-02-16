var DB = require('../include/mongoose');

var Date = DB.Mongoose.SchemaTypes.Date,
    ObjectId = DB.Mongoose.Schema.ObjectId,
    Post = require('./post');

var Thread = new DB.Schema({
    context     : ObjectId,
    posts       : [Post],
    created_at  : { type: Date, 'default': Date.now }
});

module.exports = DB.Mongoose.model('Thread', Thread);