import React, {useEffect} from "react";
import {Object3DNode} from "@react-three/fiber";
import {
    canvasStateSelector,
    selectComponent, selectedComponentSelector, updateComponent,
    updatePosition,
    updateRotation,
    updateScale
} from "../store/canvasSlice";
import {useDispatch, useSelector} from "react-redux";
import {ToolbarTransformationState, toolbarTransformationStateSelector} from "../store/toolbarTransformationSlice";
import {Box3, BoxGeometry, Matrix4} from "three";
import {Dispatch} from "@reduxjs/toolkit";
import {ComponentEntity} from "../model/ComponentEntity";

export const useTransformations = (
    transformation: React.MutableRefObject<null>,
    orbit: React.MutableRefObject<null>
    ) =>
{

    function getActiveTransformationType(toolbarTranformationState: ToolbarTransformationState) : string{
        return toolbarTranformationState.transformation.filter(transformation => transformation.active)[0].type;
    }

    const dispatch = useDispatch();
    const toolbarTransformationState = useSelector(toolbarTransformationStateSelector);
    const canvasState = useSelector(canvasStateSelector);
    let selectedComponent = useSelector(selectedComponentSelector);


    useEffect(() => {

        if (transformation.current && selectedComponent) {
            const controls: Object3DNode<any, any> = transformation.current
            if(controls.object.userData.key === selectedComponent.keyComponent){
                controls.showX = true
                controls.showY = true
                controls.showZ = true
            }else{
                controls.showX = false
                controls.showY = false
                controls.showZ = false
            }

            controls.setMode(getActiveTransformationType(toolbarTransformationState))
            const callback = (event: any) => {
                (orbit.current !== null) && ((orbit.current as Object3DNode<any, any>).enabled = !event.value)
                if(controls.getMode() === 'translate'){
                    manageTransformation(
                        controls.getMode(),
                        [controls.worldPosition.x, controls.worldPosition.y, controls.worldPosition.z],
                        dispatch
                    )
                    updateBoundingBox(selectedComponent, dispatch)

                }else if(controls.getMode() === 'rotate'){
                    manageTransformation(
                        controls.getMode(),
                        [controls.worldQuaternion.x, controls.worldQuaternion.y, controls.worldQuaternion.z],
                        dispatch
                    )
                    updateBoundingBox(selectedComponent, dispatch)
                }else{
                    manageTransformation(
                        controls.getMode(),
                        [controls.worldScale.x, controls.worldScale.y, controls.worldScale.z],
                        dispatch
                    )
                    updateBoundingBox(selectedComponent, dispatch)
                }
            }
            controls.addEventListener("dragging-changed", callback)
            return () => controls.removeEventListener("dragging-changed", callback)

        }
    },[toolbarTransformationState.transformation, canvasState.components])
}

export function manageTransformation(
    transformation: string,
    transformationValues: number[],
    dispatch: Dispatch){
    switch (transformation) {
        case 'translate' :
            dispatch(updatePosition([transformationValues[0], transformationValues[1],transformationValues[2]]));
            break;
        case 'rotate' :
            dispatch(updateRotation([transformationValues[0], transformationValues[1],transformationValues[2]]));
            break;
        case 'scale' :
            dispatch(updateScale([transformationValues[0], transformationValues[1],transformationValues[2]]));
            break;
    }
}

export function updateBoundingBox(selectedComponent: ComponentEntity, dispatch: Dispatch){
    selectedComponent.mesh.geometry?.boundingBox?.applyMatrix4(selectedComponent.mesh.matrixWorld as Matrix4)
    console.log(selectedComponent)
    dispatch(updateComponent(selectedComponent))
}
