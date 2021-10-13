import React, {useRef} from 'react';
import './App.css';
import {SideBar} from "./components/sideBar/sideBar";
import {MyCanvas} from "./components/canvas/MyCanvas";
import {OrbitControls} from "@react-three/drei";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {MyNavBar} from "./components/navBar/navBar"
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToolBar} from "./components/toolBar/toolBar";

function App() {

    const orbit = useRef(null);
    const orbitControl = <OrbitControls ref={orbit} addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined}  />


    return (
        <Provider store={store}>
                {/**/}
            <MyNavBar orbit={orbit}/>
            <div className="row" style={{margin:"0px"}}>
                <div className="column" style={{width: "75%", padding:"0px", float:"right"}}>
                    <MyCanvas children={orbitControl}/>
                    <ToolBar/>
                </div>
                <div className="column" style={{width: "25%", padding:"0px", float:"right"}}>
                    <SideBar orbit={orbit}/>
                </div>

            </div>
        </Provider>
    );
}

export default App;
