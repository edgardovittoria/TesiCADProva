import React, {MutableRefObject, useEffect, useRef} from 'react';
import {Object3DNode, ThreeEvent, useThree} from "@react-three/fiber";
import {TransformControls} from "@react-three/drei";
import {
    canvasStateSelector,
    selectComponent, updateBox3,
} from "../../../store/canvasSlice";
import {useTransformations} from "../../../hooks/useTransformations";
import {useDispatch, useSelector} from "react-redux";
import {ComponentEntity} from "../../../model/ComponentEntity";
import {FactoryComponent} from '../../factory/FactoryComponent';
import {useDetectComponentsCollision} from '../../../hooks/useDetectComponentsCollision';
import {Mesh} from 'three';
import {FactoryComponent2} from "../../factory/FactoryComponent2";

interface ComponentProps {
}

export const Component: React.FC<ComponentProps> = (
    {
        children,

    }) => {


    const dispatch = useDispatch();
    const canvasState = useSelector(canvasStateSelector);
    const meshRef = useRef(null)
    let componentEntity = children as ComponentEntity
    
    useDetectComponentsCollision(componentEntity, canvasState)


    useEffect(() => {
        /*if (canvasState.components.length !== 0) {
            dispatch(selectComponent(componentEntity.keyComponent));
        }*/
    }, []);

    useEffect(() => {
        if (meshRef.current) {
            let mesh = meshRef.current as Mesh
            /*mesh.position.set(componentEntity.position[0], componentEntity.position[1], componentEntity.position[2])
            mesh.rotation.set(componentEntity.rotation[0], componentEntity.rotation[1], componentEntity.rotation[2])
            mesh.scale.set(componentEntity.scale[0], componentEntity.scale[1], componentEntity.scale[2])
            mesh.updateMatrix()*/
            mesh.geometry.computeBoundingBox()
            mesh.geometry.boundingBox?.applyMatrix4(mesh.matrix)
            if (mesh.geometry.boundingBox) {
                dispatch(updateBox3({key: componentEntity.keyComponent, box3: mesh.geometry.boundingBox}))
            }
            //console.log(meshRef.current)
        }
    }, [componentEntity.position, componentEntity.rotation, componentEntity.scale])


    return (
        <>
            {(componentEntity.isSelected) ?
                <primitive
                    ref={meshRef}
                    object={FactoryComponent2(componentEntity)}
                /> :
                <primitive
                    ref={meshRef}
                    object={FactoryComponent2(componentEntity)}
                    position={componentEntity.position}
                />}
        </>
    )

}