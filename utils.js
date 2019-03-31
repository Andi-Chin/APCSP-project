// Canvas setup
const canvas = document.getElementById("game");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.font = "50px Arial";
ctx.textAlign = 'center';



var iteration = 0;
var lost = false;
var loser;
function drawCircle(x, y, r, color) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
}

function distance(x, y, x1, y1) {
	const xDist = Math.abs(x1 - x);
	const yDist = Math.abs(y1 - y);
	return Math.sqrt(xDist * xDist + yDist * yDist);
}

function drawLine(x, y, x1, y1, width) {
	ctx.lineWidth = width;
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x1, y1);
	ctx.stroke();
}

function constraint(input, lower, upper) {
	var result = input;
	if (input < lower) {
		result = lower;
	} else if (input > upper) {
		result = upper;
	}
	return result;
}

function rd(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function renderImage(file, x, y, width, height) {
	base_image = new Image();
	base_image.src = file;
	ctx.imageSmoothingEnabled = false;
	ctx.drawImage(base_image, x, y, width, height);
}

function makeBase(obj) {
	renderImage(obj.file, obj.x, obj.y, obj.width, obj.height);
}






