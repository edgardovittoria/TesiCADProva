import React, { MutableRefObject, useEffect, useRef } from 'react';
import {
    canvasStateSelector,
    selectComponent,
    updateBox3, updateCompositeEntityNormalVertices, updateCompositeEntityPositionVertices, updateCompositeEntityUvVertices,
} from "../../../store/canvasSlice";
import { useTransformations } from "../../../hooks/useTransformations";
import { useDispatch, useSelector } from "react-redux";
import { ComponentEntity } from "../../../model/ComponentEntity";
import { Mesh } from 'three';
import { FactoryComponent } from "../../factory/FactoryComponent";
import { DetectCollision } from './detectCollision';
import { Transformations } from './transformations';
import { meshWithPositionRotationScaleFromOldOne } from '../../../auxiliaryFunctionsUsingThreeDirectly/meshWithPositionRotationScaleFromOldOne';
import { computeGeometryBoundingBoxOf } from '../../../auxiliaryFunctionsUsingThreeDirectly/computeGeometryBoundingBoxOf';

interface ComponentProps {
    orbit: MutableRefObject<null>
}

export const Component: React.FC<ComponentProps> = (
    {
        children,
        orbit

    }) => {


    const dispatch = useDispatch();
    const canvasState = useSelector(canvasStateSelector);
    const meshRef = useRef(null)
    const transformation = useRef(null)
    let componentEntity = children as ComponentEntity


    useTransformations(transformation, orbit);
    //  useDetectComponentsCollision(componentEntity, canvasState)

    useEffect(() => {
        dispatch(selectComponent(componentEntity.keyComponent))
        if (componentEntity.hasOwnProperty("geometryPositionVertices")) {
            if (meshRef.current) {
                let mesh = meshRef.current as Mesh
                dispatch(updateCompositeEntityPositionVertices({ key: componentEntity.keyComponent, vertices: mesh.geometry.attributes.position.array as Float32Array }))
                dispatch(updateCompositeEntityNormalVertices({ key: componentEntity.keyComponent, vertices: mesh.geometry.attributes.normal.array as Float32Array }))
                dispatch(updateCompositeEntityUvVertices({ key: componentEntity.keyComponent, vertices: mesh.geometry.attributes.uv.array as Float32Array }))
            }
        }
    }, [])

    useEffect(() => {
        if (meshRef.current) {
            let mesh = meshRef.current as Mesh
            mesh = computeGeometryBoundingBoxOf(meshWithPositionRotationScaleFromOldOne(mesh, componentEntity.position, componentEntity.rotation, componentEntity.scale))
            if (mesh.geometry.boundingBox) {
                dispatch(updateBox3({ key: componentEntity.keyComponent, box3: mesh.geometry.boundingBox }))
            }
        }
    }, [componentEntity.position, componentEntity.rotation, componentEntity.scale])


    return (

        (componentEntity.isSelected) ?
            <>
                <Transformations orbit={orbit} entity={componentEntity}>
                    <primitive
                        ref={meshRef}
                        object={FactoryComponent(componentEntity)}
                    />

                </Transformations>
                <DetectCollision canvasState={canvasState} entity={componentEntity} />
            </>
            :
            <group
                key={componentEntity.keyComponent}
                onClick={() => dispatch(selectComponent(componentEntity.keyComponent))}
            >
                <primitive
                    ref={meshRef}
                    object={FactoryComponent(componentEntity)}
                    position={componentEntity.position}
                    scale={componentEntity.scale}
                    rotation={componentEntity.rotation}
                />
            </group>

    )

}