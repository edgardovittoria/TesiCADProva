import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {canvasStateSelector} from "../../store/canvasSlice";
import {Controls} from "react-three-gui";
import {Keen} from "./components/Keen";


interface MyCanvasProps {
}

export const MyCanvas: React.FC<MyCanvasProps> = () => {

    const components = useSelector(canvasStateSelector).components;
    const dispatch = useDispatch();

    return(

        <div id="canvas-container" style={{height:"100vh", backgroundColor:"#171A21"}}>
            <Controls.Provider>
                <Controls.Canvas style={{width: "100%", height:"100%"}}
                        camera={{position:[0,50,0], fov: 20, far:1000, near:0.1}}
                >

                        <ambientLight/>
                        <pointLight position={[20, 20, 20]} />
                        {components}
                        <gridHelper scale={[2.88,1,2.95]}/>
                        {/*<SolarSystem solarSystemFigli={solarSystemFigli}/>*/}
                </Controls.Canvas>
            <Controls/>
            </Controls.Provider>
        </div>
    )

}