import { Dispatch } from '@reduxjs/toolkit';
import { SphereEntity } from '../../../model/ComponentEntity';
import { getNewKeys } from './cube';
import {
    CanvasState
} from "../../../store/canvasSlice";
import * as THREE from "three"
import { useMemo } from 'react';

export type SphereProps = {
    radius: number,
    widthSegments: number,
    heightSegments: number,
    color: string
}

export function getDefaultSphere(canvasState: CanvasState, dispatch: Dispatch){
    const component: SphereEntity = {
        type: 'SPHERE',
        name: 'SPHERE',
        keyComponent: getNewKeys(canvasState, dispatch)[0],
        orbitEnabled: true,
        position: [0,0,0],
        rotation: [0,0,0],
        scale: [1,1,1],
        box3Min: undefined,
        box3Max: undefined,
        radius: 1,
        widthSegments: 20,
        heightSegments: 20,
        color: '#ffcc00',
        isSelected: false,
        previousPosition: [0,0,0],
        previousRotation: [0,0,0],
        previousScale: [1,1,1],
        lastTransformationType: undefined

    }
    return component
}

export const Sphere = (
    sphereProps: SphereProps
)  => {
    let mesh = useMemo(() => {
        let color = new THREE.MeshBasicMaterial()
        color.color.set(sphereProps.color)
        let newMesh = new THREE.Mesh(new THREE.SphereGeometry(sphereProps.radius, sphereProps.widthSegments, sphereProps.heightSegments), color)
        return newMesh
    },[sphereProps])
    
    return mesh

}