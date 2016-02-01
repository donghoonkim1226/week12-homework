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
		prompt.get(["name", "type", "age"], function(err, result){
			var query ="INSERT INTO animals (name, type, age) VALUES (?,?,?)";
			var userInput = [result.name, result.type, result.age];
			connection.query(query, animalInfo, function(err, result){
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
	type: function(input_scope){
		var = currentScope = input_scope;
		console.log("Enter animal type to find out how many animals we have of those type");
		prompt.get(["animal_type"], function(err, result){
			var query = "SELECT COUNT (type) FROM animals WHERE type = ?";
			var userInput = result.animal_type;
			currentScope.menu();
			currentScope.promptUser();
		});
	},
	care: function(input_scope){
		var currentScope = input_scope;
		console.log("Enter city name NY/SF");
		prompt.get(["city_name"], function(err, result){
			var query = "SELECT * FROM caretakers WHERE city = ?";
			var userInput = result.city_name;
			currentScope.vist();
			currentScope.view(currentScope);
		});
	},
	animId: function(input_scope){
		var currentScope = input_scope;
		console.log("Enter ID of the animal you want to visit");
		prompt.get(["animal_id"], function(err, result){
			var query = "SELECT * FROM animals WHERE id = ?";
			var userInput = result.animal_id;
			currentScope.visit();
			currentScope.view(currentScope);
		});
	},
	name: function(input_scope){
		var currentScope = input_scope;
		console.log("Enter the name of the animal you want to visit");
		prompt.get(["animal_name"], function(err, result){
			var query = "SELECT * FROM animals WHERE name = ?";
			var userInput = result.animal_name;
			currentScope.visit();
			currentScope.view(currentScope);
		});
	},	
	all: function(input_scope){
		var = currentScope = input_scope;
		console.log("Enter all to see how many animals we have");
		prompt.get(["animal_all"], function(err, result){
			var query = "SELECT COUNT (id) FROM animals WHERE id";
			var userInput = result.animal_all;
			currentScope.menu();
			currentScope.promptUser();
		});	
	},
	update: function(input_scope){
		var currentScope = input_scope;
		prompt.get(["id", "new", "new_age", "new_type", "new_caretaker_id"]function(err, result){
			var query = "UPDATE animals SET id = ?, new = ?, new_age = ?, new_type = ?, new_caretaker_id = ? WHERE id = ?";
			var userInput = [result.id, result.new, result.new_age, result.new_type, result.new_caretaker_id];
			currentScope.menu();
			currentScope.promptUser();
		});
	},
	adopt: function(){
		var currentScope = input_scope;
		prompt.get(["animal_id"], function(err, result){
			var query = "DELETE FROM animals WHERE id = ?";
			var userInput = result.animal_id;
			currentScope.visit();
			currentScope.view(currentScope);
		});
	},
	promptUser: function(){
		var self = this;
		prompt.get(["input"], function(err, result){
			if (result.input === "Q"){
				self.exit();
			}
			else if (result.input === "A"){
				self.add(self);
			}
			else if (result.input === "V"){
				self.visit();
			}
			else if (result.input === "D"){
				self.adopt(self);
			}
			else {
				console.log("Sorry didn't get that, come again?");
			}
		});
	},
	exit: function(){
		console.log("Thank you for visiting us, good bye~!");
		process.exit();
	},
	open: function(){
		this.welcome();
		this.menu();
		this.promptUser();
	}
};

zoo.open();
