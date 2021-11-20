import React, {FC, MutableRefObject, useRef} from 'react';
import {Provider, ReactReduxContext, useSelector} from "react-redux";
import {componentseSelector, findComponentByKey, keySelectedComponenteSelector} from "../../store/canvasSlice";
import {Canvas, Color, useThree} from "@react-three/fiber";
import {OrbitControls, TransformControls} from "@react-three/drei";
import { FactoryComponent } from '../factory/FactoryComponent';
import {useTransformations} from "../../hooks/useTransformations";
import {DetectCollision} from "./components/detectCollision";
import {ComponentEntity} from "../../model/ComponentEntity";
import Draggable from 'react-draggable'
import {ColorRepresentation} from "three";
import * as THREE from 'three'




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
                                <Controls orbit={orbit} keySelectedComponent={keySelectedComponent} components={components}/>

                            </Provider>
                        </Canvas>
                    </>
                )}
            </ReactReduxContext.Consumer>
        </div>

    )

}


const Controls: FC<{orbit: MutableRefObject<null>, keySelectedComponent: number, components: ComponentEntity[]}> = ({orbit, keySelectedComponent, components}) => {
    const {scene} = useThree()
    const transformation = useRef(null);
    useTransformations(transformation, orbit)

    return(
        <>
            <TransformControls
                ref={transformation}
                children={<></>}
                object={scene.getObjectByName(keySelectedComponent.toString())}
                showX={(keySelectedComponent !== 0)}
                showY={(keySelectedComponent !== 0)}
                showZ={(keySelectedComponent !== 0)}
            />
            <OrbitControls ref={orbit} addEventListener={undefined} hasEventListener={undefined}
                           removeEventListener={undefined} dispatchEvent={undefined} makeDefault/>
        </>
    )
}

