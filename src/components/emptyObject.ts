import { BufferGeometry, MeshBasicMaterial } from "three"
import * as THREE from "three"

export const emptyObject = () => {
    return new THREE.Mesh(new BufferGeometry(), new MeshBasicMaterial())
}