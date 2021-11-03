import { Dispatch } from '@reduxjs/toolkit';
import { SphereEntity } from '../../../model/ComponentEntity';
import { GetNewKey } from './cube';
import {
    CanvasState
} from "../../../store/canvasSlice";
import * as THREE from "three"

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
        keyComponent: GetNewKey(canvasState, dispatch)[0],
        orbitEnabled: true,
        position: [0,0,0],
        rotation: [0,0,0],
        scale: [1,1,1],
        box3Min: undefined,
        box3Max: undefined,
        radius: 1,
        widthSegments: 20,
        heightSegments: 20,
        color: 'yellow',
        isSelected: false
    }
    return component
}

export const Sphere = (
    sphereProps: SphereProps
)  => {
    let color = new THREE.MeshBasicMaterial()
    color.color.set(sphereProps.color)
    let mesh = new THREE.Mesh(new THREE.SphereGeometry(sphereProps.radius, sphereProps.widthSegments, sphereProps.heightSegments), color)

    return(
        mesh)

}