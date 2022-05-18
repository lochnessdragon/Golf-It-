import * as dat from 'dat.gui';
import * as THREE from 'three';

// makes a folder for a color in a dat gui object
export function addColor(gui: dat.GUI, color: THREE.Color, label: string) {
	var folder = gui.addFolder(label);
	folder.add(color, "r", 0, 1, 0.05);
	folder.add(color, "g", 0, 1, 0.05);
	folder.add(color, "b", 0, 1, 0.05);
}