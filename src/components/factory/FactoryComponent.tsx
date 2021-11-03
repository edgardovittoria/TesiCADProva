import {ComponentEntity, CompositeEntity, CubeEntity} from "../../model/ComponentEntity";
import {Cube, CubeProps} from "../canvas/components/cube";
import {Mesh} from 'three'
import {CSG} from 'three-csg-ts';
import {emptyObject} from "../emptyObject";


export const FactoryComponent = (entity: ComponentEntity) => {


    switch (entity.type) {
        case "CUBE":
            let cubeEntity = entity as CubeEntity

            let cubeProps: CubeProps = { color: cubeEntity.color, width: cubeEntity.width, height: cubeEntity.height, depth: cubeEntity.depth }
            return (
                Cube(cubeProps)
            )

        case "SUBTRACTION":
            let [elementASUB, elementBSUB] = getOperationElements(entity)
            if (elementASUB && elementBSUB) {
                let newMesh = CSG.subtract(elementASUB, elementBSUB)
                return resetMeshTransformationParams(newMesh)
            } else { return emptyObject() }

        case "INTERSECTION":
            let [elementAINT, elementBINT] = getOperationElements(entity)
            if (elementAINT && elementBINT) {
                let newMesh = CSG.intersect(elementAINT, elementBINT)
                return resetMeshTransformationParams(newMesh)
            } else { return emptyObject() }

        case "UNION":
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