import React, {useEffect} from "react";
import {useControl} from "react-three-gui";
import {Object3DNode} from "@react-three/fiber";
import {updatePosition} from "../store/canvasSlice";
import {Dispatch} from "@reduxjs/toolkit";

export const useTransformations = (
    transformation: React.MutableRefObject<null>, orbit: React.MutableRefObject<null>, dispatch: Dispatch<any>) => {
    const mode = useControl("mode", {type: "select", items: ["translate", "rotate", "scale"]})
    useEffect(() => {
        if (transformation.current) {
            const controls: Object3DNode<any, any> = transformation.current
            controls.setMode(mode)
            const callback = (event: any) => {
                (orbit.current !== null) ? ((orbit.current as Object3DNode<any, any>).enabled = !event.value): console.log(event.value)
                dispatch(updatePosition(controls.worldPosition))
            }
            controls.addEventListener("dragging-changed", callback)
            return () => controls.removeEventListener("dragging-changed", callback)
        }
    },[mode])
}