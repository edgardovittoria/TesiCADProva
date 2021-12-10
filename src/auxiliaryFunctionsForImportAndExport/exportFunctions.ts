import {Store} from "@reduxjs/toolkit";
import {STLExporter} from "three/examples/jsm/exporters/STLExporter";
import * as THREE from "three";

export const exportProjectFrom = (store: Store) => {
    return JSON.stringify(store.getState())
}

export const exportToSTLFormatFrom = (meshes: THREE.Mesh[]) => {
    let exporter = new STLExporter();
    let scene = new THREE.Scene()
    meshes.map(mesh => scene.add(mesh.clone()))
    return exporter.parse(scene)
}