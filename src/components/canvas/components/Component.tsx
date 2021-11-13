import React, { MutableRefObject, useEffect } from 'react';
import { selectComponent, updateBox3 } from "../../../store/canvasSlice";
import { useDispatch } from "react-redux";
import { Transformations } from './transformations';
import { DetectCollision } from './detectCollision';
import { meshWithcomputedGeometryBoundingFrom } from '../../../auxiliaryFunctionsUsingThreeDirectly/meshOpsAndSettings';
import { MeshProps } from '@react-three/fiber';

export interface ComponentProps {
    orbit: MutableRefObject<null>, 
    position : [number, number, number],
    rotation : [number, number, number],
    scale : [number, number, number], 
    keyComponent : number, 
    isSelected : boolean
}

export const Component: React.FC<ComponentProps> = ({ children, orbit, position, rotation, scale, keyComponent, isSelected }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(selectComponent(keyComponent))
    }, [])

    useEffect(() => {
        let meshRef = (children as MeshProps).ref as MutableRefObject<null>
        if(meshRef.current){
            let meshTemp = meshWithcomputedGeometryBoundingFrom(meshRef.current);
            (meshTemp.geometry.boundingBox) && dispatch(updateBox3({key: keyComponent, box3: meshTemp.geometry.boundingBox}))
        }       
    },[position, rotation, scale])
    
    return (
        (isSelected) ?
            <>
                <Transformations orbit={orbit} keyComponent={keyComponent} position={position} rotation={rotation} scale={scale}>
                    {children}
                </Transformations>
                <DetectCollision  keyComponent={keyComponent} />
            </>
            :
            <group key={keyComponent} userData={{key: keyComponent}} onClick={() => dispatch(selectComponent(keyComponent))} position={position} rotation={rotation} scale={scale}>
                {children}
            </group>
    )

}