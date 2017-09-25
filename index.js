var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());// to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies
app.set('json spaces', 4);
var User = require('./DAO/UserDAO');



app.get('/', function (req, res) {
 	User.find().populate('roles').exec(function(err,users){
 		(err) ?  res.json(err) : res.json(users);
 	});  
});

app.get('/:dni', function (req, res) {
 	User.findOne({'dni':req.params.dni}).populate('roles').exec(function(err,data){
 		(err) ?  res.status(500).json(err) : res.json(data);
 	});  
});

app.post('/',function(req,res){
	let newUser = new User(req.body);
	newUser.save(function(err,dbObj){
		(err) ? res.status(500).json(err): res.json(dbObj);
	})
});

app.put('/',function(req,res){
	let paramUser = new User(req.body);
	User.findOne({'dni':paramUser.dni}).populate('roles').exec(function(err,data){
 		if(!err){
 			data.nombre = paramUser.nombre || data.nombre;
 			data.roles = paramUser.roles || data.roles;
 			data.save(function(err,dbObj){
				(err) ? res.status(500).json(err): res.json(dbObj);
			})
 		}else{
 			res.json(err);
 		} 
 	});  
})

app.delete('/:id',function(req,res){
	User.findByIdAndRemove(req.params.id, function(err,data){
		(err) ? res.status(500).json(err): res.json({message:"eliminado",data:data});	
	});
});

var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log("App listening at http://%s:%s", host, port)
});