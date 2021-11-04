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
    const [thereAreCollisions, setThereAreCollisions] = useState<boolean>(false)
   
    useEffect(() => {
        let collisions = arrayOfCollisionsBetween(componentEntity, canvasState.components);
        (collisions.length > 0) ? setThereAreCollisions(true) : setThereAreCollisions(false)
        collisions
            .map(([, componentKey]) => {
                setElementsForOperation([elementFromCanvasByKey(canvasState, componentKey), componentEntity]);
                (componentEntity.previousPosition.every((val, index) => val === componentEntity.position[index])) ? removeEntityJustCreated(componentEntity, dispatch) : dispatch(openModal('BINARY_OP'))
            })
    }, [componentEntity.box3Max, componentEntity.box3Min])

    useEffect(() => {
        if (modal.previousOpen && !modal.currentOpen && thereAreCollisions) {
            makeBinaryOperation(modal.lastValue, elementsForOperation[0], elementsForOperation[1], canvasState, dispatch)
        }
    }, [modal.previousOpen, modal.currentOpen]);

}

    const arrayOfCollisionsBetween = (element: ComponentEntity, allElements: ComponentEntity[]) => {
        return allElements
            .filter(component => component.keyComponent !== element.keyComponent)
            .reduce((results: [number, number][], component) => {
                (thereIsCollisionBetween(element, component)) && results.push([element.keyComponent, component.keyComponent])
                return results
            }, [])
    }

    const elementFromCanvasByKey = (canvas : CanvasState, keyElement : number) => {
       return canvas.components.filter(component => component.keyComponent === keyElement)[0];
    }

    const makeBinaryOperation = (operation: string, elementA: ComponentEntity, elementB: ComponentEntity, canvasState: CanvasState, dispatch: Dispatch) => {
        let newKeysSub = GetNewKey(canvasState, dispatch, 4)
        let subtractEntity: CompositeEntity = {
            ...elementA,
            elementKeys: { elementA: { ...elementA, keyComponent: newKeysSub[0] }, elementB: { ...elementB, keyComponent: newKeysSub[1] } },
            type: operation,
            geometryPositionVertices: undefined,
            geometryNormalVertices: undefined,
            geometryUvVertices: undefined,
            keyComponent: newKeysSub[2]
        }
        dispatch(removeComponent(elementA))
        dispatch(removeComponent(elementB))
        dispatch(addComponent(subtractEntity))
        if (operation === "SUBTRACTION") {
            let elementBCopy: ComponentEntity = { ...elementB, keyComponent: newKeysSub[3], position: elementB.previousPosition, rotation: elementB.previousRotation, scale: elementB.previousScale, box3Max: undefined, box3Min: undefined, isSelected: false }
            dispatch(addComponent(elementBCopy))
        }

        

    }

    const removeEntityJustCreated = (entity: ComponentEntity, dispatch: Dispatch) => {
        dispatch(removeComponent(entity))
        alert("Esiste già un componente nella stessa posizione. Spostalo prima di crearne uno nuovo!")
    }
