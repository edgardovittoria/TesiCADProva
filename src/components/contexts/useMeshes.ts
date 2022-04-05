import { useContext } from "react"
import { MeshesAndCollisionsContext } from "./meshesAndCollisionsProvider"


export const useMeshes = () => {
    const {meshes, setMeshes} = useContext(MeshesAndCollisionsContext)
    return {meshes, setMeshes}
}