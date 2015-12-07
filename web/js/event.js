(function(){
	"use strict";
	
	window.events = function(actions, keys){
		var rotation, movement, shots;
		
		window.addEventListener('keydown', function(e){
			console.log(e.keyCode);
			
			e.preventDefault();
			
			switch(e.keyCode){
				case keys.foward:
					if(!movement){
						movement = setInterval(function(){
							actions.move(-0.1);
						}, 100/6);
					}
					break;
				
				case keys.back:
					if(!movement){
						movement = setInterval(function(){
							actions.move(0.05);
						}, 100/6);
					}
					break;
					
				case keys.left:
					if(!rotation){
						rotation = setInterval(function(){
							actions.rotate(Math.PI / 60)
						}, 100/6);
					}
					break;
					
				case keys.right:
					if(!rotation){
						rotation = setInterval(function(){
							actions.rotate(-Math.PI / 60);
						}, 100/6);
					}
					break;
					
				case keys.bum:
					if(!shots){
						actions.bum();
						shots = setInterval(function(){
							actions.bum();
						}, 200);
					}
					break;
			}
		});
		
		window.addEventListener('keyup', function(e){
			e.preventDefault();
			
			switch(e.keyCode){
				case keys.foward:
				case keys.back:
					clearInterval(movement);
					movement = null;
					break;
					
				case keys.left:
				case keys.right:
					clearInterval(rotation);
					rotation = null;
					break;
				
				case keys.bum:
					clearInterval(shots);
					shots = null;
					break;
			}
		});
	};
}());