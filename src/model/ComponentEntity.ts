export type ComponentEntity = {
    name: string
    type: string //diventerà enum
    orbitEnabled: boolean
    position: [number, number, number]
    rotation: [number, number, number]
    scale: [number, number, number]
    box3Min: [number ,number ,number ] | undefined
    box3Max: [number,number,number] | undefined
    color: string
    keyComponent: number
    isSelected: boolean
}

export type CubeEntity = {
    width: number,
    depth: number,
    height: number
} & ComponentEntity