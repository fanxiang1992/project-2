
module.exports = function () {
    var mongoose = require("mongoose");
    //var pageSchema =require("../page/page.schema.server.js")(mongoose);

    var CourseSchema = mongoose.Schema({
        _user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: String,
        description: String,
        //pages: [pageSchema],
    },
      {collection: "course"});
    return CourseSchema;
}
