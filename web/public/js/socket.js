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
		
		tanks['p1'] = new Tank({
			color: 0xFFFF00,
			keys: {
				foward: 87,
				back: 83,
				left: 65,
				right: 68,
				bum: 32
			},
			name: 'Spieler 1',
			coords: {
				x: -5,
				z: -5
			},
			rotation: Math.PI
		});
		
		tanks['p2'] = new Tank({
			color: 0x0000FF,
			keys: {
				foward: 38,
				back: 40,
				left: 37,
				right: 39,
				bum: 17
			},
			name: 'Spieler 2',
			coords: {
				x: 5,
				z: 5
			},
			rotation: 0
		});
	};
}());