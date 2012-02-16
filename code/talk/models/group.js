var DB = require('../include/mongoose');

var ObjectId = DB.Mongoose.Schema.ObjectId;

var Group = new DB.Schema({
    title       : String,
    users       : [{ type: ObjectId, ref: 'User' }],
    created_at  : { type: Date, 'default': Date.now }
});

module.exports = DB.Mongoose.model('Group', Group);