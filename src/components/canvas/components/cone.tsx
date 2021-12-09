import { Dispatch } from "@reduxjs/toolkit";
import { FC } from "react";
import { ConeEntity, CylinderEntity, TRANSF_PARAMS_DEFAULTS } from "../../../model/ComponentEntity";
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
        transformationParams: TRANSF_PARAMS_DEFAULTS,
        height: 1,
        color: getComputedStyle(document.documentElement).getPropertyValue('--coneColor').replace(' ', ''),
        previousTransformationParams: TRANSF_PARAMS_DEFAULTS,
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