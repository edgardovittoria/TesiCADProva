import React, {MutableRefObject, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    addComponent, CanvasState,
    canvasStateSelector, incrementNumberOfGeneratedKey,
    selectComponent,
    setMeshRefComponent,
    updateBox3
} from "../../../store/canvasSlice";
import * as THREE from "three";
import {ComponentEntity} from "../../../model/ComponentEntity";
import {Color} from "@react-three/fiber";
import {Dispatch} from "@reduxjs/toolkit";

type CubeProps = {
    color: Color,
    width: number,
    height: number
    depth: number
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
    const component: ComponentEntity = {
        type: 'CUBE',
        name: 'CUBE',
        keyComponent: getNewKey(canvasState, dispatch),
        orbitEnabled: true,
        position: [0,0,0],
        rotation: [0,0,0],
        scale: [1,1,1],
        componentDetails: {
            propsGeometry: boxGeometry,
            propsMaterial: material
        },
        isSelected: false
    }
    return component
}

export const Cube: React.FC<CubeProps> = (
    {color, width, height, depth}
) => {
    const dispatch = useDispatch();



    useEffect(() => {
        //dispatch(addComponent(component))
        //dispatch(selectComponent(1));
        //dispatch(updateBox3(meshRefComponent.current))
        //dispatch(setMeshRefComponent({key: 1, meshRef: meshRefComponent.current}))
    }, []);


    return(
        <mesh>
            <boxGeometry args={[width, height, depth]} />
            <meshBasicMaterial color={color}/>
        </mesh>
    )
}