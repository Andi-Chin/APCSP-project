class Scene {
	constructor(objs) {
		this.objs = objs;
	}
	addObj(obj) {
		this.objs.push(obj);

	}
	draw() {
		var base_image = new Image();
		base_image.src = 'bg.jpg';
		ctx.imageSmoothingEnabled = false;
		ctx.drawImage(base_image, 0, 0, 1250, 750);

		for (var i = 0; i < this.objs.length; i ++) {
			this.objs[i].draw();
		}
	}
	nextFrame() {
		for (var i = 0; i < this.objs.length; i ++) {
			var obj = this.objs[i];
			if (obj.health <= 0) {
				this.objs.splice(this.objs.indexOf(obj), 1);
			}
		}
		this.draw();
	}
}

var scene1 = new Scene([]);


