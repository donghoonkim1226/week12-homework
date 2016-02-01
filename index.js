var mysql = require("mysql");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zoo_db'
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  };
});

var prompt = require("prompt");
prompt.start(); // not really sure what this does.
prompt.message = ""; // not really sure what this does.

var zoo = {
	welcome: function(){
		console.log("Welcome to the Zoo and Friends App~!");
	},
	menu: function(){
		console.log("Enter (A): ------> to Add a new animal to the Zoo!\n");
		console.log("Enter (U): ------> to Update info on an animal in the Zoo!\n");
		console.log("Enter (V): ------> to Visit the animals in the Zoo!\n");
		console.log("Enter (D): ------> to Adopt an animal from the Zoo!\n");
		console.log("Enter (Q): ------> to Quit and exit the Zoo!\n");
	},
	add: function(input_scope){
		var currentScope = input_scope;
		console.log("To add an animal to the zoo please fill out the following form for us!");
		prompt.get(["->", "name", "type", "age"], function(err, result){
			var query ="INSERT INTO animals (name, type, age) VALUES (?,?,?)";
			var formInfo = [result.name, result.type, result.age];
			connection.query(query, formInfo, function(err, results){
				if (err){
					throw err
				}
					console.log("Information has been added")
					currentScope.menu();
        	currentScope.promptUser();
			});
		});
	},



};


