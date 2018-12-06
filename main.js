const express = require('express');
const app = express();
const fs = require('fs');
var cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json(), cors());

app.get('/listUsers', function(req, res){
	fs.readFile(__dirname + '/' + "users.json", function(err, data){
		console.log(data);
		console.log("api called");
		// res.header("Access-Control-Allow-Origin", "http://localhost:4200");
		// res.header("Access-Control-Allow-Headers",);
		res.writeHeader(200, {'Content-type':'application/json'});
		res.end(data);
	}); 
});

app.post('/addUser', function(req, res){
	fs.readFile(__dirname + '/' + "users.json", function(err, data){
		console.log(req.body);
		var users = JSON.parse(data);
		users.users.push(req.body);
		// res.end(JSON.stringify(users));
		fs.writeFile(__dirname + '/' + "users.json", JSON.stringify(users), function(err){
			if(err) {
				console.log(err.stack());
			}
			else{
				console.log("data added");
				res.end();
			}
		})
	})
});

app.post('/deleteUser', function(req, res){
	res.writeHeader(200, {'Content-type':'application/json'});
	// res.write(JSON.stringify({id:req.body.id}));
	// res.end();
		fs.readFile(__dirname + '/' + "users.json", function(err, data){
		var data = JSON.parse(data);
		// var j = parseInt(req.body.id);
		var index = data.users.findIndex(function(item, i){
  			return item.id === j;
		});
		// console.log(index);
		data.users.splice(index,1);

		fs.writeFile(__dirname + '/' + "users.json", JSON.stringify(data), function(err){
			if(err) {
				console.log(err.stack());
			}
			else{
				res.json({status:true, data:[], message:"deleted"});
				res.end();
			}
		});
});
});

app.put('/updateUser', function(req, res){
	fs.readFile(__dirname + '/' + "users.json", function(err, data){
		var data = JSON.parse(data);
		var uid = parseInt(req.query.id);

		var index = data.users.filter(function(item, i){
  			return item.id === uid;
		});

		var i = data.users.findIndex(function(item, i){
  			return item.id === uid;
		});		

		console.log(i);

		if(index.length === 0){
			res.writeHeader(404, {'Content-type':'text/html'});
			res.end("Please Provide Valid ID");
		}

		if(req.body.email) {
			data.users[i].email = req.body.email;
		}

		if(req.body.password) {
			data.users[i].password = req.body.password;
		}

		if(req.body.name)
		{
			data.users[i].name = req.body.name;	
		}

		if(req.body.city)
		{
			data.users[i].city = req.body.city;	
		}

		fs.writeFile(__dirname + '/' + "users.json", JSON.stringify(data), function(err){
			if(err) {
				console.log(err.stack());
			}
			else{
				console.log("record updated");
				res.end();
			}
		});

	 });
});	

const server = app.listen(8080, function(){
	console.log("Server running at 8080");
});