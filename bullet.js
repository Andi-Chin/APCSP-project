class Bullet{
	constructor(x, y, ind) {

		this.x = x;
		this.y = y;
		this.width = 4;
		this.height = 4;
		this.color = '#DDDDDD';
		this.lBound = this.x;
		this.rBound = this.x + this.width;
		this.uBound = this.y;
		this.dBound = this.y + this.height;

		this.timeSinceStart = Date.now();
		this.distanceTravelled = 0;
		this.maxDistance = 500;
		this.moveMentSpeed = 5; //smaller num = faster
		//index of this bullet in the player's list
		this.ind = ind;

	}
	setPos(player) {
		if (this.originalplayerDirection === undefined) {
			this.originalplayerDirection = player.direction;
		}
		this.distanceTravelled = (Date.now() - this.timeSinceStart) / this.moveMentSpeed;
		if (this.originalplayerDirection === 'left') {

			if (this.originalplayerX === undefined) {
				this.originalplayerX = player.x;
			}
			if (this.distanceTravelled < this.maxDistance) {
				this.x = this.originalplayerX - this.distanceTravelled;
			}
		}else if (this.originalplayerDirection === 'right') {
			if (this.originalplayerX === undefined) {
				this.originalplayerX = player.x;
			}
			if (this.distanceTravelled < this.maxDistance) {
				this.x = this.originalplayerX + this.distanceTravelled;
			}

		}else if (this.originalplayerDirection === 'up') {
			if (this.originalplayerY === undefined) {
				this.originalplayerY = player.y;
			}
			if (this.distanceTravelled < this.maxDistance) {
				this.y = this.originalplayerY - this.distanceTravelled;
			}
		}else if (this.originalplayerDirection === 'down') {
			if (this.originalplayerY === undefined) {
				this.originalplayerY = player.y;
			}
			if (this.distanceTravelled < this.maxDistance) {
				this.y = this.originalplayerY + this.distanceTravelled;
			}
		}

		//if it has reachs the end
		var diff = this.maxDistance - this.distanceTravelled;
		if (diff <= 5) {
			player.bullets.splice(player.bullets.indexOf(this), 1);
		}
	}

	playerCollision(player) {
		var xInRange = player.enemy.lBound < this.x && this.x < player.enemy.rBound;
		var yInRange = player.enemy.uBound < this.y && this.y < player.enemy.dBound;

		if (xInRange && yInRange) {
			player.enemy.health -= 1;
			console.log('health: ' + player.enemy.health);
			player.bullets.splice(player.bullets.indexOf(this), 1);
		}
	}

	wallCollision(scene, player) {
		for (var i = 0; i < scene.objs.length; i ++) {
			const wall = scene.objs[i];
			var xInRange = wall.lBound < this.x && this.x < wall.rBound;
			var yInRange = wall.uBound < this.y && this.y < wall.dBound;
			if (xInRange && yInRange) {
				scene.objs[i].health -= 1;
				player.bullets.splice(player.bullets.indexOf(this), 1);
				console.log('hit!');
			}

		}
	}


	draw()  {
		drawCircle(this.x, this.y, this.width, this.color);
	}

	nextFrame() {
		this.draw();
	}

}