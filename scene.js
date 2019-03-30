class Scene {
	constructor(objs) {
		this.objs = objs;
	}
	addObj(obj) {
		this.objs.push(obj);

	}
	draw() {
		renderImage('./assets/bg.jpg', 0, 0, canvas.width, canvas.height);

		for (var i = 0; i < this.objs.length; i ++) {
			this.objs[i].draw();
		}
	}
	spawnItems() {
		if (iteration % 1000 === 0) {
			this.objs.push(new Item('HealthPack', rd(0, canvas.width), rd(0, canvas.height), './assets/health.jpg'));
		}
	}
	rmItems() {
		for (var i = 0; i < this.objs.length; i ++) {
			const obj = this.objs[i];
			if (obj.constructor.name === 'Item' && (iteration - obj.birthTime > 500)) {
				this.objs.splice(i, 1);
			}
		}
	}
	nextFrame() {
		for (var i = 0; i < this.objs.length; i ++) {
			var obj = this.objs[i];
			if (obj.health <= 0) {
				this.objs.splice(this.objs.indexOf(obj), 1);
			}
		}
		this.spawnItems();
		this.draw();
	}
}

var scene1 = new Scene([]);










