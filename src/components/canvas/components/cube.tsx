import {MutableRefObject, useState} from 'react';
import {
    CanvasState,
    incrementNumberOfGeneratedKey,
} from "../../../store/canvasSlice";
import {CubeEntity} from "../../../model/ComponentEntity";
import {Dispatch} from "@reduxjs/toolkit";
import * as THREE from 'three'
import { useDispatch } from 'react-redux';

export type CubeProps = {
    color: string,
    width: number,
    height: number
    depth: number
}

export function GetNewKey (canvasState: CanvasState , dispatch: Dispatch, numberOfKeyToGenerate = 1)  {
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
        keyComponent: GetNewKey(canvasState, dispatch)[0],
        orbitEnabled: true,
        position: [0,0,0],
        rotation: [0,0,0],
        scale: [1,1,1],
        box3Min: undefined,
        box3Max: undefined,
        width: 1,
        depth: 1,
        height: 1,
        color: 'red',
        isSelected: false
    }
    return component
}

export const Cube = (
    cubeProps: CubeProps
) => {
    let color = new THREE.MeshBasicMaterial()
    color.color.set(cubeProps.color)
    let mesh = new THREE.Mesh(new THREE.BoxGeometry(cubeProps.width, cubeProps.height, cubeProps.depth), color)

    return(
        mesh
        // <mesh ref={cubeProps.meshRef} onClick={() => cubeProps.clickHandler()}>
        //     <boxGeometry args={[cubeProps.width, cubeProps.height, cubeProps.depth]} />
        //     <meshBasicMaterial color={cubeProps.color}/>
        // </mesh>
    )
}