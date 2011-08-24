var mongoose      = require("mongoose"),
    mongooseTypes = require("mongoose-types"),
    Schema        = mongoose.Schema,
    ObjectId      = Schema.ObjectId;

mongooseTypes.loadTypes(mongoose);

exports.Mongoose  = mongoose;
exports.Schema    = Schema;
exports.ObjectId  = ObjectId;
