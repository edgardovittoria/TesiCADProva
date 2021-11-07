export const meshWithColorFromOldOne = (oldMesh: THREE.Mesh, newColor: string) => {
    let newMesh = oldMesh.clone();
    (newMesh.material as THREE.MeshBasicMaterial).color.set(newColor)
    return newMesh
}