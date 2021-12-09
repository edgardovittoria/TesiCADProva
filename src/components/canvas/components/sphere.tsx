import { Dispatch } from '@reduxjs/toolkit';
import { SphereEntity, TRANSF_PARAMS_DEFAULTS } from '../../../model/ComponentEntity';
import { getNewKeys } from './cube';
import {
    CanvasState
} from "../../../store/canvasSlice";
import { FC } from 'react';

interface SphereProps {
    radius: number,
    widthSegments: number,
    heightSegments: number,
    color: string
}

export function getDefaultSphere(canvasState: CanvasState, dispatch: Dispatch) {
    const component: SphereEntity = {
        type: 'SPHERE',
        name: 'SPHERE',
        keyComponent: getNewKeys(canvasState, dispatch)[0],
        orbitEnabled: true,
        transformationParams: TRANSF_PARAMS_DEFAULTS,
        radius: 1,
        widthSegments: 20,
        heightSegments: 20,
        color: getComputedStyle(document.documentElement).getPropertyValue('--sphereColor').replace(' ', ''),
        previousTransformationParams: TRANSF_PARAMS_DEFAULTS,
        lastTransformationType: undefined

    }
    return component
}

export const Sphere: FC<SphereProps> = ({ radius, widthSegments, heightSegments, color }) => {
    return (
        <>
            <sphereGeometry args={[radius, widthSegments, heightSegments]} />
            <meshPhongMaterial color={color} />
        </>
    )
}