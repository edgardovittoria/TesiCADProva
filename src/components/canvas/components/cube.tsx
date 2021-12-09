import {
    CanvasState,
    incrementNumberOfGeneratedKey,
} from "../../../store/canvasSlice";
import { CubeEntity, TRANSF_PARAMS_DEFAULTS } from "../../../model/ComponentEntity";
import { Dispatch } from "@reduxjs/toolkit";
import { FC } from "react";

interface CubeProps {
    color: string,
    width: number,
    height: number,
    depth: number
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
        transformationParams: TRANSF_PARAMS_DEFAULTS,
        width: 1,
        depth: 1,
        height: 1,
        color: getComputedStyle(document.documentElement).getPropertyValue('--cubeColor').replace(' ', '') ,
        previousTransformationParams: TRANSF_PARAMS_DEFAULTS,
        lastTransformationType: undefined
    }
    return component
}

export const Cube: FC<CubeProps> = (
    { width, height, depth, color }
) => {
    return (
        <>
            <boxGeometry args={[width, height, depth]} />
            <meshPhongMaterial color={color} />
        </>
    )
}