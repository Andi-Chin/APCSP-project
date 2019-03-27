
function drawCircle(x, y, r, color) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
}





function makeBase(obj) {

	base_image = new Image();
	base_image.src = obj.file;
	ctx.imageSmoothingEnabled = false;
	ctx.drawImage(base_image, obj.x, obj.y, obj.width, obj.height);
}