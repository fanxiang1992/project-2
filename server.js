var express = require('express');
var app = express();

// app.set('port', (process.env.PORT || 5000));

// app.use(express.static(__dirname + '/public'));

// // views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

// app.get('/', function(request, response) {
//   response.render('pages/index');
// });

// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });
// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set('port', (process.env.PORT || 3000));


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//require ("./test/app.js")(app);
require ("./assignment/app.js")(app);

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Node app is running on port', this.address().port);
});

//var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
//var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//app.listen(port, ipaddress);
