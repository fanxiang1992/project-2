
module.exports = function () {
    var mongoose = require("mongoose");
    var CourseSchema = require("../course/course.schema.server.js")(mongoose);
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        address: String,
        dob: Date,
        type: String,
        course: [CourseSchema], 
        dateCreated: Date
    },
     {collection: "user"});
    return UserSchema;
}