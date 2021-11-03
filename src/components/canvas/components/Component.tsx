import React, {MutableRefObject, useEffect, useRef} from 'react';
import {TransformControls} from "@react-three/drei";
import {
    canvasStateSelector,
    selectComponent,
    updateBox3, updateCompositeEntityNormalVertices, updateCompositeEntityPositionVertices, updateCompositeEntityUvVertices, updatePosition,
} from "../../../store/canvasSlice";
import {useTransformations} from "../../../hooks/useTransformations";
import {useDispatch, useSelector} from "react-redux";
import {ComponentEntity, CompositeEntity} from "../../../model/ComponentEntity";
import {useDetectComponentsCollision} from '../../../hooks/useDetectComponentsCollision';
import {Mesh} from 'three';
import {FactoryComponent} from "../../factory/FactoryComponent";
import {Object3DNode} from "@react-three/fiber";

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
    useDetectComponentsCollision(componentEntity, canvasState)

    useEffect(() => {
        console.log(meshRef.current)
        if(!(componentEntity as CompositeEntity).geometryPositionVertices){
            if(meshRef.current){
                let mesh = meshRef.current as Mesh
                dispatch(updateCompositeEntityPositionVertices({key: componentEntity.keyComponent, vertices: mesh.geometry.attributes.position.array as Float32Array}))
                dispatch(updateCompositeEntityNormalVertices({key: componentEntity.keyComponent, vertices: mesh.geometry.attributes.normal.array as Float32Array}))
                dispatch(updateCompositeEntityUvVertices({key: componentEntity.keyComponent, vertices: mesh.geometry.attributes.uv.array as Float32Array}))
            }
        }
    }, [])

    useEffect(() => {
        if (meshRef.current) {
            let mesh = meshRef.current as Mesh
            mesh.position.set(componentEntity.position[0], componentEntity.position[1], componentEntity.position[2])
            mesh.rotation.set(componentEntity.rotation[0], componentEntity.rotation[1], componentEntity.rotation[2])
            mesh.scale.set(componentEntity.scale[0], componentEntity.scale[1], componentEntity.scale[2])
            mesh.updateMatrix()
            mesh.geometry.computeBoundingBox()
            mesh.geometry.boundingBox?.applyMatrix4(mesh.matrix)
            if (mesh.geometry.boundingBox) {
                dispatch(updateBox3({key: componentEntity.keyComponent, box3: mesh.geometry.boundingBox}))
            }
        }
    }, [componentEntity.position, componentEntity.rotation, componentEntity.scale])


    return (

        (componentEntity.isSelected) ?
            <TransformControls
                key={componentEntity.keyComponent}
                ref={transformation}
                position={componentEntity.position}
                rotation={componentEntity.rotation}
                scale={componentEntity.scale}
                type={undefined} isGroup={undefined} id={undefined} uuid={undefined}
                name={undefined}
                parent={undefined} modelViewMatrix={undefined} normalMatrix={undefined}
                matrixWorld={undefined} matrixAutoUpdate={undefined}
                matrixWorldNeedsUpdate={undefined}
                castShadow={undefined} receiveShadow={undefined} frustumCulled={undefined}
                renderOrder={undefined} animations={undefined}
                userData={{key: componentEntity.keyComponent}}
                customDepthMaterial={undefined} customDistanceMaterial={undefined}
                isObject3D={undefined}
                onBeforeRender={undefined} onAfterRender={undefined}
                applyMatrix4={undefined}
                applyQuaternion={undefined} setRotationFromAxisAngle={undefined}
                setRotationFromEuler={undefined} setRotationFromMatrix={undefined}
                setRotationFromQuaternion={undefined} rotateOnAxis={undefined}
                rotateOnWorldAxis={undefined} rotateX={undefined} rotateY={undefined}
                rotateZ={undefined}
                translateOnAxis={undefined} translateX={undefined} translateY={undefined}
                translateZ={undefined} localToWorld={undefined} worldToLocal={undefined}
                lookAt={undefined} add={undefined} remove={undefined} clear={undefined}
                getObjectById={undefined} getObjectByName={undefined}
                getObjectByProperty={undefined}
                getWorldPosition={undefined} getWorldQuaternion={undefined}
                getWorldScale={undefined}
                getWorldDirection={undefined} raycast={undefined} traverse={undefined}
                traverseVisible={undefined} traverseAncestors={undefined}
                updateMatrix={undefined}
                updateWorldMatrix={undefined} toJSON={undefined} clone={undefined}
                copy={undefined}
                addEventListener={undefined} hasEventListener={undefined}
                removeEventListener={undefined}
                dispatchEvent={undefined} updateMatrixWorld={undefined} visible>
                <primitive
                    ref={meshRef}
                    object={FactoryComponent(componentEntity)}
                />

            </TransformControls> :
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