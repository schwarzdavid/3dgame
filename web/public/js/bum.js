(function(){
	"use strict";
	
	window.bum = function(data){
		var sphere, move;
		
		function bam(mesh){
			clearInterval(move);
			scene.remove(sphere);
			
			for(var i in tanks){
				if(tanks[i].getTank().uuid === mesh.object.parent.uuid){
					tanks[i].makeKrachbum();
					break;
				}
			}
		}
		
		sphere = new THREE.Mesh(new THREE.SphereGeometry(0.18), new THREE.MeshLambertMaterial({
			color: data.color
		}));
		sphere.position.set(data.x - 1.5 * Math.sin(data.angle), 0.8, data.z - 1.5 * Math.cos(data.angle));
		
		move = setInterval(function(){
			sphere.position.z -= 0.3 * Math.cos(data.angle);
			sphere.position.x -= 0.3 * Math.sin(data.angle);
			
			var originPos = sphere.position.clone();
			
			for(var vertexIndex = 0; vertexIndex < sphere.geometry.vertices.length; vertexIndex++){
				var localVertex = sphere.geometry.vertices[vertexIndex].clone(),
					globalVertex = localVertex.applyMatrix4(sphere.matrix),
					directionVector = globalVertex.sub(sphere.position);
				
				var ray = new THREE.Raycaster(originPos, directionVector.clone().normalize()),
					tankArray = (function(){
						var output = [];
						Object.keys(tanks).map(function(key){
							var s = tanks[key].getTank();
							s.traverse(function(node){
								if(node instanceof THREE.Mesh){
									output.push(node);
								}
							});
						});
						return output;
					}()),
					collisionResults = ray.intersectObjects(tankArray, true);
				
				if(collisionResults.length > 0 && collisionResults[0].distance < 0.5){
					bam(collisionResults[0]);
					break;
				}
			}
		}, 100/6);
		
		scene.add(sphere);
	};
}());