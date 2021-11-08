import {
    CanvasState,
    incrementNumberOfGeneratedKey,
} from "../../../store/canvasSlice";
import {CubeEntity} from "../../../model/ComponentEntity";
import {Dispatch} from "@reduxjs/toolkit";
import * as THREE from 'three'
import { useMemo } from "react";

export type CubeProps = {
    color: string,
    width: number,
    height: number
    depth: number
}

export function getNewKeys (canvasState: CanvasState , dispatch: Dispatch, numberOfKeyToGenerate = 1)  {
    let lastKey = canvasState.numberOfGeneratedKey
    let newKeys: number[] = []
    for(let i=1; i<=numberOfKeyToGenerate; i++){
        newKeys.push(lastKey+i)
    }
    dispatch(incrementNumberOfGeneratedKey(numberOfKeyToGenerate))
    return newKeys;
}


export function getDefaultCube(canvasState: CanvasState, dispatch: Dispatch){
    const component: CubeEntity = {
        type: 'CUBE',
        name: 'CUBE',
        keyComponent: getNewKeys(canvasState, dispatch)[0],
        orbitEnabled: true,
        position: [0,0,0],
        rotation: [0,0,0],
        scale: [1,1,1],
        box3Min: undefined,
        box3Max: undefined,
        width: 1,
        depth: 1,
        height: 1,
        color: '#ec2626',
        isSelected: false,
        previousPosition: [0,0,0],
        previousRotation: [0,0,0],
        previousScale: [1,1,1],
        lastTransformationType: undefined
    }
    return component
}

export const Cube = (
    cubeProps: CubeProps
) => {
        let color = new THREE.MeshBasicMaterial()
        color.color.set(cubeProps.color)
        let newMesh = new THREE.Mesh(new THREE.BoxGeometry(cubeProps.width, cubeProps.height, cubeProps.depth), color)
        return newMesh
    
    
    return newMesh
}