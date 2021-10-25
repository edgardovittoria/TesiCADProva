import React, {useEffect, useRef} from 'react';
import {BoxGeometryProps, BufferGeometryProps, Euler, MeshProps, Vector3} from "@react-three/fiber";
import {TransformControls} from "@react-three/drei";
import {
    canvasStateSelector,
    selectComponent, selectedComponentSelector,
    setMeshRefComponent,
    subtractionComponent,
} from "../../../store/canvasSlice";
import {useTransformations} from "../../../hooks/useTransformations";
import {useDispatch, useSelector} from "react-redux";
import {Box3, Mesh} from "three";
import {ComponentEntity} from "../../../model/ComponentEntity";

interface ComponentProps {
    orbit: React.MutableRefObject<null>,
}

export const Component: React.FC<ComponentProps> = (
    {
        children, orbit
    }) => {

    const dispatch = useDispatch();
    const canvasState = useSelector(canvasStateSelector);

    const componentEntity  = children as JSX.Element;

    const transformation = useRef(null)
    useTransformations(transformation, orbit);


    useEffect(() => {
        if (canvasState.components.length !== 0) {
            dispatch(selectComponent(componentEntity.props.entity.keyComponent));
        }
    }, []);


    useEffect(() => {

        canvasState.components.map(component => {
            let newMesh: Mesh | null
            console.log(componentEntity)
            //console.log('chiave non selezionato',component.keyComponent)
            //console.log('chiave selezionato',componentEntity.props.entity.keyComponent)
            //if (component.keyComponent !== componentEntity.props.entity.keyComponent && componentEntity.props.entity.mesh.geometry.boundingBox?.intersectsBox(component.mesh.geometry.boundingBox)) {
                //console.log('intersezione',componentEntity.props.entity.mesh.geometry.boundingBox?.intersectsBox(component.mesh.geometry.boundingBox))
                //console.log('bb selezionato',componentEntity.props.entity.mesh.geometry.boundingBox)
                //console.log('bb',component.mesh.geometry.boundingBox)

                /*newMesh = CSG.subtract((component.props.children as JSX.Element).props.meshRef, (children as JSX.Element).props.meshRef)
                let newMeshJSX = <primitive object={newMesh}/>
                let newComponet = <Component name="newComponet" orbit={orbit} position={component.props.position}
                                             rotation={component.props.rotation} scale={component.props.scale}
                                             keyComponent={getNewKey(canvasState, dispatch)} children={newMeshJSX}/>
                dispatch(subtractionComponent({keyComponentToSubstitute: component.props.keyComponent, newComponent: newComponet}))*/
                //console.log('intersezione')
            //}
            //return null;
        })
    }, [componentEntity.props.entity.position, componentEntity.props.entity.rotation, componentEntity.props.entity.scale]);

    return (
        <>
            <TransformControls ref={transformation} position={componentEntity.props.entity.position}
                               rotation={componentEntity.props.entity.rotation}
                               scale={componentEntity.props.entity.scale}
                               type={undefined} isGroup={undefined} id={undefined} uuid={undefined} name={undefined}
                               parent={undefined} modelViewMatrix={undefined} normalMatrix={undefined}
                               matrixWorld={undefined} matrixAutoUpdate={undefined} matrixWorldNeedsUpdate={undefined}
                               castShadow={undefined} receiveShadow={undefined} frustumCulled={undefined}
                               renderOrder={undefined} animations={undefined}
                               userData={{key: componentEntity.props.entity.keyComponent, selected: true}}
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

                {componentEntity}

            </TransformControls>

        </>
    )

}