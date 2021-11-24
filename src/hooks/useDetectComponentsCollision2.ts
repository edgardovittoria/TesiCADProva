import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { meshWithPositionRotationScaleFromOldOne } from "../auxiliaryFunctionsUsingThreeDirectly/meshOpsAndSettings";
import { thereIsCollisionBetweenMeshes } from "../auxiliaryFunctionsUsingThreeDirectly/thereIsCollisionBetween";
import { getNewKeys } from "../components/canvas/components/cube";
import { ComponentEntity, CompositeEntity } from "../model/ComponentEntity";
import { addComponent, binaryOperationExecution, CanvasState, canvasStateSelector, findComponentByKey, removeComponent, selectComponent, setBinaryOperationExecuting } from "../store/canvasSlice";
import { modalStateSelector, openModal } from "../store/modalSlice";
import {useThree} from "@react-three/fiber";



export const useDetectComponentsCollision2 = (keySelectedComponent: number, canvasState: CanvasState) => {
    const removeEntityJustCreated = (entity: ComponentEntity, dispatch: Dispatch) => {
        dispatch(selectComponent(0))
        dispatch(removeComponent(entity))
        alert("Esiste già un componente nella stessa posizione. Spostalo prima di crearne uno nuovo!")
    }

    const { scene } = useThree()
    let dispatch = useDispatch()
    let modal = useSelector(modalStateSelector).modals.filter(modal => modal.name === "BINARY_OP")[0]
    const [collisions, setCollisions] = useState<[THREE.Mesh, THREE.Mesh][]>([])
    let componentEntity = findComponentByKey(canvasState.components, keySelectedComponent)
    let visibility = useSelector(binaryOperationExecution)

    useEffect(() => {
        let collisionsSet = arrayOfCollisionsBetween(keySelectedComponent, scene.children.filter(el => el.type === "Mesh") as THREE.Mesh[]);
        if (collisionsSet.length > 0) {
            setCollisions(collisionsSet)
            if (componentEntity.previousPosition.every((val, index) => val === componentEntity.position[index])
                && componentEntity.previousScale.every((val, index) => val === componentEntity.scale[index])
                && componentEntity.previousRotation.every((val, index) => val === componentEntity.rotation[index])) {
                removeEntityJustCreated(componentEntity, dispatch)
            }
            else { 
                dispatch(openModal('BINARY_OP')) 
            }
        }
    }, [componentEntity.position, componentEntity.rotation, componentEntity.scale])

    useEffect(() => {
        if (modal.previousOpen && !modal.currentOpen && collisions.length > 0 && visibility) {
            makeBinaryOperation(modal.lastValue, collisions, canvasState, dispatch)
            dispatch(setBinaryOperationExecuting(false))
        }
    }, [modal.previousOpen, modal.currentOpen]);

}

const arrayOfCollisionsBetween = (element: number, allElements: THREE.Mesh[]) => {
    let meshSelected = allElements.filter(el => el.name === element.toString())[0]
    return allElements
        .filter(component => component.name !== element.toString())
        .reduce((results: [THREE.Mesh, THREE.Mesh][], component) => {
            let compSelected = meshWithPositionRotationScaleFromOldOne(meshSelected,
                [meshSelected.position.x, meshSelected.position.y, meshSelected.position.z],
                [meshSelected.rotation.x, meshSelected.rotation.y, meshSelected.rotation.z],
                [meshSelected.scale.x, meshSelected.scale.y, meshSelected.scale.z],
            );
            let comp = meshWithPositionRotationScaleFromOldOne(component,
                [component.position.x, component.position.y, component.position.z],
                [component.rotation.x, component.rotation.y, component.rotation.z],
                [component.scale.x, component.scale.y, component.scale.z],
            );
            console.log(component.position);
            (thereIsCollisionBetweenMeshes(compSelected, comp)) && results.push([meshSelected, component])
            return results
        }, [])
}

const makeBinaryOperation = (operation: string, collisions: [THREE.Mesh, THREE.Mesh][], canvasState: CanvasState, dispatch: Dispatch) => {
    let newKeysSub = getNewKeys(canvasState, dispatch, 4 * collisions.length)
    switch (operation) {
        case "UNION":
            let result = collisions.reduce((componentResult: CompositeEntity, [, elementB], index) => {
                let entityB = findComponentByKey(canvasState.components, parseInt(elementB.name))
                let indexKey = 3 * index
                return compositeEntityFromOperationBetweenTwoEntities(componentResult, entityB, operation, newKeysSub, indexKey)
            }, findComponentByKey(canvasState.components, parseInt(collisions[0][0].name)) as CompositeEntity)
            dispatch(removeComponent(findComponentByKey(canvasState.components, parseInt(collisions[0][0].name))))
            collisions.map(([, elementB]) => {
                dispatch(removeComponent(findComponentByKey(canvasState.components, parseInt(elementB.name))))
            })
            dispatch(addComponent(result))
            break;
        case "SUBTRACTION":
            let resultSUB = collisions.map(([elementA, elementB], index) => {
                let entityA = findComponentByKey(canvasState.components, parseInt(elementA.name))
                let entityB = findComponentByKey(canvasState.components,parseInt(elementB.name))
                let indexKey = 3 * index
                return compositeEntityFromOperationBetweenTwoEntities(entityB, entityA, operation, newKeysSub, indexKey)
            })
            let elementACopy: ComponentEntity = { ...findComponentByKey(canvasState.components, parseInt(collisions[0][0].name)), box3Min: undefined, box3Max: undefined }
            elementACopy.keyComponent = newKeysSub[newKeysSub.length - 1];
            if (elementACopy.lastTransformationType === "TRANSLATE") { elementACopy.position = elementACopy.previousPosition }
            else if (elementACopy.lastTransformationType === "ROTATE") { elementACopy.rotation = elementACopy.previousRotation }
            else { elementACopy.scale = elementACopy.previousScale }
            dispatch(removeComponent(findComponentByKey(canvasState.components, parseInt(collisions[0][0].name))))
            collisions.map(([, elementB]) => {
                dispatch(removeComponent(findComponentByKey(canvasState.components, parseInt(elementB.name))))
            })
            resultSUB.map(result => dispatch(addComponent(result)))
            dispatch(addComponent(elementACopy))
            break;
        case "INTERSECTION":
            let resultINT = collisions.map(([elementA, elementB], index) => {
                let entityA = findComponentByKey(canvasState.components, parseInt(elementA.name))
                let entityB = findComponentByKey(canvasState.components, parseInt(elementB.name))
                let indexKey = 3 * index
                return compositeEntityFromOperationBetweenTwoEntities(entityB, entityA, operation, newKeysSub, indexKey)
            })
            dispatch(removeComponent(findComponentByKey(canvasState.components, parseInt(collisions[0][0].name))))
            collisions.map(([, elementB]) => {
                dispatch(removeComponent(findComponentByKey(canvasState.components, parseInt(elementB.name))))
            })
            resultINT.map(result => dispatch(addComponent(result)))
            break;
    }
    return "operation completed"
}

const compositeEntityFromOperationBetweenTwoEntities = (elementA: ComponentEntity, elementB: ComponentEntity, operation: string, newKeys: number[], offsetKeys: number) => {
    let compositeEntity: CompositeEntity = {
        ...elementA,
        baseElements: { elementA: { ...elementA, keyComponent: newKeys[offsetKeys] }, elementB: { ...elementB, keyComponent: newKeys[1 + offsetKeys] } },
        type: operation,
        keyComponent: newKeys[2 + offsetKeys],
        lastTransformationType: undefined
    }
    return compositeEntity
}


