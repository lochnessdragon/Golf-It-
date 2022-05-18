import * as THREE from 'three';
import * as dat from 'dat.gui';
import * as DatUtils from './dat-utils.ts';

export class Player {
		material: THREE.MeshPhysicalMaterial;
		model: THREE.Mesh;
	
		constructor(scene: THREE.Scene, color: THREE.Color) {
			// create golf ball mesh
			const geometry = new THREE.SphereGeometry(1, 32, 16 );
			this.material = new THREE.MeshPhysicalMaterial({ color: color });

			this.model = new THREE.Mesh(geometry, this.material);

			scene.add(this.model);
		}

		setupDatGUI(gui: dat.GUI) {
			var folder = gui.addFolder("Player");
			
			folder.add(this.material, "wireframe");
			folder.add(this.material, "clearcoat", 0, 1);
			folder.add(this.material, "clearcoatRoughness", 0, 1);
			folder.add(this.material, "ior", 1, 2.333);
			folder.add(this.material, "reflectivity", 0, 1);
			folder.add(this.material, "sheen", 0, 1);
			folder.add(this.material, "roughness", 0, 1);
			
			DatUtils.addColor(folder, this.material.color, "Player Color");
		}
}