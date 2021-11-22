import React, { useEffect } from "react";
import { Object3DNode } from "@react-three/fiber";
import {
    updatePosition,
    updateRotation,
    updateScale
} from "../store/canvasSlice";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

export const useTransformations = (
    transformation: React.MutableRefObject<null>,
    orbit: React.MutableRefObject<null>
) => {

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(transformation.current){
            const controls: Object3DNode<any, any> = transformation.current
            const callback = (event: any) => {
                //(orbit.current !== null) && ((orbit.current as Object3DNode<any, any>).enabled = !event.value)
                if (!event.value) {
                    if (controls.getMode() === 'translate') {
                        manageTransformation(
                            controls.getMode(),
                            [controls.worldPosition.x, controls.worldPosition.y, controls.worldPosition.z],
                            dispatch
                        )
                    } else if (controls.getMode() === 'rotate') {
                        manageTransformation(
                            controls.getMode(),
                            [controls.worldQuaternion.x, controls.worldQuaternion.y, controls.worldQuaternion.z],
                            dispatch
                        )
                    } else {
                        manageTransformation(
                            controls.getMode(),
                            [controls.worldScale.x, controls.worldScale.y, controls.worldScale.z],
                            dispatch
                        )
                    }
                }
            }
            controls.addEventListener("dragging-changed", callback)
            return () => controls.removeEventListener("dragging-changed", callback)
        }
    }, [])

}


export function manageTransformation(
    transformation: string,
    transformationValues: number[],
    dispatch: Dispatch) {
    switch (transformation) {
        case 'translate':
            dispatch(updatePosition([transformationValues[0], transformationValues[1], transformationValues[2]]));
            break;
        case 'rotate':
            dispatch(updateRotation([transformationValues[0], transformationValues[1], transformationValues[2]]));
            break;
        case 'scale':
            dispatch(updateScale([transformationValues[0], transformationValues[1], transformationValues[2]]));
            break;
    }
}


