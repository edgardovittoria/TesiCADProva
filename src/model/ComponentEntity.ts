import { type } from "os"

export type ComponentEntity = {
    name: string
    type: string //diventerà enum
    orbitEnabled: boolean
    position: [number, number, number]
    rotation: [number, number, number]
    scale: [number, number, number]
    previousPosition: [number, number, number]
    previousRotation: [number, number, number]
    previousScale: [number, number, number]
    box3Min: [number ,number ,number ] | undefined
    box3Max: [number,number,number] | undefined
    color: string
    keyComponent: number
    lastTransformationType : string | undefined
}

export type CubeEntity = {
    width: number,
    depth: number,
    height: number
} & ComponentEntity


export type SphereEntity = {
    radius: number,
    widthSegments: number,
    heightSegments: number
} & ComponentEntity

export type CompositeEntity = {
    baseElements : {elementA: ComponentEntity, elementB: ComponentEntity}
} & ComponentEntity

export type BufferEntity = {
    positionVertices: Float32Array
    normalVertices: Float32Array
    uvVertices: Float32Array | undefined
} & ComponentEntity

export type CylinderEntity = {
    topRadius: number,
    bottomRadius: number,
    height: number,
    radialSegments?: number,
    heightSegments?: number,
    openEnded?: boolean,
    thetaLength?: number,
    thetaStart?: number 
} & ComponentEntity

export type TorusEntity = {
    torusRadius: number, 
    tubeRadius: number,
    radialSegments?: number,
    tubularSegments?: number,
    centralAngle?: number
} & ComponentEntity

export type ConeEntity = {
    radius: number,
    height: number,
    radialSegments?: number,
    heightSegments?: number,
    openEnded?: boolean,
    thetaLength?: number,
    thetaStart?: number 
} & ComponentEntity