import '../css/style.css'

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// debug tools
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.setClearColor(0x303030, 1);
document.body.appendChild(renderer.domElement);

// ---- DEBUG ----

// profiling
var stats = new Stats();
stats.showPanel(1);
document.body.appendChild(stats.dom);

var debug_gui = new dat.GUI();

// ---- END DEBUG ----

const loader = new GLTFLoader();

// Load a glTF resource
// const assets = ['./squareCornerA.glb', './ball_green.glb', './narrowRound.glb', './corner.glb', './crest.glb', './open.glb', './straight.glb', './narrowSquare.glb', './tunnelNarrow.glb', './rampC.glb', './tunnelWide.glb', './hillRound.glb', './gap.glb', './wallLeft.glb', './bumpDown.glb', './windmill.glb', './end.glb', './narrowBlock.glb', './block.glb', './bump.glb', './rampB.glb', './wallsToOpen.glb', './roundCornerC.glb', './hillSquare.glb', './tunnelDouble.glb', './holeRound.glb', './club_blue.glb', './rampD.glb', './split.glb', './club_green.glb', './obstacleTriangle.glb', './obstacleBlock.glb', './flag_blue.glb', './obstacleDiamond.glb', './wallRight.glb', './ball_red.glb', './hillCorner.glb', './flag_red.glb', './splitStart.glb', './ball_blue.glb', './splitT.glb', './flag_green.glb', './innerCorner.glb', './holeSquare.glb', './rampSquare.glb', './roundCornerB.glb', './rampSharp.glb', './bumpDownWalls.glb', './club_red.glb', './holeOpen.glb', './start.glb', './roundCornerA.glb', './castle.glb', './side.glb', './splitWallsToOpen.glb', './rampA.glb', './bumpWalls.glb'];
// for (let x = 0; x < assets.length; x++) {
	
// 	((innerX) => {
// 		const asset_name = assets[innerX];
// 		loader.load(
// 			// resource URL
// 			'/assets/Kenney Tiles/Models/GLTF format/' + asset_name,
// 			// called when the resource is loaded
// 			function (gltf) {
// 				console.log(asset_name);
// 				const index = assets.indexOf(asset_name)
// 				console.log(index);
// 				gltf.scene.position.set(index % 10, 0, Math.round(index / 10));
// 				scene.add(gltf.scene);

// 				//gltf.animations; // Array<THREE.AnimationClip>
// 				//gltf.scene; // THREE.Group
// 				//gltf.scenes; // Array<THREE.Group>
// 				//gltf.cameras; // Array<THREE.Camera>
// 				//gltf.asset; // Object

// 			},
// 			// called while loading is progressing
// 			function (xhr) {
// 				console.log((xhr.loaded / xhr.total * 100) + '% loaded');
// 			},
// 			// called when loading has errors
// 			function (error) {
// 				console.log('GLTF Loading Error: ' + error);
// 			}
// 		);
// 	})(x);
// }

const ambient_light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambient_light);

const spotlight = new THREE.SpotLight(0xffffff);
spotlight.position.set(0, 10, 0);
scene.add(spotlight);

debug_gui.remember(spotlight);
var light_rot_folder = debug_gui.addFolder("Light Rotation");
light_rot_folder.add(spotlight.position, "x", 0, 360, 1)
light_rot_folder.add(spotlight.position, "z", 0, 360, 1)
light_rot_folder.add(spotlight.position, "y", 0, 360, 1)

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.z = 5;
controls.update();

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	requestAnimationFrame(animate);

	stats.begin();
	controls.update();

	renderer.render(scene, camera);
	stats.end();
}
animate();