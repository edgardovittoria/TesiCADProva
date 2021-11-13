import { Dispatch } from '@reduxjs/toolkit';
import { SphereEntity } from '../../../model/ComponentEntity';
import { getNewKeys } from './cube';
import {
    CanvasState
} from "../../../store/canvasSlice";
import { FC, useRef } from 'react';
import { Component, ComponentProps } from './Component';

interface SphereProps {
    radius: number,
    widthSegments: number,
    heightSegments: number,
    color: string
    componentProps: ComponentProps
}

export function getDefaultSphere(canvasState: CanvasState, dispatch: Dispatch) {
    const component: SphereEntity = {
        type: 'SPHERE',
        name: 'SPHERE',
        keyComponent: getNewKeys(canvasState, dispatch)[0],
        orbitEnabled: true,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        box3Min: undefined,
        box3Max: undefined,
        radius: 1,
        widthSegments: 20,
        heightSegments: 20,
        color: '#ffcc00',
        isSelected: false,
        previousPosition: [0, 0, 0],
        previousRotation: [0, 0, 0],
        previousScale: [1, 1, 1],
        lastTransformationType: undefined

    }
    return component
}

export const Sphere: FC<SphereProps> = ({ radius, widthSegments, heightSegments, color, componentProps }) => {
    const meshRef = useRef(null)

    return (
        <>
            <Component orbit={componentProps.orbit} position={componentProps.position} rotation={componentProps.rotation} scale={componentProps.scale} keyComponent={componentProps.keyComponent} isSelected={componentProps.isSelected}>
                <mesh ref={meshRef}>
                    <sphereGeometry args={[radius, widthSegments, heightSegments]} />
                    <meshBasicMaterial color={color} />
                </mesh>
               
            </Component>
        </>
    )
}