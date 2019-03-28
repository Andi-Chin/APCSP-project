var iteration = 0;
function drawCircle(x, y, r, color) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
}

function constraint(input, lower, upper) {
	var result = input;
	if (input < lower) {
		result = lower;
	}else if (input > upper) {
		result = upper;
	}
	return result;
}

function rd(lower, upper) {
	return Math.floor(Math.random() * upper) + lower;
}

function renderImage(file, x, y, width, height)  {
	base_image = new Image();
	base_image.src = file;
	ctx.imageSmoothingEnabled = false;
	ctx.drawImage(base_image, x, y, width, height);
}

function makeBase(obj) {
	renderImage(obj.file, obj.x, obj.y, obj.width, obj.height);
}




