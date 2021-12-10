import {Dispatch} from "@reduxjs/toolkit";
import {RootState} from "../store/store";
import {addComponent, importStateCanvas} from "../store/canvasSlice";
import {STLLoader} from "three/examples/jsm/loaders/STLLoader";
import {BufferEntity} from "../model/ComponentEntity";
import {getNewKeys} from "../components/canvas/components/cube";

export const importProjectFrom = (file: File, dispatch: Dispatch) => {
    file.text().then((value) => {
        let storeState: RootState = JSON.parse(value)
        dispatch(importStateCanvas(storeState.canvas.present))
    })
}

export const importFrom = (STLFile: File, numberOfGeneratedKey: number, dispatch: Dispatch) => {
    let loader = new STLLoader();
    STLFile.text().then((value) => {
        let res = loader.parse(value);
        let entity: BufferEntity = {
            type: 'BUFFER',
            name: 'BUFFER',
            keyComponent: getNewKeys(numberOfGeneratedKey, dispatch)[0],
            orbitEnabled: true,
            transformationParams: {position: [0,0,0], rotation: [0,0,0], scale: [1,1,1]},
            color: '#ec2626',
            previousTransformationParams: {position: [0,0,0], rotation: [0,0,0], scale: [1,1,1]},
            positionVertices: res.attributes.position.array as Float32Array,
            normalVertices: res.attributes.normal.array as Float32Array,
            uvVertices: undefined
        }

        dispatch(addComponent(entity))
    })
}