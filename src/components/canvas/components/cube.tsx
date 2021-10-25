import React, {MutableRefObject, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    addComponent, CanvasState,
    canvasStateSelector, incrementNumberOfGeneratedKey,
    selectComponent,
    setMeshRefComponent,
} from "../../../store/canvasSlice";
import * as THREE from "three";
import {ComponentEntity} from "../../../model/ComponentEntity";
import {Color, MeshProps} from "@react-three/fiber";
import {Dispatch} from "@reduxjs/toolkit";

type CubeProps = {
    color: Color,
    width: number,
    height: number
    depth: number
    clickHandler: Function
}

export const getNewKey = (canvasState: CanvasState , dispatch: Dispatch) => {
    const newKey = canvasState.numberOfGeneratedKey + 1;
    dispatch(incrementNumberOfGeneratedKey())
    return newKey;
}


export function getCube(canvasState: CanvasState, dispatch: Dispatch){
    let boxGeometry = new THREE.BoxGeometry()
    let material = new THREE.MeshBasicMaterial();
    material.color = new THREE.Color('red')
    boxGeometry.computeBoundingBox()
    let mesh = new THREE.Mesh(boxGeometry, material)
    const component: ComponentEntity = {
        type: 'CUBE',
        name: 'CUBE',
        keyComponent: getNewKey(canvasState, dispatch),
        orbitEnabled: true,
        position: [0,0,0],
        rotation: [0,0,0],
        scale: [1,1,1],
        mesh: mesh as unknown as MeshProps,
        isSelected: false
    }
    return component
}

export const Cube: React.FC<CubeProps> = (
    {color, width, height, depth, clickHandler}
) => {

    return(
        <mesh onClick={() => clickHandler()}>
            <boxGeometry args={[width, height, depth]} />
            <meshBasicMaterial color={color}/>
        </mesh>
    )
}