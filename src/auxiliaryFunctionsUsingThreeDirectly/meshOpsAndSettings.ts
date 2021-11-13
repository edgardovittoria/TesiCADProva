import * as THREE from "three"
import { CSG } from "three-csg-ts"
import { ComponentEntity, CompositeEntity, CubeEntity, SphereEntity } from "../model/ComponentEntity"

export const meshWithcomputedGeometryBoundingFrom = (mesh: THREE.Mesh) => {
    let meshCopy = mesh.clone(true)
    meshCopy.geometry.computeBoundingBox()
    meshCopy.geometry.boundingBox?.applyMatrix4(meshCopy.matrixWorld)
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

export const meshFrom = (entity: ComponentEntity) => {
    const getOperationElementsFrom = (compositeEntity: CompositeEntity) => {
        let [positionA, scaleA, rotationA] = [compositeEntity.baseElements.elementA.position, compositeEntity.baseElements.elementA.scale, compositeEntity.baseElements.elementA.rotation]
        let [positionB, scaleB, rotationB] = [compositeEntity.baseElements.elementB.position, compositeEntity.baseElements.elementB.scale, compositeEntity.baseElements.elementB.rotation]
        let elementA = meshWithPositionRotationScaleFromOldOne(meshFrom(compositeEntity.baseElements.elementA), positionA, rotationA, scaleA)
        let elementB = meshWithPositionRotationScaleFromOldOne(meshFrom(compositeEntity.baseElements.elementB), positionB, rotationB, scaleB)
        return [elementA, elementB]
    }

    const meshFromOperationBetweenElements = (operation: string, elementA: THREE.Mesh, elementB: THREE.Mesh) => {
        let newMesh: THREE.Mesh
        if (operation === "UNION") { newMesh = CSG.union(elementA, elementB) }
        else if (operation === "INTERSECTION") { newMesh = CSG.intersect(elementA, elementB) }
        else { newMesh = CSG.subtract(elementA, elementB) }
        return meshWithResetTransformationParamsFromOld(newMesh)
    }
    switch (entity.type) {
        case "CUBE":
            let cubeEntity = entity as CubeEntity
            let material = new THREE.MeshBasicMaterial()
            material.color.set(cubeEntity.color)
            return new THREE.Mesh(new THREE.BoxGeometry(cubeEntity.width, cubeEntity.height, cubeEntity.depth), material)
        case "SPHERE":
            let sphereEntity = entity as SphereEntity
            let materialSphere = new THREE.MeshBasicMaterial()
            materialSphere.color.set(sphereEntity.color)
            return new THREE.Mesh(new THREE.SphereGeometry(sphereEntity.radius, sphereEntity.widthSegments, sphereEntity.heightSegments), materialSphere)
        default:
            let [elementA, elementB] = getOperationElementsFrom(entity as CompositeEntity)
            let meshComposite = (elementA && elementB) ? meshFromOperationBetweenElements(entity.type, elementA, elementB) : new THREE.Mesh();
            (meshComposite.material as THREE.MeshBasicMaterial).color.set(entity.color)
            return meshComposite
    }
}