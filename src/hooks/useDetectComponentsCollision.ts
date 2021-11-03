import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Dispatch } from "redux";
import { updateTypePredicateNodeWithModifier } from "typescript";
import { thereIsCollisionBetween } from "../auxiliaryFunctionsUsingThreeDirectly/ThereIsCollisionBetween";
import { GetNewKey } from "../components/canvas/components/cube";
import { ComponentEntity, CompositeEntity } from "../model/ComponentEntity";
import {addComponent, CanvasState, removeComponent, selectComponent, updatePosition, updateRotation, updateScale} from "../store/canvasSlice";
import {modalStateSelector, openModal} from "../store/modalSlice";


export const useDetectComponentsCollision = (componentEntity: ComponentEntity, canvasState: CanvasState) => {
    let dispatch = useDispatch()
    let modal = useSelector(modalStateSelector).modals.filter(modal => modal.name === "BINARY_OP")[0]
    const [elementsForOperation, setElementsForOperation] = useState<ComponentEntity[]>([]);


    useEffect(() => {
        let collisionTotalResults = canvasState.components.filter(component => component.keyComponent !== componentEntity.keyComponent)
            .reduce((results : [number, number][], component) => {
                (thereIsCollisionBetween(componentEntity, component)) && results.push([componentEntity.keyComponent, component.keyComponent]) 
                return results
                }, [] )
        collisionTotalResults.map(([componentEntityKey, componentKey]) => {
            let componentEntity = canvasState.components.filter(component => component.keyComponent === componentEntityKey)[0];
            let component = canvasState.components.filter(element => element.keyComponent === componentKey)[0];
            setElementsForOperation([component, componentEntity])
            dispatch(openModal('BINARY_OP'))
        })
    }, [componentEntity.box3Max, componentEntity.box3Min])

    useEffect(() => {
        if(modal.previousOpen && !modal.currentOpen && componentEntity.isSelected){
            console.log("bynary")
            makeBinaryOperation(modal.lastValue, elementsForOperation[0], elementsForOperation[1], canvasState, dispatch)
        }
    }, [modal.previousOpen, modal.currentOpen]);


}

const makeBinaryOperation = (operation: string, elementA: ComponentEntity, elementB: ComponentEntity, canvasState: CanvasState, dispatch: Dispatch) => {

    switch (operation) {
        case "SUBTRACTION" :
            let newKeysSub = GetNewKey(canvasState, dispatch, 4)
            let subtractEntity : CompositeEntity = {
                ...elementA,
                elementKeys: {elementA: {...elementA, keyComponent:newKeysSub[0]}, elementB: {...elementB, keyComponent:newKeysSub[1]}},
                type: "SUBTRACTION",
                geometryPositionVertices: undefined,
                geometryNormalVertices: undefined,
                geometryUvVertices: undefined,
                keyComponent: newKeysSub[2]
            }
            console.log(elementB)
            let elementBCopy : ComponentEntity = {...elementB, keyComponent: newKeysSub[3],position: elementB.previousPosition, rotation: elementB.previousRotation, scale: elementB.previousScale, box3Max: undefined, box3Min: undefined, isSelected: false}
            dispatch(removeComponent(elementA))
            dispatch(removeComponent(elementB))
            dispatch(addComponent(elementBCopy))
            dispatch(addComponent(subtractEntity))
            break;

        case "INTERSECTION" :
            let newKeysInt = GetNewKey(canvasState, dispatch, 3)
            let intersectionEntity : CompositeEntity = {
                ...elementA,
                //position: [(elementA.position[0]+elementB.position[0])/2, (elementA.position[1]+elementB.position[1])/2, (elementA.position[2]+elementB.position[2])/2],
                elementKeys: {elementA: {...elementA, keyComponent:newKeysInt[0]}, elementB: {...elementB, keyComponent:newKeysInt[1]}},
                type: "INTERSECTION",
                geometryPositionVertices: undefined,
                geometryNormalVertices: undefined,
                geometryUvVertices: undefined,
                keyComponent: newKeysInt[2]
            }
            dispatch(removeComponent(elementA))
            dispatch(removeComponent(elementB))
            dispatch(addComponent(intersectionEntity))
            break;

        case "UNION" :
            let newKeys = GetNewKey(canvasState, dispatch, 3)
            let unionEntity : CompositeEntity = {
                ...elementA,
                //position: [(elementA.position[0]+elementB.position[0])/2, (elementA.position[1]+elementB.position[1])/2, (elementA.position[2]+elementB.position[2])/2],
                elementKeys: {elementA: {...elementA, keyComponent:newKeys[0]}, elementB: {...elementB, keyComponent:newKeys[1]}},
                type: "UNION",
                geometryPositionVertices: undefined,
                geometryNormalVertices: undefined,
                geometryUvVertices: undefined,
                keyComponent: newKeys[2]
            }
            dispatch(removeComponent(elementA))
            dispatch(removeComponent(elementB))
            dispatch(addComponent(unionEntity))
    }

}
