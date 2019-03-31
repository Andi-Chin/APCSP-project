class Gun {
	constructor(name, reloadSpeed, range, bulletSpeed, bulletNum, length, width) {
		this.name = name;
		this.reloadSpeed = reloadSpeed;
		this.range = range;
		this.bulletSpeed = bulletSpeed;
		this.bulletNum = bulletNum;
		this.length = length;
		this.width = width;
	}
}

const Pistol = new Gun('pistol', 20, 400, 3, 1, 13, 8);
Pistol.shoot = function (player) {
	player.bullets.push(new Bullet(player.x, player.y,
		player, this.range, this.bulletSpeed));
}
const Shotgun = new Gun('shotgun', 100, 250, 3, 4, 17, 11);
Shotgun.shoot = function (player) {
	const rs = 30;
	for (var load = 0; load < this.bulletNum; load++) {
		var bullet = new Bullet(player.x,
			player.y, player,
			this.range, this.bulletSpeed);

		switch (player.direction) {
			case 'left':
			case 'right':
				//so that the shots spread out
				bullet.vec.yV += (load - 1.5) / 4;
				break;
			case 'up':
			case 'down':
				// so the shots spread out
				bullet.vec.xV += (load - 1.5) / 4;
				break;
		}
		player.bullets.push(bullet);
	}
}
const Sniper = new Gun('sniper', 70, canvas.width - 300, 20, 2, 23, 7);
Sniper.shoot = function (player) {
	const rs = 2;
	for (var load = 0; load < this.bulletNum; load++) {
		player.bullets.push(new Bullet(player.x + rd(-rs, rs),
			player.y + rd(-rs, rs), player,
			this.range, this.bulletSpeed));
	}
}

const Rocket = new Gun('rocket', 350, 650, 0.7, 14, 15, 15);
Rocket.shoot = Sniper.shoot;