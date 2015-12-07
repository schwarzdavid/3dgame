(function(){
	"use strict";

	document.addEventListener('DOMContentLoaded', function(){
		/*
		 * Wichtigste THREE.js Elemente erstellen
		 */
		
		var renderer = new THREE.WebGLRenderer({ antialias:true }),
			camera = new THREE.PerspectiveCamera(35, 800/600, 1, 500),
			ambientLight = new THREE.AmbientLight(0x888888),
			spotLight = new THREE.SpotLight(0xFFFFFF),
			plane;
		
		window.scene = new THREE.Scene();
		
		
		/*
		 * Standardelemente zu Scene konfigurieren und hinzufügen
		 */
		
		//Camera
		camera.position.set(20, 18, 10);
		camera.lookAt(scene.position);
		scene.add(camera);
		
		//Globales Licht
		scene.add(ambientLight);
		
		//Spotlight
		spotLight.position.set(-20, 18, -10);
		scene.add(spotLight);
		
		//Untergrund
		plane = new THREE.Mesh(new THREE.CubeGeometry(15, 0.1, 15), new THREE.MeshLambertMaterial({
			color: 0x555555
		}));
		plane.castShadow = true;
		plane.receiveShadow = true;
		plane.name = 'unterplatte';
		scene.add(plane);
		
		//Spieler hinzufügen
		tanks['p1'] = new Tank({
			color: 0x1f2d77,
			keys: {
				foward: 87,
				back: 83,
				left: 65,
				right: 68,
				bum: 70
			},
			name: 'Spieler 1',
			coords: {
				x: -5,
				z: -5
			},
			rotation: Math.PI
		});
		
		tanks['p2'] = new Tank({
			color: 0x38771f,
			keys: {
				foward: 38,
				back: 40,
				left: 37,
				right: 39,
				bum: 191
			},
			name: 'Spieler 2',
			coords: {
				x: 5,
				z: 5
			},
			rotation: 0
		});
		
		/*
		 * Wichtige Konfiguration und render-Funktion
		 */
		renderer.setSize(800, 600);
		renderer.setClearColor(0x202020);
		renderer.shadowMap.enabled = true;
		document.body.appendChild(renderer.domElement);
		
		setInterval(function(){
			window.requestAnimationFrame(function(){
				renderer.render(scene, camera);
			});
		}, 100/6);
	});
}());