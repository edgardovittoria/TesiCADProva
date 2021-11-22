import {Store} from "@reduxjs/toolkit";
import {CanvasState} from "../store/canvasSlice";
import {STLExporter} from "three/examples/jsm/exporters/STLExporter";
import * as THREE from "three";
import {FactoryComponent} from "../components/factory/FactoryComponent";
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
        if(canvasState.components.length === 1){
            componentToExport = {
                ...component,
                position: [0,0,0]
            }
        }
        if (componentToExport.box3Min !== undefined && componentToExport.box3Max !== undefined) {
            let mesh = meshFrom(componentToExport);
            mesh.position.set(componentToExport.position[0], componentToExport.position[1], componentToExport.position[2])
            mesh.scale.set(componentToExport.scale[0], componentToExport.scale[1], componentToExport.scale[2])
            mesh.rotation.set(componentToExport.rotation[0], componentToExport.rotation[1], componentToExport.rotation[2])
            mesh.geometry.computeBoundingBox()
            mesh.geometry.boundingBox?.min.set(componentToExport.box3Min[0], componentToExport.box3Min[1], componentToExport.box3Min[2])
            mesh.geometry.boundingBox?.max.set(componentToExport.box3Max[0], componentToExport.box3Max[1], componentToExport.box3Max[2])

            scene.add(mesh)
            scene.updateWorldMatrix(true, true)
        }
    })
    return exporter.parse(scene)
}