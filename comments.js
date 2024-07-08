// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');

// Set up server
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Read comments from file
var comments = [];
fs.readFile('comments.json', function(err, data) {
  if (err) {
    console.log(err);
  } else {
    comments = JSON.parse(data);
  }
});

// Post new comments
app.post('/comments', function(req, res) {
  comments.push(req.body);
  fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
    if (err) {
      console.log(err);
    } else {
      res.json(comments);
    }
  });
});

// Get comments
app.get('/comments', function(req, res) {
  res.json(comments);
});

// Start server
app.listen(3000, function() {
  console.log('Server started on http://localhost:3000');
});