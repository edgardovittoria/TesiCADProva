import React, {useRef} from 'react';
import {Vector3} from "@react-three/fiber";
import {TransformControls} from "@react-three/drei";
import {canvasStateSelector, selectComponent} from "../../../store/canvasSlice";
import {useTransformations} from "../../../hooks/useTransformations";
import {useDispatch, useSelector} from "react-redux";

interface ComponentProps {
    name: string
    orbit: React.MutableRefObject<null>,
    position: Vector3,
    child: JSX.Element,
    keyComponent: number
}

export const Component: React.FC<ComponentProps> = (
    {orbit, child, position,keyComponent}) => {
    const transformation = useRef(null)
    useTransformations(transformation, orbit);
    const dispatch = useDispatch();
    return (
        <>
            <TransformControls ref={transformation} position={position} type={undefined} isGroup={undefined} id={undefined} uuid={undefined} name={undefined} parent={undefined} modelViewMatrix={undefined} normalMatrix={undefined} matrixWorld={undefined} matrixAutoUpdate={undefined} matrixWorldNeedsUpdate={undefined} castShadow={undefined} receiveShadow={undefined} frustumCulled={undefined} renderOrder={undefined} animations={undefined} userData={{key: keyComponent}} customDepthMaterial={undefined} customDistanceMaterial={undefined} isObject3D={undefined} onBeforeRender={undefined} onAfterRender={undefined} applyMatrix4={undefined} applyQuaternion={undefined} setRotationFromAxisAngle={undefined} setRotationFromEuler={undefined} setRotationFromMatrix={undefined} setRotationFromQuaternion={undefined} rotateOnAxis={undefined} rotateOnWorldAxis={undefined} rotateX={undefined} rotateY={undefined} rotateZ={undefined} translateOnAxis={undefined} translateX={undefined} translateY={undefined} translateZ={undefined} localToWorld={undefined} worldToLocal={undefined} lookAt={undefined} add={undefined} remove={undefined} clear={undefined} getObjectById={undefined} getObjectByName={undefined} getObjectByProperty={undefined} getWorldPosition={undefined} getWorldQuaternion={undefined} getWorldScale={undefined} getWorldDirection={undefined} raycast={undefined} traverse={undefined} traverseVisible={undefined} traverseAncestors={undefined} updateMatrix={undefined} updateWorldMatrix={undefined} toJSON={undefined} clone={undefined} copy={undefined} addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined} updateMatrixWorld={undefined} visible>
                <mesh onClick={() => dispatch(selectComponent(keyComponent))} >
                    {child}
                </mesh>
            </TransformControls>
        </>
    )

}