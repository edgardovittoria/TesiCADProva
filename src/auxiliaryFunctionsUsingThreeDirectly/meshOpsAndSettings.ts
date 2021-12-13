import * as THREE from "three"
import { ConeGeometry, CylinderGeometry, TorusGeometry } from "three"
import { CSG } from "three-csg-ts"
import { BufferEntity, ComponentEntity, CompositeEntity, ConeEntity, CubeEntity, CylinderEntity, SphereEntity, TorusEntity, TransformationParams, TRANSF_PARAMS_DEFAULTS } from "../model/ComponentEntity"

export const meshWithcomputedGeometryBoundingFrom = (mesh: THREE.Mesh) => {
    let meshCopy = mesh.clone()
    meshCopy.geometry = mesh.geometry.clone()
    meshCopy.updateMatrix()
    meshCopy.geometry.computeBoundingBox()
    meshCopy.geometry.boundingBox?.applyMatrix4(meshCopy.matrix)
    return meshCopy
}

export const meshWithColorFromOldOne = (oldMesh: THREE.Mesh, newColor: string) => {
    let newMesh = oldMesh.clone(true);
    (newMesh.material as THREE.MeshPhongMaterial).color.set(newColor)
    return newMesh
}

export const meshWithResetTransformationParamsFromOld = (mesh: THREE.Mesh) => {
    return meshWithPositionRotationScaleFromPreviousOne(mesh, TRANSF_PARAMS_DEFAULTS)
}

export const meshWithPositionRotationScaleFromPreviousOne = (oldMesh: THREE.Mesh, transformationParams: TransformationParams) => {
    let mesh = oldMesh.clone(true)
    mesh.position.set(...transformationParams.position)
    mesh.scale.set(...transformationParams.scale)
    mesh.rotation.set(...transformationParams.rotation)
    mesh.updateMatrix()
    return mesh
}

export const meshFrom = (entity: ComponentEntity) => {
    let newMesh = new THREE.Mesh(geometryFrom(entity), materialPhongFrom(entity))
    let meshResult = meshWithPositionRotationScaleFromPreviousOne(newMesh, entity.transformationParams)
    return meshResult
}

const materialPhongFrom = (entity: ComponentEntity) => {
    let material = new THREE.MeshPhongMaterial()
    material.color.set(entity.color)
    return material
}

const geometryFrom = (entity: ComponentEntity) => {
    switch (entity.type) {
        case "CUBE":
            let cubeEntity = entity as CubeEntity
            return new THREE.BoxGeometry(cubeEntity.width, cubeEntity.height, cubeEntity.depth)
        case "SPHERE":
            let sphereEntity = entity as SphereEntity
            return new THREE.SphereGeometry(sphereEntity.radius, sphereEntity.widthSegments, sphereEntity.heightSegments)
        case "BUFFER":
            let bufferEntity = entity as BufferEntity
            let geometry = new THREE.BufferGeometry()
            geometry.setAttribute('position', new THREE.BufferAttribute(bufferEntity.positionVertices, 3))
            geometry.setAttribute('normal', new THREE.BufferAttribute(bufferEntity.normalVertices, 3))
            return geometry
        case "CYLINDER":
            let cylinderEntity = entity as CylinderEntity
            return new CylinderGeometry(cylinderEntity.topRadius, cylinderEntity.bottomRadius, cylinderEntity.height, cylinderEntity.radialSegments,
                cylinderEntity.heightSegments, cylinderEntity.openEnded, cylinderEntity.thetaStart, cylinderEntity.thetaLength)
        case "TORUS":
            let torusEntity = entity as TorusEntity
            return new TorusGeometry(torusEntity.torusRadius, torusEntity.tubeRadius,
                torusEntity.radialSegments, torusEntity.tubularSegments, torusEntity.centralAngle)
        case "CONE":
            let coneEntity = entity as ConeEntity
            return new ConeGeometry(coneEntity.radius, coneEntity.height, coneEntity.radialSegments,
                coneEntity.heightSegments, coneEntity.openEnded, coneEntity.thetaStart, coneEntity.thetaLength)
        default:
            let compositeEntity = entity as CompositeEntity
            let [elementA, elementB] = [meshFrom(compositeEntity.baseElements.elementA), meshFrom(compositeEntity.baseElements.elementB)]
            return meshFromOperationBetweenTwoMeshes(entity.type, elementA, elementB).geometry
    }
}

const meshFromOperationBetweenTwoMeshes = (operation: string, firstMesh: THREE.Mesh, secondMesh: THREE.Mesh) => {
    if (operation === "UNION") { return CSG.union(firstMesh, secondMesh) }
    else if (operation === "INTERSECTION") { return CSG.intersect(firstMesh, secondMesh) }
    else { return CSG.subtract(firstMesh, secondMesh) }
}

export const transformationParamsOf = (mesh: THREE.Mesh) => {
    return {
        position: [mesh.position.x, mesh.position.y, mesh.position.z],
        rotation: [mesh.rotation.x, mesh.rotation.y, mesh.rotation.z],
        scale: [mesh.scale.x, mesh.scale.y, mesh.scale.z]
    } as TransformationParams
}

export const thereIsCollisionBetweenMeshes = (firstMesh: THREE.Mesh, secondMesh: THREE.Mesh) => {
    let mesh2 = meshWithcomputedGeometryBoundingFrom(secondMesh);
    let mesh1 = meshWithcomputedGeometryBoundingFrom(firstMesh)
    return (mesh1.geometry.boundingBox && mesh2.geometry.boundingBox)
        ? mesh1.geometry.boundingBox.intersectsBox(mesh2.geometry.boundingBox)
        : false

}

export const getObjectsFromSceneByType = (scene: THREE.Scene, type: string) => scene.children.filter(obj => obj.type === type)