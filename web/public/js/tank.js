(function(){
	"use strict";
	
	window.Tank = function(data){
		var body, cannon, tank, turret, settings = {}, actions;
		
		settings.keys = data.keys;
		settings.color = 0x00FF00;
		if(data.color){
			settings.color = data.color;
		}
		
		actions = {
			move: function(dist){
				tank.position.z += dist * Math.cos(tank.rotation.y);
				tank.position.x += dist * Math.sin(tank.rotation.y);
			},
			
			rotate: function(deg){
				tank.rotation.y += deg;
			},
			
			bum: function(){
				new bum({
					x: tank.position.x,
					z: tank.position.z,
					color: settings.color,
					angle: tank.rotation.y
				});
			}
		}
		
		tank = new THREE.Scene();
		
		body = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.6, 2), new THREE.MeshLambertMaterial({
			color: settings.color
		}));
		body.position.y = -0.7;
		body.castShadow = true;
		body.receiveShadow = true;
		tank.add(body);
		
		cannon = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1.7, 8), new THREE.MeshLambertMaterial({
			color: 0x00FF00
		}));
		cannon.position.y = -0.1;
		cannon.position.z = -0.2;
		cannon.rotation.x = Math.PI / 2;
		cannon.castShadow = true;
		cannon.receiveShadow = true;
		tank.add(cannon);
		
		turret = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.4, 6), new THREE.MeshLambertMaterial({
			color: settings.color
		}));
		turret.position.z = 0.4;
		tank.add(turret);
		
		tank.position.set(0, 1, 0);
		tank.castShadow = true;
		tank.receiveShadow = true;
		scene.add(tank);
		
		window.events(actions, settings.keys);
	};
}());