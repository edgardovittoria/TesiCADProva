import {Store} from "@reduxjs/toolkit";
import {CanvasState} from "../store/canvasSlice";
import {STLExporter} from "three/examples/jsm/exporters/STLExporter";
import * as THREE from "three";
import {meshFrom} from "../auxiliaryFunctionsUsingThreeDirectly/meshOpsAndSettings";
import {ComponentEntity} from "../model/ComponentEntity";

export const exportProjectFrom = (store: Store) => {
    return JSON.stringify(store.getState())
}

export const exportToSTLFormatFrom = (canvasState: CanvasState) => {
    let exporter = new STLExporter();
    let scene = new THREE.Scene()
    canvasState.components.map(component => {
        let componentToExport: ComponentEntity = component
        if (canvasState.components.length === 1) {
            componentToExport = {
                ...component,
                transformationParams: {...component.transformationParams, position: [0,0,0]}
            }
        }

        let mesh = meshFrom(componentToExport);
        mesh.position.set(...componentToExport.transformationParams.position)
        mesh.scale.set(...componentToExport.transformationParams.scale)
        mesh.rotation.set(...componentToExport.transformationParams.rotation)

        scene.add(mesh)
        scene.updateWorldMatrix(true, true)

    })
    return exporter.parse(scene)
}