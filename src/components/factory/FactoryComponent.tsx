import {ComponentEntity, CompositeEntity, CubeEntity, SphereEntity} from "../../model/ComponentEntity";
import {Cube, CubeProps} from "../canvas/components/cube";
import {BufferGeometry, Mesh} from 'three'
import {CSG} from 'three-csg-ts';
import {emptyObject} from "../emptyObject";
import { Sphere, SphereProps } from "../canvas/components/sphere";
import * as THREE from "three"


export const FactoryComponent = (entity: ComponentEntity) => {


    switch (entity.type) {
        case "CUBE":
            let cubeEntity = entity as CubeEntity

            let cubeProps: CubeProps = { color: cubeEntity.color, width: cubeEntity.width, height: cubeEntity.height, depth: cubeEntity.depth }
            return (
                Cube(cubeProps)
            )
        
            case "SPHERE":
                let sphereEntity = entity as SphereEntity
    
                let sphereProps: SphereProps = { radius: sphereEntity.radius, color: sphereEntity.color, heightSegments: sphereEntity.heightSegments, widthSegments: sphereEntity.widthSegments }
                return (
                    Sphere(sphereProps)
                )    

        case "SUBTRACTION":
            if((entity as CompositeEntity).geometryPositionVertices !== undefined){
                return createMeshWithBufferGeometryFromCompositeEntity(entity)
            }
            let [elementASUB, elementBSUB] = getOperationElements(entity)
            if (elementASUB && elementBSUB) {
                let newMesh = CSG.subtract(elementASUB, elementBSUB)
                return resetMeshTransformationParams(newMesh)
            } else { return emptyObject() }

        case "INTERSECTION":
            if((entity as CompositeEntity).geometryPositionVertices !== undefined){
                return createMeshWithBufferGeometryFromCompositeEntity(entity)
            }
            let [elementAINT, elementBINT] = getOperationElements(entity)
            if (elementAINT && elementBINT) {
                let newMesh = CSG.intersect(elementAINT, elementBINT)
                return resetMeshTransformationParams(newMesh)
            } else { return emptyObject() }

        case "UNION":
            if((entity as CompositeEntity).geometryPositionVertices !== undefined){
                return createMeshWithBufferGeometryFromCompositeEntity(entity)
            }
            let [elementA, elementB] = getOperationElements(entity)
            if (elementA && elementB) {
                let newMesh = CSG.union(elementA, elementB)
                return resetMeshTransformationParams(newMesh)
            } else { return emptyObject() }

        default: return emptyObject()

    }
}

const getOperationElements = (entity: ComponentEntity) => {
    let compositeEntity = entity as CompositeEntity

    let positionTS = compositeEntity.elementKeys.elementA.position
    let positionTHS = compositeEntity.elementKeys.elementB.position

    let scaleTS = compositeEntity.elementKeys.elementA.scale
    let scaleTHS = compositeEntity.elementKeys.elementB.scale

    let rotationTS = compositeEntity.elementKeys.elementA.rotation
    let rotationTHS = compositeEntity.elementKeys.elementB.rotation

    let elementToSubtract = FactoryComponent(compositeEntity.elementKeys.elementA)
    elementToSubtract?.position.set(positionTS[0], positionTS[1], positionTS[2])
    elementToSubtract?.scale.set(scaleTS[0], scaleTS[1], scaleTS[2])
    elementToSubtract?.rotation.set(rotationTS[0], rotationTS[1], rotationTS[2])
    elementToSubtract?.updateMatrix()

    let elementThatSubtract = FactoryComponent(compositeEntity.elementKeys.elementB)
    elementThatSubtract?.position.set(positionTHS[0], positionTHS[1], positionTHS[2])
    elementThatSubtract?.scale.set(scaleTHS[0], scaleTHS[1], scaleTHS[2])
    elementThatSubtract?.rotation.set(rotationTHS[0], rotationTHS[1], rotationTHS[2])
    elementThatSubtract?.updateMatrix()

    return [elementToSubtract, elementThatSubtract]
}

const resetMeshTransformationParams = (mesh: Mesh) => {

    let meshClone = mesh.copy(mesh, true);

    meshClone.position.set(0,0,0)
    meshClone.scale.set(1,1,1)
    meshClone.rotation.set(0,0,0)

    return meshClone
}

const createMeshWithBufferGeometryFromCompositeEntity = (entity : ComponentEntity) => {
    let positionVertices = (entity as CompositeEntity).geometryPositionVertices as Float32Array
    let normalVertices = (entity as CompositeEntity).geometryPositionVertices as Float32Array
    let uvVertices = (entity as CompositeEntity).geometryPositionVertices as Float32Array
                let geometry = new THREE.BufferGeometry()
                geometry.setAttribute("position", new THREE.BufferAttribute(positionVertices, 3))
                geometry.setAttribute("normal", new THREE.BufferAttribute(normalVertices, 3))
                geometry.setAttribute("uv", new THREE.BufferAttribute(uvVertices, 3))
                let material = new THREE.MeshBasicMaterial()
                material.color.set(entity.color)
               return  new THREE.Mesh(geometry, material)
}