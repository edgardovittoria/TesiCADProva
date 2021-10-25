import React, {useEffect} from "react";
import {Object3DNode} from "@react-three/fiber";
import {
    canvasStateSelector,
    selectComponent, selectedComponentSelector,
    updateBox3,
    updatePosition,
    updateRotation,
    updateScale
} from "../store/canvasSlice";
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
    const toolbarTransformationState = useSelector(toolbarTransformationStateSelector);
    const canvasState = useSelector(canvasStateSelector);
    let selectedComponent = useSelector(selectedComponentSelector);

    useEffect(() => {
    }, []);



    useEffect(() => {
        console.log(selectedComponent)
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
                    dispatch(updatePosition([controls.worldPosition.x, controls.worldPosition.y, controls.worldPosition.z]));
                    //dispatch(updateBox3(controls.object.children[0]))
                }else if(controls.getMode() === 'rotate'){
                    dispatch(updateRotation([controls.worldQuaternion.x, controls.worldQuaternion.y, controls.worldQuaternion.z]));
                    //dispatch(updateBox3(controls.object.children[0]))
                }else{
                    dispatch(updateScale([controls.worldScale.x, controls.worldScale.y, controls.worldScale.z]));
                    //dispatch(updateBox3(controls.object.children[0]))
                }
            }
            controls.addEventListener("dragging-changed", callback)
            return () => controls.removeEventListener("dragging-changed", callback)

        }
    },[toolbarTransformationState.transformation, canvasState.components])
}