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
		scene.add(plane);
		
		//Sockets einbinden
		sockets();
		
		/*
		 * Wichtige Konfiguration und render-Funktion
		 */
		renderer.setSize(800, 600);
		renderer.setClearColor(0x202020);
		document.body.appendChild(renderer.domElement);
		
		setInterval(function(){
			window.requestAnimationFrame(function(){
				renderer.render(scene, camera);
			});
		}, 100/6);
	});
}());