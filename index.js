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
			var animalInfo = [result.name, result.type, result.age];
			connection.query(query, animalInfo, function(err, results){
				if (err){
					throw err
				}
					console.log("Information has been added")
					currentScope.menu();
        	currentScope.promptUser();
			});
		});
	},
	visit: function(){
		console.log("Enter (I): ------> do you know the animal by it's id? We will visit that animal!\n");
		console.log("(N): ------> do you know the animal by it's name? We will visit that animal!\n");
		console.log("(A): ------> here's the count for all animals in all locations!\n");
		console.log("(C): ------> here's the count for all animals in this one city!\n");
		console.log("(O): ------> here's the count for all the animals in all locations by the type you specified!\n");
		console.log("Enter (Q): ------> Quits to the main menu!\n");
		currentScope.visit();
		currentScope.view(currentScope);
	},
	view: function(){
		var currentScope = input_scope;
		console.log("Please choose what you would like to visit");
		prompt.get(["visit"]function(err, result){
			if (result.visit === "Q"){
				currentScope.menu();
			} 
			else if (result.visit === "O"){
				currentScope.type(input_scope);
			}
			else if (result.type === "I"){
				currentScope.type(input_scope);
			}
			else if (result.animId === "N"){
				currentScope.name(input_scope);
			}
			else if (result.name === "A"){
				currentScope.all(input_scope);
			}
			else if (result.all === "C"){
				currentScope.care(input_scope);
			}
			else {
				console.log("Sorry didn't get that, come again?");
				currentScope.vist();
				currentScope.view(currentScope);
			}
		});
	},


};


