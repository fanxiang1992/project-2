
module.exports = function () {
    var mongoose = require("mongoose");
    // var CourseSchema = require("../course/course.schema.server.js")(mongoose);
    // var UserSchema = require("../user/user.schema.server.js")(mongoose);
    var GradeSchema = mongoose.Schema({
        letterGrade: String,
        userId: String,
        courseId: String
    },
      {collection: "grade"});
    return GradeSchema;
}
