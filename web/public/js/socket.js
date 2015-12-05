(function(){
	"use strict";
	
	window.sockets = function(){
		window.socket = io("localhost");
		window.tanks = {};

		socket.on('addPlayer', function(data){
			tanks[data.uid] = new Tank(data);
		});
	};
}());