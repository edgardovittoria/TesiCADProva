import React, { MutableRefObject, useEffect, useRef } from 'react';
import { canvasStateSelector, findComponentByKey, selectComponent, updateBox3 } from "../../../store/canvasSlice";
import { useDispatch, useSelector } from "react-redux";
import { DetectCollision } from './detectCollision';
import { meshWithcomputedGeometryBoundingFrom, meshWithPositionRotationScaleFromOldOne } from '../../../auxiliaryFunctionsUsingThreeDirectly/meshOpsAndSettings';
import { TransformControls } from '@react-three/drei';
import { useTransformations } from '../../../hooks/useTransformations';

export interface ComponentProps {
    orbit: MutableRefObject<null>,
    position: [number, number, number],
    rotation: [number, number, number],
    scale: [number, number, number],
    keyComponent: number,
}

export const Component: React.FC<ComponentProps> = ({ children, orbit, position, rotation, scale, keyComponent }) => {
    const dispatch = useDispatch();
    const meshRef = useRef<THREE.Mesh>(null)
    const canvas = useSelector(canvasStateSelector)
    const transformation = useRef(null)
    useTransformations(transformation, orbit)


    useEffect(() => {
        dispatch(selectComponent(keyComponent))
    }, [])


    useEffect(() => {
        if (meshRef.current) {
            let meshTemp = meshWithcomputedGeometryBoundingFrom(meshWithPositionRotationScaleFromOldOne(meshRef.current, position, rotation, scale));
            (meshTemp.geometry.boundingBox) && dispatch(updateBox3({ key: keyComponent, box3: meshTemp.geometry.boundingBox }))
        }
    }, [position, rotation, scale])

    return (

        <>
            <TransformControls
                showX={keyComponent === canvas.selectedComponentKey} showY={keyComponent === canvas.selectedComponentKey} showZ={keyComponent === canvas.selectedComponentKey}
                key={keyComponent} ref={transformation}
                position={position} rotation={rotation} scale={scale}
                userData={{ key: keyComponent }} visible>
                <mesh ref={meshRef} >
                    {children}
                </mesh>
            </TransformControls>
            {(keyComponent === canvas.selectedComponentKey) && <DetectCollision canvas={canvas} entity={findComponentByKey(canvas, keyComponent)} />}
        </>



    )

}