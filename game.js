console.log("Test");
// Canvas setup
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.font = "50px Arial";
ctx.textAlign = 'center';

var timer = setInterval(nextFrame, 17);

function nextFrame() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	scene1.nextFrame();
	Player.nextFrame(scene1);
	

}



document.addEventListener('keydown', function(event) {

	const x = event.keyCode;

	if (x === 37 || x === 65 || x === 76) {
		Player.mvL = true;
	}else if (x === 39 || x === 68 || x === 222) {
		Player.mvR = true;
	}else if (x === 38 || x === 87 || x === 80) {
		Player.mvU = true;
	}else if (x === 40 || x === 83 || x === 186) {
		Player.mvD = true;
	}else if (x === 32) {
		Player.shoot();
	}
	
});

document.addEventListener('keyup', function(event) {

	const x = event.keyCode;

	if (x === 37 || x === 65 || x === 76) {
		Player.mvL = false;
	}else if (x === 39 || x === 68 || x === 222) {
		Player.mvR = false;
	}else if (x === 38 || x === 87 || x === 80) {
		Player.mvU = false;
	}else if (x === 40 || x === 83 || x === 186) {
		Player.mvD = false;
	}else {
		moveX = 0;
		moveY = 0;
	}
});

function addWall(event) {
	scene1.addObj(new Wall(event.clientX - 20, event.clientY - 20));
	// console.log(`scene1.addObj(new Wall(${event.clientX - 20}, ${event.clientY - 20}))`)
}

document.addEventListener("click", addWall);


