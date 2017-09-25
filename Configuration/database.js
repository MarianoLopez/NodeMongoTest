var mongoose = require('mongoose');
var promise = mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/nodeTest', { useMongoClient: true, promiseLibrary: promise});
module.exports = mongoose;