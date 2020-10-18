// Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const queries = require('./queries')

// Runs express and sets up static file server
// =============================================================
var app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

app.use(express.static(path.join(__dirname, 'public')));

// Set up the Express app to handle data parsing 
// =============================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Custom Routes
// ============================================================= 
app.get('/checkName/:name', queries.checkName);
app.post('/saveGame', queries.create);
app.get('/loadSaves', queries.get);
app.get('/loadSpecificGame/:name', queries.checkName);
app.get('/delete/:name', queries.destroy);


// Set the server to listen to specified port
// =============================================================
app.listen(3001, function () {
  console.log("Server listening on PORT 3001");
});