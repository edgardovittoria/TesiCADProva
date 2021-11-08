export const meshWithcomputedGeometryBoundingFromOld = (mesh: THREE.Mesh) => {
    let meshCopy = mesh.clone(true)
    meshCopy.geometry.computeBoundingBox()
    meshCopy.geometry.boundingBox?.applyMatrix4(meshCopy.matrix)
    return meshCopy
}

export const meshWithColorFromOldOne = (oldMesh: THREE.Mesh, newColor: string) => {
    let newMesh = oldMesh.clone();
    (newMesh.material as THREE.MeshBasicMaterial).color.set(newColor)
    return newMesh
}

export const meshWithResetTransformationParamsFromOld = (mesh: THREE.Mesh) => {
    let meshClone = mesh.copy(mesh, true);
    meshClone.position.set(0, 0, 0)
    meshClone.scale.set(1, 1, 1)
    meshClone.rotation.set(0, 0, 0)
    return meshClone
}

export const meshWithPositionRotationScaleFromOldOne = (oldMesh: THREE.Mesh, position: [number, number, number], rotation: [number, number, number], scale: [number, number, number]) => {
    let mesh = oldMesh.clone(true)
    mesh.position.set(position[0], position[1], position[2])
    mesh.scale.set(scale[0], scale[1], scale[2])
    mesh.rotation.set(rotation[0], rotation[1], rotation[2])
    mesh.updateMatrix()
    return mesh
}