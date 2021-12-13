import { useContext } from "react"
import { MeshesAndCollisionsContext } from "./meshesAndCollisionsProvider"

export const useCollisions = () => {
    const {collisions, setCollisions, resetCollisions} = useContext(MeshesAndCollisionsContext)
    return {collisions, setCollisions, resetCollisions}
}