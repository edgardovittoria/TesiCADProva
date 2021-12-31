import {STLExporter} from "three/examples/jsm/exporters/STLExporter";
import * as THREE from "three";
import { CanvasState } from "@Draco112358/cad-library";

export const exportProjectFrom = (canvas: CanvasState) => {
    return JSON.stringify(canvas)
}

export const exportToSTLFormatFrom = (meshes: THREE.Mesh[]) => {
    let exporter = new STLExporter();
    let scene = new THREE.Scene()
    meshes.map(mesh => scene.add(mesh.clone()))
    return exporter.parse(scene)
}