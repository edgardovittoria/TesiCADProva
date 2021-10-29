import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { thereIsCollisionBetween } from "../auxiliaryFunctionsUsingThreeDirectly/ThereIsCollisionBetween";
import { GetNewKey } from "../components/canvas/components/cube";
import { ComponentEntity, CompositeEntity } from "../model/ComponentEntity";
import { addComponent, CanvasState, removeComponent } from "../store/canvasSlice";


export const useDetectComponentsCollision = (componentEntity: ComponentEntity, canvasState: CanvasState) => {
    let dispatch = useDispatch()
    const makeSubtraction = (componentToSubtract : ComponentEntity, componentThatSubtract: ComponentEntity, canvasState: CanvasState, dispatch: Dispatch) => {
        let newKeys = GetNewKey(canvasState, dispatch, 2)
        let subtractEntity : CompositeEntity = {
            ...componentToSubtract,
            elementKeys: {componentToSubtract: {...componentToSubtract, keyComponent:newKeys[0]}, componentThatSubtract: {...componentThatSubtract, keyComponent:newKeys[1]}},
            type: "SUBTRACTION",
            box3Max: undefined,
            box3Min: undefined
        }
    
        dispatch(removeComponent(componentToSubtract))
        dispatch(addComponent(subtractEntity))
    }


    useEffect(() => {
        let collisionTotalResults = canvasState.components.filter(component => component.keyComponent !== componentEntity.keyComponent)
            .reduce((results : [number, number][], component) => {
                (thereIsCollisionBetween(componentEntity, component)) && results.push([componentEntity.keyComponent, component.keyComponent]) 
                return results
                }, [] )
        collisionTotalResults.map(([componentEntityKey, componentKey]) => {
            let componentEntity = canvasState.components.filter(component => component.keyComponent === componentEntityKey)[0];
            let component = canvasState.components.filter(element => element.keyComponent === componentKey)[0];
            makeSubtraction(component, componentEntity, canvasState, dispatch)
        })
    }, [componentEntity.box3Max, componentEntity.box3Min])

}
