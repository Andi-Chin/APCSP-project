class Bullet {
	constructor(x, y, player, range, speed) {
		this.x = x;
		this.y = y;
		this.initX = this.x;
		this.initY = this.y;
		this.width = 4;
		this.height = 4;
		this.color = '#FFFFFF';
		this.lBound = this.x;
		this.rBound = this.x + this.width;
		this.uBound = this.y;
		this.dBound = this.y + this.height;
		this.direction = player.direction;
		this.distanceTravelled = 0;
		this.maxDistance = range;
		this.moveMentSpeed = speed; //bigger num = faster
		//index of this bullet in the player's list
		this.ind = player.bullets.length;
		this.vec;
		if (this.direction === 'left') {
			this.vec = new Vector(-this.moveMentSpeed, 0);
		} else if (this.direction === 'right') {
			this.vec = new Vector(this.moveMentSpeed, 0);
		} else if (this.direction === 'up') {
			this.vec = new Vector(0, -this.moveMentSpeed);
		} else if (this.direction === 'down') {
			this.vec = new Vector(0, this.moveMentSpeed);
		}
	}
	setPos(player) {
		this.x += this.vec.xV;
		this.y += this.vec.yV;
		//if it has reachs the end
		const diff = this.maxDistance - distance(this.x, this.y, this.initX, this.initY);
		if (diff <= 5) {
			player.bullets.splice(player.bullets.indexOf(this), 1);
		}
	}

	playerCollision(player) {
		var xInRange = player.enemy.lBound < this.x && this.x < player.enemy.rBound;
		var yInRange = player.enemy.uBound < this.y && this.y < player.enemy.dBound;
		if (xInRange && yInRange) {
			player.enemy.health -= 1;
			player.bullets.splice(player.bullets.indexOf(this), 1);
		}
	}
	wallCollision(scene, player) {
		for (var i = 0; i < scene.objs.length; i++) {
			const wall = scene.objs[i];
			var xInRange = wall.lBound < this.x && this.x < wall.rBound;
			var yInRange = wall.uBound < this.y && this.y < wall.dBound;
			if (xInRange && yInRange && scene.objs[i].constructor.name === 'Wall') {
				scene.objs[i].health -= 1;
				player.bullets.splice(player.bullets.indexOf(this), 1);
			}

		}
	}
	draw() {
		drawCircle(this.x, this.y, this.width, this.color);
	}
	nextFrame() {
		this.draw();
	}
}