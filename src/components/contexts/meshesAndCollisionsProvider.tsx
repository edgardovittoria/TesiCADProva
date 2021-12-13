import { createContext, FC, useState } from "react";
import * as THREE from "three"

export type MeshesAndCollisionsContextType = {
    meshes: THREE.Mesh[]
    setMeshes: Function
    collisions: [number,number][]
    setCollisions: Function
    resetCollisions: Function
} 

export const MeshesAndCollisionsContext = createContext<MeshesAndCollisionsContextType>({
    meshes: [],
    setMeshes: (f: any) => f,
    collisions: [],
    setCollisions: (f: any) => f,
    resetCollisions: (f: any) => f
})

export const MeshesAndCollisionsProvider: FC<{}> = ({ children }) => {
    const [meshes, setMeshes] = useState([])
    const [collisions, setCollisions] = useState([])
    const resetCollisions = () => {
        setCollisions([])
    }
    return(
        <MeshesAndCollisionsContext.Provider value={{meshes, setMeshes, collisions, setCollisions, resetCollisions}}>
            {children}
        </MeshesAndCollisionsContext.Provider>
    )
}