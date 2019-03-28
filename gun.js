class Gun {
	constructor(name, reloadSpeed, range, bulletSpeed, bulletNum) {
		this.name = name;
		this.reloadSpeed = reloadSpeed;
		this.range = range;
		this.bulletSpeed = bulletSpeed;
		this.bulletNum = bulletNum;
	}
}

const Pistol = new Gun('pistol', 20, 300, 5, 1);
Pistol.shoot = function(player)  {
	player.bullets.push(new Bullet(player.x, player.y, 
								  player.bullets.length, this.range, this.bulletSpeed));
}

const Shotgun = new Gun('shotgun', 100, 200, 5, 4);
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

const Sniper = new Gun('sniper', 130, 850, 1, 10);
Sniper.shoot = function(player) {
	const rs = 5;
	for (var load = 0; load < this.bulletNum; load ++) {
		player.bullets.push(new Bullet(player.x + rd(-rs, rs), 
						  player.y + rd(-rs, rs), player.bullets.length, 
						  this.range, this.bulletSpeed));
	}
}