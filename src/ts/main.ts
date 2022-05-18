import '../css/style.css'

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// debug tools
import * as Stats from 'stats.js';
import * as dat from 'dat.gui';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.setClearColor(0x303030, 1);
document.body.appendChild( renderer.domElement );

// ---- DEBUG ----

// profiling
var stats = new Stats();
stats.showPanel(1);
document.body.appendChild(stats.dom);

var debug_gui = new dat.GUI();

// ---- END DEBUG ----

const loader = new GLTFLoader();

// Load a glTF resource
loader.load(
	// resource URL
	'/assets/Kenney Tiles/Models/GLTF format/open.glb',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

		//gltf.animations; // Array<THREE.AnimationClip>
		//gltf.scene; // THREE.Group
		//gltf.scenes; // Array<THREE.Group>
		//gltf.cameras; // Array<THREE.Camera>
		//gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'GLTF Loading Error: ' + error);

	}
);

const ambient_light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( ambient_light );

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

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
	
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
	requestAnimationFrame( animate );

	stats.begin();
	controls.update();
	
	renderer.render( scene, camera );
	stats.end();
}
animate();