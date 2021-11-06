export const setMeshPositionRotationScale = (mesh: THREE.Mesh, position: [number, number, number], rotation: [number, number, number], scale: [number, number, number]) => {
    mesh.position.set(position[0], position[1], position[2])
    mesh.scale.set(scale[0], scale[1], scale[2])
    mesh.rotation.set(rotation[0], rotation[1], rotation[2])
    mesh.updateMatrix()
    return mesh
}