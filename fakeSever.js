// const fs = require('fs');
// const http = require('http');
// const url = require('url');

// const server = http.createServer(function (req, res) {
// 	const pathname = url.parse(req.url, true).pathname;
// 	const extension = pathname.slice(pathname.length - 2, pathname.length);
// 	console.log(pathname);
// 	if (pathname === '/') {
// 		fs.readFile('index.html', function (err, data) {
// 			res.writeHead(200, { 'Content-Type': 'text/html' });
// 			res.write(data);
// 			res.end();
// 		});
// 	} else if (extension === 'js') {

// 		fs.readFile(__dirname + pathname, function (err, data) {
// 			res.writeHead(200, { 'Content-Type': 'application/javascript' });
// 			res.end(data);
// 		});
// 	} else if (pathname == '/assets/bg.jpg') {
// 		fs.readFile(__dirname + pathname, function (err, data) {
// 			res.writeHead(200, { 'Content-Type': 'img/jpg' });
// 			res.end(data);
// 		});
// 	} else if (pathname == '/assets/brick.png') {
// 		fs.readFile(__dirname + pathname, function (err, data) {
// 			res.writeHead(200, { 'Content-Type': 'img/png' });
// 			res.end(data);
// 		});
// 	} else if (pathname == '/assets/health.jpg') {
// 		fs.readFile(__dirname + pathname, function (err, data) {
// 			res.writeHead(200, { 'Content-Type': 'img/jpg' });
// 			res.end(data);
// 		});
// 	}
// }).listen(3000);
