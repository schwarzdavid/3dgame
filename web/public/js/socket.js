(function(){
	"use strict";
	
	window.sockets = function(){
		window.socket = io("localhost");
		window.tanks = {};
		
		socket.emit('join');
		socket.on('disconnect', function(){
			
		});

		socket.on('addPlayer', function(data){
			tanks[data.uid] = new Tank(data);
		});
		
		tanks["test"] = new Tank({});
	};
}());