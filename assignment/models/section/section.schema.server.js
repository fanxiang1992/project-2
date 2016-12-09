
module.exports = function () {
    var mongoose = require("mongoose");
    var SectionSchema = mongoose.Schema({
      dateCreated: Date
    },
     {collection: "section"});
    return SectionSchema;
}