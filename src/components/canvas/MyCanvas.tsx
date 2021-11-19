import React, {useRef} from 'react';
import {Provider, ReactReduxContext, useSelector} from "react-redux";
import {componentseSelector} from "../../store/canvasSlice";
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import { FactoryComponent } from '../factory/FactoryComponent';




interface MyCanvasProps {

}

export const MyCanvas: React.FC<MyCanvasProps> = () => {

    const components = useSelector(componentseSelector);
    const orbit = useRef(null);

    return (
        <div id="canvas-container" style={{height: "100vh", backgroundColor: "#171A21"}}>
            <ReactReduxContext.Consumer>
                {({store}) => (
                    <>
                        <Canvas id="myCanvas" style={{width: "100%", height: "100%"}}
                                camera={{position: [0, 50, 0], fov: 20, far: 1000, near: 0.1}}>

                            <Provider store={store}>
                                <ambientLight/>
                                <pointLight position={[0, 50, 0]}/>
                                {components.map((component) => {
                                    return <FactoryComponent entity={component} orbit={orbit}/>
                                    

                                })}
                                <gridHelper scale={[2.88, 1, 1.6]}/>
                                <OrbitControls ref={orbit} addEventListener={undefined} hasEventListener={undefined}
                                               removeEventListener={undefined} dispatchEvent={undefined} makeDefault/>


                            </Provider>
                        </Canvas>
                    </>
                )}
            </ReactReduxContext.Consumer>
        </div>

    )

}

