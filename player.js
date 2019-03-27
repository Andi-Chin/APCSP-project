var Player = {
	x: 400,
	y: 400,
	radius: 10,
	color: '#66FF66',
	direction: 'left',
	movementScale: 4,
	//movement flag to allow smooth movement
	mvL: false,
	mvR: false,
	mvU: false,
	mvD: false,


	checkTouch: function(obj) {
		var xRange = (obj.lBound < this.x + this.radius) && (this.x - this.radius < obj.rBound);
		var yRange = (obj.uBound < this.y + this.radius) && (this.y - this.radius < obj.dBound);
		return xRange && yRange;
	},



	constraint: function(input, lower, upper) {
		var result = input;
		if (input < lower) {
			result = lower;
		}else if (input > upper) {
			result = upper;
		}
		return result;
	},
	objCollision: function(scene, prevX, prevY) {
		//makes sure the player doesn't go into an object
		for (var i = 0; i < scene.objs.length; i ++) {
			if (this.checkTouch(scene.objs[i])) {
				this.x = prevX;
				this.y = prevY;
			}
		}
	},

	move: function(scene) {
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
		//make sure it doesn't go off the canvas
		this.x = this.constraint(this.x, 0, canvas.width);
		this.y = this.constraint(this.y, 0, canvas.height);
	},

	shoot: function() {
		if (! this.shooting) {
			this.bullet = new Bullet(this.x, this.y);
			this.shooting = true;
		}
	},

	draw: function() {
		drawCircle(this.x, this.y, this.radius, this.color);

	},

	nextFrame: function(scene) {
		this.move(scene);
		this.draw();
		if (this.shooting) {
			this.bullet.setPos(this);
			this.bullet.draw();
		}
		console.log(this.shooting);
	},

}
