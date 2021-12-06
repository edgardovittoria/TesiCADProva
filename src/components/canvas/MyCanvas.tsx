import React, { FC, MutableRefObject, useEffect, useRef } from 'react';
import { Provider, ReactReduxContext, useDispatch, useSelector } from "react-redux";
import {
    componentseSelector,
    findComponentByKey,
    keySelectedComponenteSelector,
    updatePosition,
    updateRotation,
    updateScale
} from "../../store/canvasSlice";
import { Canvas, Object3DNode, useThree } from "@react-three/fiber";
import { OrbitControls, TransformControls } from "@react-three/drei";
import { FactoryComponent } from '../factory/FactoryComponent';
import * as THREE from 'three'
import { ToolbarTransformationState, toolbarTransformationStateSelector } from '../../store/toolbarTransformationSlice';
import { Dispatch } from '@reduxjs/toolkit';
import { DetectCollision } from './components/detectCollision';

import './style/canvas.css'

interface MyCanvasProps {
    setModalCollisions: Function
}

export const MyCanvas: React.FC<MyCanvasProps> = ({ setModalCollisions }) => {

    const components = useSelector(componentseSelector);
    const orbit = useRef(null);
    const keySelectedComponent = useSelector(keySelectedComponenteSelector)

    return (
        <div id="canvas-container">

            <ReactReduxContext.Consumer>
                {({ store }) => (
                    <>
                        <Canvas id="myCanvas"
                            camera={{ position: [0, 50, 0], fov: 20, far: 1000, near: 0.1 }}>
                            <Provider store={store}>
                                <pointLight position={[100, 100, 100]} intensity={0.8} />
                                <hemisphereLight color="#ffffff" groundColor={new THREE.Color("#b9b9b9")}
                                    position={[-7, 25, 13]} intensity={0.85} />

                                {components.map((component) => {
                                    return <FactoryComponent key={component.keyComponent} entity={component}
                                        orbit={orbit} />
                                })}
                                <DetectCollision entity={findComponentByKey(components, keySelectedComponent)}
                                    setModalCollisions={setModalCollisions} />
                                <Controls orbit={orbit} keySelectedComponent={keySelectedComponent} />
                                <gridHelper args={[40, 20, "#434141", "#434141"]} scale={[1, 1, 1]} />

                            </Provider>
                        </Canvas>
                    </>
                )}
            </ReactReduxContext.Consumer>
        </div>

    )

}


const Controls: FC<{ orbit: MutableRefObject<null>, keySelectedComponent: number }> = ({
    orbit,
    keySelectedComponent
}) => {
    const { scene, camera } = useThree()
    const transformation = useRef(null);
    const toolbarTransformationState = useSelector(toolbarTransformationStateSelector);
    const dispatch = useDispatch()

    function getActiveTransformationType(toolbarTranformationState: ToolbarTransformationState): string {
        return toolbarTranformationState.transformation.filter(transformation => transformation.active)[0].type;
    }

    useEffect(() => {
        if (transformation.current) {
            const controls: Object3DNode<any, any> = transformation.current
            controls.addEventListener("dragging-changed", onChangeHandler)
            return () => controls.removeEventListener("dragging-changed", onChangeHandler)
        }

    }, [])

    function onChangeHandler(event: THREE.Event) {
        if (!event.value && transformation.current) {
            const controls: Object3DNode<any, any> = transformation.current
            if (controls.getMode() === 'translate') {
                manageTransformation(
                    controls.getMode(),
                    [controls.worldPosition.x, controls.worldPosition.y, controls.worldPosition.z],
                    dispatch
                )
            } else if (controls.getMode() === 'rotate') {
                manageTransformation(
                    controls.getMode(),
                    [controls.worldQuaternion.x, controls.worldQuaternion.y, controls.worldQuaternion.z],
                    dispatch
                )
            } else {
                manageTransformation(
                    controls.getMode(),
                    [controls.worldScale.x, controls.worldScale.y, controls.worldScale.z],
                    dispatch
                )
            }
        }
    }


    let mesh = scene.getObjectByName(keySelectedComponent.toString())

    return (
        <>
            <TransformControls
                camera={camera}
                ref={transformation}
                children={<></>}
                object={mesh}
                showX={(keySelectedComponent !== 0)}
                showY={(keySelectedComponent !== 0)}
                showZ={(keySelectedComponent !== 0)}
                mode={getActiveTransformationType(toolbarTransformationState)}
                
            />
            <OrbitControls ref={orbit} addEventListener={undefined} hasEventListener={undefined}
                removeEventListener={undefined} dispatchEvent={undefined} makeDefault />
        </>
    )


}

export function manageTransformation(
    transformation: string,
    transformationValues: number[],
    dispatch: Dispatch) {
    switch (transformation) {
        case 'translate':
            dispatch(updatePosition([transformationValues[0], transformationValues[1], transformationValues[2]]));
            break;
        case 'rotate':
            dispatch(updateRotation([transformationValues[0], transformationValues[1], transformationValues[2]]));
            break;
        case 'scale':
            dispatch(updateScale([transformationValues[0], transformationValues[1], transformationValues[2]]));
            break;
    }
}




