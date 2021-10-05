import React, {useEffect, useRef} from 'react';
import {useControl} from "react-three-gui";
import {Object3DNode, Vector3} from "@react-three/fiber";
import {OrbitControls, TransformControls} from "@react-three/drei";
import {Sfera} from "./sfera";
import {selectComponent, updatePosition} from "../../../store/canvasSlice";
import {Dispatch} from "@reduxjs/toolkit";
import {useTransformations} from "../../../hooks/useTransformations";
import {useToggleOrbitControl} from "../../../hooks/useToggleOrbitControl";

interface KeenProps {
    dispatch: Dispatch<any>,
    orbit: React.MutableRefObject<null>,
    position: Vector3 | undefined,
    child: JSX.Element,
    keyComponent: number

}

export const Component: React.FC<KeenProps> = (
    {dispatch, orbit, child, position,keyComponent}) => {
    const transformation = useRef(null)
    useTransformations(transformation, orbit, dispatch);
    return (
        <>
            <TransformControls ref={transformation} type={undefined} isGroup={undefined} id={undefined} uuid={undefined} name={undefined} parent={undefined} modelViewMatrix={undefined} normalMatrix={undefined} matrixWorld={undefined} matrixAutoUpdate={undefined} matrixWorldNeedsUpdate={undefined} castShadow={undefined} receiveShadow={undefined} frustumCulled={undefined} renderOrder={undefined} animations={undefined} userData={undefined} customDepthMaterial={undefined} customDistanceMaterial={undefined} isObject3D={undefined} onBeforeRender={undefined} onAfterRender={undefined} applyMatrix4={undefined} applyQuaternion={undefined} setRotationFromAxisAngle={undefined} setRotationFromEuler={undefined} setRotationFromMatrix={undefined} setRotationFromQuaternion={undefined} rotateOnAxis={undefined} rotateOnWorldAxis={undefined} rotateX={undefined} rotateY={undefined} rotateZ={undefined} translateOnAxis={undefined} translateX={undefined} translateY={undefined} translateZ={undefined} localToWorld={undefined} worldToLocal={undefined} lookAt={undefined} add={undefined} remove={undefined} clear={undefined} getObjectById={undefined} getObjectByName={undefined} getObjectByProperty={undefined} getWorldPosition={undefined} getWorldQuaternion={undefined} getWorldScale={undefined} getWorldDirection={undefined} raycast={undefined} traverse={undefined} traverseVisible={undefined} traverseAncestors={undefined} updateMatrix={undefined} updateWorldMatrix={undefined} toJSON={undefined} clone={undefined} copy={undefined} addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined} updateMatrixWorld={undefined} visible>
                <mesh position={position} onPointerEnter={() => dispatch(selectComponent(keyComponent))}>
                    {child}
                </mesh>
            </TransformControls>
        </>
    )

}