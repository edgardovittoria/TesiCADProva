import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { canvasStateSelector, selectComponent, updateBox3 } from "../../../store/canvasSlice";
import { useTransformations } from "../../../hooks/useTransformations";
import { useDispatch, useSelector } from "react-redux";
import { ComponentEntity } from "../../../model/ComponentEntity";
import { FactoryComponent } from "../../factory/FactoryComponent";
import { DetectCollision } from './detectCollision';
import { Transformations } from './transformations';
import { meshWithPositionRotationScaleFromOldOne } from '../../../auxiliaryFunctionsUsingThreeDirectly/meshWithPositionRotationScaleFromOldOne';
import { computeGeometryBoundingBoxOf } from '../../../auxiliaryFunctionsUsingThreeDirectly/computeGeometryBoundingBoxOf';
import { Mesh } from 'three';
import { emptyObject } from '../../emptyObject';
import { resetMeshTransformationParams } from '../../../auxiliaryFunctionsUsingThreeDirectly/resetMeshTransformationParams';
import { meshWithColorFromOldOne } from '../../../auxiliaryFunctionsUsingThreeDirectly/meshWithColorFromOldOne';


interface ComponentProps {
    orbit: MutableRefObject<null>
}

export const Component: React.FC<ComponentProps> = ({ children, orbit }) => {
    const dispatch = useDispatch();
    const canvasState = useSelector(canvasStateSelector);
    const transformation = useRef(null)
    let componentEntity = children as ComponentEntity
    const[mesh, setMesh] = useState(useMemo(() => FactoryComponent(componentEntity),[]))
    //let mesh = useMemo(() => FactoryComponent(componentEntity), [componentEntity.color])

    
    useTransformations(transformation, orbit);

    useEffect(() => {
        dispatch(selectComponent(componentEntity.keyComponent))
    }, [])


    useEffect(() => {
        setMesh((meshWithColorFromOldOne(mesh, componentEntity.color)))
    },[componentEntity.color])

    useEffect(() => {
            let meshTemp = (computeGeometryBoundingBoxOf(meshWithPositionRotationScaleFromOldOne(mesh, componentEntity.position, componentEntity.rotation, componentEntity.scale)))
            if (meshTemp.geometry.boundingBox) {
                dispatch(updateBox3({ key: componentEntity.keyComponent, box3: meshTemp.geometry.boundingBox }))
            } 
            setMesh(meshTemp)
    }, [componentEntity.position, componentEntity.rotation, componentEntity.scale])


    return (
        (componentEntity.isSelected) ?
            <>
                <Transformations orbit={orbit} entity={componentEntity}>
                    <primitive object={resetMeshTransformationParams(mesh)} />
                </Transformations>
                <DetectCollision canvasState={canvasState} entity={componentEntity} />
            </>
            :
            <group key={componentEntity.keyComponent} onClick={() => dispatch(selectComponent(componentEntity.keyComponent))}>
                <primitive
                    object={mesh}
                    position={componentEntity.position}
                    scale={componentEntity.scale}
                    rotation={componentEntity.rotation}
                />
            </group>

    )

}