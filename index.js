var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/game.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/game.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});