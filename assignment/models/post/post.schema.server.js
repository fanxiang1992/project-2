
module.exports = function () {
    var mongoose = require("mongoose");
    var PostSchema = mongoose.Schema({
        comment: String,
        userId: String,
        courseId: String
    },
      {collection: "post"});
    return PostSchema;
}
