import React, {useEffect} from "react";
import {useControl} from "react-three-gui";
import {Object3DNode} from "@react-three/fiber";
import {canvasStateSelector, updatePosition} from "../store/canvasSlice";
import {useDispatch, useSelector} from "react-redux";

export const useTransformations = (
    transformation: React.MutableRefObject<null>,
    orbit: React.MutableRefObject<null>
    ) =>
{


    const mode = useControl("mode",{type: "select", items: ["translate", "rotate", "scale"]})
    const dispatch = useDispatch();
    const canvasState = useSelector(canvasStateSelector);
    useEffect(() => {
        if (transformation.current) {
            const controls: Object3DNode<any, any> = transformation.current
            controls.setMode(mode)
            controls.showX = (controls.object.userData.key === canvasState.selectedComponent);
            controls.showY = (controls.object.userData.key === canvasState.selectedComponent);
            controls.showZ = (controls.object.userData.key === canvasState.selectedComponent);
            const callback = (event: any) => {
                (orbit.current !== null) ? ((orbit.current as Object3DNode<any, any>).enabled = !event.value): console.log(event.value)
                dispatch(updatePosition(controls.worldPosition))
            }
            controls.addEventListener("dragging-changed", callback)
            return () => controls.removeEventListener("dragging-changed", callback)
        }
    },[mode, canvasState.selectedComponent])
}