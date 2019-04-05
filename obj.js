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

		this.centerX = this.lBound + this.width / 2;
		this.centerY = this.uBound + this.height / 2;
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
		super(x, y, 30, 30, './assets/brick.png');
		this.health = 3;
	}
	draw() {
		makeBase(this);
		ctx.font = "20px Arial";
		ctx.fillStyle = "#DDDDDD";
		ctx.fillText(this.health, this.x + 20, this.y + 20);
		ctx.fillStyle = "#FF0000";

		ctx.font = "50px Arial";
	}
}




