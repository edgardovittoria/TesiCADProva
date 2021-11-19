import { Dispatch } from "@reduxjs/toolkit";
import { FC } from "react";
import { TorusEntity } from "../../../model/ComponentEntity";
import { CanvasState } from "../../../store/canvasSlice";
import { getNewKeys } from "./cube";

interface TorusProps {
    torusRadius: number,
    tubeRadius: number,
    radialSegments?: number,
    tubularSegments?: number,
    centralAngle?: number, 
    color: string
}

export function getDefaultTorus(canvasState: CanvasState, dispatch: Dispatch) {
    const component: TorusEntity = {
        type: 'TORUS',
        name: 'TORUS',
        keyComponent: getNewKeys(canvasState, dispatch)[0],
        orbitEnabled: true,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        box3Min: undefined,
        box3Max: undefined,
        color: '#ec2626',
        previousPosition: [0, 0, 0],
        previousRotation: [0, 0, 0],
        previousScale: [1, 1, 1],
        lastTransformationType: undefined,
        tubularSegments: 20,
        torusRadius: 2,
        tubeRadius: 0.4
    }
    return component
}

export const Torus: FC<TorusProps> = ({torusRadius, tubeRadius, radialSegments, tubularSegments, centralAngle, color}) => {

    return (
        <>
            <torusGeometry args={[torusRadius, tubeRadius, radialSegments, tubularSegments, centralAngle]}/>
            <meshBasicMaterial color={color} />
        </>
    )
}