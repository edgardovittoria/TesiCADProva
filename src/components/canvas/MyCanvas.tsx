import React, {FC, MutableRefObject, useEffect, useRef} from 'react';
import {Provider, ReactReduxContext, useDispatch, useSelector} from "react-redux";
import {componentseSelector, findComponentByKey, keySelectedComponenteSelector} from "../../store/canvasSlice";
import {Canvas, Color, Object3DNode, useThree} from "@react-three/fiber";
import {OrbitControls, TransformControls} from "@react-three/drei";
import { FactoryComponent } from '../factory/FactoryComponent';
import {manageTransformation, useTransformations} from "../../hooks/useTransformations";
import {DetectCollision} from "./components/detectCollision";
import {ComponentEntity} from "../../model/ComponentEntity";
import Draggable from 'react-draggable'
import {ColorRepresentation, MeshStandardMaterial} from "three";
import * as THREE from 'three'
import { ToolbarTransformationState, toolbarTransformationStateSelector } from '../../store/toolbarTransformationSlice';




interface MyCanvasProps {

}

export const MyCanvas: React.FC<MyCanvasProps> = () => {

    const components = useSelector(componentseSelector);
    const orbit = useRef(null);
    const keySelectedComponent = useSelector(keySelectedComponenteSelector)

    return (
        <div id="canvas-container" style={{height: "95vh",backgroundImage: "linear-gradient(to top, #b9b9b9, #ffffff)"}}>

            <ReactReduxContext.Consumer>
                {({store}) => (
                    <>
                        <Canvas id="myCanvas" style={{width: "100%", height: "100%"}}
                                camera={{position: [0, 50, 0], fov: 20, far: 1000, near: 0.1}}>
                            <Provider store={store}>
                                <pointLight position={[100, 100, 100]} intensity={0.8} />
                                <hemisphereLight color="#ffffff" groundColor={new THREE.Color("#b9b9b9")} position={[-7, 25, 13]} intensity={0.85} />
                                {components.map((component) => {
                                    return <FactoryComponent key={component.keyComponent} entity={component} orbit={orbit}/>
                                })}
                                <gridHelper args={[15,20,"#434141", "#434141"]} scale={[2.88, 1, 1.6]} />
                                <Controls orbit={orbit} keySelectedComponent={keySelectedComponent} />

                            </Provider>
                        </Canvas>
                    </>
                )}
            </ReactReduxContext.Consumer>
        </div>

    )

}


const Controls: FC<{orbit: MutableRefObject<null>, keySelectedComponent: number}> = ({orbit, keySelectedComponent}) => {
    const {scene} = useThree()
    const transformation = useRef(null);
    const toolbarTransformationState = useSelector(toolbarTransformationStateSelector);
    //useTransformations(transformation, orbit)

    function getActiveTransformationType(toolbarTranformationState: ToolbarTransformationState): string {
        return toolbarTranformationState.transformation.filter(transformation => transformation.active)[0].type;
    }

    
    let mesh = scene.getObjectByName(keySelectedComponent.toString())

    return(
        <>
            <TransformControls
                ref={transformation}
                children={<></>}
                object={mesh}
                showX={(keySelectedComponent !== 0)}
                showY={(keySelectedComponent !== 0)}
                showZ={(keySelectedComponent !== 0)}
                mode={getActiveTransformationType(toolbarTransformationState)}
            />
            <OrbitControls ref={orbit} addEventListener={undefined} hasEventListener={undefined}
                           removeEventListener={undefined} dispatchEvent={undefined} makeDefault/>
        </>
    )
}

