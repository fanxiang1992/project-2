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
 


    var model = {
        userModel: userModel,

    };

    return model;
};