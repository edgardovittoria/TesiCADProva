import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { thereIsCollisionBetween } from "../auxiliaryFunctionsUsingThreeDirectly/thereIsCollisionBetween";
import { getNewKeys } from "../components/canvas/components/cube";
import { ComponentEntity, CompositeEntity } from "../model/ComponentEntity";
import {addComponent, CanvasState, removeComponent, setBinaryOperationExecuting} from "../store/canvasSlice";
import { modalStateSelector, openModal } from "../store/modalSlice";


export const useDetectComponentsCollision = (componentEntity: ComponentEntity, canvasState: CanvasState) => {
    let dispatch = useDispatch()
    let modal = useSelector(modalStateSelector).modals.filter(modal => modal.name === "BINARY_OP")[0]
    const [collisions, setCollisions] = useState<[ComponentEntity, ComponentEntity][]>([])

    useEffect(() => {
        let collisionsSet = arrayOfCollisionsBetween(componentEntity, canvasState.components);
        (collisionsSet.length > 0) && setCollisions(collisionsSet);
        if (collisionsSet.length > 0) {
            if (componentEntity.previousPosition.every((val, index) => val === componentEntity.position[index])
                && componentEntity.previousScale.every((val, index) => val === componentEntity.scale[index])
                && componentEntity.previousRotation.every((val, index) => val === componentEntity.rotation[index])) {
                removeEntityJustCreated(componentEntity, dispatch)
            }
            else { dispatch(openModal('BINARY_OP')) }
        }
    }, [componentEntity.box3Max, componentEntity.box3Min])

    useEffect(() => {
        if (modal.previousOpen && !modal.currentOpen && collisions.length > 0) {
            makeBinaryOperation(modal.lastValue, collisions, canvasState, dispatch)
        }
    }, [modal.previousOpen, modal.currentOpen]);

}

const arrayOfCollisionsBetween = (element: ComponentEntity, allElements: ComponentEntity[]) => {
    return allElements
        .filter(component => component.keyComponent !== element.keyComponent)
        .reduce((results: [ComponentEntity, ComponentEntity][], component) => {
            (thereIsCollisionBetween(element, component)) && results.push([element, component])
            return results
        }, [])
}

const makeBinaryOperation = (operation: string, collisions: [ComponentEntity, ComponentEntity][], canvasState: CanvasState, dispatch: Dispatch) => {
    dispatch(setBinaryOperationExecuting(true))
    let newKeysSub = getNewKeys(canvasState, dispatch, 4 * collisions.length)
    switch (operation) {
        case "UNION":
            let result = collisions.reduce((componentResult: CompositeEntity, [elementA, elementB], index) => {
                let indexKey = 3 * index
                return compositeEntityFromOperationBetweenTwoEntities(componentResult, elementB, operation, newKeysSub, indexKey)
            }, collisions[0][0] as CompositeEntity)
            dispatch(removeComponent(collisions[0][0]))
            collisions.map(([, elementB]) => {
                dispatch(removeComponent(elementB))
            })
            dispatch(addComponent(result))
            dispatch(setBinaryOperationExecuting(false))
            break;
        case "SUBTRACTION":
            let resultSUB = collisions.map(([elementA, elementB], index) => {
                let indexKey = 3 * index
                return compositeEntityFromOperationBetweenTwoEntities(elementB, elementA, operation, newKeysSub, indexKey)
            })
            let elementACopy: ComponentEntity = { ...collisions[0][0], box3Min: undefined, box3Max: undefined }
            elementACopy.keyComponent = newKeysSub[newKeysSub.length - 1];
            if (elementACopy.lastTransformationType === "TRANSLATE") { elementACopy.position = elementACopy.previousPosition }
            else if (elementACopy.lastTransformationType === "ROTATE") { elementACopy.rotation = elementACopy.previousRotation }
            else { elementACopy.scale = elementACopy.previousScale }
            dispatch(removeComponent(collisions[0][0]))
            collisions.map(([, elementB]) => {
                dispatch(removeComponent(elementB))
            })
            resultSUB.map(result => dispatch(addComponent(result)))
            dispatch(addComponent(elementACopy))
            dispatch(setBinaryOperationExecuting(false))
            break;
        case "INTERSECTION":
            let resultINT = collisions.map(([elementA, elementB], index) => {
                let indexKey = 3 * index
                return compositeEntityFromOperationBetweenTwoEntities(elementB, elementA, operation, newKeysSub, indexKey)
            })
            dispatch(removeComponent(collisions[0][0]))
            collisions.map(([, elementB]) => {
                dispatch(removeComponent(elementB))
            })
            resultINT.map(result => dispatch(addComponent(result)))
            dispatch(setBinaryOperationExecuting(false))
            break;
    }
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

const removeEntityJustCreated = (entity: ComponentEntity, dispatch: Dispatch) => {
    dispatch(removeComponent(entity))
    alert("Esiste già un componente nella stessa posizione. Spostalo prima di crearne uno nuovo!")
}
