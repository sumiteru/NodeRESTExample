angular.module("app", ["ngAnimate"])
	.controller("GameController", function($scope, $http){

		$scope.games = [];

		var Game = function(){
			this.mode = 0,
			this.normalMode = function(){
				this.mode = 0;
			},
			this.updateMode = function(){
				this.mode = 1;
				this.copy = copyObj(this);
			},
			this.removeMode = function(){
				this.mode = 2;
			}
		}

		function copyObj(obj){
			var copy = {};
			for(var property in obj){
				if(obj.hasOwnProperty(property)){
					if(typeof obj[property] === "Object")
						copy[property] = copyObj(obj[property]);
					else
						copy[property] = obj[property];
				}
			}

			return copy;
		}

		$http({
			method: "GET",
			url: "http://localhost:3000/api/games"
		})
		.success(function(data){
			data.map(function(game){
				var obj = new Game();

				obj.id = game._id,
				obj.title = game.title,
				obj.genre = game.genre,
				obj.releaseDate = moment(game.releaseDate).format("YYYY-MM-DD"),
				obj.image = game.image || "no.png",

				$scope.games.push(obj);
			})
		});

		$scope.add = function(){
			$http({
				method: "POST",
				url: "http://localhost:3000/api/games",
				headers: {
					"Content-Type": "application/json"
				},
				data: $scope.newGame
			})
			.success(function(data){
				var obj = new Game();

				obj.id = data.game._id,
				obj.title = data.game.title,
				obj.genre = data.game.genre,
				obj.releaseDate = moment(data.game.releaseDate).format("YYYY-MM-DD"),
				obj.image = data.game.image || "no.png",

				$scope.games.push(obj);
			});
		}

		$scope.update = function(game){
			$http({
				method: "PUT",
				url: "http://localhost:3000/api/games/" + game.id,
				headers: {
					"Content-Type": "application/json"
				},
				data: game.copy
			})
			.success(function(data){
				game.normalMode();

				game.id = data.game._id;
				game.title = data.game.title;
				game.genre = data.game.genre;
				game.releaseDate = moment(data.game.releaseDate).format("YYYY-MM-DD");
				game.image = data.game.image || "no.png";
			});
		}

		$scope.delete = function(game){
			$http({
				method: "DELETE",
				url: "http://localhost:3000/api/games/" + game.id,
			})
			.success(function(data){
				var index = $scope.games.indexOf(game);
				$scope.games.splice(index, 1);
			});
		}
	});