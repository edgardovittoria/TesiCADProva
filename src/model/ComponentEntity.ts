import {Box3, Mesh} from "three";
import {ComponentDetails} from "./ComponentDetails";
import {MeshProps} from "@react-three/fiber";

export type ComponentEntity = {
    name: string
    type: string //diventerà enum
    orbitEnabled: boolean
    position: [number, number, number]
    rotation: [number, number, number]
    scale: [number, number, number]
    mesh: MeshProps
    keyComponent: number
    isSelected: boolean
}