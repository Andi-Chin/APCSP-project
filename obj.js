class Obj {
	constructor(x, y, width, height, file) {

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.file = file;

		this.lBound = this.x;
		this.rBound = this.x + this.width;
		this.uBound = this.y;
		this.dBound = this.y + this.height;

		this.centerX = this.lBound + Math.abs(this.rBound - this.lBound);
		this.centerY = this.uBound + Math.abs(this.dBound - this.uBound);
	}

	touched() {
		console.log('touched: ');
		console.log(this.constructor.name);
	}

	place(scene) {
		scene.addObj(this);
	}

	draw() {
		makeBase(this);
	}

	nextFrame() {
		this.draw();

	}
}

class Wall extends Obj {
	constructor(x, y) {
		super(x, y, 30, 30, 'brick.png');
	}
}



class Bullet extends Obj {
	constructor(x, y) {
		super(x, y, 4, 4, '#FFFFFF');
		this.timeSinceStart = Date.now();
		this.distanceTravelled = 0;
		this.maxDistance = 200;
	}
	setPos(player) {

		if (this.originalplayerDirection === undefined) {
			this.originalplayerDirection = player.direction;
		}
		console.log(player.direction);

		//console.log(player.direction);
		if (this.originalplayerDirection === 'left') {

			if (this.originalplayerX === undefined) {
				this.originalplayerX = player.x;
			}
			if (this.distanceTravelled < this.maxDistance) {
				this.distanceTravelled = (Date.now() - this.timeSinceStart) / 10;
				console.log('distanceTravelled: ' + this.distanceTravelled);
				this.x = this.originalplayerX - this.distanceTravelled;
			}else {
				player.shooting = false;
			}	
		}else if (this.originalplayerDirection === 'right') {
			if (this.originalplayerX === undefined) {
				this.originalplayerX = player.x;
			}
			if (this.distanceTravelled < this.maxDistance) {
				this.distanceTravelled = (Date.now() - this.timeSinceStart) / 10;
				console.log('distanceTravelled: ' + this.distanceTravelled);
				this.x = this.originalplayerX + this.distanceTravelled;
			}else {
				player.shooting = false;
			}	

		}else if (this.originalplayerDirection === 'up') {
			if (this.originalplayerY === undefined) {
				this.originalplayerY = player.y;
			}
			if (this.distanceTravelled < this.maxDistance) {
				this.distanceTravelled = (Date.now() - this.timeSinceStart) / 10;
				console.log('distanceTravelled: ' + this.distanceTravelled);
				this.y = this.originalplayerY - this.distanceTravelled;
			}else {
				player.shooting = false;
			}
		}else if (this.originalplayerDirection === 'down') {
			if (this.originalplayerY === undefined) {
				this.originalplayerY = player.y;
			}
			if (this.distanceTravelled < this.maxDistance) {
				this.distanceTravelled = (Date.now() - this.timeSinceStart) / 10;
				console.log('distanceTravelled: ' + this.distanceTravelled);
				this.y = this.originalplayerY + this.distanceTravelled;
			}else {
				player.shooting = false;
			}
		}



	}
	draw()  {
		drawCircle(this.x, this.y, this.width, this.file);
	}

}
