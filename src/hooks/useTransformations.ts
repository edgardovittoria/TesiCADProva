import React, {useEffect} from "react";
import {useControl} from "react-three-gui";
import {Object3DNode} from "@react-three/fiber";
import {canvasStateSelector, updatePosition, updateRotation, updateScale} from "../store/canvasSlice";
import {useDispatch, useSelector} from "react-redux";
import {ToolbarTransformationState, toolbarTransformationStateSelector} from "../store/toolbarTransformationSlice";

export const useTransformations = (
    transformation: React.MutableRefObject<null>,
    orbit: React.MutableRefObject<null>
    ) =>
{

    function getActiveTransformationType(toolbarTranformationState: ToolbarTransformationState) : string{
        return toolbarTranformationState.transformation.filter(transformation => transformation.active)[0].type;
    }

    const dispatch = useDispatch();
    const canvasState = useSelector(canvasStateSelector);
    const toolbarTransformationState = useSelector(toolbarTransformationStateSelector);
    useEffect(() => {
        if (transformation.current) {
            const controls: Object3DNode<any, any> = transformation.current
            controls.showX = (controls.object.userData.key === canvasState.selectedComponent)
            controls.showY = (controls.object.userData.key === canvasState.selectedComponent)
            controls.showZ = (controls.object.userData.key === canvasState.selectedComponent)
            controls.setMode(getActiveTransformationType(toolbarTransformationState))
            const callback = (event: any) => {
                (orbit.current !== null) && ((orbit.current as Object3DNode<any, any>).enabled = !event.value)
                if(controls.getMode() === 'translate'){
                    dispatch(updatePosition([controls.worldPosition.x, controls.worldPosition.y, controls.worldPosition.z]));
                }else if(controls.getMode() === 'rotate'){
                    dispatch(updateRotation([controls.worldQuaternion.x, controls.worldQuaternion.y, controls.worldQuaternion.z]));
                }else{
                    dispatch(updateScale([controls.worldScale.x, controls.worldScale.y, controls.worldScale.z]));
                }
            }
            controls.addEventListener("dragging-changed", callback)
            return () => controls.removeEventListener("dragging-changed", callback)

        }
    },[toolbarTransformationState.transformation, canvasState.selectedComponent])
}