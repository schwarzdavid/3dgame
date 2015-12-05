(function(){
	"use strict";

	document.addEventListener('DOMContentLoaded', function(){
		/*
		 * Wichtigste THREE.js Elemente erstellen
		 */
		
		var renderer = new THREE.WebGLRenderer({ antialias:true }),
			camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 500),
			ambientLight = new THREE.AmbientLight(0xEAEAEA),
			spotLight = new THREE.SpotLight(0xFFFFFF),
			plane;
		
		window.scene = new THREE.Scene();
		
		
		/*
		 * Standardelemente zu Scene konfigurieren und hinzufügen
		 */
		
		//Camera
		camera.position.set(0, 28, 0);
		camera.lookAt(scene.position);
		scene.add(camera);
		
		//Globales Licht
		scene.add(ambientLight);
		
		//Spotlight
		spotLight.position.set(5, 7, -5);
		scene.add(spotLight);
		
		//Untergrund
		plane = new THREE.Mesh(new THREE.BoxGeometry(17, 0.1, 20), new THREE.MeshLambertMaterial({
			color: 0x555555
		}));
		scene.add(plane);
		
		//Sockets einbinden
		sockets();
		
		/*
		 * Wichtige Konfiguration und render-Funktion
		 */
		renderer.setSize(800, 600);
		renderer.setClearColor(0x202020);
		document.body.appendChild(renderer.domElement);
		
		(function render(){
			renderer.render(scene, camera);
			window.requestAnimationFrame(render);
		}());
	});
}());