import React, {useEffect, useRef} from 'react';
import {useControl} from "react-three-gui";
import {Object3DNode} from "@react-three/fiber";
import {OrbitControls, TransformControls} from "@react-three/drei";
import {Sfera} from "./sfera";
import {updatePosition} from "../../../store/canvasSlice";
import {Dispatch} from "@reduxjs/toolkit";

interface KeenProps {
    dispatch: Dispatch<any>
}

export const Keen: React.FC<KeenProps> = ({dispatch}) => {

    const orbit = useRef(null)
    const transform = useRef(null)
    const mode = useControl("mode", {type: "select", items: ["translate", "rotate", "scale"]})
    useEffect(() => {
        if (transform.current) {
            const controls: Object3DNode<any, any> = transform.current
            controls.setMode(mode)
            const callback = (event: any) => {
                (orbit.current !== null) ? ((orbit.current as Object3DNode<any, any>).enabled = !event.value): console.log(event.value)
                console.log(controls)
                dispatch(updatePosition(controls.worldPosition))
            }
            controls.addEventListener("dragging-changed", callback)
            return () => controls.removeEventListener("dragging-changed", callback)
        }
    },[mode])
    return (
        <>
            <TransformControls ref={transform} type={undefined} isGroup={undefined} id={undefined} uuid={undefined} name={undefined} parent={undefined} modelViewMatrix={undefined} normalMatrix={undefined} matrixWorld={undefined} matrixAutoUpdate={undefined} matrixWorldNeedsUpdate={undefined} castShadow={undefined} receiveShadow={undefined} frustumCulled={undefined} renderOrder={undefined} animations={undefined} userData={undefined} customDepthMaterial={undefined} customDistanceMaterial={undefined} isObject3D={undefined} onBeforeRender={undefined} onAfterRender={undefined} applyMatrix4={undefined} applyQuaternion={undefined} setRotationFromAxisAngle={undefined} setRotationFromEuler={undefined} setRotationFromMatrix={undefined} setRotationFromQuaternion={undefined} rotateOnAxis={undefined} rotateOnWorldAxis={undefined} rotateX={undefined} rotateY={undefined} rotateZ={undefined} translateOnAxis={undefined} translateX={undefined} translateY={undefined} translateZ={undefined} localToWorld={undefined} worldToLocal={undefined} lookAt={undefined} add={undefined} remove={undefined} clear={undefined} getObjectById={undefined} getObjectByName={undefined} getObjectByProperty={undefined} getWorldPosition={undefined} getWorldQuaternion={undefined} getWorldScale={undefined} getWorldDirection={undefined} raycast={undefined} traverse={undefined} traverseVisible={undefined} traverseAncestors={undefined} updateMatrix={undefined} updateWorldMatrix={undefined} toJSON={undefined} clone={undefined} copy={undefined} addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined} updateMatrixWorld={undefined} visible>
                <group  position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} dispose={null}>
                    <Sfera radius={1} widthSegments={6} heightSegments={6} color="yellow"/>
                </group>
            </TransformControls>
            <OrbitControls ref={orbit} addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined}  />
        </>
    )

}