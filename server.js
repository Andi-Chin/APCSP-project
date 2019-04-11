//load modules
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
var express = require('express');

//Starts express 
var app = express();
app.use(express.static('public'))
//GET html index file
var fileArr = [
	'index.html',
	'utils.js',
	'vector.js',
	'obj.js',
	'item.js',
	'bullet.js',
	'gun.js',
	'player.js',
	'scene.js',
	'game.js',
	'assets/bg.jpg',
	'assets/brick.png',
	'assets/health.jpg'

];

for (let i = 0; i < fileArr.length; i++) {
	app.get('/' + fileArr[i], (req, res) => {
		res.sendFile(__dirname + req.url);
		console.log("sent file: " + req.url);
	});
}

app.listen(1024, () => {
	console.log('App successfully started.');
})
