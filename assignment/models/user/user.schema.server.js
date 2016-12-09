
module.exports = function () {
    var mongoose = require("mongoose");
    var SectionSchema = require("../section/section.schema.server.js")(mongoose);
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        address: String,
        dob: Date,
        type: String,
        sections: [SectionSchema], 
        dateCreated: Date
    },
     {collection: "user"});
    return UserSchema;
}