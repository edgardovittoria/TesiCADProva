import React, { useEffect } from "react";
import { Object3DNode } from "@react-three/fiber";
import {
    canvasStateSelector,
    updatePosition,
    updateRotation,
    updateScale
} from "../store/canvasSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToolbarTransformationState, toolbarTransformationStateSelector } from "../store/toolbarTransformationSlice";
import { Dispatch } from "@reduxjs/toolkit";

export const useTransformations = (
    transformation: React.MutableRefObject<null>,
    orbit: React.MutableRefObject<null>
) => {

    function getActiveTransformationType(toolbarTranformationState: ToolbarTransformationState): string {
        return toolbarTranformationState.transformation.filter(transformation => transformation.active)[0].type;
    }

    const dispatch = useDispatch();
    const toolbarTransformationState = useSelector(toolbarTransformationStateSelector);
    const canvasState = useSelector(canvasStateSelector);


    useEffect(() => {
        if (transformation.current) {
            const controls: Object3DNode<any, any> = transformation.current

            controls.setMode(getActiveTransformationType(toolbarTransformationState))
            const callback = (event: any) => {
                (orbit.current !== null) && ((orbit.current as Object3DNode<any, any>).enabled = !event.value)
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
            controls.addEventListener("dragging-changed", callback)
            return () => controls.removeEventListener("dragging-changed", callback)

        }
    }, [toolbarTransformationState.transformation, canvasState.components])

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


