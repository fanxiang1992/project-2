
module.exports = function () {
    var mongoose = require("mongoose");

    var CourseSchema = mongoose.Schema({
        _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        name: String,
        sectionNum: String,
        date: String,
        instructor: String,
        instructoremail: String,
        description: String        
    },
      {collection: "course"});
    return CourseSchema;
}
