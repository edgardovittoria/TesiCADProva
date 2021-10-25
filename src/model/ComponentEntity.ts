import {Box3} from "three";
import {ComponentDetails} from "./ComponentDetails";

export type ComponentEntity = {
    name: string
    type: string //diventerà enum
    orbitEnabled: boolean
    position: [number, number, number]
    rotation: [number, number, number]
    scale: [number, number, number]
    componentDetails: ComponentDetails
    keyComponent: number
    isSelected: boolean
}