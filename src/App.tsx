import React, {useRef} from 'react';
import './App.css';
import {SideBar} from "./components/sideBar";
import {MyCanvas} from "./components/canvas/MyCanvas";
import {OrbitControls} from "@react-three/drei";
import {Provider} from "react-redux";
import {store} from "./store/store";

function App() {

    const orbit = useRef(null);
    const orbitControl = <OrbitControls ref={orbit} addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined}  />


    return (
        <Provider store={store}>
                <div className="row">
                    <div className="column" style={{width: "14%", float:"left"}}>
                        <SideBar orbit={orbit}/>
                    </div>
                    <div className="column" style={{width: "86%", float:"left"}}>
                        <MyCanvas children={orbitControl}/>
                    </div>
                </div>
        </Provider>
    );
}

export default App;
