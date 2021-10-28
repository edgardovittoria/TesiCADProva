import React, {MutableRefObject, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    addComponent, CanvasState,
    canvasStateSelector, incrementNumberOfGeneratedKey,
    selectComponent,
} from "../../../store/canvasSlice";
import * as THREE from "three";
import {ComponentEntity, CubeEntity} from "../../../model/ComponentEntity";
import {Color, MeshProps} from "@react-three/fiber";
import {Dispatch} from "@reduxjs/toolkit";

export type CubeProps = {
    color: Color,
    width: number,
    height: number
    depth: number
    meshRef: MutableRefObject<null>
    clickHandler: Function
}

export const getNewKey = (canvasState: CanvasState , dispatch: Dispatch) => {
    const newKey = canvasState.numberOfGeneratedKey + 1;
    dispatch(incrementNumberOfGeneratedKey())
    return newKey;
}


export function getDefaultCube(canvasState: CanvasState, dispatch: Dispatch){
    const component: CubeEntity = {
        type: 'CUBE',
        name: 'CUBE',
        keyComponent: getNewKey(canvasState, dispatch),
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

    return(
        <mesh ref={cubeProps.meshRef} onClick={() => cubeProps.clickHandler()}>
            <boxGeometry args={[cubeProps.width, cubeProps.height, cubeProps.depth]} />
            <meshBasicMaterial color={cubeProps.color}/>
        </mesh>
    )
}