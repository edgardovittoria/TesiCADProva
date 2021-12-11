import * as THREE from "three"
import { ConeGeometry, CylinderGeometry, TorusGeometry } from "three"
import { CSG } from "three-csg-ts"
import { BufferEntity, ComponentEntity, CompositeEntity, ConeEntity, CubeEntity, CylinderEntity, SphereEntity, TorusEntity, TransformationParams } from "../model/ComponentEntity"

export const meshWithcomputedGeometryBoundingFrom = (mesh: THREE.Mesh) => {
    let meshCopy = new THREE.Mesh(mesh.geometry.clone(), mesh.material)
    meshCopy.geometry.computeBoundingBox()
    meshCopy.geometry.boundingBox?.applyMatrix4(mesh.matrix)
    return meshCopy
}

export const meshWithColorFromOldOne = (oldMesh: THREE.Mesh, newColor: string) => {
    let newMesh = oldMesh.clone(true);
    (newMesh.material as THREE.MeshPhongMaterial).color.set(newColor)
    return newMesh
}

export const meshWithResetTransformationParamsFromOld = (mesh: THREE.Mesh) => {
    let meshClone = mesh.clone(true);
    meshClone.position.set(0, 0, 0)
    meshClone.scale.set(1, 1, 1)
    meshClone.rotation.set(0, 0, 0)
    return meshClone
}

export const meshWithPositionRotationScaleFromOldOne = (oldMesh: THREE.Mesh, transformationParams: TransformationParams) => {
    let mesh = oldMesh.clone(true)
    mesh.position.set(...transformationParams.position)
    mesh.scale.set(...transformationParams.scale)
    mesh.rotation.set(...transformationParams.rotation)
    mesh.updateMatrix()

    return mesh
}

export const meshFrom = (entity: ComponentEntity) => {
    const getOperationElementsFrom = (compositeEntity: CompositeEntity) => {
        let elementA = meshWithPositionRotationScaleFromOldOne(meshFrom(compositeEntity.baseElements.elementA), compositeEntity.baseElements.elementA.transformationParams)
        let elementB = meshWithPositionRotationScaleFromOldOne(meshFrom(compositeEntity.baseElements.elementB), compositeEntity.baseElements.elementB.transformationParams)
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
            let material = new THREE.MeshPhongMaterial()
            material.color.set(cubeEntity.color)
            return new THREE.Mesh(new THREE.BoxGeometry(cubeEntity.width, cubeEntity.height, cubeEntity.depth), material)
        case "SPHERE":
            let sphereEntity = entity as SphereEntity
            let materialSphere = new THREE.MeshPhongMaterial()
            materialSphere.color.set(sphereEntity.color)
            return new THREE.Mesh(new THREE.SphereGeometry(sphereEntity.radius, sphereEntity.widthSegments, sphereEntity.heightSegments), materialSphere)
        case "BUFFER":
            let bufferEntity = entity as BufferEntity
            let bufferMaterial = new THREE.MeshPhongMaterial()
            bufferMaterial.color.set(bufferEntity.color)
            let geometry = new THREE.BufferGeometry()
            geometry.setAttribute('position', new THREE.BufferAttribute(bufferEntity.positionVertices, 3))
            geometry.setAttribute('normal', new THREE.BufferAttribute(bufferEntity.normalVertices, 3))
            return new THREE.Mesh(geometry, bufferMaterial)
        case "CYLINDER":
            let cylinderEntity = entity as CylinderEntity
            let cylinderMaterial = new THREE.MeshPhongMaterial()
            cylinderMaterial.color.set(cylinderEntity.color)
            return new THREE.Mesh(new CylinderGeometry(cylinderEntity.topRadius, cylinderEntity.bottomRadius, cylinderEntity.height, cylinderEntity.radialSegments,
                cylinderEntity.heightSegments, cylinderEntity.openEnded, cylinderEntity.thetaStart, cylinderEntity.thetaLength), cylinderMaterial)
        case "TORUS":
            let torusEntity = entity as TorusEntity
            let torusMaterial = new THREE.MeshPhongMaterial()
            torusMaterial.color.set(torusEntity.color)
            return new THREE.Mesh(new TorusGeometry(torusEntity.torusRadius, torusEntity.tubeRadius,
                torusEntity.radialSegments, torusEntity.tubularSegments, torusEntity.centralAngle), torusMaterial)
        case "CONE":
            let coneEntity = entity as ConeEntity
            let coneMaterial = new THREE.MeshPhongMaterial()
            coneMaterial.color.set(coneEntity.color)
            return new THREE.Mesh(new ConeGeometry(coneEntity.radius, coneEntity.height, coneEntity.radialSegments,
                coneEntity.heightSegments, coneEntity.openEnded, coneEntity.thetaStart, coneEntity.thetaLength), coneMaterial)
        default:
            let [elementA, elementB] = getOperationElementsFrom(entity as CompositeEntity)
            let meshComposite = (elementA && elementB) ? meshFromOperationBetweenElements(entity.type, elementA, elementB) : new THREE.Mesh();
            (meshComposite.material as THREE.MeshPhongMaterial).color.set(entity.color)
            return meshComposite
    }
}