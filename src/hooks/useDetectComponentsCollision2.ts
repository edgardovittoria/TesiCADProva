import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { meshWithPositionRotationScaleFromOldOne } from "../auxiliaryFunctionsUsingThreeDirectly/meshOpsAndSettings";
import { thereIsCollisionBetweenMeshes } from "../auxiliaryFunctionsUsingThreeDirectly/thereIsCollisionBetween";
import { ComponentEntity } from "../model/ComponentEntity";
import { CanvasState, findComponentByKey, removeComponent, selectComponent } from "../store/canvasSlice";
import {useThree} from "@react-three/fiber";



export const useDetectComponentsCollision2 = (keySelectedComponent: number, canvasState: CanvasState, setModalCollisions: Function) => {
    const removeEntityJustCreated = (entity: ComponentEntity, dispatch: Dispatch) => {
        dispatch(selectComponent(0))
        dispatch(removeComponent(entity))
        alert("Esiste già un componente nella stessa posizione. Spostalo prima di crearne uno nuovo!")
    }

    const { scene } = useThree()
    let dispatch = useDispatch()
    let componentEntity = findComponentByKey(canvasState.components, keySelectedComponent)
 
    useEffect(() => {
        let collisionsSet = arrayOfCollisionsBetween(keySelectedComponent, scene.children.filter(el => el.type === "Mesh") as THREE.Mesh[]);
        if (collisionsSet.length > 0) {
            if (componentEntity.previousPosition.every((val, index) => val === componentEntity.position[index])
                && componentEntity.previousScale.every((val, index) => val === componentEntity.scale[index])
                && componentEntity.previousRotation.every((val, index) => val === componentEntity.rotation[index])) {
                removeEntityJustCreated(componentEntity, dispatch)
            }
            else { 
                setModalCollisions(collisionsSet)
            }
        }
    }, [componentEntity.position, componentEntity.rotation, componentEntity.scale])

    // useEffect(() => {
    //     if (modal.previousOpen && !modal.currentOpen && collisions.length > 0 && visibility) {
    //         dispatch(selectComponent(0))
    //         makeBinaryOperation(modal.lastValue, collisions, canvasState, dispatch)
    //         dispatch(setBinaryOperationExecuting(false))
    //     }
    // }, [modal.previousOpen, modal.currentOpen]);

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






