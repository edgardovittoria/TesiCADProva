import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { canvasStateSelector, selectComponent, updateBox3 } from "../../../store/canvasSlice";
import { useTransformations } from "../../../hooks/useTransformations";
import { useDispatch, useSelector } from "react-redux";
import { ComponentEntity } from "../../../model/ComponentEntity";
import { FactoryComponent } from "../../factory/FactoryComponent";
import { DetectCollision } from './detectCollision';
import { Transformations } from './transformations';
import { meshWithColorFromOldOne, meshWithPositionRotationScaleFromOldOne, meshWithResetTransformationParamsFromOld, meshWithcomputedGeometryBoundingFrom } from '../../../auxiliaryFunctionsUsingThreeDirectly/meshOpsAndSettings';

interface ComponentProps {
    orbit: MutableRefObject<null>
}

export const Component: React.FC<ComponentProps> = ({ children, orbit }) => {
    const dispatch = useDispatch();
    const canvasState = useSelector(canvasStateSelector);
    let componentEntity = children as ComponentEntity
    const [mesh, setMesh] = useState(useMemo(() => FactoryComponent(componentEntity), []))

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
                <Transformations orbit={orbit} entity={componentEntity}>
                    <primitive object={meshWithResetTransformationParamsFromOld(mesh)} />
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
            // <mesh  geometry={mesh.geometry} material={mesh.material} position={componentEntity.position} scale={componentEntity.scale} rotation={componentEntity.rotation}/>
    )

}