(function(){
	"use strict";
	
	window.bum = function(data){
		var sphere, move;
		
		sphere = new THREE.Mesh(new THREE.SphereGeometry(0.18), new THREE.MeshLambertMaterial({
			color: data.color
		}));
		sphere.position.set(data.x - Math.sin(data.angle), 0.8, data.z - Math.cos(data.angle));
		
		move = setInterval(function(){
			sphere.position.z -= 0.3 * Math.cos(data.angle);
			sphere.position.x -= 0.3 * Math.sin(data.angle);
		}, 100/6);
		
		scene.add(sphere);
	};
}());