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
		this.movementScale = 3;
		this.bullets = [];
		//movement flags to allow smooth movement
		this.mvL = false;
		this.mvR = false;
		this.mvU = false;
		this.mvD = false;
		//so you won't be killed by ur own bullets LOL
		this.enemy;
		//so the game can actually end
		this.gun = Pistol; //by default
		this.health = 5;
		this.canShoot = true;

		this.numWalls = 5;
	}


	checkTouch(obj) {
		var xRange = (obj.lBound < this.x + this.radius) && (this.x - this.radius < obj.rBound);
		var yRange = (obj.uBound < this.y + this.radius) && (this.y - this.radius < obj.dBound);
		return xRange && yRange;
	}

	objCollision(scene, prevX, prevY, objName) {
		//makes sure the player doesn't go into an object
		for (var i = 0; i < scene.objs.length; i ++) {
			//only wall collision, doesn't include other objs
			if (this.checkTouch(scene.objs[i])) {
				if (scene.objs[i].constructor.name === 'Wall') {
					this.x = prevX;
					this.y = prevY;
				}else if (scene.objs[i].constructor.name === 'Item') {
					scene.objs[i].touched(scene, this);
				}
			}
		}
	}

	move(scene) {
		const objName = 'Wall';
		if (this.mvL) {
			var prevX = this.x;
			this.x -= this.movementScale;
			this.objCollision(scene, prevX, this.y, objName);
			this.direction = 'left';
		}
		if (this.mvR) {
			var prevX = this.x;
			this.x += this.movementScale;
			this.objCollision(scene, prevX, this.y, objName);
			this.direction = 'right';
		}
		if (this.mvU) {
			var prevY = this.y;
			this.y -= this.movementScale;
			this.objCollision(scene, this.x, prevY, objName);
			this.direction = 'up';
		}
		if (this.mvD) {
			var prevY = this.y;
			this.y += this.movementScale;
			this.objCollision(scene, this.x, prevY, objName);
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
		switch (this.gun) {
			case Pistol:
				this.gun = Shotgun;
			break;
			case Shotgun:
				this.gun = Sniper;
			break;
			case Sniper:
				this.gun = Rocket;
			break;
			case Rocket:
				this.gun = Pistol;
			break;
		}
	}

	shoot() {
		if (this.canShoot) {
			this.gun.shoot(this);
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
		if (this.numWalls > 0) {
			scene.objs.push(newWall);
			this.numWalls -= 1;
		}
		
	}

	draw() {
		ctx.font = "15px Arial";
		ctx.fillStyle = "#000000";
		drawCircle(this.x, this.y, this.radius, this.color);
		ctx.fillText(this.gun.name, this.x, this.y - 26);
		ctx.fillText('hp: ' + this.health, this.x, this.y - 13);
		var ex;
		var why;
		if (this.name === 'player1') {
			ex = 50;
			why = 50;
		}else if (this.name === 'player2') {
			ex = canvas.width - 200;
			why = 50;
		}
		ctx.font = "20px Arial";
		ctx.fillText(this.name, ex, why - 20);
		ctx.fillText('hp:' + this.health, ex, why);
		ctx.fillText('walls:' + this.numWalls, ex, why + 20);
		ctx.fillText('gun:' + this.gun.name, ex, why + 40);
		
		//draw guns, it's alot of code, but worth it...
		//also so players could tell which directions they are facing in
		var ex = this.x;
		var why = this.y;
		var ex1 = this.x;
		var why1 = this.y;
		const length = this.gun.length;
		if (this.direction === 'left') {
			ex = this.x - 10;
			ex1 = ex - length;
		}else if (this.direction === 'right') {
			ex = this.x + 10;
			ex1 = ex + length;
		}else if (this.direction === 'up') {
			why = this.y - 10;
			why1 = why - length;
		}else if (this.direction === 'down') {
			why = this.y + 10;
			why1 = why + length;
		}
		ctx.strokeStyle = "#C0C0C0";
		drawLine(ex, why, ex1, why1, this.gun.width);

		//reset it to normal
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
			lost = true;
			loser = this;

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


		if (iteration % this.gun.reloadSpeed === 0) {
			this.canShoot = true;
		}
		if (iteration % 100 === 0 && this.numWalls < 10) {
			this.numWalls += 1
		}

		if (iteration % 1300 === 0 && this.health < 5) {
			this.health += 1;
		}
	}



}

var player1 = new Player('player1', 50, canvas.height / 2, '#66FF66');
var player2 = new Player('player2', canvas.width - 50, canvas.height / 2, '#FF7633');

player1.direction = 'right';


player1.enemy = player2;
player2.enemy = player1;