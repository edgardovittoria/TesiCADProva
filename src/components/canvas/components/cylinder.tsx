import { Dispatch } from "@reduxjs/toolkit";
import { FC } from "react";
import { CylinderEntity, TRANSF_PARAMS_DEFAULTS } from "../../../model/ComponentEntity";
import { CanvasState } from "../../../store/canvasSlice";
import { getNewKeys } from "./cube";

interface CylinderProps {
    topRadius: number,
    bottomRadius: number,
    height: number,
    radialSegments?: number,
    heightSegments?: number,
    openEnded?: boolean,
    thetaLength?: number,
    thetaStart?: number,
    color: string
}

export function getDefaultCylinder(canvasState: CanvasState, dispatch: Dispatch) {
    const component: CylinderEntity = {
        type: 'CYLINDER',
        name: 'CYLINDER',
        keyComponent: getNewKeys(canvasState, dispatch)[0],
        orbitEnabled: true,
        transformationParams: TRANSF_PARAMS_DEFAULTS,
        height: 1,
        color: getComputedStyle(document.documentElement).getPropertyValue('--cylinderColor').replace(' ', ''),
        previousTransformationParams: TRANSF_PARAMS_DEFAULTS,
        lastTransformationType: undefined,
        topRadius: 1,
        bottomRadius: 1,
        radialSegments: 20
    }
    return component
}


export const Cylinder: FC<CylinderProps> = (
    { topRadius, bottomRadius, height, radialSegments, heightSegments, openEnded, thetaLength, thetaStart, color}
) => {

    return (
        <>
            <cylinderGeometry args={[topRadius, bottomRadius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength]} />
            <meshPhongMaterial color={color} />
        </>
    )
}