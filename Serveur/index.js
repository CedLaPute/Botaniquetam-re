const express = require('express');
const app = express();

class Pillar {
	constructor(id, name, coordinateX, coordinateY) {
		this.id = id;
		this.name = name;
		this.coordinateX = coordinateX;
		this.coordinateY = coordinateY;
	}
}

class Plant {
	constructor(id, name, pillarId, coordinateX, coordinateY) {
		this.id = id;
		this.name = name;
		this.pillarId = pillarId;
		this.coordinateX = coordinateX;
		this.coordinateY = coordinateY;
	}
}

var pillar0 = new Pillar(0, "pillar0", 100, 100);
var pillar1 = new Pillar(1, "pillar1", 200, 200);

var pillars = new Array();
pillars.push(pillar0);
pillars.push(pillar1);

var plant0 = new Plant(0, "plant1", 0, 150, 150);
var plant1 = new Plant(1, "plant2", 1, 250, 250);
var plant2 = new Plant(2, "plant3", 1, 260, 250);

var plants = new Array();
plants.push(plant0);
plants.push(plant1);
plants.push(plant2);

app.get('/', function(req, res) {
	res.send("Hello World!");
});

app.post('/', function(req, res) {
	res.send("Hello POST Request");
});

app.get('/pillar', function(req, res) {
	var response = JSON.stringify(pillars);
	
	res.send(response);
});

app.get('/pillar/:id', function(req, res, next) {
	var id = parseInt(req.params.id);
	var x = 0;
	
	for (var i = 0; i < pillars.length; i++) {
		if (pillars[i].id == id) {
			var response = JSON.stringify(pillars[i]);
			
			res.send(response);
			
			x = 1;
		}
	}
	
	if (x == 0) {
		return next("Error on route /pillar/:id : Specified pillar does not exist : id is not referenced");
	}
});

app.get('/pillar/:id/plant', function(req, res, next) {
	var id = parseInt(req.params.id);
	var x = 0;
	
	for (var i = 0; i < pillars.length; i++) {
		if (pillars[i].id == id) {
			x = 1;
		}
	}
	
	if (x == 0) {
		return next("Error on route /pillar/:id/plant : Specified pillar does not exist : id is not referenced");
	}
	
	var PPlants = new Array();
	
	for (var i = 0; i < plants.length; i++) {
		if (plants[i].pillarId == id) {
			PPlants.push(plants[i]);
		}
	}
	
	var response = JSON.stringify(PPlants);
	
	res.send(response);	
});

app.get('/pillar/:id/coordinates', function(req, res, next) {
	var id = parseInt(req.params.id);
	var x = 0;
	
	for (var i = 0; i < pillars.length; i++) {
		if (pillars[i].id == id) {
			var coordinates = new Array();
			
			coordinates.push(pillars[i].coordinateX);
			coordinates.push(pillars[i].coordinateY);
			
			var response = JSON.stringify(coordinates);
			
			res.send(response);
			
			x = 1;
		}
	}
	
	if (x == 0) {
		return next("Error on route /pillar/:id/coordinates : Specified pillar does not exist : id is not referenced");
	}
});

app.put('/pillar/:name&:X&:Y', function(req, res) {
	var newId = 0;
	
	for (var i = 0; i < pillars.length; i++) {
		if (pillars[i].id > newId) {
			newId = pillars[i].id;
		}
	}
	newId++;
	
	var newPillar = new Pillar(newId, req.params.name, parseInt(req.params.X), parseInt(req.params.Y));
	pillars.push(newPillar);
	
	var response = JSON.stringify(pillars);
	
	res.send(response);
});

app.get('/plant', function(req, res) {	
	var response = JSON.stringify(plants);
	
	res.send(response);
});

app.get('/plant/:id', function(req, res, next) {
	var id = parseInt(req.params.id);
	var x = 0;
	
	for (var i = 0; i < plants.length; i++) {
		if (plants[i].id == id) {
			var response = JSON.stringify(plants[i]);
			
			res.send(response);
			
			x = 1;
		}
	}
	
	if (x == 0) {
		return next("Error on route /plant/:id : Specified plant does not exist : id is not referenced");
	}
});

app.put('/plant/:name&:pillarId&:X&:Y', function(req, res, next) {
	var pillarId = parseInt(req.params.pillarId);
	if (pillarId > -1) {
		var x = 0;
		
		for (var i = 0; i < pillars.length; i++) {
			if (pillars[i].id == pillarId) {
				x = 1;
			}
		}
		
		if (x == 0) {
			return next("Error on route /plant/:name&:pillarId&:X&:Y : Specified pillar id does not exists : id is not referenced");
		}
	}
	
	var newId = 0;
	
	for (var i = 0; i < plants.length; i++) {
		if (plants[i].id > newId) {
			newId = plants[i].id;
		}
	}
	newId++;
	
	var newPlant = new Plant(newId, req.params.name, parseInt(req.params.pillarId), parseInt(req.params.X), parseInt(req.params.Y));
	plants.push(newPlant);

	var response = JSON.stringify(plants);
	
	res.send(response);
});

app.delete('/plant/:id', function(req, res) {
	var id = parseInt(req.params.id);
	var index = 0;
	
	for (var i = 0; i < plants.length; i++) {
		if (plants[i].id == id) {
			index = i;
		}
	}
	
	if (index > -1) {
		plants.splice(index, 1);
	}
	
	var response = JSON.stringify(plants);
	
	res.send(response);
});

app.listen(3000, function() {
	console.log("Listening on port 3000");
});