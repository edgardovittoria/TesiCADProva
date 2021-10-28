import { useEffect } from "react";
import { thereIsCollisionBetween } from "../auxiliaryFunctionsUsingThreeDirectly/ThereIsCollisionBetween";
import { ComponentEntity } from "../model/ComponentEntity";
import { CanvasState } from "../store/canvasSlice";


export const useDetectComponentsCollision = (componentEntity: ComponentEntity, canvasState: CanvasState) => {
    useEffect(() => {
        let collisionTotalResults = canvasState.components.filter(component => component.keyComponent !== componentEntity.keyComponent)
            .reduce((results : [number, number][], component) => {
                (thereIsCollisionBetween(componentEntity, component)) && results.push([componentEntity.keyComponent, component.keyComponent]) 
                return results
                }, [] )
        console.log(collisionTotalResults)
    }, [componentEntity.box3Max, componentEntity.box3Min])

}
