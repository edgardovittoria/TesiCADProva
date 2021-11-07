export const resetMeshTransformationParams = (mesh: THREE.Mesh) => {
    let meshClone = mesh.copy(mesh, true);
    meshClone.position.set(0, 0, 0)
    meshClone.scale.set(1, 1, 1)
    meshClone.rotation.set(0, 0, 0)
    return meshClone
}