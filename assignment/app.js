

// create a node js module
module.exports = function (app) {
    var model = require("./models/models.server")();
    require("./services/user.service.server.js")(app, model);


};