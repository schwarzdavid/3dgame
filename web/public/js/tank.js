(function(){
	"use strict";
	
	window.Tank = function(data){
		var body, cannon, tank;
		
		tank = new THREE.Scene();
		
		body = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 2), new THREE.MeshLambertMaterial({
			color: 0xFF0000
		}));
		tank.add(body);
		
		cannon = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.5, 8), new THREE.MeshLambertMaterial({
			color: 0x00FF00
		}));
		tank.add(cannon);
		
		tank.position.set(0, 1, 0);
		scene.add(tank);
	};
}());