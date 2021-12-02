import { Dispatch } from "@reduxjs/toolkit";
import { FC } from "react";
import { ConeEntity, CylinderEntity } from "../../../model/ComponentEntity";
import { CanvasState } from "../../../store/canvasSlice";
import { getNewKeys } from "./cube";

interface ConeProps {
    radius: number,
    height: number,
    radialSegments?: number,
    heightSegments?: number,
    openEnded?: boolean,
    thetaLength?: number,
    thetaStart?: number,
    color: string
}

export function getDefaultCone(canvasState: CanvasState, dispatch: Dispatch) {
    const component: ConeEntity = {
        type: 'CONE',
        name: 'CONE',
        keyComponent: getNewKeys(canvasState, dispatch)[0],
        orbitEnabled: true,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        box3Min: undefined,
        box3Max: undefined,
        height: 1,
        color: getComputedStyle(document.documentElement).getPropertyValue('--coneColor'),
        previousPosition: [0, 0, 0],
        previousRotation: [0, 0, 0],
        previousScale: [1, 1, 1],
        lastTransformationType: undefined,
        radius: 1,
        radialSegments: 20
    }
    return component
}


export const Cone: FC<ConeProps> = (
    { radius, height, radialSegments, heightSegments, openEnded, thetaLength, thetaStart, color}
) => {

    return (
        <>
            <coneGeometry args={[radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength]} />
            <meshPhongMaterial color={color} />
        </>
    )
}