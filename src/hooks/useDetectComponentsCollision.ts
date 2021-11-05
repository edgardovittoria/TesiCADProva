import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { thereIsCollisionBetween } from "../auxiliaryFunctionsUsingThreeDirectly/ThereIsCollisionBetween";
import { GetNewKey } from "../components/canvas/components/cube";
import { ComponentEntity, CompositeEntity } from "../model/ComponentEntity";
import { addComponent, CanvasState, removeComponent } from "../store/canvasSlice";
import { modalStateSelector, openModal } from "../store/modalSlice";


export const useDetectComponentsCollision = (componentEntity: ComponentEntity, canvasState: CanvasState) => {
    let dispatch = useDispatch()
    let modal = useSelector(modalStateSelector).modals.filter(modal => modal.name === "BINARY_OP")[0]
    const [elementsForOperation, setElementsForOperation] = useState<ComponentEntity[]>([]);
    const [collisions, setCollisions] = useState<[ComponentEntity, ComponentEntity][]>([])
   
    useEffect(() => {
        let collisionsSet = arrayOfCollisionsBetween(componentEntity, canvasState.components);
        console.log(collisionsSet);
        (collisionsSet.length > 0) && setCollisions(collisionsSet);
        if(collisionsSet.length > 0
            && componentEntity.previousPosition.every((val, index) => val === componentEntity.position[index])
            && componentEntity.previousScale.every((val, index) => val === componentEntity.scale[index])
            && componentEntity.previousRotation.every((val, index) => val === componentEntity.rotation[index])
        ){
            removeEntityJustCreated(componentEntity, dispatch)
        }else if(collisionsSet.length > 0 &&
            (!componentEntity.previousPosition.every((val, index) => val === componentEntity.position[index])
                || !componentEntity.previousScale.every((val, index) => val === componentEntity.scale[index])
                || !componentEntity.previousRotation.every((val, index) => val === componentEntity.rotation[index])
            )
        ){
            dispatch(openModal('BINARY_OP'))
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
        let newKeysSub = GetNewKey(canvasState, dispatch, 4*collisions.length)
        switch (operation) {
            case "UNION":
                let result = collisions.reduce((componentResult: CompositeEntity , [elementA,elementB], index) => {
                    let indexKey = 3*index
                    let resultEntity: CompositeEntity = {
                        ...componentResult,
                        baseElements: { elementA: { ...componentResult, keyComponent: newKeysSub[0+ indexKey] }, elementB: { ...elementB, keyComponent: newKeysSub[1+indexKey] } },
                        type: operation,
                        geometryPositionVertices: undefined,
                        geometryNormalVertices: undefined,
                        geometryUvVertices: undefined,
                        keyComponent: newKeysSub[2+indexKey],
                        lastTransformationType: undefined
                    }
                    return resultEntity
                }, collisions[0][0] as CompositeEntity)

                dispatch(removeComponent(collisions[0][0]))
                collisions.map(([, elementB]) => {
                    dispatch(removeComponent(elementB))
                })

                dispatch(addComponent(result))
                break;

            case "SUBTRACTION" :
                let resultSUB = collisions.map(([elementA, elementB], index) => {
                    let indexKey = 3*index
                    let resultEntity: CompositeEntity = {
                        ...elementB,
                        baseElements: { elementA: { ...elementB, keyComponent: newKeysSub[indexKey] }, elementB: { ...elementA, keyComponent: newKeysSub[1+indexKey] } },
                        type: operation,
                        geometryPositionVertices: undefined,
                        geometryNormalVertices: undefined,
                        geometryUvVertices: undefined,
                        keyComponent: newKeysSub[2+indexKey],
                        lastTransformationType: undefined
                    }
                    return resultEntity
                })
                
                let elementACopy: ComponentEntity = {...collisions[0][0], box3Min: undefined, box3Max: undefined}
                elementACopy.keyComponent = newKeysSub[newKeysSub.length-1];
                if(elementACopy.lastTransformationType === "TRANSLATE"){elementACopy.position = elementACopy.previousPosition}
                else if(elementACopy.lastTransformationType === "ROTATE"){elementACopy.rotation = elementACopy.previousRotation}
                else{elementACopy.scale = elementACopy.previousScale}
                dispatch(removeComponent(collisions[0][0]))
                collisions.map(([,elementB]) => {
                    dispatch(removeComponent(elementB))
                })
                resultSUB.map(result => dispatch(addComponent(result)))
                dispatch(addComponent(elementACopy))
                break;

                case "INTERSECTION" :
                    
                let resultINT = collisions.map(([elementA, elementB], index) => {
                    let indexKey = 3*index
                    let resultEntity: CompositeEntity = {
                        ...elementB,
                        baseElements: { elementA: { ...elementB, keyComponent: newKeysSub[indexKey] }, elementB: { ...elementA, keyComponent: newKeysSub[1+indexKey] } },
                        type: operation,
                        geometryPositionVertices: undefined,
                        geometryNormalVertices: undefined,
                        geometryUvVertices: undefined,
                        keyComponent: newKeysSub[2+indexKey],
                        lastTransformationType: undefined
                    }
                    return resultEntity
                })
                
                
                dispatch(removeComponent(collisions[0][0]))
                collisions.map(([,elementB]) => {
                    dispatch(removeComponent(elementB))
                })
                resultINT.map(result => dispatch(addComponent(result)))
                break;
            }
        

    }

    const removeEntityJustCreated = (entity: ComponentEntity, dispatch: Dispatch) => {
        dispatch(removeComponent(entity))
        alert("Esiste già un componente nella stessa posizione. Spostalo prima di crearne uno nuovo!")
    }
