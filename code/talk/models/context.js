var DB = require('../include/mongoose');

var ObjectId = DB.Mongoose.Schema.ObjectId;

var Context = new DB.Schema({
    kind        : String,
    users       : [{ type: ObjectId, ref: 'User' }]
});

module.exports = DB.Mongoose.model('Context', Context);