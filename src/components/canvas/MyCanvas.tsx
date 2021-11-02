import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import {Provider, ReactReduxContext, useDispatch, useSelector} from "react-redux";
import {canvasStateSelector, selectComponent} from "../../store/canvasSlice";
import {Canvas, Object3DNode, useThree} from "@react-three/fiber";
import {FactoryComponent2} from '../factory/FactoryComponent2';
import {Component} from './components/Component';
import {Mesh} from "three";
import {OrbitControls, TransformControls} from "@react-three/drei";
import {ComponentEntity} from "../../model/ComponentEntity";
import {useTransformations} from "../../hooks/useTransformations";
import {useDetectComponentsCollision} from "../../hooks/useDetectComponentsCollision";


interface MyCanvasProps {

}

export const MyCanvas: React.FC<MyCanvasProps> = () => {

    const canvasState = useSelector(canvasStateSelector);
    const dispatch = useDispatch();
    const transformation = useRef(null)
    const orbit = useRef(null);

    useTransformations(transformation, orbit);


    return (
        <div id="canvas-container" style={{height: "100vh", backgroundColor: "#171A21"}}>
            <ReactReduxContext.Consumer>
                {({store}) => (
                    <>
                        <Canvas id="myCanvas" style={{width: "100%", height: "100%"}}
                                camera={{position: [0, 50, 0], fov: 20, far: 1000, near: 0.1}}
                        >

                            <Provider store={store}>
                                <ambientLight/>
                                <pointLight position={[0, 50, 0]}/>
                                {canvasState.components.map((component) =>
                                    (component.isSelected) ?
                                        <TransformControls
                                            key={component.keyComponent}
                                            ref={transformation}
                                            position={component.position}
                                            rotation={component.rotation}
                                            scale={component.scale}
                                            type={undefined} isGroup={undefined} id={undefined} uuid={undefined}
                                            name={undefined}
                                            parent={undefined} modelViewMatrix={undefined} normalMatrix={undefined}
                                            matrixWorld={undefined} matrixAutoUpdate={undefined}
                                            matrixWorldNeedsUpdate={undefined}
                                            castShadow={undefined} receiveShadow={undefined} frustumCulled={undefined}
                                            renderOrder={undefined} animations={undefined}
                                            userData={{key: component.keyComponent}}
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
                                            <Component children={component}/>

                                        </TransformControls> :

                                        <Component key={component.keyComponent} children={component}/>

                                )}
                                <gridHelper scale={[2.88, 1, 2.95]}/>
                                <OrbitControls ref={orbit} addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined}  />



                            </Provider>
                        </Canvas>
                    </>
                )}
            </ReactReduxContext.Consumer>
        </div>

    )

}

