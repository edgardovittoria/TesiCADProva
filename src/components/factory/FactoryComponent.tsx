import { ComponentEntity, CompositeEntity, CubeEntity, SphereEntity } from "../../model/ComponentEntity";
import { Cube, CubeProps } from "../canvas/components/cube";
import { CSG } from 'three-csg-ts';
import { emptyObject } from "../emptyObject";
import { Sphere, SphereProps } from "../canvas/components/sphere";
import * as THREE from "three"
import { setMeshPositionRotationScale } from "../../auxiliaryFunctionsUsingThreeDirectly/setMeshPositionRotationScale";


export const FactoryComponent = (entity: ComponentEntity) => {
    switch (entity.type) {
        case "CUBE":
            let cubeEntity = entity as CubeEntity
            let cubeProps: CubeProps = { color: cubeEntity.color, width: cubeEntity.width, height: cubeEntity.height, depth: cubeEntity.depth }
            return Cube(cubeProps)
        case "SPHERE":
            let sphereEntity = entity as SphereEntity
            let sphereProps: SphereProps = { radius: sphereEntity.radius, color: sphereEntity.color, heightSegments: sphereEntity.heightSegments, widthSegments: sphereEntity.widthSegments }
            return Sphere(sphereProps)
        default:
            if (areDefinedVerticesOf(entity)) {
                return meshWithBufferGeometryFrom(entity)
            }
            let [elementA, elementB] = getOperationElementsFrom(entity as CompositeEntity)
            return (elementA && elementB) ? meshFromOperationBetweenElements(entity.type, elementA, elementB) : emptyObject()

    }
}

const areDefinedVerticesOf = (entity: ComponentEntity) => (entity as CompositeEntity).geometryPositionVertices !== undefined

const meshWithBufferGeometryFrom = (entity: ComponentEntity) => {
    let [positionVertices, normalVertices, uvVertices] = [
        (entity as CompositeEntity).geometryPositionVertices, 
        (entity as CompositeEntity).geometryPositionVertices, 
        (entity as CompositeEntity).geometryPositionVertices] as Float32Array[]
    return new THREE.Mesh(bufferGeometryWithAttributes(positionVertices, normalVertices, uvVertices), basicMaterialWith(entity.color))
}

const bufferGeometryWithAttributes = (positionVertices: Float32Array, normalVertices: Float32Array, uvVertices: Float32Array) => {
    let bufferGeometry = new THREE.BufferGeometry()
    bufferGeometry.setAttribute("position", new THREE.BufferAttribute(positionVertices, 3))
    bufferGeometry.setAttribute("normal", new THREE.BufferAttribute(normalVertices, 3))
    bufferGeometry.setAttribute("uv", new THREE.BufferAttribute(uvVertices, 3))
    return bufferGeometry
}

const basicMaterialWith = (color: string) => {
    let basicMaterial = new THREE.MeshBasicMaterial()
    basicMaterial.color.set(color)
    return basicMaterial
}

const getOperationElementsFrom = (compositeEntity: CompositeEntity) => {
    let [positionA, scaleA, rotationA] = [compositeEntity.baseElements.elementA.position, compositeEntity.baseElements.elementA.scale, compositeEntity.baseElements.elementA.rotation]
    let [positionB, scaleB, rotationB] = [compositeEntity.baseElements.elementB.position, compositeEntity.baseElements.elementB.scale, compositeEntity.baseElements.elementB.rotation]
    let elementA = setMeshPositionRotationScale(FactoryComponent(compositeEntity.baseElements.elementA) as THREE.Mesh, positionA, rotationA, scaleA)
    let elementB = setMeshPositionRotationScale(FactoryComponent(compositeEntity.baseElements.elementB) as THREE.Mesh, positionB, rotationB, scaleB)
    return [elementA, elementB]
}

const meshFromOperationBetweenElements = (operation: string, elementA: THREE.Mesh, elementB: THREE.Mesh) => {
    let newMesh: THREE.Mesh
    if (operation === "UNION") { newMesh = CSG.union(elementA, elementB) }
    else if (operation === "INTERSECTION") { newMesh = CSG.intersect(elementA, elementB) }
    else { newMesh = CSG.subtract(elementA, elementB) }
    return resetMeshTransformationParams(newMesh)
}

const resetMeshTransformationParams = (mesh: THREE.Mesh) => {
    let meshClone = mesh.copy(mesh, true);
    meshClone.position.set(0, 0, 0)
    meshClone.scale.set(1, 1, 1)
    meshClone.rotation.set(0, 0, 0)
    return meshClone
}