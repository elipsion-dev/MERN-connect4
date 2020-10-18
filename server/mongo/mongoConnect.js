const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/connect4',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);
mongoose.connection.once('open', function () {
  console.log('connection to connect4 database open on ' + mongoose.connection.port)
}).on('error', function (error) {
  console.log(error)
})
module.exports = {mongoose};
