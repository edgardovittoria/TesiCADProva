import React, {MutableRefObject, ReactNode, useEffect, useMemo, useRef, useState} from 'react';
import { canvasStateSelector, findComponentByKey, selectComponent, updateBox3 } from "../../../store/canvasSlice";
import { useDispatch, useSelector } from "react-redux";
import { Transformations } from './transformations';
import { DetectCollision } from './detectCollision';
import { meshWithcomputedGeometryBoundingFrom } from '../../../auxiliaryFunctionsUsingThreeDirectly/meshOpsAndSettings';

export interface ComponentProps {
    orbit: MutableRefObject<null>,
    position: [number, number, number],
    rotation: [number, number, number],
    scale: [number, number, number],
    keyComponent: number,
    isSelected: boolean,
}

export const Component: React.FC<ComponentProps> = ({ children, orbit, position, rotation, scale, keyComponent, isSelected }) => {
    const dispatch = useDispatch();
    const meshRef = useRef<THREE.Mesh>(null)
    const canvas = useSelector(canvasStateSelector)

    useEffect(() => {
        dispatch(selectComponent(keyComponent))
    }, [])


    useEffect(() => {
        if (meshRef.current) {
            let meshTemp = meshWithcomputedGeometryBoundingFrom(meshRef.current);
            (meshTemp.geometry.boundingBox) && dispatch(updateBox3({ key: keyComponent, box3: meshTemp.geometry.boundingBox }))
        }
    }, [position, rotation, scale])

    return (
        (isSelected) ?
            <>
                <Transformations orbit={orbit} keyComponent={keyComponent} position={position} rotation={rotation} scale={scale}>
                    <mesh ref={meshRef} >
                        {children}
                    </mesh>
                </Transformations>
                <DetectCollision canvas={canvas} entity={findComponentByKey(canvas, keyComponent)} />
            </>
            :
            // <group key={keyComponent} userData={{ key: keyComponent }} onClick={() => dispatch(selectComponent(keyComponent))} position={position} rotation={rotation} scale={scale}>
                <mesh ref={meshRef} onClick={() => dispatch(selectComponent(keyComponent))} position={position} rotation={rotation} scale={scale}>
                    {children}
                </mesh>
            // </group>

    )

}