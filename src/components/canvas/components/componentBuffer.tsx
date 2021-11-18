import React, { MutableRefObject, useEffect, useMemo, useState } from 'react';
import { canvasStateSelector, selectComponent, updateBox3 } from "../../../store/canvasSlice";
import { useDispatch, useSelector } from "react-redux";
import { ComponentEntity } from "../../../model/ComponentEntity";
import { DetectCollision } from './detectCollision';
import { Transformations } from './transformations';
import { meshWithColorFromOldOne, meshWithPositionRotationScaleFromOldOne, meshWithResetTransformationParamsFromOld, meshWithcomputedGeometryBoundingFrom } from '../../../auxiliaryFunctionsUsingThreeDirectly/meshOpsAndSettings';
import { meshFrom } from '../../../auxiliaryFunctionsUsingThreeDirectly/meshOpsAndSettings';

interface ComponentBufferProps {
    orbit: MutableRefObject<null>
}

export const ComponentBuffer: React.FC<ComponentBufferProps> = ({ children, orbit }) => {
    const dispatch = useDispatch();
    const canvasState = useSelector(canvasStateSelector);
    let componentEntity = children as ComponentEntity
    const [mesh, setMesh] = useState(useMemo(() => meshFrom(componentEntity), []))

    useEffect(() => {
        dispatch(selectComponent(componentEntity.keyComponent))
    }, [])

    useEffect(() => {
        setMesh((meshWithColorFromOldOne(mesh, componentEntity.color)))
    }, [componentEntity.color])

    useEffect(() => {
        let meshTemp = (meshWithcomputedGeometryBoundingFrom(meshWithPositionRotationScaleFromOldOne(mesh, componentEntity.position, componentEntity.rotation, componentEntity.scale)))
        if (meshTemp.geometry.boundingBox) {
            dispatch(updateBox3({ key: componentEntity.keyComponent, box3: meshTemp.geometry.boundingBox }))
        }
    }, [componentEntity.position, componentEntity.rotation, componentEntity.scale])

    return (
        (componentEntity.isSelected) ?
            <>
                <Transformations orbit={orbit} position={componentEntity.position} scale={componentEntity.scale} rotation={componentEntity.rotation} keyComponent={componentEntity.keyComponent}>
                    <primitive object={meshWithResetTransformationParamsFromOld(mesh)} />
                </Transformations>
                <DetectCollision canvas={canvasState} entity={componentEntity} />
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
            // <mesh  geometry={mesh.geometry} material={mesh.material} position={componentEntity.position} scale={componentEntity.scale} rotation={componentEntity.rotation}/>
    )

}