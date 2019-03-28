class Player {
	constructor(name, x, y, color) {
		this.name = name;
		this.x = x;
		this.y = y;
		this.radius = 10;
		this.lBound = this.x - this.radius;
		this.rBound = this.x + this.radius;
		this.uBound = this.y - this.radius;
		this.dBound = this.y + this.radius;
		this.color = color;
		this.direction = 'left'; //by default
		this.movementScale = 4;
		this.bullets = [];
		//movement flags to allow smooth movement
		this.mvL = false;
		this.mvR = false;
		this.mvU = false;
		this.mvD = false;
		//so you won't be killed by ur own bullets LOL
		this.enemy;
		//so the game can actually end
		this.gun = 'pistol';
		this.health = 5;
		this.reloadSpeed = 30;
		this.canShoot = true;
		this.range = 300;
		this.bulletSpeed = 5;
	}


	checkTouch(obj) {
		var xRange = (obj.lBound < this.x + this.radius) && (this.x - this.radius < obj.rBound);
		var yRange = (obj.uBound < this.y + this.radius) && (this.y - this.radius < obj.dBound);
		return xRange && yRange;
	}

	objCollision(scene, prevX, prevY) {
		//makes sure the player doesn't go into an object
		for (var i = 0; i < scene.objs.length; i ++) {
			if (this.checkTouch(scene.objs[i])) {
				this.x = prevX;
				this.y = prevY;
			}
		}
	}

	move(scene) {
		if (this.mvL) {
			var prevX = this.x;
			this.x -= this.movementScale;
			this.objCollision(scene, prevX, this.y);
			this.direction = 'left';
		}
		if (this.mvR) {
			var prevX = this.x;
			this.x += this.movementScale;
			this.objCollision(scene, prevX, this.y);
			this.direction = 'right';
		}
		if (this.mvU) {
			var prevY = this.y;
			this.y -= this.movementScale;
			this.objCollision(scene, this.x, prevY);
			this.direction = 'up';
		}
		if (this.mvD) {
			var prevY = this.y;
			this.y += this.movementScale;
			this.objCollision(scene, this.x, prevY);
			this.direction = 'down'
		}
		//update left and right bounds everytime it moves
		this.lBound = this.x - this.radius;
		this.rBound = this.x + this.radius;
		this.uBound = this.y - this.radius;
		this.dBound = this.y + this.radius;
		//make sure it doesn't go off the canvas
		this.x = constraint(this.x, 0, canvas.width);
		this.y = constraint(this.y, 0, canvas.height);
	}
	changeGun() {
		if (this.gun === 'pistol') {
			this.gun = 'shotgun';
			this.reloadSpeed = 100;
			this.range = 250;
			this.bulletSpeed = 5;
		}else if (this.gun === 'shotgun') {
			this.gun = 'sniper';
			this.reloadSpeed = 100;
			this.range = 1000;
			this.bulletSpeed = 3;
		}else if (this.gun === 'sniper') {
			this.gun = 'pistol';
			this.reloadSpeed = 30;
			this.range = 300;
			this.bulletSpeed = 5;
		}
		console.log(this.gun);
	}


	shoot() {
		if (this.canShoot) {
			if (this.gun === 'pistol') {
				this.bullets.push(new Bullet(this.x, this.y, 
								  this.bullets.length, this.range, this.bulletSpeed));
			}else if (this.gun === 'shotgun') {
				const rs = 30;
				for (var load = 0; load < 4; load ++) {
					this.bullets.push(new Bullet(this.x + rd(-rs, rs), 
									  this.y + rd(-rs, rs), this.bullets.length, 
									  this.range, this.bulletSpeed));
				}				
			}else if (this.gun === 'sniper') {
				const rs = 5;
				for (var load = 0; load < 10; load ++) {
					this.bullets.push(new Bullet(this.x + rd(-rs, rs), 
									  this.y + rd(-rs, rs), this.bullets.length, 
									  this.range, this.bulletSpeed));
				}

			}

			this.canShoot = false;
		}
	}

	placeWall(scene) {
		var newWall;
		if (this.direction === 'left') {
			newWall = new Wall(this.x - 50, this.y - 15);
		}else if (this.direction === 'right') {
			newWall = new Wall(this.x + 20, this.y - 15);
		}else if (this.direction === 'up') {
			newWall = new Wall(this.x - 20, this.y - 15 - 35);
		}else if (this.direction === 'down') {
			newWall = new Wall(this.x - 20, this.y - 15 + 35);
		}
		scene.objs.push(newWall);
	}

	draw() {
		ctx.font = "13px Arial";
		ctx.fillStyle = "#000000";
		drawCircle(this.x, this.y, this.radius, this.color);
		ctx.fillText(this.health, this.x, this.y - 10);
		ctx.fillStyle = "#FF0000";
		ctx.font = "50px Arial";

	}

	shootEnemy() {
		for (var i = 0; i < this.bullets.length; i ++) {
			this.bullets[i].playerCollision(this, this.enemy);
		}
	}

	checkHealth() {
		//so the game doesn't go on forever LOL
		if (this.health <= 0) {
			clearInterval(timer);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillText(this.name + ' lost!', 300, 300);

		}

	}
	bulletWallCollision(scene) {
		for (var i = 0; i < this.bullets.length; i ++) {
			this.bullets[i].wallCollision(scene, this);
		}
	}

	nextFrame(scene) {
		this.move(scene);
		this.draw();

		for (var i = 0; i < this.bullets.length; i ++) {
			this.bullets[i].setPos(this);

			//could have gotten popped
			if (this.bullets.length !== 0) {
				try {
					this.bullets[i].draw();
				}catch (err) {
					console.log(this.bullets);
				}
			}
		}
		if (this.name === 'player1') {
			this.enemy = player2;
		}else if (this.name === 'player2') {
			this.enemy = player1;
		}
		this.shootEnemy();

		this.checkHealth();
		this.bulletWallCollision(scene);


		if (iteration % this.reloadSpeed === 0) {
			this.canShoot = true;
		}
	}



}

var player1 = new Player('player1', 400, 400, '#66FF66');
var player2 = new Player('player2', 100, 100, '#9944FF');
player2.health = 99999;


player1.enemy = player2;
player2.enemy = player1;