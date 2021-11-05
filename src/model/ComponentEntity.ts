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
    isSelected: boolean
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
    geometryPositionVertices: Float32Array | undefined,
    geometryNormalVertices: Float32Array | undefined,
    geometryUvVertices: Float32Array | undefined
} & ComponentEntity