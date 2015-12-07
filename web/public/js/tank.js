(function(){
	"use strict";
	
	window.Tank = function(settings){
		var body, cannon, tank, turret, actions, hp = 10, label;
		
		//MOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE NOPE
		/*function collisionDetection(){
			var originPos = tank.position.clone();
			
			//console.log(tank.children[0].geometry.vertices[0].clone());
			
			for(var vertexIndex = 0; vertexIndex < tank.children[0].geometry.vertices.length; vertexIndex++){
				
				var localVertex = tank.children[0].geometry.vertices[vertexIndex].clone(),
					globalVertex = localVertex.applyMatrix4(scene.matrix),
					directionVector = globalVertex.sub(tank.position);
				
				//console.log(globalVertex);
				
				var ray = new THREE.Raycaster(originPos, directionVector.clone().normalize()),
					tankArray = (function(){
						var output = [];
						Object.keys(tanks).map(function(key){
							var s = tanks[key].getTank();
							if(s !== this){
								output.push(s.children[0]);
							}
						});
						return output;
					}()),
					collisionResults = ray.intersectObjects(tankArray, true);
				
				if(collisionResults.length > 0 && collisionResults[0].distance < 0.49){
					return false;
				}
			}
			return true;
		}*/
		
		actions = {
			move: function(dist){
				tank.position.z += dist * Math.cos(tank.rotation.y);
				tank.position.x += dist * Math.sin(tank.rotation.y);
				
				/*if(!collisionDetection()){
					tank.position.z -= dist * Math.cos(tank.rotation.y);
					tank.position.x -= dist * Math.sin(tank.rotation.y);
				}*/
				
				var check = true, unterplatte = scene.getObjectByName('unterplatte');
				for(var i in unterplatte.geometry.vertices){
					if(unterplatte.geometry.vertices[i].x > 0 && unterplatte.geometry.vertices[i].x < tank.position.x){
						check = false;
					}
					if(unterplatte.geometry.vertices[i].z > 0 && unterplatte.geometry.vertices[i].z < tank.position.z){
						check = false;
					}
					if(unterplatte.geometry.vertices[i].x < 0 && unterplatte.geometry.vertices[i].x > tank.position.x){
						check = false;
					}
					if(unterplatte.geometry.vertices[i].z < 0 && unterplatte.geometry.vertices[i].z > tank.position.z){
						check = false;
					}
				}
				if(!check){
					tank.position.z -= dist * Math.cos(tank.rotation.y);
					tank.position.x -= dist * Math.sin(tank.rotation.y);
				}
			},
			
			rotate: function(deg){
				tank.rotation.y += deg;
				label.rotation.y -= deg;
				
				/*if(!collisionDetection()){
					tank.rotation.y -= deg;
				}*/
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
		
		label = new THREE.TextGeometry(settings.name, {
			size: 0.25,
			height: 0.01
		});
		label.translate(-0.5, 0, 0);
		
		label = new THREE.Mesh(label, new THREE.MeshBasicMaterial({
			color: 0xFFFFFF,
			side: THREE.DoubleSide
		}));
		label.position.set(0, 0.7, 0);
		label.rotation.y = Math.PI / 2 + settings.rotation;
		tank.add(label);
		
		tank.position.set(settings.coords.x, 1, settings.coords.z);
		tank.rotation.y = settings.rotation;
		tank.castShadow = true;
		tank.receiveShadow = true;
		scene.add(tank);
		
		window.events(actions, settings.keys);
		
		this.getTank = function(){
			return tank;
		};
		
		this.makeKrachbum = function(){
			hp--;
			if(hp === 0){
				alert(settings.name + ' hat verloren! Muahahahaha >:D');
				window.location.reload();
			}
		};
	};
}());