import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useThree } from "react-three-fiber";
import { Dispatch } from "redux";
import { meshWithPositionRotationScaleFromOldOne } from "../auxiliaryFunctionsUsingThreeDirectly/meshOpsAndSettings";
import { thereIsCollisionBetweenMeshes } from "../auxiliaryFunctionsUsingThreeDirectly/thereIsCollisionBetween";
import { getNewKeys } from "../components/canvas/components/cube";
import { ComponentEntity, CompositeEntity } from "../model/ComponentEntity";
import { addComponent, CanvasState, canvasStateSelector, findComponentByKey, removeComponent } from "../store/canvasSlice";
import { modalStateSelector, openModal } from "../store/modalSlice";


export const useDetectComponentsCollision2 = (keySelectedComponent: number, canvasState: CanvasState) => {
    const { scene } = useThree()
    let dispatch = useDispatch()
    let modal = useSelector(modalStateSelector).modals.filter(modal => modal.name === "BINARY_OP")[0]
    const [collisions, setCollisions] = useState<[THREE.Group, THREE.Group][]>([])
    let componentEntity = findComponentByKey(canvasState, keySelectedComponent)

    useEffect(() => {
        let collisionsSet = arrayOfCollisionsBetween(keySelectedComponent, scene.children.filter(el => el.type === "Group" && el.children[0].type === "Mesh") as THREE.Group[]);
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
        if (modal.previousOpen && !modal.currentOpen && collisions.length > 0) {
            makeBinaryOperation(modal.lastValue, collisions, canvasState, dispatch)
        }
    }, [modal.previousOpen, modal.currentOpen]);

}

const arrayOfCollisionsBetween = (element: number, allElements: THREE.Group[]) => {
    let groupSelected = allElements.filter(el => el.userData.key === element)[0]
    return allElements
        .filter(component => component.userData.key !== element)
        .reduce((results: [THREE.Group, THREE.Group][], component) => {
            let compSelected = meshWithPositionRotationScaleFromOldOne(groupSelected.children[0] as THREE.Mesh,
                [groupSelected.position.x, groupSelected.position.y, groupSelected.position.z],
                [groupSelected.rotation.x, groupSelected.rotation.y, groupSelected.rotation.z],
                [groupSelected.scale.x, groupSelected.scale.y, groupSelected.scale.z],
            );
            let comp = meshWithPositionRotationScaleFromOldOne(component.children[0] as THREE.Mesh,
                [component.position.x, component.position.y, component.position.z],
                [component.rotation.x, component.rotation.y, component.rotation.z],
                [component.scale.x, component.scale.y, component.scale.z],
            );
            console.log(component.position);
            (thereIsCollisionBetweenMeshes(compSelected, comp)) && results.push([groupSelected, component])
            return results
        }, [])
}

const makeBinaryOperation = (operation: string, collisions: [THREE.Group, THREE.Group][], canvasState: CanvasState, dispatch: Dispatch) => {
    let newKeysSub = getNewKeys(canvasState, dispatch, 4 * collisions.length)
    switch (operation) {
        case "UNION":
            let result = collisions.reduce((componentResult: CompositeEntity, [, elementB], index) => {
                let entityB = findComponentByKey(canvasState, elementB.userData.key)
                let indexKey = 3 * index
                return compositeEntityFromOperationBetweenTwoEntities(componentResult, entityB, operation, newKeysSub, indexKey)
            }, findComponentByKey(canvasState, collisions[0][0].userData.key) as CompositeEntity)
            dispatch(removeComponent(findComponentByKey(canvasState, collisions[0][0].userData.key)))
            collisions.map(([, elementB]) => {
                dispatch(removeComponent(findComponentByKey(canvasState, elementB.userData.key)))
            })
            dispatch(addComponent(result))
            break;
        case "SUBTRACTION":
            let resultSUB = collisions.map(([elementA, elementB], index) => {
                let entityA = findComponentByKey(canvasState, elementA.userData.key)
                let entityB = findComponentByKey(canvasState, elementB.userData.key)
                let indexKey = 3 * index
                return compositeEntityFromOperationBetweenTwoEntities(entityB, entityA, operation, newKeysSub, indexKey)
            })
            let elementACopy: ComponentEntity = { ...findComponentByKey(canvasState, collisions[0][0].userData.key), box3Min: undefined, box3Max: undefined }
            elementACopy.keyComponent = newKeysSub[newKeysSub.length - 1];
            if (elementACopy.lastTransformationType === "TRANSLATE") { elementACopy.position = elementACopy.previousPosition }
            else if (elementACopy.lastTransformationType === "ROTATE") { elementACopy.rotation = elementACopy.previousRotation }
            else { elementACopy.scale = elementACopy.previousScale }
            dispatch(removeComponent(findComponentByKey(canvasState, collisions[0][0].userData.key)))
            collisions.map(([, elementB]) => {
                dispatch(removeComponent(findComponentByKey(canvasState, elementB.userData.key)))
            })
            resultSUB.map(result => dispatch(addComponent(result)))
            dispatch(addComponent(elementACopy))
            break;
        case "INTERSECTION":
            let resultINT = collisions.map(([elementA, elementB], index) => {
                let entityA = findComponentByKey(canvasState, elementA.userData.key)
                let entityB = findComponentByKey(canvasState, elementB.userData.key)
                let indexKey = 3 * index
                return compositeEntityFromOperationBetweenTwoEntities(entityB, entityA, operation, newKeysSub, indexKey)
            })
            dispatch(removeComponent(findComponentByKey(canvasState, collisions[0][0].userData.key)))
            collisions.map(([, elementB]) => {
                dispatch(removeComponent(findComponentByKey(canvasState, elementB.userData.key)))
            })
            resultINT.map(result => dispatch(addComponent(result)))
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
