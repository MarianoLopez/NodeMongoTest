var mongoose = require("../Configuration/database");
var userSchema = mongoose.Schema({
	dni:{type:Number, required: true, unique: true},
	nombre:{type:String, required:true},
 	roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'roles' }]
});
var userDAO = mongoose.model('users',userSchema);

var rolSchema = mongoose.Schema({descripcion:String});
var rolDAO = mongoose.model('roles',rolSchema);
module.exports = userDAO;