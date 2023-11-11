// Create web server
// Display comments
// Add comments
// Delete comments
// 
// -------------------------------------------------

// Import modules
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var qs = require('querystring');

// Import custom modules
var comments = require('./comments');

// Create server
var server = http.createServer(function(req, res) {
	var filePath = false;
	
	// Check for root
	if (req.url == '/') {
		filePath = 'public/index.html';
	} else {
		// Translate url path to relative file path
		filePath = 'public' + req.url;
	}
	
	// Get the absolute file path
	var absPath = './' + filePath;
	
	// Serve the static file
	serveStatic(res, absPath);
});

// Start the server
server.listen(3000, function() {
	console.log('Server listening on port 3000.');
});

// Error handler
function send404(res) {
	res.writeHead(404, {'Content-Type': 'text/plain'});
	res.write('Error 404: resource not found.');
	res.end();
}

// Send file data
function sendFile(res, filePath, fileContents) {
	res.writeHead(200, {'Content-Type': mime.lookup(path.basename(filePath))});
	res.end(fileContents);
}

// Serve static file
function serveStatic(res, absPath) {
	// Check if file exists
	fs.exists(absPath, function(exists) {
		if (exists) {
			// Read file
			fs.readFile(absPath, function(err, data) {
				if (err) {
					send404(res);
				} else {
					sendFile(res, absPath, data);
				}
			});
		} else {
			send404(res);
		}
	});
}

// Create socket.io server
var chatServer = require('./lib/chat_server');
chatServer.listen(server);

// Create socket.io server
var io = require('socket.io').listen(server);

// Create a dictionary to hold all the rooms
var rooms = {};

// Handle socket.io events
io.sockets.on('connection', function(socket) {
	// Join a room
	socket.on('join', function(room) {
		// Check if room exists
		if (rooms[room] == null) {
			// Create new room
			rooms[room] = [];