import React, {useEffect, useRef} from 'react';
import './App.css';
import {SideBar} from "./components/sideBar/sideBar";
import {MyCanvas} from "./components/canvas/MyCanvas";
import {OrbitControls} from "@react-three/drei";
import {Provider, useDispatch} from "react-redux";
import {store} from "./store/store";
import {MyNavBar} from "./components/navBar/navBar"
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToolBar} from "./components/toolBar/toolBar";
import {SelectBinaryOp} from "./components/modal/selectBinaryOp";

function App() {

    return (
        <Provider store={store}>
            <MyNavBar/>
            <div className="row" style={{margin:"0px"}}>
                <div className="column" style={{width: "75%", padding:"0px", float:"right"}}>
                    <MyCanvas/>
                    <ToolBar/>
                    <SelectBinaryOp/>
                </div>
                <div className="column" style={{width: "25%", padding:"0px", float:"right"}}>
                    <SideBar/>
                </div>

            </div>
        </Provider>
    );
}

export default App;
