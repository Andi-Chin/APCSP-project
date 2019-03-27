class Scene {
	constructor(objs) {
		this.objs = objs;
	}
	addObj(obj) {
		this.objs.push(obj);

	}
	draw() {
		for (var i = 0; i < this.objs.length; i ++) {
			this.objs[i].draw();
		}
	}
	nextFrame() {
		this.draw();
	}
}

var scene1 = new Scene([]);
scene1.addObj(new Wall(300, 300));

