import {
    CanvasState,
    incrementNumberOfGeneratedKey,
} from "../../../store/canvasSlice";
import { CubeEntity } from "../../../model/ComponentEntity";
import { Dispatch } from "@reduxjs/toolkit";
import { FC, useRef } from "react";
import { Component, ComponentProps } from "./Component";

interface CubeProps {
    color: string,
    width: number,
    height: number,
    depth: number,
    componentProps: ComponentProps
}

export function getNewKeys(canvasState: CanvasState, dispatch: Dispatch, numberOfKeyToGenerate = 1) {
    let lastKey = canvasState.numberOfGeneratedKey
    let newKeys: number[] = []
    for (let i = 1; i <= numberOfKeyToGenerate; i++) {
        newKeys.push(lastKey + i)
    }
    dispatch(incrementNumberOfGeneratedKey(numberOfKeyToGenerate))
    return newKeys;
}


export function getDefaultCube(canvasState: CanvasState, dispatch: Dispatch) {
    const component: CubeEntity = {
        type: 'CUBE',
        name: 'CUBE',
        keyComponent: getNewKeys(canvasState, dispatch)[0],
        orbitEnabled: true,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        box3Min: undefined,
        box3Max: undefined,
        width: 1,
        depth: 1,
        height: 1,
        color: '#ec2626',
        isSelected: false,
        previousPosition: [0, 0, 0],
        previousRotation: [0, 0, 0],
        previousScale: [1, 1, 1],
        lastTransformationType: undefined
    }
    return component
}

export const Cube: FC<CubeProps> = (
    { width, height, depth, color, componentProps }
) => {
    let meshRef = useRef(null)

    return <Component orbit={componentProps.orbit} position={componentProps.position} rotation={componentProps.rotation} scale={componentProps.scale} keyComponent={componentProps.keyComponent} isSelected={componentProps.isSelected}>
        <mesh ref={meshRef}>
            <boxGeometry args={[width, height, depth]} />
            <meshBasicMaterial color={color} />
        </mesh>
    </Component>
}