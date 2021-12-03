import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { meshWithPositionRotationScaleFromOldOne } from "../auxiliaryFunctionsUsingThreeDirectly/meshOpsAndSettings";
import { thereIsCollisionBetweenMeshes } from "../auxiliaryFunctionsUsingThreeDirectly/thereIsCollisionBetween";
import { ComponentEntity } from "../model/ComponentEntity";
import { CanvasState, findComponentByKey, removeComponent, selectComponent } from "../store/canvasSlice";
import {useThree} from "@react-three/fiber";



export const useDetectComponentsCollision = (keySelectedComponent: number, canvasState: CanvasState, setModalCollisions: Function) => {




    // useEffect(() => {
    //     if (modal.previousOpen && !modal.currentOpen && collisions.length > 0 && visibility) {
    //         dispatch(selectComponent(0))
    //         makeBinaryOperation(modal.lastValue, collisions, canvasState, dispatch)
    //         dispatch(setBinaryOperationExecuting(false))
    //     }
    // }, [modal.previousOpen, modal.currentOpen]);

}








