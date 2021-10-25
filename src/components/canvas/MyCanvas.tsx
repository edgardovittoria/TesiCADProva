import React, {MutableRefObject, useRef} from 'react';
import {Provider, ReactReduxContext, useSelector} from "react-redux";
import {canvasStateSelector} from "../../store/canvasSlice";
import {Canvas, Euler, Vector3} from "@react-three/fiber";
import {Component} from "./components/Component";
import {FactoryComponent} from "../factory/FactoryComponent";


interface MyCanvasProps {
}

export const MyCanvas: React.FC<MyCanvasProps> = ({children}) => {

    const canvasState = useSelector(canvasStateSelector);

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
                                    {canvasState.components.map(component => {
                                        let element = <FactoryComponent entity={component}/>
                                        return(
                                            <Component
                                                key={component.keyComponent}
                                                children={element}
                                                orbit={children as React.MutableRefObject<null>}
                                            />
                                        )
                                    })}
                                    <gridHelper scale={[2.88, 1, 2.95]}/>
                                    {(children as React.MutableRefObject<null>).current}
                                </Provider>
                            </Canvas>
                        </>
                    )}
                </ReactReduxContext.Consumer>
        </div>

    )

}