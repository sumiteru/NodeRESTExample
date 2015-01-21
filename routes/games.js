var express = require('express');
var Game = require('../models/games');
var router = express.Router();

router.get('/', function(req, res) {
	Game.find(function(err, games){
		if(err)
			res.send(err);

		var contentType = req.headers["content-type"];

		switch(contentType)
		{
			case "text/plain":
				var gameSchemaPaths = Game.schema.paths;
				var text = "";

				for(var i in games){
					var game = games[i];
					for(var path in gameSchemaPaths)
						text += game[path] + "\n";
				}
				res.send(text);
			default:
				res.json(games);
		}
	});
});

router.get('/:id', function(req, res) {
 	Game.findById(req.params.id, function(err, game){
 		if(err)
 			res.send(err);

 		var contentType = req.headers["content-type"];

		switch(contentType)
		{
			case "text/plain":
				var gameSchemaPaths = Game.schema.paths;
				var text = "";

				for(var path in gameSchemaPaths)
					text += game[path] + "\n";

				res.send(text);
			default:
				res.json(game);
		}
 	});
});

router.post('/', function(req, res) {
	var game = new Game();

	game.title = req.body.title;
	game.genre = req.body.genre;
	game.releaseDate = req.body.releaseDate;
	game.image = req.body.image;

	game.save(function(err){
		if(err)
			res.send(err);

		res.json({
			message: "Game created!",
			game: game
		});
	});
});

router.put('/:id', function(req, res) {
	Game.findById(req.params.id, function(err, game){
		if(err)
			res.send(err);

		if(req.body.title)
			game.title = req.body.title;
		if(req.body.genre)
			game.genre = req.body.genre;
		if(req.body.release)
			game.releaseDate = req.body.release;
		if(req.body.image)
			game.image = req.body.image;

		game.save(function(err){
			if(err)
				res.send(err);

			res.json({
				message: "Game entry updated!",
				game: game
			});
		});
	});
});

router.delete('/:id', function(req, res) {
	Game.remove({
		_id: req.params.id
	}, function(err, game){
		console.log(req.params.id);
		console.log(game);
		if(err)
			res.send(err);

		res.json({ message: "Game removed."});
	});
});

module.exports = router;
