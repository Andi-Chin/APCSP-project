// Canvas setup
const canvas = document.getElementById("game");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.font = "50px Arial";
ctx.textAlign = 'center';

var timer = setInterval(nextFrame, 17);

function nextFrame() {
	ctx.fillStyle = "#FF0000";
	ctx.font = "50px Arial";
	ctx.textAlign = 'center';

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	scene1.nextFrame();
	player1.nextFrame(scene1);
	player2.nextFrame(scene1);

	iteration += 1;

}

document.addEventListener('keydown', function(event) {

	const x = event.keyCode;
	//player1 movements:
	if (x === 65) {
		player1.mvL = true;
	}else if (x === 68) {
		player1.mvR = true;
	}else if (x === 87) {
		player1.mvU = true
	}else if (x === 83) {
		player1.mvD = true;
	}else if (x === 70) {
		player1.shoot();
	}else if (x === 71) {
		player1.placeWall(scene1);
	}else if (x === 81) {
		player1.changeGun();
	}
	//player2 movements:
	else if (x === 37) {
		player2.mvL = true;
	}else if (x === 39) {
		player2.mvR = true;
	}else if (x === 38) {
		player2.mvU = true;

	}else if (x === 40) {
		player2.mvD = true;
	}else if (x === 191) {
		player2.shoot();
	}else if (x === 190) {
		player2.placeWall(scene1);
	}else if (x === 188) {
		player2.changeGun();
	}
});

document.addEventListener('keyup', function(event) {

	const x = event.keyCode;

	//player1 movements:
	if (x === 65) {
		player1.mvL = false;
	}else if (x === 68) {
		player1.mvR = false;
	}else if (x === 87) {
		player1.mvU = false
	}else if (x === 83) {
		player1.mvD = false;
	}

	//player2 movements:
	else if (x === 37) {
		player2.mvL = false;
	}else if (x === 39) {
		player2.mvR = false;
	}else if (x === 38) {
		player2.mvU = false;

	}else if (x === 40) {
		player2.mvD = false;
	}
});






function addWall(event) {
	scene1.addObj(new Wall(event.clientX - 20, event.clientY - 20));
}
document.addEventListener("click", addWall);


