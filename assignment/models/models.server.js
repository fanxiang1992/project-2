module.exports = function() {

    var connectionString = 'mongodb://localhost/fan-xiang-webdev';
    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    var mongoose = require('mongoose');
    mongoose.connect(connectionString);

    var userModel = require("./user/user.model.server.js")();
    var courseModel = require("./course/course.model.server.js")();
    var gradeModel = require("./grade/grade.model.server.js")(); 
    var postModel = require("./post/post.model.server.js")();

    var model = {
        userModel: userModel,
        courseModel: courseModel,
        gradeModel: gradeModel,
        postModel: postModel,
    };

    return model;
};