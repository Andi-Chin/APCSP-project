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

const Pistol = new Gun('pistol', 20, 400, 5, 1, 13, 8);
Pistol.shoot = function(player)  {
	player.bullets.push(new Bullet(player.x, player.y, 
								  player.bullets.length, this.range, this.bulletSpeed));
}

const Shotgun = new Gun('shotgun', 100, 250, 5, 4, 17, 11);
Shotgun.shoot = function(player) {
	const rs = 30;
	for (var load = 0; load < this.bulletNum; load ++) {
		switch (player.direction) {
			case 'left':
			case 'right':
				player.bullets.push(new Bullet(player.x + rd(-rs, rs), 
								  player.y + rd(-rs, rs) + 13, player.bullets.length, 
								  this.range, this.bulletSpeed));
			break;
			case 'up':
			case 'down':
				player.bullets.push(new Bullet(player.x + rd(-rs, rs) + 13, 
								  player.y + rd(-rs, rs), player.bullets.length, 
								  this.range, this.bulletSpeed));
		}
	}	
}

const Sniper = new Gun('sniper', 70, canvas.width - 300, 1, 2, 23, 7);
Sniper.shoot = function(player) {
	const rs = 5;
	for (var load = 0; load < this.bulletNum; load ++) {
		player.bullets.push(new Bullet(player.x + rd(-rs, rs), 
						  player.y + rd(-rs, rs), player.bullets.length, 
						  this.range, this.bulletSpeed));
	}
}

const Rocket = new Gun('rocket', 350, 650, 20, 30, 15, 15);
Rocket.shoot = function(player) {
	const rs = 5;
	for (var load = 0; load < this.bulletNum; load ++) {
		switch (player.direction) {
			case 'left':
			case 'right':
				player.bullets.push(new Bullet(player.x + rd(-rs, rs), 
								  player.y + rd(-rs, rs) + 3, player.bullets.length, 
								  this.range, this.bulletSpeed));
			break;
			case 'up':
			case 'down':
				player.bullets.push(new Bullet(player.x + rd(-rs, rs) + 3, 
								  player.y + rd(-rs, rs), player.bullets.length, 
								  this.range, this.bulletSpeed));
		}
	}	
}