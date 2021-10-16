import React, {useEffect, useRef} from 'react';
import {Euler, Vector3} from "@react-three/fiber";
import {TransformControls} from "@react-three/drei";
import {canvasStateSelector, selectComponent, updateBox3} from "../../../store/canvasSlice";
import {useTransformations} from "../../../hooks/useTransformations";
import {useDispatch, useSelector} from "react-redux";
import {Box3, Mesh} from "three";

interface ComponentProps {
    name: string
    orbit: React.MutableRefObject<null>,
    position: Vector3,
    rotation: Euler,
    scale: Vector3,
    child: JSX.Element,
    keyComponent: number,
    box3?: Box3 | null,
    isSelected?: boolean
}

export const Component: React.FC<ComponentProps> = (
    {orbit, child, position, rotation, scale, keyComponent, box3, isSelected=false}) => {
    const transformation = useRef(null)
    useTransformations(transformation, orbit);
    const dispatch = useDispatch();
    const canvasState = useSelector(canvasStateSelector);
    const meshRef = useRef(null);

    useEffect(() => {
        if(canvasState.components.length !== 0){
            dispatch(selectComponent(keyComponent));
            dispatch(updateBox3(meshRef.current));
        }
    }, []);


    useEffect(() => {
        // let selectedComponent = canvasState.components.filter(component => component.props.keyComponent === canvasState.selectedComponent)[0];
        canvasState.components.map(component => {
            return (component.props.keyComponent !== keyComponent) && console.log(box3?.intersectsBox(component.props.box3))
        })
    }, [position, rotation, scale]);

    return (
        <>
            <TransformControls ref={transformation} position={position} rotation={rotation} scale={scale}
                               type={undefined} isGroup={undefined} id={undefined} uuid={undefined} name={undefined}
                               parent={undefined} modelViewMatrix={undefined} normalMatrix={undefined}
                               matrixWorld={undefined} matrixAutoUpdate={undefined} matrixWorldNeedsUpdate={undefined}
                               castShadow={undefined} receiveShadow={undefined} frustumCulled={undefined}
                               renderOrder={undefined} animations={undefined} userData={{key: keyComponent, selected: isSelected}}
                               customDepthMaterial={undefined} customDistanceMaterial={undefined} isObject3D={undefined}
                               onBeforeRender={undefined} onAfterRender={undefined} applyMatrix4={undefined}
                               applyQuaternion={undefined} setRotationFromAxisAngle={undefined}
                               setRotationFromEuler={undefined} setRotationFromMatrix={undefined}
                               setRotationFromQuaternion={undefined} rotateOnAxis={undefined}
                               rotateOnWorldAxis={undefined} rotateX={undefined} rotateY={undefined} rotateZ={undefined}
                               translateOnAxis={undefined} translateX={undefined} translateY={undefined}
                               translateZ={undefined} localToWorld={undefined} worldToLocal={undefined}
                               lookAt={undefined} add={undefined} remove={undefined} clear={undefined}
                               getObjectById={undefined} getObjectByName={undefined} getObjectByProperty={undefined}
                               getWorldPosition={undefined} getWorldQuaternion={undefined} getWorldScale={undefined}
                               getWorldDirection={undefined} raycast={undefined} traverse={undefined}
                               traverseVisible={undefined} traverseAncestors={undefined} updateMatrix={undefined}
                               updateWorldMatrix={undefined} toJSON={undefined} clone={undefined} copy={undefined}
                               addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined}
                               dispatchEvent={undefined} updateMatrixWorld={undefined} visible>
                <mesh onClick={() => dispatch(selectComponent(keyComponent))} ref={meshRef}>
                    {child}
                </mesh>
            </TransformControls>
        </>
    )

}