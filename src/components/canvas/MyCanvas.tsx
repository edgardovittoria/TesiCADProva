import React, { FC, MutableRefObject, useEffect, useRef } from 'react';
import { Provider, ReactReduxContext, useDispatch, useSelector } from "react-redux";
import {
    componentseSelector,
    findComponentByKey,
    keySelectedComponenteSelector,
    updateTransformationParams
} from "../../store/canvasSlice";
import { Canvas, Object3DNode, useThree } from "@react-three/fiber";
import { OrbitControls, TransformControls } from "@react-three/drei";
import { FactoryComponent } from '../factory/FactoryComponent';
import * as THREE from 'three'
import { ToolbarTransformationState, toolbarTransformationStateSelector } from '../../store/toolbarTransformationSlice';
import { DetectCollision } from './components/detectCollision';

import './style/canvas.css'
import { ComponentEntity, TransformationParams } from "../../model/ComponentEntity";

interface MyCanvasProps {
    setModalCollisions: Function,
    setMeshes: Function
}

export const MyCanvas: React.FC<MyCanvasProps> = ({ setModalCollisions, setMeshes }) => {

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
                                {keySelectedComponent !== 0 &&
                                    <DetectCollision entity={findComponentByKey(components, keySelectedComponent)}
                                        setModalCollisions={setModalCollisions} />
                                }
                                <Controls orbit={orbit} keySelectedComponent={keySelectedComponent} />
                                <gridHelper args={[40, 20, "#434141", "#434141"]} scale={[1, 1, 1]} />
                                <SetMeshes setMeshes={setMeshes} components={components} />
                            </Provider>
                        </Canvas>
                    </>
                )}
            </ReactReduxContext.Consumer>
        </div>

    )

}

const SetMeshes: FC<{ setMeshes: Function, components: ComponentEntity[] }> = ({ setMeshes, components }) => {
    const { scene } = useThree()
    useEffect(() => {
        setMeshes(scene.children.filter(child => child.type === "Mesh"))
    }, [scene, components, setMeshes]);
    return <></>
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

    })


    function onChangeHandler(event: THREE.Event) {
        if (!event.value && transformation.current) {
            const controls: Object3DNode<any, any> = transformation.current
            let transformationParmas: TransformationParams = {
                position: [controls.worldPosition.x, controls.worldPosition.y, controls.worldPosition.z],
                rotation: [controls.object.rotation._x, controls.object.rotation._y, controls.object.rotation._z],
                scale: [controls.worldScale.x, controls.worldScale.y, controls.worldScale.z]
            }
            dispatch(updateTransformationParams(transformationParmas))
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





