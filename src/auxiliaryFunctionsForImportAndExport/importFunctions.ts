import {Dispatch} from "@reduxjs/toolkit";
import {RootState} from "../store/store";
import {addComponent, importStateCanvas} from "../store/canvasSlice";
import {STLLoader} from "three/examples/jsm/loaders/STLLoader";
import {BufferEntity, TRANSF_PARAMS_DEFAULTS} from "../model/ComponentEntity";
import {getNewKeys} from "../components/canvas/components/cube";

export const importProjectFrom = (file: File, dispatch: Dispatch) => {
    file.text().then((value) => {
        let storeState: RootState = JSON.parse(value)
        dispatch(importStateCanvas(storeState.canvas.present))
    })
}

export const importFrom = (STLFile: File, numberOfGeneratedKey: number, dispatch: Dispatch) => {
    let loader = new STLLoader();

    STLFile.arrayBuffer().then((value) => {
        let res = loader.parse(value);
        let entity: BufferEntity = {
            type: 'BUFFER',
            name: 'BUFFER',
            keyComponent: getNewKeys(numberOfGeneratedKey, dispatch)[0],
            orbitEnabled: true,
            transformationParams: TRANSF_PARAMS_DEFAULTS,
            color: '#ec2626',
            previousTransformationParams: TRANSF_PARAMS_DEFAULTS,
            positionVertices: res.attributes.position.array as Float32Array,
            normalVertices: res.attributes.normal.array as Float32Array,
            uvVertices: undefined
        }

        dispatch(addComponent(entity))
    })
}