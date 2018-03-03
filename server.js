var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({
    extended: true
}));

// parse application/json 
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));
app.use(express.static(__dirname + '/app/public'));
app.use(express.static('app'));

require('./app/routing/htmlRoutes.js')(app);
require('./app/routing/apiRoutes.js')(app);

app.listen(PORT, function (req, res) {
    console.log('App listening on PORT: ' + PORT);
});