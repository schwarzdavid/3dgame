(function(){
	"use strict";
	
	window.events = function(actions){
		var rotation, movement, shots;
		
		window.addEventListener('keydown', function(e){
			//console.log(e.keyCode);
			switch(e.keyCode){
				case 87:
					if(!movement){
						movement = setInterval(function(){
							actions.move(-0.1);
						}, 100/6);
					}
					break;
				
				case 83:
					if(!movement){
						movement = setInterval(function(){
							actions.move(0.05);
						}, 100/6);
					}
					break;
					
				case 65:
					if(!rotation){
						rotation = setInterval(function(){
							actions.rotate(Math.PI / 60)
						}, 100/6);
					}
					break;
					
				case 68:
					if(!rotation){
						rotation = setInterval(function(){
							actions.rotate(-Math.PI / 60);
						}, 100/6);
					}
					break;
					
				case 32:
					if(!shots){
						actions.bum();
						shots = setInterval(function(){
							actions.bum();
						}, 150);
					}
					break;
			}
		});
		
		window.addEventListener('keyup', function(e){
			switch(e.keyCode){
				case 87:
				case 83:
					clearInterval(movement);
					movement = null;
					break;
					
				case 65:
				case 68:
					clearInterval(rotation);
					rotation = null;
					break;
				
				case 32:
					clearInterval(shots);
					shots = null;
					break;
			}
		});
	};
}());