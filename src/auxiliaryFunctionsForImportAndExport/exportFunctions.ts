import {Store} from "@reduxjs/toolkit";
import {CanvasState} from "../store/canvasSlice";
import {STLExporter} from "three/examples/jsm/exporters/STLExporter";
import * as THREE from "three";
import {FactoryComponent} from "../components/factory/FactoryComponent";
import {meshFrom} from "../auxiliaryFunctionsUsingThreeDirectly/meshOpsAndSettings";

export const exportProjectFrom = (store: Store) => {
    return JSON.stringify(store.getState())
}

export const exportToSTLFormatFrom = (canvasState: CanvasState) => {
    let exporter = new STLExporter();
    let scene = new THREE.Scene()
    canvasState.components.map(component => {
        if (component.box3Min !== undefined && component.box3Max !== undefined) {
            let mesh = meshFrom(component);
            mesh.position.set(component.position[0], component.position[1], component.position[2])
            mesh.scale.set(component.scale[0], component.scale[1], component.scale[2])
            mesh.rotation.set(component.rotation[0], component.rotation[1], component.rotation[2])
            mesh.geometry.computeBoundingBox()
            mesh.geometry.boundingBox?.min.set(component.box3Min[0], component.box3Min[1], component.box3Min[2])
            mesh.geometry.boundingBox?.max.set(component.box3Max[0], component.box3Max[1], component.box3Max[2])

            scene.add(mesh)
            scene.updateWorldMatrix(true, true)
        }
    })
    return exporter.parse(scene)
}