export const computeGeometryBoundingBoxOf = (mesh: THREE.Mesh) => {
    let meshCopy = mesh.clone(true)
    meshCopy.geometry.computeBoundingBox()
    meshCopy.geometry.boundingBox?.applyMatrix4(meshCopy.matrix)
    return meshCopy
}